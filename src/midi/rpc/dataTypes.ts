export const KNOWN_DATATYPES = [
    'void', 'uint7_t', 'uint8_t', 'uint14_t', 'uint16_t', 'uint21_t', 'uint32_t'
] as const;
export type DataTypeTuple = typeof KNOWN_DATATYPES;
export type DataType = DataTypeTuple[number];
export function isDataType(value: string): value is DataType {
    return KNOWN_DATATYPES.includes(value as DataType)
}

export const cToJsDataTypeMap: Record<DataType, string> = {
    'void': 'void',
    'uint7_t': 'number',
    'uint8_t': 'number',
    'uint14_t': 'number',
    'uint16_t': 'number',
    'uint21_t': 'number',
    'uint32_t': 'number',
}

const splitTo7 = (value: number, bits: number) => {
    const bitMask = Math.pow(2, bits) - 1
    let bitsLeft = bits
    let remainder = value & bitMask
    let bytes: number[] = []
    while(bitsLeft > 0) {
        bytes = [ remainder & 0x7F, ...bytes]
        remainder = remainder >> 7
        bitsLeft -= 7
    }
    return bytes
}

export const jsToMidiEncoder: Record<DataType, (value: number) => number[]> = {
    'void': (value: number) => [], // should not be used
    'uint7_t': (value: number) => splitTo7(value, 7),
    'uint8_t': (value: number) => splitTo7(value, 8),
    'uint14_t': (value: number) => splitTo7(value, 14),
    'uint16_t': (value: number) => splitTo7(value, 16),
    'uint21_t': (value: number) => splitTo7(value, 21),
    'uint32_t': (value: number) => splitTo7(value, 32),
}
