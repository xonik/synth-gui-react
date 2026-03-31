import { voiceGroupStores, LfoState } from '../patchStore'
import { cc, nrpn, button, lastSentMidiGroup } from '../../midi/midibus'
import { ControllerConfigCC, ControllerConfigNRPN, ControllerConfigButton, MidiGroup } from '../../midi/types'
import { lfoCtrls } from '../../synthcore/modules/lfo/lfoControllers'
import { isMidiReceiving, withMidiReceive } from './midiGuard'
import { LfoStageName, LFO_STAGE_NAMES, STAGE_NAME_TO_ID, STAGE_ID_TO_NAME } from '../modules/lfoActions'

const NUMBER_OF_LFOS = 4

type LfoField = keyof Omit<LfoState, 'stages'>

interface NrpnMapping {
    field: LfoField
    ctrl: ControllerConfigNRPN
    bipolar?: boolean
}

interface ButtonMapping {
    field: LfoField
    ctrl: ControllerConfigButton
}

const nrpnMappings: NrpnMapping[] = [
    { field: 'rate', ctrl: lfoCtrls.RATE },
    { field: 'depth', ctrl: lfoCtrls.DEPTH },
    { field: 'delay', ctrl: lfoCtrls.DELAY },
    { field: 'balance', ctrl: lfoCtrls.BALANCE },
    { field: 'phaseOffset', ctrl: lfoCtrls.PHASE_OFFSET },
    { field: 'levelOffset', ctrl: lfoCtrls.LEVEL_OFFSET, bipolar: true },
]

const buttonMappings: ButtonMapping[] = [
    { field: 'shape', ctrl: lfoCtrls.SHAPE },
    { field: 'sync', ctrl: lfoCtrls.SYNC },
    { field: 'reset', ctrl: lfoCtrls.RESET },
    { field: 'bipolar', ctrl: lfoCtrls.BIPOLAR },
    { field: 'randomPhase', ctrl: lfoCtrls.RANDOM_PHASE },
    { field: 'invert', ctrl: lfoCtrls.INVERT },
    { field: 'loop', ctrl: lfoCtrls.LOOP },
    { field: 'loopMode', ctrl: lfoCtrls.LOOP_MODE },
    { field: 'resetOnTrigger', ctrl: lfoCtrls.RESET_ON_TRIGGER },
    { field: 'resetOnStop', ctrl: lfoCtrls.RESET_ON_STOP },
    { field: 'resetLevelOnClock', ctrl: lfoCtrls.RESET_LEVEL_ON_CLOCK },
    { field: 'syncToClock', ctrl: lfoCtrls.SYNC_TO_CLOCK },
    { field: 'gated', ctrl: lfoCtrls.GATED },
]

let currentSentLfoId = -1
let lastSentLfoIdTimestamp = 0

function sendLfoSelect(voiceGroupIndex: number, lfoId: number) {
    if (
        lfoId !== currentSentLfoId ||
        (lastSentMidiGroup !== MidiGroup.LFO && Date.now() - lastSentLfoIdTimestamp > 10000) ||
        (Date.now() - lastSentLfoIdTimestamp > 30000)
    ) {
        currentSentLfoId = lfoId
        lastSentLfoIdTimestamp = Date.now()
        cc.send(voiceGroupIndex, lfoCtrls.SELECT as ControllerConfigCC, lfoId)
    }
}

function sendLfoParams(
    voiceGroupIndex: number,
    lfoId: number,
    lfo: LfoState,
    prevLfo: LfoState
) {
    let selectSent = false
    const ensureSelect = () => {
        if (!selectSent) {
            sendLfoSelect(voiceGroupIndex, lfoId)
            selectSent = true
        }
    }

    for (const m of nrpnMappings) {
        if (lfo[m.field] !== prevLfo[m.field]) {
            ensureSelect()
            const value = lfo[m.field]
            const midiValue = m.bipolar
                ? Math.floor(32767 * value + 32767)
                : Math.floor(65535 * value)
            nrpn.send(voiceGroupIndex, m.ctrl, midiValue)
        }
    }

    if (lfo.maxLoops !== prevLfo.maxLoops) {
        ensureSelect()
        cc.send(voiceGroupIndex, lfoCtrls.MAX_LOOPS as ControllerConfigCC, lfo.maxLoops)
    }

    for (const m of buttonMappings) {
        if (lfo[m.field] !== prevLfo[m.field]) {
            ensureSelect()
            button.send(voiceGroupIndex, m.ctrl, m.ctrl.values[lfo[m.field]])
        }
    }

    for (const stageName of LFO_STAGE_NAMES) {
        const stage = lfo.stages[stageName]
        const prevStage = prevLfo.stages[stageName]
        if (stage !== prevStage) {
            const stageId = STAGE_NAME_TO_ID[stageName]

            if (stage.curve !== prevStage.curve) {
                ensureSelect()
                const midiValue = (stageId << 7) + stage.curve
                nrpn.send(voiceGroupIndex, lfoCtrls.CURVE, midiValue)
            }

            if (stage.enabled !== prevStage.enabled) {
                ensureSelect()
                const enableBit = stage.enabled ? 0b1000 : 0
                const midiValue = stageId | enableBit
                cc.send(voiceGroupIndex, lfoCtrls.TOGGLE_STAGE as ControllerConfigCC, midiValue)
            }
        }
    }
}

