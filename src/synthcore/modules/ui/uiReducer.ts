import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ControllerGroupIds } from '../../types'
import { ControllerConfig } from '../../../midi/types'

type UiState = {
    controller: {
        [key: number]: number
    };
}

const initialState: UiState = {
    controller: {},
}

type NumericControllerPayload = {
    ctrlGroup: ControllerGroupIds;
    ctrl: ControllerConfig;
    ctrlIndex?: number;
    value: number;
}

type ButtonControllerPayload = {
    ctrlGroup: ControllerGroupIds;
    ctrl: ControllerConfig;
    ctrlIndex?: number;
    radioButtonIndex?: number;
    reverse?: boolean;
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
        },
        release: (state, {payload}: PayloadAction<ButtonControllerPayload>) => {
            //Not doing anything yet, just needed to create the action.
        },
    }
})

export const {
    increment,
    click,
    release,
} = uiSlice.actions;

export default uiSlice.reducer;