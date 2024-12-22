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

export type UiNumericControllerPayload = {
    ctrlGroup: ControllerGroupIds;
    ctrl: ControllerConfig;
    ctrlIndex?: number;
    value: number;
    valueIndex?: number;
    source: ApiSource
}

export type UiButtonControllerPayload = {
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
        increment: (state, { payload }: PayloadAction<UiNumericControllerPayload>) => {
            //Not doing anything yet, just needed to create the action.
        },
        click: (state, { payload }: PayloadAction<UiButtonControllerPayload>) => {
            //Not doing anything yet, just needed to create the action.
        },
        release: (state, { payload }: PayloadAction<UiButtonControllerPayload>) => {
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