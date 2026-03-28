/**
 * MIDI receive for envelopes: subscribes to midibus and writes
 * incoming values to the Zustand stores.
 *
 * Mirrors the receive logic from the old ControllerHandler classes
 * in envApi.ts, but writes to Zustand instead of Redux.
 */

import { voiceGroupStores } from '../patchStore'
import { cc, nrpn, button } from '../../midi/midibus'
import { ControllerConfigNRPN } from '../../midi/types'
import { envCtrls } from '../../synthcore/modules/env/envControllers'
import { StageId } from '../../synthcore/modules/env/types'
import { StageName } from '../modules/envActions'
import {
    setStageLevel,
    setStageTime,
    setStageEnabled,
    setStageCurve,
    setInvert,
    setMaxLoops,
} from '../modules/envActions'
import { curveValuesUsed } from '../../synthcore/modules/env/generatedTypes'
import { withMidiReceive } from './midiGuard'

const STAGE_ID_TO_NAME: Record<number, StageName> = {
    [StageId.DELAY]: 'delay',
    [StageId.ATTACK]: 'attack',
    [StageId.DECAY1]: 'decay1',
    [StageId.DECAY2]: 'decay2',
    [StageId.SUSTAIN]: 'sustain',
    [StageId.RELEASE1]: 'release1',
    [StageId.RELEASE2]: 'release2',
    [StageId.STOPPED]: 'stopped',
}

let currentReceivedEnvId = -1
let unsubscribers: (() => void)[] = []

function storeForVoiceGroup(voiceGroupIndex: number) {
    return voiceGroupStores[voiceGroupIndex]
}

function subscribeEnvSelect() {
    const cfg = envCtrls.SELECT
    const id = cc.subscribe((voiceGroupIndex: number, value: number) => {
        currentReceivedEnvId = value
    }, cfg)
    return () => cc.unsubscribe(cfg, id)
}

function subscribeLevel() {
    const ctrl = envCtrls.LEVEL
    const id = nrpn.subscribe((voiceGroupIndex: number, midiValue: number) => {
        if (currentReceivedEnvId < 0) return

        const valuePart = midiValue & 0xFFFF
        const stageId = midiValue >> 16
        const stageName = STAGE_ID_TO_NAME[stageId]
        if (!stageName) return

        const store = storeForVoiceGroup(voiceGroupIndex)
        const bipolar = store.getState().envelopes[currentReceivedEnvId]?.bipolar === 1
        const value = bipolar ? (valuePart - 32767) / 32767 : valuePart / 65535

        withMidiReceive(() => {
            store.getState().set(state => {
                setStageLevel(state, currentReceivedEnvId, stageName, value)
            })
        })
    }, ctrl)
    return () => nrpn.unsubscribe(ctrl, id)
}

function subscribeTime() {
    const ctrl = envCtrls.TIME
    const id = nrpn.subscribe((voiceGroupIndex: number, midiValue: number) => {
        if (currentReceivedEnvId < 0) return

        const valuePart = midiValue & 0xFFFF
        const stageId = midiValue >> 16
        const stageName = STAGE_ID_TO_NAME[stageId]
        if (!stageName) return

        const value = valuePart / 65535

        withMidiReceive(() => {
            storeForVoiceGroup(voiceGroupIndex).getState().set(state => {
                setStageTime(state, currentReceivedEnvId, stageName, value)
            })
        })
    }, ctrl)
    return () => nrpn.unsubscribe(ctrl, id)
}

function subscribeCurve() {
    const ctrl = envCtrls.CURVE
    // Subscribe without values filter — the raw NRPN value encodes stageId
    // in upper bits and curve in lower bits, so it won't match curveValuesUsed.
    // values must be undefined (not []) so the midibus skips value filtering.
    const subCtrl = { ...ctrl, values: undefined } as unknown as ControllerConfigNRPN
    const id = nrpn.subscribe((voiceGroupIndex: number, midiValue: number) => {
        if (currentReceivedEnvId < 0) return

        const stageId = (midiValue >> 7)
        const curve = midiValue & 0b01111111
        const curveIndex = curveValuesUsed.indexOf(curve)
        if (curveIndex < 0) return

        const stageName = STAGE_ID_TO_NAME[stageId]
        if (!stageName) return

        withMidiReceive(() => {
            storeForVoiceGroup(voiceGroupIndex).getState().set(state => {
                setStageCurve(state, currentReceivedEnvId, stageName, curveIndex, curveValuesUsed.length)
            })
        })
    }, subCtrl)
    return () => nrpn.unsubscribe(subCtrl, id)
}

