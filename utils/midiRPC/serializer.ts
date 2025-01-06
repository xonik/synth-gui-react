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

export const getBoolArray = (value: boolean): number[] => {
    if(value){
        return [1]
    } else {
        return [0]
    }
}

export const jsToMidiEncoder: Record<DataType, (value: unknown) => number[]> = {
    'void': (value: unknown) => [], // should not be used
    'uint7_t': (value: unknown) => splitTo7(value as number, 7),
    'uint8_t': (value: unknown) => splitTo7(value as number, 8),
    'uint14_t': (value: unknown) => splitTo7(value as number, 14),
    'uint16_t': (value: unknown) => splitTo7(value as number, 16),
    'uint21_t': (value: unknown) => splitTo7(value as number, 21),
    'uint32_t': (value: unknown) => splitTo7(value as number, 32),
    'bool': (value: unknown) => getBoolArray(value as boolean),
}