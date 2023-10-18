import { DataType } from '../../src/midi/rpc/dataTypes'

export type Param = {
    name: string,
    type: DataType,
}

export type Func = {
    name: string,
    returnType: DataType,
    params: Param[]
}