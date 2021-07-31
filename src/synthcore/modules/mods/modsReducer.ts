import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { digitalModSources, modTarget } from '../../../midi/controllers'

type ModsState = {
    gui: {
        source: number;
        targetGroup: number;
        targetFunc: number;
        targetParam: number;
    },
    modValues: number[][];
}

// TODO: This just adds 256 targets independently of how many there actually are.
const getModValueTargets = () => {
    const targets = []
    for(let i=0; i<256; i++) {
        targets.push(0)
    }
    return targets
}

const getModValuesArray = () => {
    const sources = []
    for(let i=0; i<256; i++) {
        sources.push(getModValueTargets())
    }
    return sources
}

export const initialState: ModsState = {
    gui: {
        source: 0,
        targetGroup: 0,
        targetFunc: 0,
        targetParam: 0,
    },
    modValues: getModValuesArray(),
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
            state.modValues[payload.sourceId][payload.targetId] = payload.modValue
        },

    }
})

export const {
    setGuiSource,
    setGuiTargetGroup,
    setGuiTargetFunc,
    setGuiTargetParam,
    setModValue
} = modsSlice.actions

export const selectGuiSource = (state: RootState) => state.mods.gui.source
export const selectGuiTargetGroup = (state: RootState) => state.mods.gui.targetGroup
export const selectGuiTargetFunc = (state: RootState) => state.mods.gui.targetFunc
export const selectGuiTargetParam = (state: RootState) => state.mods.gui.targetParam
export const selectModValue = (sourceId: number, targetId: number) => (state: RootState) =>  state.mods.modValues[sourceId][targetId]

export default modsSlice.reducer