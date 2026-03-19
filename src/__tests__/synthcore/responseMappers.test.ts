import { describe, it, expect } from 'vitest'
import {
    dbLevelResponseMapper,
    timeResponseMapper,
    uniBipolarLevelResponseMapper,
} from '../../synthcore/modules/common/responseMappers'

describe('responseMappers', () => {

    describe('dbLevelResponseMapper', () => {
        describe('unipolar (default)', () => {
            it('output(0) is close to 0 (fade region)', () => {
                expect(dbLevelResponseMapper.output(0)).toBeCloseTo(0, 2)
            })

            it('output(1) = 1', () => {
                expect(dbLevelResponseMapper.output(1)).toBeCloseTo(1, 3)
            })

            it('is monotonically increasing', () => {
                let prev = dbLevelResponseMapper.output(0)
                for (let x = 0.01; x <= 1; x += 0.01) {
                    const curr = dbLevelResponseMapper.output(x)
                    expect(curr).toBeGreaterThanOrEqual(prev - 0.0001)
                    prev = curr
                }
            })

            it('round-trips through input/output', () => {
                for (const x of [0.1, 0.25, 0.5, 0.75, 1]) {
                    const mapped = dbLevelResponseMapper.output(x)
                    const recovered = dbLevelResponseMapper.input(mapped)
                    expect(recovered).toBeCloseTo(x, 2)
                }
            })
        })

        describe('bipolar', () => {
            it('output(0, bipolar) is negative (dB curve is not symmetric around 0)', () => {
                // The dB curve maps 0.5 through the unipolar curve, which doesn't
                // produce exactly 0.5 due to the dB shape, so bipolar 0 maps to a
                // negative value. This is expected behavior.
                const val = dbLevelResponseMapper.output(0, true)
                expect(val).toBeLessThan(0)
                expect(val).toBeGreaterThan(-1)
            })

            it('output range is approximately -1 to 1', () => {
                const atNeg1 = dbLevelResponseMapper.output(-1, true)
                const at1 = dbLevelResponseMapper.output(1, true)
                expect(atNeg1).toBeLessThan(-0.5)
                expect(at1).toBeGreaterThan(0.5)
            })

            it('round-trips through input/output', () => {
                for (const x of [-0.8, -0.5, 0, 0.5, 0.8]) {
                    const mapped = dbLevelResponseMapper.output(x, true)
                    const recovered = dbLevelResponseMapper.input(mapped, true)
                    expect(recovered).toBeCloseTo(x, 1)
                }
            })
        })
    })

    describe('timeResponseMapper', () => {
        it('output(0) = 0', () => {
            expect(timeResponseMapper.output(0)).toBeCloseTo(0, 3)
        })

        it('output(1) = 1', () => {
            expect(timeResponseMapper.output(1)).toBeCloseTo(1, 3)
        })

        it('has slow start (exponential with positive steepness)', () => {
            expect(timeResponseMapper.output(0.5)).toBeLessThan(0.5)
        })

        it('round-trips through input/output', () => {
            for (const x of [0, 0.1, 0.25, 0.5, 0.75, 1]) {
                const mapped = timeResponseMapper.output(x)
                const recovered = timeResponseMapper.input(mapped)
                expect(recovered).toBeCloseTo(x, 3)
            }
        })
    })

    describe('uniBipolarLevelResponseMapper', () => {
        describe('unipolar mode', () => {
            it('output maps 0 to 0.5', () => {
                expect(uniBipolarLevelResponseMapper.output(0, false)).toBeCloseTo(0.5, 5)
            })

            it('output maps 1 to 1', () => {
                expect(uniBipolarLevelResponseMapper.output(1, false)).toBeCloseTo(1, 5)
            })

            it('input maps 0.5 to 0', () => {
                expect(uniBipolarLevelResponseMapper.input(0.5, false)).toBeCloseTo(0, 5)
            })

            it('input maps 1 to 1', () => {
                expect(uniBipolarLevelResponseMapper.input(1, false)).toBeCloseTo(1, 5)
            })

            it('round-trips', () => {
                for (const x of [0, 0.25, 0.5, 0.75, 1]) {
                    const mapped = uniBipolarLevelResponseMapper.output(x, false)
                    const recovered = uniBipolarLevelResponseMapper.input(mapped, false)
                    expect(recovered).toBeCloseTo(x, 5)
                }
            })
        })

        describe('bipolar mode', () => {
            it('output maps -1 to 0', () => {
                expect(uniBipolarLevelResponseMapper.output(-1, true)).toBeCloseTo(0, 5)
            })

            it('output maps 0 to 0.5', () => {
                expect(uniBipolarLevelResponseMapper.output(0, true)).toBeCloseTo(0.5, 5)
            })

            it('output maps 1 to 1', () => {
                expect(uniBipolarLevelResponseMapper.output(1, true)).toBeCloseTo(1, 5)
            })

            it('round-trips', () => {
                for (const x of [-1, -0.5, 0, 0.5, 1]) {
                    const mapped = uniBipolarLevelResponseMapper.output(x, true)
                    const recovered = uniBipolarLevelResponseMapper.input(mapped, true)
                    expect(recovered).toBeCloseTo(x, 5)
                }
            })
        })
    })
})
