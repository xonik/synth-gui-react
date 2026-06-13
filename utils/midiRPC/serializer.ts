// Copied from generator, do not edit in src
import type { DataType } from './dataTypes'

export const splitTo7 = (value: number, bits: number) => {
    const bitMask = 2 ** bits - 1
    if (value > bitMask) {
        console.log(`${value} does not fit in ${bits} bits`)
    } else if (value < 0) {
        console.log(`Value is ${value}, cannot be less than 0`)
    }

    let bitsLeft = bits
    let remainder = value & bitMask
    let bytes: number[] = []
    while (bitsLeft > 0) {
        bytes = [remainder & 0x7f, ...bytes] //LSB first
        remainder = remainder >> 7
        bitsLeft -= 7
    }
    return bytes
}

export function splitInt8To7(value: number): number[] {
    // Clamp to int8_t range
    const clamped = Math.max(-128, Math.min(127, value))
    // Convert to unsigned 8-bit representation
    const int8 = clamped < 0 ? clamped + 0x100 : clamped
    return [(int8 >> 7) & 0x7f, int8 & 0x7f]
}

export function splitInt16To7(value: number) {
    // Clamp to int16_t range
    const clamped = Math.max(-32768, Math.min(32767, value))
    // Convert to unsigned 16-bit representation
    const int16 = clamped < 0 ? clamped + 0x10000 : clamped
    return [(int16 >> 14) & 0x7f, (int16 >> 7) & 0x7f, int16 & 0x7f]
}

export const getBoolArray = (value: boolean): number[] => {
    if (value) {
        return [1]
    } else {
        return [0]
    }
}

const getUint8Array = (values: number[]): number[] => {
    let bytes: number[] = splitTo7(values.length, 14)

    values.forEach((num) => {
        bytes = bytes.concat(splitTo7(num, 8))
    })

    return bytes
}

const getUint16Array = (values: number[]): number[] => {
    let bytes: number[] = splitTo7(values.length, 14)

    values.forEach((num) => {
        bytes = bytes.concat(splitTo7(num, 16))
    })

    return bytes
}

const getInt8Array = (values: number[]): number[] => {
    let bytes: number[] = splitTo7(values.length, 14)

    values.forEach((num) => {
        bytes = bytes.concat(splitInt8To7(num))
    })

    return bytes
}

const getInt16Array = (values: number[]): number[] => {
    let bytes: number[] = splitTo7(values.length, 14)

    values.forEach((num) => {
        bytes = bytes.concat(splitInt16To7(num))
    })

    return bytes
}

export const jsToMidiEncoder: Record<DataType, (value: unknown) => number[]> = {
    void: (_value: unknown) => [], // should not be used
    uint7_t: (value: unknown) => splitTo7(value as number, 7),
    uint8_t: (value: unknown) => splitTo7(value as number, 8),
    uint14_t: (value: unknown) => splitTo7(value as number, 14),
    uint16_t: (value: unknown) => splitTo7(value as number, 16),
    uint21_t: (value: unknown) => splitTo7(value as number, 21),
    uint32_t: (value: unknown) => splitTo7(value as number, 32),
    int8_t: (value: unknown) => splitInt8To7(value as number),
    int16_t: (value: unknown) => splitInt16To7(value as number),
    bool: (value: unknown) => getBoolArray(value as boolean),
    'std::vector<int8_t>': (value: unknown) => getInt8Array(value as number[]),
    'std::vector<int16_t>': (value: unknown) => getInt16Array(value as number[]),
    'std::vector<uint8_t>': (value: unknown) => getUint8Array(value as number[]),
    'std::vector<uint16_t>': (value: unknown) => getUint16Array(value as number[]),
}

// ---- Deserialization (midi -> js) ----

export type MidiCursor = { pos: number }

const joinTo7 = (bytes: number[], cursor: MidiCursor, bits: number): number => {
    const byteCount = Math.ceil(bits / 7)
    let value = 0
    for (let i = 0; i < byteCount; i++) {
        value = (value << 7) | (bytes[cursor.pos + i] & 0x7f)
    }
    cursor.pos += byteCount
    return value
}

export const getUint7 = (bytes: number[], cursor: MidiCursor): number => joinTo7(bytes, cursor, 7)
export const getUint8 = (bytes: number[], cursor: MidiCursor): number => joinTo7(bytes, cursor, 8)
export const getUint14 = (bytes: number[], cursor: MidiCursor): number => joinTo7(bytes, cursor, 14)
export const getUint16 = (bytes: number[], cursor: MidiCursor): number => joinTo7(bytes, cursor, 16)
export const getUint21 = (bytes: number[], cursor: MidiCursor): number => joinTo7(bytes, cursor, 21)
export const getUint32 = (bytes: number[], cursor: MidiCursor): number => joinTo7(bytes, cursor, 32)

export const getInt8 = (bytes: number[], cursor: MidiCursor): number => {
    const unsigned = joinTo7(bytes, cursor, 8)
    return unsigned >= 0x80 ? unsigned - 0x100 : unsigned
}

export const getInt16 = (bytes: number[], cursor: MidiCursor): number => {
    const unsigned = joinTo7(bytes, cursor, 16)
    return unsigned >= 0x8000 ? unsigned - 0x10000 : unsigned
}

export const getBool = (bytes: number[], cursor: MidiCursor): boolean => {
    const byte = bytes[cursor.pos]
    cursor.pos += 1
    return byte === 1
}

const getVector = <T>(
    bytes: number[],
    cursor: MidiCursor,
    readElement: (bytes: number[], cursor: MidiCursor) => T,
): T[] => {
    const length = getUint14(bytes, cursor)
    const result: T[] = new Array(length)
    for (let i = 0; i < length; i++) {
        result[i] = readElement(bytes, cursor)
    }
    return result
}

type NonVoidDataType = Exclude<DataType, 'void'>

export const midiToJsDecoder: Record<NonVoidDataType, (bytes: number[], cursor: MidiCursor) => unknown> = {
    uint7_t: getUint7,
    uint8_t: getUint8,
    uint14_t: getUint14,
    uint16_t: getUint16,
    uint21_t: getUint21,
    uint32_t: getUint32,
    int8_t: getInt8,
    int16_t: getInt16,
    bool: getBool,
    'std::vector<int8_t>': (bytes, cursor) => getVector(bytes, cursor, getInt8),
    'std::vector<int16_t>': (bytes, cursor) => getVector(bytes, cursor, getInt16),
    'std::vector<uint8_t>': (bytes, cursor) => getVector(bytes, cursor, getUint8),
    'std::vector<uint16_t>': (bytes, cursor) => getVector(bytes, cursor, getUint16),
}

export function deserializeMidi(bytes: number[], type: NonVoidDataType): unknown {
    const cursor: MidiCursor = { pos: 0 }
    return midiToJsDecoder[type](bytes, cursor)
}
