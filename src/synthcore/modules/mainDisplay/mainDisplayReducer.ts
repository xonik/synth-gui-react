import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MainDisplayScreenId } from './types'
import { RootState } from '../../store'
import { BooleanPayload } from '../common/types'

type MainDisplayState = {
    currentScreen: MainDisplayScreenId
    previousScreen: MainDisplayScreenId | undefined
    shiftOn: boolean
}

const initialState: MainDisplayState = {
    currentScreen:MainDisplayScreenId.ENV,
    previousScreen: undefined,
    shiftOn: false,
}

type ScreenIdPayload = {
    id: number;
}

type RevertToPreviousScreenPayload = {
    reason: string;
}

export const mainDisplaySlice = createSlice({
    name: 'mainDisplay',
    initialState,
    reducers: {
        setCurrentScreen: (state, {payload}: PayloadAction<ScreenIdPayload>) => {
            console.log(`Set current screen to ${payload.id}`)
            state.currentScreen = payload.id
        },
        setPreviousScreen: (state, {payload}: PayloadAction<ScreenIdPayload>) => {
            console.log(`Set previous screen to ${payload.id}`)
            state.previousScreen = payload.id
        },
        revertToPreviousScreen: (state, {payload}: PayloadAction<RevertToPreviousScreenPayload>) => {
            console.log(`Reverting to previous from ${payload.reason}`, state.previousScreen, state.currentScreen)
            if(state.previousScreen){
                state.currentScreen = state.previousScreen
                state.previousScreen = undefined
            }
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
    setPreviousScreen,
    revertToPreviousScreen,
    setShiftOn
} = mainDisplaySlice.actions;

export default mainDisplaySlice.reducer;