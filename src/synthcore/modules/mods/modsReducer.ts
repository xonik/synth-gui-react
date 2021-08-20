import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { ApiSource } from '../../types'

type ModsState = {
    gui: {
        source: number;
        targetGroup: number;
        targetFunc: number;
        targetParam: number;
        lastModSelectSource: ApiSource | undefined;
    },
    modValues: number[][][];
}

export const initialState: ModsState = {
    gui: {
        source: 0,
        targetGroup: 0,
        targetFunc: 0,
        targetParam: 0,
        lastModSelectSource: undefined
    },
    modValues: [],
}

type GuiSourcePayload = {
    source: ApiSource;
    guiSource: number;
}

type GuiTargetGroupPayload = {
    source: ApiSource;
    guiTargetGroup: number;
}

type GuiTargetFuncPayload = {
    source: ApiSource;
    guiTargetFunc: number;
}

type GuiTargetParamPayload = {
    source: ApiSource;
    guiTargetParam: number;
}

type GuiSelectModPayload = {
    guiSource: number;
    guiTargetFunc: number;
    guiTargetParam: number;
}

type GuiLastModSelectSourcePayload = {
    source: ApiSource;
}

type ModValuePayload = {
    sourceId: number;
    targetId: number;
    targetCtrlIndex: number;
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
        setGuiTargetGroup: (state, { payload }: PayloadAction<GuiTargetGroupPayload>) => {
            state.gui.lastModSelectSource = payload.source;
            state.gui.targetGroup = payload.guiTargetGroup
        },
        setGuiTargetFunc: (state, { payload }: PayloadAction<GuiTargetFuncPayload>) => {
            state.gui.lastModSelectSource = payload.source;
            state.gui.targetFunc = payload.guiTargetFunc
        },
        setGuiTargetParam: (state, { payload }: PayloadAction<GuiTargetParamPayload>) => {
            state.gui.lastModSelectSource = payload.source;
            state.gui.targetParam = payload.guiTargetParam
        },
        setLastModSelectSource: (state, { payload }: PayloadAction<GuiLastModSelectSourcePayload>) => {
            state.gui.lastModSelectSource = payload.source;
            state.gui.lastModSelectSource = payload.source
        },
        setModValue: (state, { payload }: PayloadAction<ModValuePayload>) => {
            const {sourceId, targetId, targetCtrlIndex = 0, modValue} = payload;
            console.log(payload)
            if (!state.modValues[sourceId]) {
                state.modValues[sourceId] = []
            }
            if (!state.modValues[sourceId][targetId]) {
                state.modValues[sourceId][targetId] = []
            }
            state.modValues[sourceId][targetId][targetCtrlIndex] = modValue
        },

        // actions only consumed by api
        setGuiMod: (state, { payload }: PayloadAction<GuiSelectModPayload>) => {
        },
    }
})

export const {
    setGuiSource,
    setGuiTargetGroup,
    setGuiTargetFunc,
    setGuiTargetParam,
    setGuiMod,
    setModValue,
    setLastModSelectSource,
} = modsSlice.actions

export const selectGuiSource = (state: RootState) => state.mods.gui.source
export const selectGuiTargetGroup = (state: RootState) => state.mods.gui.targetGroup
export const selectGuiTargetFunc = (state: RootState) => state.mods.gui.targetFunc
export const selectGuiTargetParam = (state: RootState) => state.mods.gui.targetParam
export const selectGuiLastModSelectSource = (state: RootState) => state.mods.gui.lastModSelectSource
export const selectModValue = (sourceId: number, targetId: number, targetCtrlIndex: number) => (state: RootState) => {
    return state.mods.modValues?.[sourceId]?.[targetId]?.[targetCtrlIndex] || 0
}

export default modsSlice.reducer