// Copied from generator, do not edit in src
import { DataType } from './dataTypes'

const splitTo7 = (value: number, bits: number) => {
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
        bytes = [ ...bytes, remainder & 0x7F] //LSB first
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