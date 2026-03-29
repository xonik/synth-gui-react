import { voiceGroupStores, LfoState } from '../patchStore'
import { cc, nrpn, button } from '../../midi/midibus'
import { ControllerConfigCC, ControllerConfigNRPN, ControllerConfigButton } from '../../midi/types'
import { lfoCtrls } from '../../synthcore/modules/lfo/lfoControllers'
import { isMidiReceiving, withMidiReceive } from './midiGuard'

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

function sendLfoSelect(voiceGroupIndex: number, lfoId: number) {
    if (lfoId !== currentSentLfoId) {
        currentSentLfoId = lfoId
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
}

export function stopLfoMidiReceive() {
    receiveUnsubscribers.forEach(unsub => unsub())
    receiveUnsubscribers = []
    currentReceivedLfoId = -1
}
