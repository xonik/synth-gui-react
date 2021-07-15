import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MainDisplayScreenId } from './types'
import { RootState } from '../../store'
import { ControllerGroupIds } from '../../types'

type UiState = {
    controller: {
        [key: number]: number
    };
    currentScreen: MainDisplayScreenId
}

const initialState: UiState = {
    controller: {},
    currentScreen:MainDisplayScreenId.ENV
}

type NumericControllerPayload = {
    ctrlGroup: ControllerGroupIds;
    ctrlId: number;
    ctrlIndex?: number;
    value: number;
}

type ButtonControllerPayload = {
    ctrlGroup: ControllerGroupIds;
    ctrlId: number;
    ctrlIndex?: number;
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        increment: (state, {payload}: PayloadAction<NumericControllerPayload>) => {
            //Not doing anything yet, just needed to create the action.
        },
        click: (state, {payload}: PayloadAction<ButtonControllerPayload>) => {
            //Not doing anything yet, just needed to create the action.
        }
    }
})

export const selectCurrScreen = (state: RootState) => state.ui.currentScreen

export const {
    increment,
    click,
} = uiSlice.actions;

export default uiSlice.reducer;