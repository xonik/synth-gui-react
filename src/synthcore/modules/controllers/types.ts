export type ValueIndexedControllers = {
    [ctrlIndex: number]: {
        [ctrlId: number]: { [valueIndex: number]: number }
    }
}

export type Controllers = {
    [ctrlIndex: number]: {
        [key: number]: number
    }
}