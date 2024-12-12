import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { ApiSource } from '../../types'
import { NumericPayload } from '../common/types'
import { selectedVoiceGroup } from "../../selectedVoiceGroup";

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

const initialStateCreator = () => ({
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
})

export const initialState: ModsState[] = [
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
    initialStateCreator(),
]

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

type ModValuesPayload = {
    modValues: number[][][];
    source: ApiSource
}

export const modsSlice = createSlice({
    name: 'mods',
    initialState,
    reducers: {
        setGuiSource: (state, { payload }: PayloadAction<GuiSourcePayload>) => {
            state[selectedVoiceGroup].gui.lastModSelectSource = payload.source;
            state[selectedVoiceGroup].gui.source = payload.guiSource

        },
        setGuiDstGroup: (state, { payload }: PayloadAction<GuiDstGroupPayload>) => {
            state[selectedVoiceGroup].gui.lastModSelectSource = payload.source;
            state[selectedVoiceGroup].gui.dstGroup = payload.guiDstGroup
        },
        setGuiDstFunc: (state, { payload }: PayloadAction<GuiDstFuncPayload>) => {
            state[selectedVoiceGroup].gui.lastModSelectSource = payload.source;
            state[selectedVoiceGroup].gui.dstFunc = payload.guiDstFunc
        },
        setGuiDstParam: (state, { payload }: PayloadAction<GuiDstParamPayload>) => {
            state[selectedVoiceGroup].gui.lastModSelectSource = payload.source;
            state[selectedVoiceGroup].gui.dstParam = payload.guiDstParam
        },
        setLastModSelectSource: (state, { payload }: PayloadAction<GuiLastModSelectSourcePayload>) => {
            state[selectedVoiceGroup].gui.lastModSelectSource = payload.source;
            state[selectedVoiceGroup].gui.lastModSelectSource = payload.source
        },
        setModValue: (state, { payload }: PayloadAction<ModValuePayload>) => {
            const {sourceId, dstId, dstCtrlIndex = 0, modValue} = payload;
            if (!state[selectedVoiceGroup].modValues[sourceId]) {
                state[selectedVoiceGroup].modValues[sourceId] = []
            }
            if (!state[selectedVoiceGroup].modValues[sourceId][dstId]) {
                state[selectedVoiceGroup].modValues[sourceId][dstId] = []
            }
            state[selectedVoiceGroup].modValues[sourceId][dstId][dstCtrlIndex] = modValue
        },
        setModValues: (state, { payload }: PayloadAction<ModValuesPayload>) => {
            state[selectedVoiceGroup].modValues = payload.modValues
        },
        setUiRouteButton: (state, { payload }: PayloadAction<NumericPayload>) => {
            state[selectedVoiceGroup].ui.routeButton = payload.value;
        },
        setUiAmount: (state, { payload }: PayloadAction<NumericPayload>) => {
            state[selectedVoiceGroup].ui.amount = payload.value;
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

export const selectGuiSource = (state: RootState) => state.mods[selectedVoiceGroup].gui.source
export const selectModsUi = (state: RootState) => state.mods[selectedVoiceGroup].ui
export const selectGuiDstGroup = (state: RootState) => state.mods[selectedVoiceGroup].gui.dstGroup
export const selectGuiDstFunc = (state: RootState) => state.mods[selectedVoiceGroup].gui.dstFunc
export const selectGuiDstParam = (state: RootState) => state.mods[selectedVoiceGroup].gui.dstParam
export const selectGuiLastModSelectSource = (state: RootState) => state.mods[selectedVoiceGroup].gui.lastModSelectSource
export const selectModValue = (sourceId: number, dstId: number, dstCtrlIndex: number) => (state: RootState) => {
    return state.mods[selectedVoiceGroup].modValues?.[sourceId]?.[dstId]?.[dstCtrlIndex] || 0
}
export const selectModValues = () => (state: RootState) => {
    return state.mods[selectedVoiceGroup].modValues
}

export default modsSlice.reducer