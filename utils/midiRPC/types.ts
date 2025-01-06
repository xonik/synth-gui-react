import { DataType } from './dataTypes'

export type Param = {
    name: string,
    type: DataType,
}

export type Func = {
    name: string,
    returnType: DataType,
    params: Param[]
}

export const dataTypeMap:Record<DataType, {
    cppType: string,
    jsType: string,
    deserializer: string,
    byteLength: number,
}> = {
    'void': {
        cppType: 'void',
        jsType: 'void',
        deserializer: '',
        byteLength: 0,
    },
    'uint7_t': {
        cppType: 'uint8_t',
        jsType: 'number',
        deserializer: 'getUint7',
        byteLength: 1,
    },
    'uint8_t': {
        cppType: 'uint8_t',
        jsType: 'number',
        deserializer: 'getUint8',
        byteLength: 2,
    },
    'uint14_t': {
        cppType: 'uint16_t',
        jsType: 'number',
        deserializer: 'getUint14',
        byteLength: 2,
    },
    'uint16_t': {
        cppType: 'uint16_t',
        jsType: 'number',
        deserializer: 'getUint16',
        byteLength: 3,
    },
    'uint21_t': {
        cppType: 'uint32_t',
        jsType: 'number',
        deserializer: 'getUint21',
        byteLength: 3,
    },
    'uint32_t': {
        cppType: 'uint32_t',
        jsType: 'number',
        deserializer: 'getUint32',
        byteLength: 5,
    },
    'bool': {
        cppType: 'bool',
        jsType: 'boolean',
        deserializer: 'getBool',
        byteLength: 1,
    },
}