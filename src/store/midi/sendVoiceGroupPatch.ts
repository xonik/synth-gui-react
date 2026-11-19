import { button, cc, getActiveMidiIds, nrpn, type Route, sysex } from '@/midi/midibus'
import * as rpc from '@/midi/rpc/api'
import type { ControllerConfigButton, ControllerConfigCC, ControllerConfigNRPN } from '@/midi/types'
import { voiceGroupStores } from '@/store/patchStore'
import {
    DST_ENV_COUNT,
    DST_LFO_COUNT,
    FIRST_DST,
    FIRST_ENV_DST,
    FIRST_INTERMEDIATE,
    FIRST_LFO_DST,
} from '@/synthcore/modules/controllers/controllerIds'
import { curveValuesUsed as envCurves } from '@/synthcore/modules/env/generatedTypes'
import fxControllers from '@/synthcore/modules/fx/fxControllers'
import { curveValuesUsed as lfoCurves } from '@/synthcore/modules/lfo/generatedTypes'
import noiseControllers from '@/synthcore/modules/noise/noiseControllers'
import ringModControllers from '@/synthcore/modules/ringMod/ringModControllers'
import { STAGE_NAMES } from '../modules/envActions'
import { LFO_STAGE_NAMES } from '../modules/lfoActions'
import { buttonMappings as filterButtons, ccMappings as filterCCs, nrpnMappings as filterNRPNs } from './filterMidi'
import { buttonMappings as fxKbdButtons, ccMappings as fxKbdCCs } from './fxKbdMidi'
import { createOscWavetableMessage, buttonMappings as oscButtons, ccMappings as oscCCs } from './oscMidi'
import { postMixMappings } from './outPostMixMidi'
import { levelMappings, outMappings } from './srcMixMidi'

// Allow a 31.25 kbaud voice-card link to drain between messages.
const MESSAGE_GAP_MS = 40
let sending = false

const unipolar16 = (value: number) => Math.floor(65535 * value) - 32768
const bipolar16 = (value: number) => Math.floor(32767 * value)
// Match the existing bipolar NRPN bias and the firmware's subtraction.
const bipolarNrpn16 = (value: number) => Math.floor(32767 * value + 32767) - 32768

/**
 * Send a snapshot of one voice group's patch. Global controllers are deliberately
 * excluded. Resolution of this promise means sent, not acknowledged by the synth.
 */
