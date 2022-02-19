import { ControllerConfig } from '../../../midi/types'
import { ApiSource } from '../../types'

export type ApiIncrementMapperType = {
    [key: number]: (value: number) => void
}

export type ApiClickMapperType = {
    [key: number]: () => void
}

type IndexIncMapperEntry = [ControllerConfig, (ctrlIndex: number, value: number, source: ApiSource) => void]
export const createIndexIncrementMapper = (map: IndexIncMapperEntry[]) => (ctrl: ControllerConfig, ctrlIndex: number, value: number, source: ApiSource) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key === ctrl
    })?.[1](ctrlIndex, value, source)
}

type IndexClickMapperEntry = [ControllerConfig, (ctrlIndex: number, source: ApiSource) => void]
export const createIndexClickMapper = (map: IndexClickMapperEntry[]) => (ctrl: ControllerConfig, ctrlIndex: number, source: ApiSource) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key === ctrl
    })?.[1](ctrlIndex, source)
}

type MapperEntry = [ControllerConfig, (value: number, source: ApiSource) => void]
export const createSetMapper = (map: MapperEntry[]) => (ctrl: ControllerConfig, value: number, source: ApiSource) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key === ctrl
    })?.[1](value, source)
}

export const createIncrementMapper = (map: MapperEntry[]) => (ctrl: ControllerConfig, value: number, source: ApiSource) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key === ctrl
    })?.[1](value, source)
}

type ClickMapperEntry = [ControllerConfig, (source: ApiSource) => void]
export const createClickMapper = (map: ClickMapperEntry[]) => (ctrl: ControllerConfig, source: ApiSource) => {
    // search for a ctrl and call the corresponding function
    map.find(([key]) => {
        return key === ctrl
    })?.[1](source)
}