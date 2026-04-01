import { button } from '@/midi/midibus'
import type { ControllerConfigButton } from '@/midi/types'
import { voiceGroupStores } from '@/store'
import noiseControllers from '../../synthcore/modules/noise/noiseControllers'
import ringModControllers from '../../synthcore/modules/ringMod/ringModControllers'
import { isMidiReceiving, withMidiReceive } from './midiGuard'

function sendButton(voiceGroupIndex: number, ctrl: ControllerConfigButton, value: number) {
    button.send(voiceGroupIndex, ctrl, ctrl.values[value])
}

function subscribeButton(ctrl: ControllerConfigButton, mutator: (state: any, value: number) => void) {
    const id = button.subscribe((voiceGroupIndex: number, midiValue: number) => {
        const value = ctrl.values.indexOf(midiValue)
        if (value < 0) return

        withMidiReceive(() => {
            voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                mutator(state, value)
            })
        })
    }, ctrl)
    return () => button.unsubscribe(ctrl, id)
}

let sendUnsubscribers: (() => void)[] = []
let receiveUnsubscribers: (() => void)[] = []

export function startNoiseRingModMidiSend() {
    stopNoiseRingModMidiSend()

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

        sendUnsubscribers.push(unsub)
    })
}

export function stopNoiseRingModMidiSend() {
    sendUnsubscribers.forEach((unsub) => {
        unsub()
    })
    sendUnsubscribers = []
}

export function startNoiseRingModMidiReceive() {
    stopNoiseRingModMidiReceive()

    receiveUnsubscribers.push(
        subscribeButton(noiseControllers.COLOUR, (state, value) => {
            state.noise.colour = value
        }),
        subscribeButton(ringModControllers.SOURCE, (state, value) => {
            state.ringMod.source = value
        })
    )
}

export function stopNoiseRingModMidiReceive() {
    receiveUnsubscribers.forEach((unsub) => {
        unsub()
    })
    receiveUnsubscribers = []
}
