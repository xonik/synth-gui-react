import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MainDisplayScreenId } from './types'
import { RootState } from '../../store'
import { BooleanPayload } from '../common/CommonReducer'

type MainDisplayState = {
    currentScreen: MainDisplayScreenId
    shiftOn: boolean
}

const initialState: MainDisplayState = {
    currentScreen:MainDisplayScreenId.ENV,
    shiftOn: false,
}

type CurrentScreenPayload = {
    id: number;
}

export const mainDisplaySlice = createSlice({
    name: 'mainDisplay',
    initialState,
    reducers: {
        setCurrentScreen: (state, {payload}: PayloadAction<CurrentScreenPayload>) => {
            state.currentScreen = payload.id
        },
        setShiftOn: (state, {payload}: PayloadAction<BooleanPayload>) => {
            state.shiftOn = payload.value
        }
    }
})

export const selectCurrScreen = (state: RootState) => state.mainDisplay.currentScreen
export const selectShiftOn = (state: RootState) => state.mainDisplay.shiftOn

export const {
    setCurrentScreen,
    setShiftOn
} = mainDisplaySlice.actions;

export default mainDisplaySlice.reducer;