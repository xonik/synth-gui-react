/**
 * MIDI send/receive for filters: subscribes to Zustand store changes
 * and sends changed parameters over MIDI, and subscribes to midibus to
 * write incoming MIDI values to the Zustand stores.
 *
 * Handles both filters: LPF (index 0) and SVF (index 1).
 */

import { button, cc, nrpn } from '@/midi/midibus'
import type { ControllerConfigButton, ControllerConfigCC, ControllerConfigNRPN } from '@/midi/types'
import filtersControllers from '@/synthcore/modules/filters/filtersControllers'
import { type FilterState, voiceGroupStores } from '../patchStore'
import { isMidiReceiving, withMidiReceive } from './midiGuard'

type FilterField = keyof FilterState

interface CCMapping {
    filterIndex: number
    field: FilterField
    ctrl: ControllerConfigCC
}

interface NrpnMapping {
    filterIndex: number
    field: FilterField
    ctrl: ControllerConfigNRPN
}

interface ButtonMapping {
    filterIndex: number
    field: FilterField
    ctrl: ControllerConfigButton
}

const ccMappings: CCMapping[] = [
    // LPF
    { filterIndex: 0, field: 'input', ctrl: filtersControllers.LPF.INPUT },
    { filterIndex: 0, field: 'resonance', ctrl: filtersControllers.LPF.RESONANCE },
    { filterIndex: 0, field: 'cutoff', ctrl: filtersControllers.LPF.CUTOFF },
    { filterIndex: 0, field: 'fmAmt', ctrl: filtersControllers.LPF.FM_AMT },
    { filterIndex: 0, field: 'envAmt', ctrl: filtersControllers.LPF.ENV_AMT },
    { filterIndex: 0, field: 'lfoAmt', ctrl: filtersControllers.LPF.LFO_AMT },
    { filterIndex: 0, field: 'kbdAmt', ctrl: filtersControllers.LPF.KBD_AMT },
    // SVF
    { filterIndex: 1, field: 'input', ctrl: filtersControllers.SVF.INPUT },
    { filterIndex: 1, field: 'resonance', ctrl: filtersControllers.SVF.RESONANCE },
    { filterIndex: 1, field: 'cutoff', ctrl: filtersControllers.SVF.CUTOFF },
    { filterIndex: 1, field: 'fmAmt', ctrl: filtersControllers.SVF.FM_AMT },
    { filterIndex: 1, field: 'envAmt', ctrl: filtersControllers.SVF.ENV_AMT },
    { filterIndex: 1, field: 'lfoAmt', ctrl: filtersControllers.SVF.LFO_AMT },
    { filterIndex: 1, field: 'kbdAmt', ctrl: filtersControllers.SVF.KBD_AMT },
]

const nrpnMappings: NrpnMapping[] = [
    // LPF
    { filterIndex: 0, field: 'wheelAmt', ctrl: filtersControllers.LPF.WHEEL_AMT },
    // SVF
    { filterIndex: 1, field: 'wheelAmt', ctrl: filtersControllers.SVF.WHEEL_AMT },
]

const buttonMappings: ButtonMapping[] = [
    // LPF
    { filterIndex: 0, field: 'fmMode', ctrl: filtersControllers.LPF.FM_MODE },
    { filterIndex: 0, field: 'filterType', ctrl: filtersControllers.LPF.FILTER_TYPE },
    { filterIndex: 0, field: 'slope', ctrl: filtersControllers.LPF.SLOPE },
    { filterIndex: 0, field: 'fmSrc', ctrl: filtersControllers.LPF.FM_SRC },
    { filterIndex: 0, field: 'extCv', ctrl: filtersControllers.LPF.EXT_CV },
    // SVF
    { filterIndex: 1, field: 'fmMode', ctrl: filtersControllers.SVF.FM_MODE },
    { filterIndex: 1, field: 'slope', ctrl: filtersControllers.SVF.SLOPE },
    { filterIndex: 1, field: 'fmSrc', ctrl: filtersControllers.SVF.FM_SRC },
    { filterIndex: 1, field: 'invert', ctrl: filtersControllers.SVF.INVERT },
    { filterIndex: 1, field: 'extCv', ctrl: filtersControllers.SVF.EXT_CV },
    // Shared (stored on filters[0])
    { filterIndex: 0, field: 'linkCutoff', ctrl: filtersControllers.FILTERS.LINK_CUTOFF },
    { filterIndex: 0, field: 'routing', ctrl: filtersControllers.FILTERS.ROUTING },
]

let sendUnsubscribers: (() => void)[] = []
let receiveUnsubscribers: (() => void)[] = []

export function startFilterMidiSend() {
    stopFilterMidiSend()

    voiceGroupStores.forEach((store, voiceGroupIndex) => {
        let previousFilters = store.getState().filters

        const unsub = store.subscribe((state) => {
            if (isMidiReceiving()) {
                previousFilters = state.filters
                return
            }
            if (state.filters !== previousFilters) {
                const prev = previousFilters
                previousFilters = state.filters

                for (const { filterIndex, field, ctrl } of ccMappings) {
                    if (state.filters[filterIndex][field] !== prev[filterIndex][field]) {
                        cc.send(voiceGroupIndex, ctrl, Math.floor(127 * state.filters[filterIndex][field]))
                    }
                }

                for (const { filterIndex, field, ctrl } of nrpnMappings) {
                    if (state.filters[filterIndex][field] !== prev[filterIndex][field]) {
                        nrpn.send(voiceGroupIndex, ctrl, Math.floor(65535 * state.filters[filterIndex][field]))
                    }
                }

                for (const { filterIndex, field, ctrl } of buttonMappings) {
                    if (state.filters[filterIndex][field] !== prev[filterIndex][field]) {
                        button.send(voiceGroupIndex, ctrl, ctrl.values[state.filters[filterIndex][field]])
                    }
                }
            }
        })

        sendUnsubscribers.push(unsub)
    })
}

export function stopFilterMidiSend() {
    sendUnsubscribers.forEach((unsub) => {
        unsub()
    })
    sendUnsubscribers = []
}

export function startFilterMidiReceive() {
    stopFilterMidiReceive()

    for (const { filterIndex, field, ctrl } of ccMappings) {
        const id = cc.subscribe((voiceGroupIndex: number, midiValue: number) => {
            const value = midiValue / 127
            withMidiReceive(() => {
                voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                    state.filters[filterIndex][field] = value
                })
            })
        }, ctrl)
        receiveUnsubscribers.push(() => cc.unsubscribe(ctrl, id))
    }

    for (const { filterIndex, field, ctrl } of nrpnMappings) {
        const id = nrpn.subscribe((voiceGroupIndex: number, midiValue: number) => {
            const value = midiValue / 65535
            withMidiReceive(() => {
                voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                    state.filters[filterIndex][field] = value
                })
            })
        }, ctrl)
        receiveUnsubscribers.push(() => nrpn.unsubscribe(ctrl, id))
    }

    for (const { filterIndex, field, ctrl } of buttonMappings) {
        const id = button.subscribe((voiceGroupIndex: number, midiValue: number) => {
            const value = ctrl.values.indexOf(midiValue)
            if (value < 0) return

            withMidiReceive(() => {
                voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                    state.filters[filterIndex][field] = value
                })
            })
        }, ctrl)
        receiveUnsubscribers.push(() => button.unsubscribe(ctrl, id))
    }
}

export function stopFilterMidiReceive() {
    receiveUnsubscribers.forEach((unsub) => {
        unsub()
    })
    receiveUnsubscribers = []
}
