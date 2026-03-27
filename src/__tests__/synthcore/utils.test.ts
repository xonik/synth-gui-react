import { describe, it, expect } from 'vitest'
import { getBounded, getQuantized, step } from '../../store/utils'

describe('synthcore utils', () => {

    describe('getBounded', () => {
        it('returns value when within bounds', () => {
            expect(getBounded(0.5)).toBe(0.5)
            expect(getBounded(0)).toBe(0)
            expect(getBounded(1)).toBe(1)
        })

        it('clamps to upper bound', () => {
            expect(getBounded(1.5)).toBe(1)
            expect(getBounded(100)).toBe(1)
        })

        it('clamps to lower bound', () => {
            expect(getBounded(-0.5)).toBe(0)
            expect(getBounded(-100)).toBe(0)
        })

        it('uses custom bounds', () => {
            expect(getBounded(5, -10, 10)).toBe(5)
            expect(getBounded(15, -10, 10)).toBe(10)
            expect(getBounded(-15, -10, 10)).toBe(-10)
        })

        it('handles bipolar range', () => {
            expect(getBounded(0, -1, 1)).toBe(0)
            expect(getBounded(-0.5, -1, 1)).toBe(-0.5)
            expect(getBounded(1.5, -1, 1)).toBe(1)
            expect(getBounded(-1.5, -1, 1)).toBe(-1)
        })
    })

    describe('getQuantized', () => {
        it('quantizes to 16-bit resolution by default', () => {
            const quantized = getQuantized(0.5)
            // Should be very close to 0.5 but snapped to nearest 1/65535
            expect(quantized).toBeCloseTo(0.5, 4)
            expect(quantized * 65535).toBe(Math.round(quantized * 65535))
        })

        it('quantizes 0 to exactly 0', () => {
            expect(getQuantized(0)).toBe(0)
        })

        it('quantizes 1 to exactly 1', () => {
            expect(getQuantized(1)).toBe(1)
        })

        it('supports custom factor', () => {
            const quantized = getQuantized(0.5, 127)
            expect(quantized * 127).toBe(Math.round(quantized * 127))
        })
    })

    describe('step', () => {
        it('returns 1 for positive increment', () => {
            expect(step(0.5)).toBe(1)
            expect(step(0.001)).toBe(1)
        })

        it('returns -1 for negative increment', () => {
            expect(step(-0.5)).toBe(-1)
            expect(step(-0.001)).toBe(-1)
        })
    })
})
