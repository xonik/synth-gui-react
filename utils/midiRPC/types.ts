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
    printValue: boolean,
}> = {
    'void': {
        cppType: 'void',
        jsType: 'void',
        deserializer: '',
        printValue: true,
    },
    'uint7_t': {
        cppType: 'uint8_t',
        jsType: 'number',
        deserializer: 'getUint7',
        printValue: true,
    },
    'uint8_t': {
        cppType: 'uint8_t',
        jsType: 'number',
        deserializer: 'getUint8',
        printValue: true,
    },
    'uint14_t': {
        cppType: 'uint16_t',
        jsType: 'number',
        deserializer: 'getUint14',
        printValue: true,
    },
    'uint16_t': {
        cppType: 'uint16_t',
        jsType: 'number',
        deserializer: 'getUint16',
        printValue: true,
    },
    'uint21_t': {
        cppType: 'uint32_t',
        jsType: 'number',
        deserializer: 'getUint21',
        printValue: true,
    },
    'uint32_t': {
        cppType: 'uint32_t',
        jsType: 'number',
        deserializer: 'getUint32',
        printValue: true,
    },
    'int8_t': {
        cppType: 'int8_t',
        jsType: 'number',
        deserializer: 'getInt8',
        printValue: true,
    },
    'int16_t': {
        cppType: 'int16_t',
        jsType: 'number',
        deserializer: 'getInt16',
        printValue: true,
    },
    'bool': {
        cppType: 'bool',
        jsType: 'boolean',
        deserializer: 'getBool',
        printValue: true,
    },
    'std::vector<int16_t>': {
        cppType: 'std::vector<int16_t>',
        jsType: 'number[]',
        deserializer: 'getInt16Vector',
        printValue: false,

    },
    'std::vector<uint16_t>': {
        cppType: 'std::vector<uint16_t>',
        jsType: 'number[]',
        deserializer: 'getUint16Vector',
        printValue: false,
    },
}