function subscribeToggleStage() {
    const ctrl = envCtrls.TOGGLE_STAGE
    const id = cc.subscribe((voiceGroupIndex: number, midiValue: number) => {
        if (currentReceivedEnvId < 0) return

        const stageId = midiValue & 0b111
        const enabled = (midiValue & 0b1000) > 0 ? 1 : 0
        const stageName = STAGE_ID_TO_NAME[stageId]
        if (!stageName) return

        withMidiReceive(() => {
            storeForVoiceGroup(voiceGroupIndex).getState().set(state => {
                setStageEnabled(state, currentReceivedEnvId, stageName, enabled)
            })
        })
    }, ctrl)
    return () => cc.unsubscribe(ctrl, id)
}

function subscribeOffset() {
    const ctrl = envCtrls.OFFSET
    const id = nrpn.subscribe((voiceGroupIndex: number, midiValue: number) => {
        if (currentReceivedEnvId < 0) return

        const valuePart = midiValue & 0xFFFF
        const value = ctrl.bipolar ? (valuePart - 32767) / 32767 : valuePart / 65535

        withMidiReceive(() => {
            storeForVoiceGroup(voiceGroupIndex).getState().set(state => {
                state.envelopes[currentReceivedEnvId].offset = value
            })
        })
    }, ctrl)
    return () => nrpn.unsubscribe(ctrl, id)
}

function subscribeMaxLoops() {
    const ctrl = envCtrls.MAX_LOOPS
    const id = cc.subscribe((voiceGroupIndex: number, midiValue: number) => {
        if (currentReceivedEnvId < 0) return

        withMidiReceive(() => {
            storeForVoiceGroup(voiceGroupIndex).getState().set(state => {
                setMaxLoops(state, currentReceivedEnvId, midiValue)
            })
        })
    }, ctrl)
    return () => cc.unsubscribe(ctrl, id)
}

function subscribeInvert() {
    const ctrl = envCtrls.INVERT
    const id = button.subscribe((voiceGroupIndex: number, midiValue: number) => {
        if (currentReceivedEnvId < 0) return

        const value = ctrl.values.indexOf(midiValue)
        if (value < 0) return

        withMidiReceive(() => {
            storeForVoiceGroup(voiceGroupIndex).getState().set(state => {
                setInvert(state, currentReceivedEnvId, value)
            })
        })
    }, ctrl)
    return () => button.unsubscribe(ctrl, id)
}

function subscribeButtonParam(
    ctrl: typeof envCtrls.LOOP,
    field: 'loop' | 'velocity' | 'resetOnTrigger' | 'releaseMode' | 'loopMode' | 'bipolar'
) {
    const id = button.subscribe((voiceGroupIndex: number, midiValue: number) => {
        if (currentReceivedEnvId < 0) return

        const value = ctrl.values.indexOf(midiValue)
        if (value < 0) return

        withMidiReceive(() => {
            storeForVoiceGroup(voiceGroupIndex).getState().set(state => {
                state.envelopes[currentReceivedEnvId][field] = value
            })
        })
    }, ctrl)
    return () => button.unsubscribe(ctrl, id)
}

export function startEnvelopeMidiReceive() {
    stopEnvelopeMidiReceive()

    unsubscribers.push(
        subscribeEnvSelect(),
        subscribeLevel(),
        subscribeTime(),
        subscribeCurve(),
        subscribeToggleStage(),
        subscribeOffset(),
        subscribeMaxLoops(),
        subscribeInvert(),
        subscribeButtonParam(envCtrls.LOOP, 'loop'),
        subscribeButtonParam(envCtrls.VELOCITY, 'velocity'),
        subscribeButtonParam(envCtrls.RESET_ON_TRIGGER, 'resetOnTrigger'),
        subscribeButtonParam(envCtrls.RELEASE_MODE, 'releaseMode'),
        subscribeButtonParam(envCtrls.LOOP_MODE, 'loopMode'),
        subscribeButtonParam(envCtrls.BIPOLAR, 'bipolar'),
    )
}

export function stopEnvelopeMidiReceive() {
    unsubscribers.forEach(unsub => unsub())
    unsubscribers = []
    currentReceivedEnvId = -1
}