let sendUnsubscribers: (() => void)[] = []

export function startLfoMidiSend() {
    stopLfoMidiSend()

    voiceGroupStores.forEach((store, voiceGroupIndex) => {
        let previousLfos = store.getState().lfos

        const unsub = store.subscribe((state) => {
            if (isMidiReceiving()) {
                previousLfos = state.lfos
                return
            }
            if (state.lfos !== previousLfos) {
                const prev = previousLfos
                previousLfos = state.lfos

                for (let lfoId = 0; lfoId < NUMBER_OF_LFOS; lfoId++) {
                    if (state.lfos[lfoId] !== prev[lfoId]) {
                        sendLfoParams(voiceGroupIndex, lfoId, state.lfos[lfoId], prev[lfoId])
                    }
                }
            }
        })

        sendUnsubscribers.push(unsub)
    })
}

export function stopLfoMidiSend() {
    sendUnsubscribers.forEach(unsub => unsub())
    sendUnsubscribers = []
    currentSentLfoId = -1
    lastSentLfoIdTimestamp = 0
}

let currentReceivedLfoId = -1
let receiveUnsubscribers: (() => void)[] = []

function subscribeLfoSelect() {
    const cfg = lfoCtrls.SELECT as ControllerConfigCC
    const id = cc.subscribe((voiceGroupIndex: number, value: number) => {
        currentReceivedLfoId = value
    }, cfg)
    return () => cc.unsubscribe(cfg, id)
}

export function startLfoMidiReceive() {
    stopLfoMidiReceive()

    receiveUnsubscribers.push(subscribeLfoSelect())

    for (const m of nrpnMappings) {
        const id = nrpn.subscribe((voiceGroupIndex: number, midiValue: number) => {
            if (currentReceivedLfoId < 0) return
            const value = m.bipolar
                ? (midiValue - 32767) / 32767
                : midiValue / 65535
            withMidiReceive(() => {
                voiceGroupStores[voiceGroupIndex].getState().set(state => {
                    state.lfos[currentReceivedLfoId][m.field] = value
                })
            })
        }, m.ctrl)
        receiveUnsubscribers.push(() => nrpn.unsubscribe(m.ctrl, id))
    }

    const maxLoopsCtrl = lfoCtrls.MAX_LOOPS as ControllerConfigCC
    const mlId = cc.subscribe((voiceGroupIndex: number, midiValue: number) => {
        if (currentReceivedLfoId < 0) return
        withMidiReceive(() => {
            voiceGroupStores[voiceGroupIndex].getState().set(state => {
                state.lfos[currentReceivedLfoId].maxLoops = midiValue
            })
        })
    }, maxLoopsCtrl)
    receiveUnsubscribers.push(() => cc.unsubscribe(maxLoopsCtrl, mlId))

    for (const m of buttonMappings) {
        const id = button.subscribe((voiceGroupIndex: number, midiValue: number) => {
            if (currentReceivedLfoId < 0) return
            const value = m.ctrl.values.indexOf(midiValue)
            if (value < 0) return
            withMidiReceive(() => {
                voiceGroupStores[voiceGroupIndex].getState().set(state => {
                    state.lfos[currentReceivedLfoId][m.field] = value
                })
            })
        }, m.ctrl)
        receiveUnsubscribers.push(() => button.unsubscribe(m.ctrl, id))
    }

    const curveId = nrpn.subscribe((voiceGroupIndex: number, midiValue: number) => {
        if (currentReceivedLfoId < 0) return
        const stageId = midiValue >> 7
        const stageName = STAGE_ID_TO_NAME[stageId as keyof typeof STAGE_ID_TO_NAME]
        if (!stageName) return
        const curve = midiValue & 0b01111111
        withMidiReceive(() => {
            voiceGroupStores[voiceGroupIndex].getState().set(state => {
                state.lfos[currentReceivedLfoId].stages[stageName].curve = curve
            })
        })
    }, lfoCtrls.CURVE)
    receiveUnsubscribers.push(() => nrpn.unsubscribe(lfoCtrls.CURVE, curveId))

    const toggleStageCtrl = lfoCtrls.TOGGLE_STAGE as ControllerConfigCC
    const tsId = cc.subscribe((voiceGroupIndex: number, midiValue: number) => {
        if (currentReceivedLfoId < 0) return
        const stageId = midiValue & 0b111
        const stageName = STAGE_ID_TO_NAME[stageId as keyof typeof STAGE_ID_TO_NAME]
        if (!stageName) return
        const enabled = (midiValue & 0b1000) > 0 ? 1 : 0
        withMidiReceive(() => {
            voiceGroupStores[voiceGroupIndex].getState().set(state => {
                state.lfos[currentReceivedLfoId].stages[stageName].enabled = enabled
            })
        })
    }, toggleStageCtrl)
    receiveUnsubscribers.push(() => cc.unsubscribe(toggleStageCtrl, tsId))
}

export function stopLfoMidiReceive() {
    receiveUnsubscribers.forEach(unsub => unsub())
    receiveUnsubscribers = []
    currentReceivedLfoId = -1
}
