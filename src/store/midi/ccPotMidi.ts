import { voiceGroupStores, VoiceGroupPatch } from '../patchStore'
import { cc } from '../../midi/midibus'
import { ControllerConfigCC } from '../../midi/types'
import { isMidiReceiving, withMidiReceive } from './midiGuard'

export interface CCPotMapping {
    selector: (state: VoiceGroupPatch) => number
    mutator: (state: VoiceGroupPatch, value: number) => void
    ctrl: ControllerConfigCC
}

function toMidi(value: number): number {
    return Math.floor(127 * value)
}

function fromMidi(midiValue: number): number {
    return midiValue / 127
}

export function createCCPotMidiSend(mappings: CCPotMapping[]) {
    let unsubscribers: (() => void)[] = []

    function start() {
        stop()

        voiceGroupStores.forEach((store, voiceGroupIndex) => {
            let prevState = store.getState()

            const unsub = store.subscribe((state) => {
                if (isMidiReceiving()) {
                    prevState = state
                    return
                }

                const prev = prevState
                prevState = state

                for (const mapping of mappings) {
                    const current = mapping.selector(state)
                    const previous = mapping.selector(prev)
                    if (current !== previous) {
                        const midiValue = toMidi(current)
                        cc.send(voiceGroupIndex, mapping.ctrl, midiValue)
                    }
                }
            })

            unsubscribers.push(unsub)
        })
    }

    function stop() {
        unsubscribers.forEach(unsub => unsub())
        unsubscribers = []
    }

    return { start, stop }
}

export function createCCPotMidiReceive(mappings: CCPotMapping[]) {
    let unsubscribers: (() => void)[] = []

    function start() {
        stop()

        for (const mapping of mappings) {
            const id = cc.subscribe((voiceGroupIndex: number, midiValue: number) => {
                const value = fromMidi(midiValue)

                withMidiReceive(() => {
                    voiceGroupStores[voiceGroupIndex].getState().set(state => {
                        mapping.mutator(state, value)
                    })
                })
            }, mapping.ctrl)

            unsubscribers.push(() => cc.unsubscribe(mapping.ctrl, id))
        }
    }

    function stop() {
        unsubscribers.forEach(unsub => unsub())
        unsubscribers = []
    }

    return { start, stop }
}
