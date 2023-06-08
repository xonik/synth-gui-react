import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Patch } from './types'
import { RootState } from '../../store'
import { BooleanPayload } from '../common/types'

type PatchStorageState = {
    previousPatch: Patch | undefined
    isAuditing: boolean
}

type PatchPayload = {
    patch: Patch | undefined
}

const initialState: PatchStorageState = {
    previousPatch: undefined,
    isAuditing: false
}

export const patchStorageSlice = createSlice({
    name: 'patchStorage',
    initialState,
    reducers: {
        setPreviousPatch: (state, {payload}: PayloadAction<PatchPayload>) => {
            state.previousPatch = payload.patch
        },
        setAuditing: (state, {payload}: PayloadAction<BooleanPayload>) => {
            state.isAuditing = payload.value
        },
    }
})

export const selectPreviousPatch = (state: RootState) => state.patchStorage.previousPatch
export const selectIsAuditing = (state: RootState) => state.patchStorage.isAuditing
export const {
    setPreviousPatch,
    setAuditing
} = patchStorageSlice.actions;

export default patchStorageSlice.reducer;