export async function sendVoiceGroupPatch(voiceGroupIndex: number): Promise<void> {
    if (!Number.isInteger(voiceGroupIndex) || !voiceGroupStores[voiceGroupIndex]) {
        throw new RangeError(`Invalid voice group: ${voiceGroupIndex}`)
    }
    if (sending) throw new Error('A voice group patch is already being sent')
    if (!getActiveMidiIds().outputId) throw new Error('Select and save a MIDI output before sending a patch')

    const patch = voiceGroupStores[voiceGroupIndex].getState().getPatch()
    const route: Route = { type: 'voiceGroup', index: voiceGroupIndex }
    const outputId = getActiveMidiIds().outputId
    const messages: (() => void)[] = []
    const addCC = (ctrl: ControllerConfigCC, value: number) => {
        if (!ctrl.global) {
            const midiValue = Math.floor(127 * (ctrl.bipolar ? (value + 1) / 2 : value))
            messages.push(() => cc.send(voiceGroupIndex, ctrl, midiValue))
        }
    }
    const addButton = (ctrl: ControllerConfigButton, value: number) => {
        if (!ctrl.global) messages.push(() => button.send(voiceGroupIndex, ctrl, ctrl.values[value]))
    }
    const addNRPN = (ctrl: ControllerConfigNRPN, value: number) => {
        const midiValue = Math.floor(65535 * (ctrl.bipolar ? (value + 1) / 2 : value))
        if (!ctrl.global) messages.push(() => nrpn.send(voiceGroupIndex, ctrl, midiValue))
    }

    for (const { oscIndex, field, ctrl } of oscCCs) addCC(ctrl, patch.oscillators[oscIndex][field])
    // Applying an inactive oscillator's sync-off last would turn off active sync.
    for (const { oscIndex, field, ctrl } of [...oscButtons].sort(
        (a, b) =>
            Number(patch.oscillators[a.oscIndex][a.field] !== 0) - Number(patch.oscillators[b.oscIndex][b.field] !== 0)
    )) {
        addButton(ctrl, patch.oscillators[oscIndex][field])
    }
    for (const { filterIndex, field, ctrl } of filterCCs) addCC(ctrl, patch.filters[filterIndex][field])
    for (const { filterIndex, field, ctrl } of filterNRPNs) addNRPN(ctrl, patch.filters[filterIndex][field])
    for (const { filterIndex, field, ctrl } of filterButtons) addButton(ctrl, patch.filters[filterIndex][field])
    for (const { selector, ctrl } of fxKbdCCs) addCC(ctrl, selector(patch))
    for (const { selector, ctrl } of fxKbdButtons) addButton(ctrl, selector(patch))
    addButton(fxControllers.BIT_CRUSHER.RECON, patch.fx.bitCrusher.recon)
    for (const { selector, ctrl } of postMixMappings) addCC(ctrl, selector(patch))
    for (const { field, ctrl } of levelMappings) addCC(ctrl, patch.srcMix[field])
    for (const { field, ctrl } of outMappings) addButton(ctrl, patch.srcMix[field])
    addButton(noiseControllers.COLOUR, patch.noise.colour)
    addButton(ringModControllers.SOURCE, patch.ringMod.source)

    patch.envelopes.forEach((env, envId) => {
        const stages = env.stages
        const params = [
            unipolar16(stages.delay.time),
            unipolar16(stages.attack.time),
            unipolar16(stages.decay1.time),
            unipolar16(stages.decay2.time),
            bipolar16(stages.sustain.level),
            unipolar16(stages.release1.time),
            unipolar16(stages.release2.time),
            bipolar16(stages.decay2.level),
            bipolar16(stages.release2.level),
            bipolarNrpn16(env.offset),
        ]
        const settings = [
            env.resetOnTrigger,
            env.releaseMode,
            env.loopMode,
            env.maxLoops,
            env.loop,
            env.invert,
            env.bipolar,
            env.velocity,
        ]
        messages.push(() => rpc.setCtrlAllEnvParams(envId, params, route))
        messages.push(() => rpc.setCtrlAllEnvSettings(envId, settings, route))
        STAGE_NAMES.forEach((name, stageId) => {
            const stage = stages[name]
            messages.push(() =>
                rpc.setCtrlAllEnvStageSettings(envId, stageId, [envCurves[stage.curve], stage.enabled], route)
            )
        })
    })

    patch.lfos.forEach((lfo, lfoId) => {
        const params = [
            ...[lfo.rate, lfo.depth, lfo.delay, lfo.balance, lfo.phaseOffset].map(unipolar16),
            bipolarNrpn16(lfo.levelOffset),
        ]
        const settings = [
            lfo.shape,
            lfo.sync,
            lfo.reset,
            lfo.bipolar,
            lfo.invert,
            lfo.loopMode,
            lfo.maxLoops,
            lfo.loop,
            lfo.resetOnTrigger,
            lfo.resetOnStop,
            lfo.resetLevelOnClock,
            lfo.syncToClock,
            lfo.gated,
            lfo.randomPhase,
        ]
        messages.push(() => rpc.setCtrlAllLfoParams(lfoId, params, route))
        // Exclude the transient LFO_GATE slot at the end of the firmware array.
        messages.push(() => rpc.setCtrlAllLfoSettings(lfoId, settings, route))
        LFO_STAGE_NAMES.forEach((name, stageId) => {
            const stage = lfo.stages[name]
            messages.push(() =>
                rpc.setCtrlAllLfoStageSettings(lfoId, stageId, [lfoCurves[stage.curve], stage.enabled], route)
            )
        })
    })

    // Include zero routes so sending a sparse UI matrix also clears old synth routes.
    const sourceAmounts = (dst: number, index = 0) =>
        Array.from({ length: FIRST_DST }, (_, src) => Math.round(32767 * (patch.mods[src]?.[dst]?.[index] ?? 0)))
    for (let dst = FIRST_INTERMEDIATE; dst < FIRST_ENV_DST; dst++) {
        const amounts = sourceAmounts(dst)
        messages.push(() => rpc.setAllModAmounts(dst - FIRST_INTERMEDIATE, amounts, route))
    }
    patch.envelopes.forEach((_env, envId) => {
        for (let dst = 0; dst < DST_ENV_COUNT; dst++) {
            const amounts = sourceAmounts(FIRST_ENV_DST + dst, envId)
            messages.push(() => rpc.setAllEnvModAmounts(envId, dst, amounts, route))
        }
    })
    patch.lfos.forEach((_lfo, lfoId) => {
        for (let dst = 0; dst < DST_LFO_COUNT; dst++) {
            const amounts = sourceAmounts(FIRST_LFO_DST + dst, lfoId)
            messages.push(() => rpc.setAllLfoModAmounts(lfoId, dst, amounts, route))
        }
    })
    for (let oscId = 0; oscId < 2; oscId++) {
        const message = createOscWavetableMessage(oscId, patch.oscillators[oscId].wavetable)
        messages.push(() => sysex.send(route, message))
    }

    sending = true
    try {
        for (const sendMessage of messages) {
            if (getActiveMidiIds().outputId !== outputId) {
                throw new Error('MIDI output changed or disconnected while sending the patch')
            }
            sendMessage()
            await new Promise<void>((resolve) => setTimeout(resolve, MESSAGE_GAP_MS))
        }
    } finally {
        sending = false
    }
}
