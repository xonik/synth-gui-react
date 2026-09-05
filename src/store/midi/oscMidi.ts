/**
 * MIDI send/receive for oscillators: subscribes to Zustand store changes
 * and sends changed parameters over MIDI, and subscribes to midibus to
 * write incoming MIDI values to the Zustand stores.
 *
 * Handles all 3 oscillators: DCO1 (index 0), DCO2 (index 1), VCO (index 2).
 */

import { button, cc, sysex, type Route } from '@/midi/midibus'
import type { ControllerConfigButton, ControllerConfigCC } from '@/midi/types'
import { type OscillatorState, useWavetableStore, voiceGroupStores } from '@/store'
import oscControllers from '@/synthcore/modules/osc/oscControllers'
import logger from '@/utils/logger'
import { isMidiReceiving, withMidiReceive } from './midiGuard'
import type { WaveEntry } from "@/store/wavetableStore";

type OscField = keyof OscillatorState

interface CCMapping {
    oscIndex: number
    field: OscField
    ctrl: ControllerConfigCC
}

interface ButtonMapping {
    oscIndex: number
    field: OscField
    ctrl: ControllerConfigButton
}

const ccMappings: CCMapping[] = [
    // DCO1
    { oscIndex: 0, field: 'note', ctrl: oscControllers.DCO1.NOTE },
    { oscIndex: 0, field: 'detune', ctrl: oscControllers.DCO1.DETUNE },
    { oscIndex: 0, field: 'waveform', ctrl: oscControllers.DCO1.WAVEFORM },
    { oscIndex: 0, field: 'sub1', ctrl: oscControllers.DCO1.SUB1 },
    { oscIndex: 0, field: 'sub2', ctrl: oscControllers.DCO1.SUB2 },
    { oscIndex: 0, field: 'pw', ctrl: oscControllers.DCO1.PW },
    // DCO2
    { oscIndex: 1, field: 'note', ctrl: oscControllers.DCO2.NOTE },
    { oscIndex: 1, field: 'detune', ctrl: oscControllers.DCO2.DETUNE },
    { oscIndex: 1, field: 'waveform', ctrl: oscControllers.DCO2.WAVEFORM },
    { oscIndex: 1, field: 'sub1', ctrl: oscControllers.DCO2.SUB1 },
    { oscIndex: 1, field: 'sub2', ctrl: oscControllers.DCO2.SUB2 },
    { oscIndex: 1, field: 'pw', ctrl: oscControllers.DCO2.PW },
    // VCO
    { oscIndex: 2, field: 'note', ctrl: oscControllers.VCO.NOTE },
    { oscIndex: 2, field: 'detune', ctrl: oscControllers.VCO.DETUNE },
    { oscIndex: 2, field: 'waveform', ctrl: oscControllers.VCO.WAVEFORM },
    { oscIndex: 2, field: 'fmAmt', ctrl: oscControllers.VCO.FM_AMT },
    { oscIndex: 2, field: 'pw', ctrl: oscControllers.VCO.PW },
    { oscIndex: 2, field: 'linFm', ctrl: oscControllers.VCO.LIN_FM },
]

const buttonMappings: ButtonMapping[] = [
    // DCO1
    { oscIndex: 0, field: 'range', ctrl: oscControllers.DCO1.RANGE },
    { oscIndex: 0, field: 'sync', ctrl: oscControllers.DCO1.SYNC },
    { oscIndex: 0, field: 'mode', ctrl: oscControllers.DCO1.MODE },
    { oscIndex: 0, field: 'subWave', ctrl: oscControllers.DCO1.SUB_WAVE },
    { oscIndex: 0, field: 'wheel', ctrl: oscControllers.DCO1.WHEEL },
    { oscIndex: 0, field: 'lfo', ctrl: oscControllers.DCO1.LFO },
    { oscIndex: 0, field: 'kbd', ctrl: oscControllers.DCO1.KBD },
    { oscIndex: 0, field: 'sawInv', ctrl: oscControllers.DCO1.SAW_INV },
    { oscIndex: 0, field: 'preFilterSine', ctrl: oscControllers.DCO1.PRE_FILTER_SINE },
    // DCO2
    { oscIndex: 1, field: 'range', ctrl: oscControllers.DCO2.RANGE },
    { oscIndex: 1, field: 'sync', ctrl: oscControllers.DCO2.SYNC },
    { oscIndex: 1, field: 'mode', ctrl: oscControllers.DCO2.MODE },
    { oscIndex: 1, field: 'subWave', ctrl: oscControllers.DCO2.SUB_WAVE },
    { oscIndex: 1, field: 'wheel', ctrl: oscControllers.DCO2.WHEEL },
    { oscIndex: 1, field: 'lfo', ctrl: oscControllers.DCO2.LFO },
    { oscIndex: 1, field: 'kbd', ctrl: oscControllers.DCO2.KBD },
    { oscIndex: 1, field: 'sawInv', ctrl: oscControllers.DCO2.SAW_INV },
    { oscIndex: 1, field: 'preFilterSine', ctrl: oscControllers.DCO2.PRE_FILTER_SINE },
    // VCO
    { oscIndex: 2, field: 'sync', ctrl: oscControllers.VCO.SYNC },
    { oscIndex: 2, field: 'syncSrc', ctrl: oscControllers.VCO.SYNC_SRC },
    { oscIndex: 2, field: 'fmSrc', ctrl: oscControllers.VCO.FM_SRC },
    { oscIndex: 2, field: 'fmMode', ctrl: oscControllers.VCO.FM_MODE },
    { oscIndex: 2, field: 'extCv', ctrl: oscControllers.VCO.EXT_CV },
    { oscIndex: 2, field: 'wheel', ctrl: oscControllers.VCO.WHEEL },
    { oscIndex: 2, field: 'lfo', ctrl: oscControllers.VCO.LFO },
    { oscIndex: 2, field: 'kbd', ctrl: oscControllers.VCO.KBD },
]

