import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { ApiSource } from '../../types'
import { NumericPayload } from '../common/types'
import { VOICE_GROUPS } from "../../../utils/constants";
import { getVoiceGroupIndex } from "../voices/currentVoiceGroupIndex"

type ModsState = {
    gui: {
        source: number;
        dstGroup: number;
        dstFunc: number;
        dstParam: number;
        lastModSelectSource: ApiSource | undefined;
    },
    ui: {
        amount: number,
        routeButton: number,
    }
    modValues: number[][][][]; // [voicegroup, sourceId, dstId, dstCtrIndex]
}

export const initialState = (() => {
    const state: ModsState = {
        gui: {
            source: 0,
            dstGroup: 0,
            dstFunc: 0,
            dstParam: 0,
            lastModSelectSource: undefined
        },
        ui: {
            amount: 0,
            routeButton: 0,
        },
        modValues: [],
    }
    for (let i = 0; i < VOICE_GROUPS; i++) {
        state.modValues.push([])
    }
    return state
})()


type GuiSourcePayload = {
    source: ApiSource;
    guiSource: number;
}

type GuiDstGroupPayload = {
    source: ApiSource;
    guiDstGroup: number;
}

type GuiDstFuncPayload = {
    source: ApiSource;
    guiDstFunc: number;
}

type GuiDstParamPayload = {
    source: ApiSource;
    guiDstParam: number;
}

type GuiSelectModPayload = {
    guiSource: number;
    guiDstFunc: number;
    guiDstParam: number;
}

type GuiLastModSelectSourcePayload = {
    source: ApiSource;
}

type ModValuePayload = {
    voiceGroupIndex: number;
    sourceId: number;
    dstId: number;
    dstCtrlIndex: number;
    modValue: number;
    source: ApiSource

}

// TODO: Make modValues easier to read by using a map.
type ModValuesPayload = {
    voiceGroupIndex: number;
    modValues: number[][][];  // [sourceId, dstId, dstCtrIndex] = value
    source: ApiSource
}

export const modsSlice = createSlice({
    name: 'mods',
    initialState,
    reducers: {
        setGuiSource: (state, { payload }: PayloadAction<GuiSourcePayload>) => {
            state.gui.lastModSelectSource = payload.source;
            state.gui.source = payload.guiSource

        },
        setGuiDstGroup: (state, { payload }: PayloadAction<GuiDstGroupPayload>) => {
            state.gui.lastModSelectSource = payload.source;
            state.gui.dstGroup = payload.guiDstGroup
        },
        setGuiDstFunc: (state, { payload }: PayloadAction<GuiDstFuncPayload>) => {
            state.gui.lastModSelectSource = payload.source;
            state.gui.dstFunc = payload.guiDstFunc
        },
        setGuiDstParam: (state, { payload }: PayloadAction<GuiDstParamPayload>) => {
            state.gui.lastModSelectSource = payload.source;
            state.gui.dstParam = payload.guiDstParam
        },
        setLastModSelectSource: (state, { payload }: PayloadAction<GuiLastModSelectSourcePayload>) => {
            state.gui.lastModSelectSource = payload.source;
            state.gui.lastModSelectSource = payload.source
        },
        setModValue: (state, { payload }: PayloadAction<ModValuePayload>) => {
            const { voiceGroupIndex, sourceId, dstId, dstCtrlIndex = 0, modValue } = payload;

            if (!state.modValues[voiceGroupIndex][sourceId]) {
                state.modValues[voiceGroupIndex][sourceId] = []
            }
            if (!state.modValues[voiceGroupIndex][sourceId][dstId]) {
                state.modValues[voiceGroupIndex][sourceId][dstId] = []
            }
            state.modValues[voiceGroupIndex][sourceId][dstId][dstCtrlIndex] = modValue
        },
        setModValues: (state, { payload }: PayloadAction<ModValuesPayload>) => {
            state.modValues[payload.voiceGroupIndex] = payload.modValues
        },
        setUiRouteButton: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.ui.routeButton = payload.value;
        },
        setUiAmount: (state, { payload }: PayloadAction<NumericPayload>) => {
            state.ui.amount = payload.value;
        },

        // actions only consumed by api
        setGuiMod: (state, { payload }: PayloadAction<GuiSelectModPayload>) => {
        },
    }
})

export const {
    setGuiSource,
    setGuiDstGroup,
    setGuiDstFunc,
    setGuiDstParam,
    setGuiMod,
    setModValue,
    setModValues,
    setLastModSelectSource,

    setUiAmount,
    setUiRouteButton,
} = modsSlice.actions

export const selectGuiSource = (state: RootState) => state.mods.gui.source
export const selectModsUi = (state: RootState) => state.mods.ui
export const selectGuiDstGroup = (state: RootState) => state.mods.gui.dstGroup
export const selectGuiDstFunc = (state: RootState) => state.mods.gui.dstFunc
export const selectGuiDstParam = (state: RootState) => state.mods.gui.dstParam
export const selectGuiLastModSelectSource = (state: RootState) => state.mods.gui.lastModSelectSource

export const selectModValue = (sourceId: number, dstId: number, dstCtrlIndex: number) => (state: RootState, voiceGroupIndex = getVoiceGroupIndex()) => {
    return state.mods.modValues?.[voiceGroupIndex]?.[sourceId]?.[dstId]?.[dstCtrlIndex] || 0
}
export const selectModValues = () => (state: RootState, voiceGroupIndex: number) => {
    return state.mods.modValues[voiceGroupIndex]
}

export default modsSlice.reducer