import { voiceGroupStores } from '../patchStore'
import { button } from '../../midi/midibus'
import noiseControllers from '../../synthcore/modules/noise/noiseControllers'
import ringModControllers from '../../synthcore/modules/ringMod/ringModControllers'
import { ApiSource } from '../../synthcore/types'
import { isMidiReceiving } from './midiGuard'
import { ControllerConfigButton } from '../../midi/types'

function sendButton(
    voiceGroupIndex: number,
    ctrl: ControllerConfigButton,
    value: number,
) {
    button.send(voiceGroupIndex, ctrl, ctrl.values[value])
}

let unsubscribers: (() => void)[] = []

export function startSimpleButtonMidiSend() {
    stopSimpleButtonMidiSend()

    voiceGroupStores.forEach((store, voiceGroupIndex) => {
        let prevNoise = store.getState().noise
        let prevRingMod = store.getState().ringMod

        const unsub = store.subscribe((state) => {
            if (isMidiReceiving()) {
                prevNoise = state.noise
                prevRingMod = state.ringMod
                return
            }

            if (state.noise !== prevNoise) {
                const prev = prevNoise
                prevNoise = state.noise

                if (state.noise.colour !== prev.colour) {
                    sendButton(voiceGroupIndex, noiseControllers.COLOUR, state.noise.colour)
                }
            }

            if (state.ringMod !== prevRingMod) {
                const prev = prevRingMod
                prevRingMod = state.ringMod

                if (state.ringMod.source !== prev.source) {
                    sendButton(voiceGroupIndex, ringModControllers.SOURCE, state.ringMod.source)
                }
            }
        })

        unsubscribers.push(unsub)
    })
}

export function stopSimpleButtonMidiSend() {
    unsubscribers.forEach(unsub => unsub())
    unsubscribers = []
}
