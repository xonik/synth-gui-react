/**
 * UI state store — for transient display/interaction state that is NOT saved in patches.
 *
 * This replaces:
 * - envReducer (currEnvId, currStageId)
 * - lfoReducer (currLfoId, currStageId)
 * - mainDisplayReducer (currentScreen, shiftOn)
 * - modsReducer GUI state (source, dstGroup, etc.)
 * - The module-level currentVoiceGroupIndex variable
 */

import { create } from 'zustand'
import { StageId } from '../synthcore/modules/env/types'

// Screen IDs for the main touch display
export enum ScreenId {
    ENV = 'env',
    LFO = 'lfo',
    OSC = 'osc',
    FILTER = 'filter',
    FX = 'fx',
    MOD = 'mod',
    ARP = 'arp',
    SETTINGS = 'settings',
    PERFORM = 'perform',
    PATCH = 'patch',
}

export interface ModRoutingSelection {
    sourceId: number | undefined
    dstGroupId: number | undefined
    dstFuncId: number | undefined
    dstParamId: number | undefined
}

export interface UiState {
    // Voice group
    currentVoiceGroupIndex: number

    // Main display
    currentScreen: ScreenId
    previousScreen: ScreenId | undefined
    shiftOn: boolean

    // Envelope editor
    selectedEnvId: number
    selectedEnvStageId: StageId

    // LFO editor
    selectedLfoId: number

    // Modulation routing
    modRouting: ModRoutingSelection
    modRouteButton: number
    modAmount: number

    // Envelope 3/4/5 selector
    selectedEnv3Id: number
}

export interface UiActions {
    setVoiceGroup: (index: number) => void
    setScreen: (screen: ScreenId) => void
    goBack: () => void
    setShift: (on: boolean) => void
    selectEnv: (envId: number) => void
    selectEnvStage: (stageId: StageId) => void
    selectLfo: (lfoId: number) => void
    setModRouting: (routing: Partial<ModRoutingSelection>) => void
    setModRouteButton: (value: number) => void
    setModAmount: (value: number) => void
    selectEnv3Id: (id: number) => void
}

export const useUiStore = create<UiState & UiActions>((set) => ({
    // Initial state
    currentVoiceGroupIndex: 0,
    currentScreen: ScreenId.ENV,
    previousScreen: undefined,
    shiftOn: false,
    selectedEnvId: 0,
    selectedEnvStageId: StageId.ATTACK,
    selectedLfoId: 0,
    modRouting: {
        sourceId: undefined,
        dstGroupId: undefined,
        dstFuncId: undefined,
        dstParamId: undefined,
    },
    modRouteButton: 0,
    modAmount: 0,
    selectedEnv3Id: 2,

    // Actions
    setVoiceGroup: (index) => set({ currentVoiceGroupIndex: index }),

    setScreen: (screen) => set((state) => ({
        previousScreen: state.currentScreen,
        currentScreen: screen,
    })),

    goBack: () => set((state) => ({
        currentScreen: state.previousScreen ?? state.currentScreen,
        previousScreen: undefined,
    })),

    setShift: (on) => set({ shiftOn: on }),

    selectEnv: (envId) => set({ selectedEnvId: envId }),

    selectEnvStage: (stageId) => set({ selectedEnvStageId: stageId }),

    selectLfo: (lfoId) => set({ selectedLfoId: lfoId }),

    setModRouting: (routing) => set((state) => ({
        modRouting: { ...state.modRouting, ...routing },
    })),

    setModRouteButton: (value) => set({ modRouteButton: value }),

    setModAmount: (value) => set({ modAmount: value }),

    selectEnv3Id: (id) => set({ selectedEnv3Id: id }),
}))
