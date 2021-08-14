import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

type ModsState = {
    gui: {
        source: number;
        targetGroup: number;
        targetFunc: number;
        targetParam: number;
    },
    modValues: number[][];
}

export const initialState: ModsState = {
    gui: {
        source: 0,
        targetGroup: 0,
        targetFunc: 0,
        targetParam: 0,
    },
    modValues: [],
}

type GuiSourcePayload = {
    guiSource: number;
}

type GuiTargetGroupPayload = {
    guiTargetGroup: number;
}

type GuiTargetFuncPayload = {
    guiTargetFunc: number;
}

type GuiTargetParamPayload = {
    guiTargetParam: number;
}

type GuiSelectModPayload = {
    guiSource: number;
    guiTargetFunc: number;
    guiTargetParam: number;
}

type ModValuePayload = {
    sourceId: number;
    targetId: number;
    modValue: number;
}

export const modsSlice = createSlice({
    name: 'mods',
    initialState,
    reducers: {
        setGuiSource: (state, { payload }: PayloadAction<GuiSourcePayload>) => {
            state.gui.source = payload.guiSource
        },
        setGuiTargetGroup: (state, { payload }: PayloadAction<GuiTargetGroupPayload>) => {
            state.gui.targetGroup = payload.guiTargetGroup
        },
        setGuiTargetFunc: (state, { payload }: PayloadAction<GuiTargetFuncPayload>) => {
            state.gui.targetFunc = payload.guiTargetFunc
        },
        setGuiTargetParam: (state, { payload }: PayloadAction<GuiTargetParamPayload>) => {
            state.gui.targetParam = payload.guiTargetParam
        },
        setModValue: (state, { payload }: PayloadAction<ModValuePayload>) => {
            if(!state.modValues[payload.sourceId]) {
                state.modValues[payload.sourceId] = []
            }
            state.modValues[payload.sourceId][payload.targetId] = payload.modValue
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
    setModValue
} = modsSlice.actions

export const selectGuiSource = (state: RootState) => state.mods.gui.source
export const selectGuiTargetGroup = (state: RootState) => state.mods.gui.targetGroup
export const selectGuiTargetFunc = (state: RootState) => state.mods.gui.targetFunc
export const selectGuiTargetParam = (state: RootState) => state.mods.gui.targetParam
export const selectModValue = (sourceId: number, targetId: number) => (state: RootState) => {
    return state.mods.modValues?.[sourceId]?.[targetId] || 0
}

export default modsSlice.reducer