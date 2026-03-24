import { voiceGroupStores, VoiceGroupPatch, SrcMixState } from '../patchStore'
import { cc, button } from '../../midi/midibus'
import { ControllerConfigCC, ControllerConfigButton } from '../../midi/types'
import srcMixControllers from '../../synthcore/modules/srcMix/srcMixControllers'
import { isMidiReceiving, withMidiReceive } from './midiGuard'

type LevelField = 'levelOsc1' | 'levelOsc2' | 'levelOsc3' | 'levelNoise' | 'levelRingMod' | 'levelExtAudio'
type OutField = 'outOsc1' | 'outOsc2' | 'outOsc3' | 'outNoise' | 'outRingMod' | 'outExtAudio'

const levelMappings: { field: LevelField, ctrl: ControllerConfigCC }[] = [
    { field: 'levelOsc1', ctrl: srcMixControllers.LEVEL_OSC1 },
    { field: 'levelOsc2', ctrl: srcMixControllers.LEVEL_OSC2 },
    { field: 'levelOsc3', ctrl: srcMixControllers.LEVEL_OSC3 },
    { field: 'levelNoise', ctrl: srcMixControllers.LEVEL_NOISE },
    { field: 'levelRingMod', ctrl: srcMixControllers.LEVEL_RING_MOD },
    { field: 'levelExtAudio', ctrl: srcMixControllers.LEVEL_EXT_AUDIO },
]

const outMappings: { field: OutField, ctrl: ControllerConfigButton }[] = [
    { field: 'outOsc1', ctrl: srcMixControllers.OUT_OSC1 },
    { field: 'outOsc2', ctrl: srcMixControllers.OUT_OSC2 },
    { field: 'outOsc3', ctrl: srcMixControllers.OUT_OSC3 },
    { field: 'outNoise', ctrl: srcMixControllers.OUT_NOISE },
    { field: 'outRingMod', ctrl: srcMixControllers.OUT_RING_MOD },
    { field: 'outExtAudio', ctrl: srcMixControllers.OUT_EXT_AUDIO },
]

let unsubscribers: (() => void)[] = []

export function startSrcMixMidiSend() {
    stopSrcMixMidiSend()

    voiceGroupStores.forEach((store, voiceGroupIndex) => {
        let prevSrcMix = store.getState().srcMix

        const unsub = store.subscribe((state) => {
            if (isMidiReceiving()) {
                prevSrcMix = state.srcMix
                return
            }

            if (state.srcMix === prevSrcMix) return
            const prev = prevSrcMix
            prevSrcMix = state.srcMix

            for (const { field, ctrl } of levelMappings) {
                if (state.srcMix[field] !== prev[field]) {
                    cc.send(voiceGroupIndex, ctrl, Math.floor(127 * state.srcMix[field]))
                }
            }

            for (const { field, ctrl } of outMappings) {
                if (state.srcMix[field] !== prev[field]) {
                    button.send(voiceGroupIndex, ctrl, ctrl.values[state.srcMix[field]])
                }
            }
        })

        unsubscribers.push(unsub)
    })
}

export function stopSrcMixMidiSend() {
    unsubscribers.forEach(unsub => unsub())
    unsubscribers = []
}

let receiveUnsubscribers: (() => void)[] = []

export function startSrcMixMidiReceive() {
    stopSrcMixMidiReceive()

    for (const { field, ctrl } of levelMappings) {
        const id = cc.subscribe((voiceGroupIndex: number, midiValue: number) => {
            const value = midiValue / 127
            withMidiReceive(() => {
                voiceGroupStores[voiceGroupIndex].getState().set(state => {
                    state.srcMix[field] = value
                })
            })
        }, ctrl)
        receiveUnsubscribers.push(() => cc.unsubscribe(ctrl, id))
    }

    for (const { field, ctrl } of outMappings) {
        const id = button.subscribe((voiceGroupIndex: number, midiValue: number) => {
            const value = ctrl.values.indexOf(midiValue)
            if (value < 0) return
            withMidiReceive(() => {
                voiceGroupStores[voiceGroupIndex].getState().set(state => {
                    state.srcMix[field] = value
                })
            })
        }, ctrl)
        receiveUnsubscribers.push(() => button.unsubscribe(ctrl, id))
    }
}

export function stopSrcMixMidiReceive() {
    receiveUnsubscribers.forEach(unsub => unsub())
    receiveUnsubscribers = []
}
