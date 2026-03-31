import type { DataType } from './dataTypes'

export type Param = {
    name: string
    type: DataType
}

export type Func = {
    name: string
    returnType: DataType
    params: Param[]
    targets: string[]
}

export const dataTypeMap: Record<
    DataType,
    {
        cppType: string
        jsType: string
        deserializer: string
        cppSerializer: string
        printValue: boolean
    }
> = {
    void: {
        cppType: 'void',
        jsType: 'void',
        deserializer: '',
        cppSerializer: '',
        printValue: true,
    },
    uint7_t: {
        cppType: 'uint8_t',
        jsType: 'number',
        deserializer: 'getUint7',
        cppSerializer: 'splitTo7(7, ',
        printValue: true,
    },
    uint8_t: {
        cppType: 'uint8_t',
        jsType: 'number',
        deserializer: 'getUint8',
        cppSerializer: 'splitTo7(8, ',
        printValue: true,
    },
    uint14_t: {
        cppType: 'uint16_t',
        jsType: 'number',
        deserializer: 'getUint14',
        cppSerializer: 'splitTo7(14, ',
        printValue: true,
    },
    uint16_t: {
        cppType: 'uint16_t',
        jsType: 'number',
        deserializer: 'getUint16',
        cppSerializer: 'splitTo7(16, ',
        printValue: true,
    },
    uint21_t: {
        cppType: 'uint32_t',
        jsType: 'number',
        deserializer: 'getUint21',
        cppSerializer: 'splitTo7(21, ',
        printValue: true,
    },
    uint32_t: {
        cppType: 'uint32_t',
        jsType: 'number',
        deserializer: 'getUint32',
        cppSerializer: 'splitTo7(32, ',
        printValue: true,
    },
    int8_t: {
        cppType: 'int8_t',
        jsType: 'number',
        deserializer: 'getInt8',
        cppSerializer: 'splitInt8To7(',
        printValue: true,
    },
    int16_t: {
        cppType: 'int16_t',
        jsType: 'number',
        deserializer: 'getInt16',
        cppSerializer: 'splitInt16To7(',
        printValue: true,
    },
    bool: {
        cppType: 'bool',
        jsType: 'boolean',
        deserializer: 'getBool',
        cppSerializer: 'getBoolArray(',
        printValue: true,
    },
    'std::vector<int8_t>': {
        cppType: 'std::vector<int8_t>',
        jsType: 'number[]',
        deserializer: 'getInt8Vector',
        cppSerializer: 'getInt8Vector(',
        printValue: false,
    },
    'std::vector<int16_t>': {
        cppType: 'std::vector<int16_t>',
        jsType: 'number[]',
        deserializer: 'getInt16Vector',
        cppSerializer: 'getInt16Vector(',
        printValue: false,
    },
    'std::vector<uint8_t>': {
        cppType: 'std::vector<uint8_t>',
        jsType: 'number[]',
        deserializer: 'getUint8Vector',
        cppSerializer: 'getUint8Vector(',
        printValue: false,
    },

    'std::vector<uint16_t>': {
        cppType: 'std::vector<uint16_t>',
        jsType: 'number[]',
        deserializer: 'getUint16Vector',
        cppSerializer: 'getUint16Vector(',
        printValue: false,
    },
}
