import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MainDisplayScreenId } from './types'
import { RootState } from '../../store'
import { ControllerGroupIds } from '../../types'

type ControllerState = {
    controller: {
        [key: number]: number
    };
    currentScreen: MainDisplayScreenId
}

const initialState: ControllerState = {
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

export const controllerSlice = createSlice({
    name: 'controllers',
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

export const selectCurrScreen = (state: RootState) => state.controller.currentScreen

export const {
    increment,
    click,
} = controllerSlice.actions;

export default controllerSlice.reducer;