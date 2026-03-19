import { describe, it, expect } from 'vitest'
import {
    splitTo7,
    splitInt8To7,
    splitInt16To7,
    getBoolArray,
} from '../../midi/rpc/serializer'

describe('serializer', () => {

    describe('splitTo7', () => {
        it('splits a 7-bit value into 1 byte', () => {
            expect(splitTo7(0, 7)).toEqual([0])
            expect(splitTo7(127, 7)).toEqual([127])
            expect(splitTo7(64, 7)).toEqual([64])
        })

        it('splits an 8-bit value into 2 bytes (MSB first)', () => {
            // 255 = 0b11111111 -> [0b1, 0b1111111] = [1, 127]
            expect(splitTo7(255, 8)).toEqual([1, 127])
            expect(splitTo7(0, 8)).toEqual([0, 0])
            expect(splitTo7(128, 8)).toEqual([1, 0])
        })

        it('splits a 14-bit value into 2 bytes', () => {
            // 16383 = 0x3FFF -> [127, 127]
            expect(splitTo7(16383, 14)).toEqual([127, 127])
            expect(splitTo7(0, 14)).toEqual([0, 0])
            // 128 = 0b10000000 -> [1, 0]
            expect(splitTo7(128, 14)).toEqual([1, 0])
        })

        it('splits a 16-bit value into 3 bytes', () => {
            expect(splitTo7(0, 16)).toEqual([0, 0, 0])
            // 65535 = 0xFFFF -> [3, 127, 127]
            expect(splitTo7(65535, 16)).toEqual([3, 127, 127])
        })

        it('splits a 21-bit value into 3 bytes', () => {
            expect(splitTo7(0, 21)).toEqual([0, 0, 0])
            // 2097151 = 0x1FFFFF -> [127, 127, 127]
            expect(splitTo7(2097151, 21)).toEqual([127, 127, 127])
        })

        it('splits a 32-bit value into 5 bytes', () => {
            expect(splitTo7(0, 32)).toEqual([0, 0, 0, 0, 0])
        })

        it('masks off bits beyond the specified width', () => {
            // Value 256 in 7 bits should be masked to 0 (256 & 127 = 0)
            // But splitTo7 logs a warning and masks
            const result = splitTo7(256, 7)
            expect(result).toEqual([0])
        })
    })

    describe('splitInt8To7', () => {
        it('handles positive values', () => {
            expect(splitInt8To7(0)).toEqual([0, 0])
            expect(splitInt8To7(127)).toEqual([0, 127])
            expect(splitInt8To7(1)).toEqual([0, 1])
        })

        it('handles negative values (two\'s complement)', () => {
            // -1 as uint8 = 255 = 0b11111111 -> [1, 127]
            expect(splitInt8To7(-1)).toEqual([1, 127])
            // -128 as uint8 = 128 = 0b10000000 -> [1, 0]
            expect(splitInt8To7(-128)).toEqual([1, 0])
        })

        it('clamps to int8 range', () => {
            expect(splitInt8To7(200)).toEqual(splitInt8To7(127))
            expect(splitInt8To7(-200)).toEqual(splitInt8To7(-128))
        })
    })

    describe('splitInt16To7', () => {
        it('handles positive values', () => {
            expect(splitInt16To7(0)).toEqual([0, 0, 0])
            expect(splitInt16To7(1)).toEqual([0, 0, 1])
            expect(splitInt16To7(32767)).toEqual([1, 127, 127])
        })

        it('handles negative values (two\'s complement)', () => {
            // -1 as uint16 = 65535 = 0xFFFF -> [3, 127, 127]
            expect(splitInt16To7(-1)).toEqual([3, 127, 127])
            // -32768 as uint16 = 32768 = 0x8000 -> [2, 0, 0]
            expect(splitInt16To7(-32768)).toEqual([2, 0, 0])
        })

        it('clamps to int16 range', () => {
            expect(splitInt16To7(40000)).toEqual(splitInt16To7(32767))
            expect(splitInt16To7(-40000)).toEqual(splitInt16To7(-32768))
        })
    })

    describe('getBoolArray', () => {
        it('returns [1] for true', () => {
            expect(getBoolArray(true)).toEqual([1])
        })
        it('returns [0] for false', () => {
            expect(getBoolArray(false)).toEqual([0])
        })
    })
})
