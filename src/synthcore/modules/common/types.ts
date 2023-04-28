import { ApiSource, ControllerGroupIds } from '../../types'
import { ControllerConfig } from '../../../midi/types'

export type NumericInputProperty = {
    // Main group such as ENV, LFO. Should really be part of ctrl
    ctrlGroup?: ControllerGroupIds;

    // All details about a single controller such as Osc Waveform
    ctrl: ControllerConfig;

    // If we have more than one of a controller, for example for envelope, this is envId.
    ctrlIndex?: number;
    value: number;

    // May be used for stages etc. Can only be sent with nrpn and must be in range 0-31
    valueIndex?: number;

    source: ApiSource
}
export type ButtonInputProperty = {
    ctrlGroup?: ControllerGroupIds;
    ctrl: ControllerConfig;
    ctrlIndex?: number;
    valueIndex?: number;

    // Allows multiple buttons to be part of a radio button. RadioButtonIndex will
    // be used instead of incrementing value, and we can also use it to turn OFF
    // a param if button is pressed twice.
    radioButtonIndex?: number;

    // A momentary switch, sends release when releasing button.
    // Requires two values two work, value [0] is the click/press value
    // and value [1] is the release value. If value [1] is missing, no
    // release is sent.
    momentary?: boolean;

    // Decrement instead of increment value when button is clicked.
    reverse?: boolean;

    // When end of values has been reached, start from 0
    loop?: boolean;
    source: ApiSource
}
export type NumericControllerPayload = {
    ctrl: ControllerConfig
    ctrlIndex?: number
    value: number
    valueIndex?: number
    uiValue?: number
}

export type NumericPayload = {
    value: number;
}
export type BooleanPayload = {
    value: boolean;
}

export type PatchControllers = {
    [key: string]: number
}
