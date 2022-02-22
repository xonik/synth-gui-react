import { ControllerConfig } from '../../../midi/types'

export type NumericControllerPayload = {
    ctrl: ControllerConfig,
    ctrlIndex?: number,
    value: number;
}

export type NumericPayload = {
    value: number;
}

export type BooleanPayload = {
    value: boolean;
}