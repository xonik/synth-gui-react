import { ApiSource, ControllerGroupIds } from '../../types'
import { ControllerConfig } from '../../../midi/types'

export type NumericInputProperty = {
    ctrlGroup?: ControllerGroupIds;
    ctrl: ControllerConfig;
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
    radioButtonIndex?: number;
    reverse?: boolean;
    loop?: boolean;
    source: ApiSource
}
export type NumericControllerPayload = {
    ctrl: ControllerConfig
    ctrlIndex?: number
    value: number
    valueIndex?: number
}
export type NumericPayload = {
    value: number;
}
export type BooleanPayload = {
    value: boolean;
}