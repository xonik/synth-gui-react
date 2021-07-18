import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MainDisplayScreenId } from './types'
import { RootState } from '../../store'

type MainDisplayState = {
    currentScreen: MainDisplayScreenId
}

const initialState: MainDisplayState = {
    currentScreen:MainDisplayScreenId.ENV
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
        }
    }
})

export const selectCurrScreen = (state: RootState) => state.mainDisplay.currentScreen

export const {
    setCurrentScreen,
} = mainDisplaySlice.actions;

export default mainDisplaySlice.reducer;