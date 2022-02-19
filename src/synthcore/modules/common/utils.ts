import { ControllerConfig } from '../../../midi/types'

export type ApiIncrementMapperType = {
    [key: number]: (value: number) => void
}

export type ApiClickMapperType = {
    [key: number]: () => void
}

type IndexIncMapperEntry = [ControllerConfig, (ctrlIndex: number, value: number) => void]
export const createIndexIncrementMapper = (map: IndexIncMapperEntry[]) => (ctrl: ControllerConfig, ctrlIndex: number, value: number) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key === ctrl
    })?.[1](ctrlIndex, value)
}

type IndexClickMapperEntry = [ControllerConfig, (ctrlIndex: number, ) => void]
export const createIndexClickMapper = (map: IndexClickMapperEntry[]) => (ctrl: ControllerConfig, ctrlIndex: number) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key === ctrl
    })?.[1](ctrlIndex)
}

type IncMapperEntry = [ControllerConfig, (value: number) => void]
export const createIncrementMapper = (map: IncMapperEntry[]) => (ctrl: ControllerConfig, value: number) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key === ctrl
    })?.[1](value)
}

type ClickMapperEntry = [ControllerConfig, () => void]
export const createClickMapper = (map: ClickMapperEntry[]) => (ctrl: ControllerConfig) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key === ctrl
    })?.[1]()
}