let sendUnsubscribers: (() => void)[] = []
let receiveUnsubscribers: (() => void)[] = []

export const setOscWavetable = (voiceGroupIndex: number, oscillatorId: number, wavetableId: number) => {
    const entries = useWavetableStore.getState().wavetables[wavetableId] ?? []
    logger.midi(`Setting oscillator ${oscillatorId} in voice group ${voiceGroupIndex} to wavetable ${wavetableId} (${entries.length} entries)`)

    // The wavetables are not stored on the voice card, so we send the whole table on every change.
    const values = [oscillatorId, wavetableId, entries.length]
    entries.forEach((entry) => {
        values.push(entry.position, entry.bankIndex, entry.waveIndex)
    })

    sysex.send({ type: 'voiceGroup', index: voiceGroupIndex }, {
        ...oscControllers.WAVETABLE_SELECT,
        values,
    })
}

export function startOscMidiSend() {
    stopOscMidiSend()

    voiceGroupStores.forEach((store, voiceGroupIndex) => {
        let previousOscillators = store.getState().oscillators

        const unsub = store.subscribe((state) => {
            if (isMidiReceiving()) {
                previousOscillators = state.oscillators
                return
            }
            if (state.oscillators !== previousOscillators) {
                const prev = previousOscillators
                previousOscillators = state.oscillators

                for (const { oscIndex, field, ctrl } of ccMappings) {
                    if (state.oscillators[oscIndex][field] !== prev[oscIndex][field]) {
                        cc.send(voiceGroupIndex, ctrl, Math.floor(127 * state.oscillators[oscIndex][field]))
                    }
                }

                for (const { oscIndex, field, ctrl } of buttonMappings) {
                    if (state.oscillators[oscIndex][field] !== prev[oscIndex][field]) {
                        button.send(voiceGroupIndex, ctrl, ctrl.values[state.oscillators[oscIndex][field]])
                    }
                }

                for (let oscIndex = 0; oscIndex < state.oscillators.length; oscIndex++) {
                    if (state.oscillators[oscIndex].wavetable !== prev[oscIndex].wavetable) {
                        setOscWavetable(voiceGroupIndex, oscIndex, state.oscillators[oscIndex].wavetable)
                    }
                }
            }
        })

        sendUnsubscribers.push(unsub)
    })
}

export function stopOscMidiSend() {
    sendUnsubscribers.forEach((unsub) => {
        unsub()
    })
    sendUnsubscribers = []
}

export function startOscMidiReceive() {
    stopOscMidiReceive()

    for (const { oscIndex, field, ctrl } of ccMappings) {
        const id = cc.subscribe((voiceGroupIndex: number, midiValue: number) => {
            const value = midiValue / 127
            withMidiReceive(() => {
                voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                    state.oscillators[oscIndex][field] = value
                })
            })
        }, ctrl)
        receiveUnsubscribers.push(() => cc.unsubscribe(ctrl, id))
    }

    for (const { oscIndex, field, ctrl } of buttonMappings) {
        const id = button.subscribe((voiceGroupIndex: number, midiValue: number) => {
            const value = ctrl.values.indexOf(midiValue)
            if (value < 0) return

            withMidiReceive(() => {
                voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                    state.oscillators[oscIndex][field] = value
                })
            })
        }, ctrl)
        receiveUnsubscribers.push(() => button.unsubscribe(ctrl, id))
    }

    const wavetableSelectCtrl = oscControllers.WAVETABLE_SELECT
    const sysexId = sysex.subscribe((route: Route, values: number[]) => {
        if(route.type !== 'voiceGroup') {
            console.log('Only voiceGroup routes are supported for wavetable select sysex messages, ignoring', route)
            return
        }
        const voiceGroupIndex = route.index ?? 0
        const [oscIndex, wavetableId, count, ...entriesData] = values
        if (count === undefined) {
            withMidiReceive(() => {
                voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                    state.oscillators[oscIndex].wavetable = wavetableId
                })
            })
            return
        }

        // The current implementation sends the whole wavetable on every change
        // as it is not stored on the voice card. This is likely not useful for the front end as it
        // already has the wavetable data in the store, but we can still handle it here for completeness.
        const entries: WaveEntry[] = []
        for (let i = 0; i + 2 < entriesData.length && entries.length < count; i += 3) {
            entries.push({
                position: entriesData[i],
                bankIndex: entriesData[i + 1],
                waveIndex: entriesData[i + 2],
            })
        }

        withMidiReceive(() => {
            useWavetableStore.getState().loadWavetableEntries(wavetableId, entries)
            voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                state.oscillators[oscIndex].wavetable = wavetableId
            })
        })
    }, wavetableSelectCtrl)
    receiveUnsubscribers.push(() => sysex.unsubscribe(wavetableSelectCtrl, sysexId))
}

export function stopOscMidiReceive() {
    receiveUnsubscribers.forEach((unsub) => {
        unsub()
    })
    receiveUnsubscribers = []
}
