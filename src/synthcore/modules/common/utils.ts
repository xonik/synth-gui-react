import { ControllerConfig } from '../../../midi/types'
import { ButtonInputProperty, NumericInputProperty } from './commonApi'

export type ApiIncrementMapperType = {
    [key: number]: (value: number) => void
}

export type ApiClickMapperType = {
    [key: number]: () => void
}

type IndexIncMapperEntry = [ControllerConfig, (input: NumericInputProperty) => void]
export const createIndexIncrementMapper = (map: IndexIncMapperEntry[]) => (input: NumericInputProperty) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key === input.ctrl
    })?.[1](input)
}

type IndexClickMapperEntry = [ControllerConfig, (input: ButtonInputProperty) => void]
export const createIndexClickMapper = (map: IndexClickMapperEntry[]) => (input: ButtonInputProperty) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key === input.ctrl
    })?.[1](input)
}

type MapperEntry = [ControllerConfig, (input: NumericInputProperty) => void]
export const createSetMapper = (map: MapperEntry[]) => (input: NumericInputProperty) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key === input.ctrl
    })?.[1](input)
}

export const createIncrementMapper = (map: MapperEntry[]) => (input: NumericInputProperty) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key === input.ctrl
    })?.[1](input)
}

type ClickMapperEntry = [ControllerConfig, (input: ButtonInputProperty) => void]
export const createClickMapper = (map: ClickMapperEntry[]) => (input: ButtonInputProperty) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key === input.ctrl
    })?.[1](input)
}