import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { ApiSource } from '../../types'
import { NumericPayload } from '../common/types'

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
    modValues: number[][][];
}

export const initialState: ModsState = {
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
    sourceId: number;
    dstId: number;
    dstCtrlIndex: number;
    modValue: number;
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
            const {sourceId, dstId, dstCtrlIndex = 0, modValue} = payload;
            if (!state.modValues[sourceId]) {
                state.modValues[sourceId] = []
            }
            if (!state.modValues[sourceId][dstId]) {
                state.modValues[sourceId][dstId] = []
            }
            state.modValues[sourceId][dstId][dstCtrlIndex] = modValue
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
export const selectModValue = (sourceId: number, dstId: number, dstCtrlIndex: number) => (state: RootState) => {
    return state.mods.modValues?.[sourceId]?.[dstId]?.[dstCtrlIndex] || 0
}

export default modsSlice.reducer