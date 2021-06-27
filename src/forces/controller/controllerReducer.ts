import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ControllerGroupIds, EnvControllerId } from '../synthcore/controllers'

type ControllerState = {
    controller: {
        [key: number]: number
    };
}

const initialState: ControllerState = {
    controller: {}
}

type NumericControllerPayload = {
    ctrlGroup: ControllerGroupIds;
    ctrlId: EnvControllerId;
    ctrlIndex?: number;
    value: number;
}

export const controllerSlice = createSlice({
    name: 'controllers',
    initialState,
    reducers: {
        increment: (state, {payload}: PayloadAction<NumericControllerPayload>) => {
            //Not doing anything yet, just needed to create the action.
        },
    }
})

export const {
    increment,
} = controllerSlice.actions;

export default controllerSlice.reducer;