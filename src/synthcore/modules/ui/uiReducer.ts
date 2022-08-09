import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ApiSource, ControllerGroupIds } from '../../types'
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
    valueIndex?: number;
    source: ApiSource
}

type ButtonControllerPayload = {
    ctrlGroup: ControllerGroupIds;
    ctrl: ControllerConfig;
    ctrlIndex?: number;
    valueIndex?: number;
    radioButtonIndex?: number;
    reverse?: boolean;
    loop?: boolean;
    momentary?: boolean;
    source: ApiSource
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        increment: (state, { payload }: PayloadAction<NumericControllerPayload>) => {
            //Not doing anything yet, just needed to create the action.
        },
        click: (state, { payload }: PayloadAction<ButtonControllerPayload>) => {
            //Not doing anything yet, just needed to create the action.
        },
        release: (state, { payload }: PayloadAction<ButtonControllerPayload>) => {
            //Not doing anything yet, just needed to create the action.
        },
    }
})

export const {
    increment,
    click,
    release,
} = uiSlice.actions

export default uiSlice.reducer