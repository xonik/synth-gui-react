/**
 * Store for the parameter change popup that shows in the display
 * when a panel pot/button is moved.
 *
 * The popup auto-dismisses after a configurable timeout.
 * It is suppressed when:
 * - The change originates from MIDI (isMidiReceiving())
 * - The current display screen already shows the relevant module
 */

import { useStore } from 'zustand'
import { createStore, type StoreApi } from 'zustand/vanilla'
import { isMidiReceiving } from './midi/midiGuard'
import { type ScreenId, useUiStore } from './uiStore'
import { getPopupInfo } from './controllerRegistry'

export interface ParamPopupState {
    visible: boolean
    moduleName: string
    paramName: string
    paramValue: string
}

export interface ParamPopupActions {
    show: (moduleName: string, paramName: string, paramValue: string) => void
    hide: () => void
}

export type ParamPopupStore = ParamPopupState & ParamPopupActions

/** How long the popup stays visible after the last parameter change (ms) */
const POPUP_TIMEOUT_MS = 500

let timeoutId: ReturnType<typeof setTimeout> | null = null

export const paramPopupStore: StoreApi<ParamPopupStore> = createStore<ParamPopupStore>((set) => ({
    visible: false,
    moduleName: '',
    paramName: '',
    paramValue: '',

    show: (moduleName, paramName, paramValue) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        set({ visible: true, moduleName, paramName, paramValue })
        timeoutId = setTimeout(() => {
            set({ visible: false })
            timeoutId = null
        }, POPUP_TIMEOUT_MS)
    },

    hide: () => {
        if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
        }
        set({ visible: false })
    },
}))

export function useParamPopupStore<T>(selector: (state: ParamPopupStore) => T): T {
    return useStore(paramPopupStore, selector)
}

/**
 * Notify about a parameter change from a panel control.
 * Checks suppression conditions before showing the popup.
 *
 * @param moduleName  - Human-readable module name (e.g. "Osc 1", "LPF")
 * @param paramName   - Human-readable parameter label (e.g. "Cutoff", "Rate")
 * @param paramValue  - Formatted display value (e.g. "0.73")
 * @param screen      - The ScreenId this module maps to, for suppression
 */
export function notifyParamChange(moduleName: string, paramName: string, paramValue: string, screen?: ScreenId): void {
    // Don't show popup for MIDI-received changes
    if (isMidiReceiving()) return

    // Don't show popup if the user is already on the relevant screen
    if (screen !== undefined) {
        const currentScreen = useUiStore.getState().currentScreen
        if (currentScreen === screen) return
    }

    paramPopupStore.getState().show(moduleName, paramName, paramValue)
}

export function notifyParamChangeById(ctrlId: number, value: number, formatValue?: (v: number) => string): void {
    const info = getPopupInfo(ctrlId)
    if (!info) return
    const fmt = formatValue ?? ((v: number) => v.toFixed(2))
    notifyParamChange(info.moduleName, info.paramLabel, fmt(value), info.screen)
}
