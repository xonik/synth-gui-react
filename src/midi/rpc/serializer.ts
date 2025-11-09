// Copied from generator, do not edit in src
import { DataType } from './dataTypes'

export const splitTo7 = (value: number, bits: number) => {
    const bitMask = Math.pow(2, bits) - 1
    if(value > bitMask){
        console.log(`${value} does not fit in ${bits} bits`)
    } else if(value < 0) {
        console.log(`Value is ${value}, cannot be less than 0`)
    }


    let bitsLeft = bits
    let remainder = value & bitMask
    let bytes: number[] = []
    while(bitsLeft > 0) {
        bytes = [remainder & 0x7F, ...bytes] //LSB first
        remainder = remainder >> 7
        bitsLeft -= 7
    }
    return bytes
}

function splitInt8To7(value: number): number[] {
    // Clamp to int8_t range
    const clamped = Math.max(-128, Math.min(127, value));
    // Convert to unsigned 8-bit representation
    const int8 = clamped < 0 ? (clamped + 0x100) : clamped;
    return [
        (int8 >> 7) & 0x7F,
        int8 & 0x7F
    ];
}

function splitInt16To7(value: number) {
    // Clamp to int16_t range
    const clamped = Math.max(-32768, Math.min(32767, value));
    // Convert to unsigned 16-bit representation
    const int16 = clamped < 0 ? (clamped + 0x10000) : clamped;
    return [
        (int16 >> 14) & 0x7F,
        (int16 >> 7) & 0x7F,
        int16 & 0x7F
    ];
}

export const getBoolArray = (value: boolean): number[] => {
    if(value){
        return [1]
    } else {
        return [0]
    }
}

const getUint16Array = (values: number[]): number[] => {
    let bytes: number[] = splitTo7(values.length, 14)

    values.forEach((num) => {
        bytes = bytes.concat(splitTo7(num, 16))
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
    'void': (value: unknown) => [], // should not be used
    'uint7_t': (value: unknown) => splitTo7(value as number, 7),
    'uint8_t': (value: unknown) => splitTo7(value as number, 8),
    'uint14_t': (value: unknown) => splitTo7(value as number, 14),
    'uint16_t': (value: unknown) => splitTo7(value as number, 16),
    'uint21_t': (value: unknown) => splitTo7(value as number, 21),
    'uint32_t': (value: unknown) => splitTo7(value as number, 32),
    'int8_t': (value: unknown) => splitInt8To7(value as number),
    'int16_t': (value: unknown) => splitInt16To7(value as number),
    'bool': (value: unknown) => getBoolArray(value as boolean),
    'std::vector<int16_t>': (value: unknown) => getInt16Array(value as number[]),
    'std::vector<uint16_t>': (value: unknown) => getUint16Array(value as number[]),
}