import { describe, expect, it } from 'vitest'
import {
    getLinearToDBMapper,
    getLinearToExpBipolarMapper,
    getLinearToExpMapper,
    getMapperWithFade,
    inverse,
    isZero,
} from '../../midi/slopeCalculator'

describe('slopeCalculator', () => {
    describe('isZero', () => {
        it('returns true for 0', () => {
            expect(isZero(0)).toBe(true)
        })
        it('returns true for values within epsilon', () => {
            expect(isZero(0.0005)).toBe(true)
            expect(isZero(-0.0005)).toBe(true)
        })
        it('returns false for values outside epsilon', () => {
            expect(isZero(0.01)).toBe(false)
            expect(isZero(-0.01)).toBe(false)
        })
    })

    describe('getLinearToDBMapper', () => {
        it('rising curve: maps inputMax to outputMax', () => {
            const mapper = getLinearToDBMapper(1, 1, 23, true, false)
            expect(mapper(1)).toBeCloseTo(1, 5)
        })

        it('rising curve: maps 0 to a small but nonzero value (no stretch)', () => {
            const mapper = getLinearToDBMapper(1, 1, 23, true, false)
            const val = mapper(0)
            expect(val).toBeGreaterThan(0)
            expect(val).toBeLessThan(0.1)
        })

        it('rising curve with stretchY: maps 0 to 0', () => {
            const mapper = getLinearToDBMapper(1, 1, 23, true, true)
            expect(mapper(0)).toBeCloseTo(0, 5)
        })

        it('rising curve with stretchY: maps inputMax to outputMax', () => {
            const mapper = getLinearToDBMapper(1, 1, 23, true, true)
            expect(mapper(1)).toBeCloseTo(1, 5)
        })

        it('falling curve: maps 0 to outputMax', () => {
            const mapper = getLinearToDBMapper(1, 1, 23, false, false)
            expect(mapper(0)).toBeCloseTo(1, 5)
        })

        it('is monotonically increasing for rising curve', () => {
            const mapper = getLinearToDBMapper(1, 1, 23, true, false)
            let prev = mapper(0)
            for (let i = 0.01; i <= 1; i += 0.01) {
                const curr = mapper(i)
                expect(curr).toBeGreaterThanOrEqual(prev)
                prev = curr
            }
        })

        it('scales with outputMax', () => {
            const mapper = getLinearToDBMapper(1, 2, 23, true, false)
            expect(mapper(1)).toBeCloseTo(2, 5)
        })
    })

    describe('getLinearToExpMapper', () => {
        it('maps 0 to 0', () => {
            const mapper = getLinearToExpMapper(1, 1, 3.5)
            expect(mapper(0)).toBeCloseTo(0, 3)
        })

        it('maps maxInput to outputRange', () => {
            const mapper = getLinearToExpMapper(1, 1, 3.5)
            expect(mapper(1)).toBeCloseTo(1, 3)
        })

        it('is monotonically increasing', () => {
            const mapper = getLinearToExpMapper(1, 1, 3.5)
            let prev = mapper(0)
            for (let i = 0.01; i <= 1; i += 0.01) {
                const curr = mapper(i)
                expect(curr).toBeGreaterThanOrEqual(prev)
                prev = curr
            }
        })

        it('falls back to linear when steepness is ~0', () => {
            const mapper = getLinearToExpMapper(1, 1, 0)
            expect(mapper(0.5)).toBeCloseTo(0.5, 3)
            expect(mapper(0.25)).toBeCloseTo(0.25, 3)
        })

        it('positive steepness gives slow start, fast end', () => {
            const mapper = getLinearToExpMapper(1, 1, 3.5)
            // At midpoint input, output should be less than midpoint (slow start)
            expect(mapper(0.5)).toBeLessThan(0.5)
        })

        it('negative steepness gives fast start, slow end', () => {
            const mapper = getLinearToExpMapper(1, 1, -3.5)
            // At midpoint input, output should be more than midpoint (fast start)
            expect(mapper(0.5)).toBeGreaterThan(0.5)
        })
    })

    describe('getLinearToExpBipolarMapper', () => {
        it('maps 0 to outputMin', () => {
            const mapper = getLinearToExpBipolarMapper(1, -100, 200, 2)
            expect(mapper(0)).toBeCloseTo(-100, 1)
        })

        it('maps maxInput to outputMin + outputRange', () => {
            const mapper = getLinearToExpBipolarMapper(1, -100, 200, 2)
            expect(mapper(1)).toBeCloseTo(100, 1)
        })
    })

    describe('getMapperWithFade', () => {
        it('applies linear fade at the start for rising curves', () => {
            const base = getLinearToDBMapper(1, 1, 23, true, false)
            const faded = getMapperWithFade(base, 1, true, 0.01)

            // At 0 the fade should give 0
            expect(faded(0)).toBeCloseTo(0, 5)

            // Just past the fade region, should match the base function
            expect(faded(0.02)).toBeCloseTo(base(0.02), 3)
        })

        it('passes through unchanged outside fade region', () => {
            const base = getLinearToExpMapper(1, 1, 3.5)
            const faded = getMapperWithFade(base, 1, true, 0.01)

            expect(faded(0.5)).toBeCloseTo(base(0.5), 5)
            expect(faded(1)).toBeCloseTo(base(1), 5)
        })
    })

    describe('inverse', () => {
        it('inverts a linear function', () => {
            const linear = (x: number) => x
            const inv = inverse(linear, 65534)
            expect(inv(0.5)).toBeCloseTo(0.5, 3)
            expect(inv(0)).toBeCloseTo(0, 3)
            expect(inv(1)).toBeCloseTo(1, 3)
        })

        it('inverts an exponential mapper', () => {
            const exp = getLinearToExpMapper(1, 1, 3.5)
            const inv = inverse(exp, 65534)

            // Round-trip: inv(exp(x)) should equal x
            for (const x of [0, 0.1, 0.25, 0.5, 0.75, 1]) {
                const mapped = exp(x)
                const recovered = inv(mapped)
                expect(recovered).toBeCloseTo(x, 3)
            }
        })

        it('inverts a dB mapper with fade', () => {
            const base = getMapperWithFade(getLinearToDBMapper(1, 1, 23, true, false), 1, true, 10 / 65534)
            const inv = inverse(base, 65534)

            for (const x of [0.1, 0.25, 0.5, 0.75, 1]) {
                const mapped = base(x)
                const recovered = inv(mapped)
                expect(recovered).toBeCloseTo(x, 2)
            }
        })
    })
})
