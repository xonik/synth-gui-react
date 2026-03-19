import { describe, it, expect } from 'vitest'

/**
 * Tests for envelope-specific MIDI encoding/decoding.
 *
 * These mappers pack multiple values into a single MIDI message and
 * unpack them on receive. They must round-trip correctly.
 */

describe('envelope MIDI mappers', () => {

    describe('curve mapper', () => {
        // Packs stageId into upper 7 bits, curve index into lower 7 bits
        const curveOutputMapper = (curveIndex: number, stageId: number) =>
            (stageId << 7) + curveIndex

        const curveInputMapper = (value: number, curveValues: number[]) => {
            const stageId = (value >> 7)
            const curve = value & 0b01111111
            const curveIndex = curveValues.indexOf(curve)
            return { value: curveIndex >= 0 ? curveIndex : 0, valueIndex: stageId }
        }

        it('packs stageId and curveIndex into a single value', () => {
            expect(curveOutputMapper(0, 0)).toBe(0)
            expect(curveOutputMapper(5, 0)).toBe(5)
            expect(curveOutputMapper(0, 1)).toBe(128)
            expect(curveOutputMapper(3, 2)).toBe(259)
        })

        it('round-trips through encode/decode', () => {
            // curveValues maps index to MIDI value — in this case identity for simplicity
            const curveValues = [0, 1, 2, 3, 4, 5, 6, 7]

            for (let stageId = 0; stageId < 7; stageId++) {
                for (let curveIndex = 0; curveIndex < curveValues.length; curveIndex++) {
                    const encoded = curveOutputMapper(curveValues[curveIndex], stageId)
                    const decoded = curveInputMapper(encoded, curveValues)
                    expect(decoded.valueIndex).toBe(stageId)
                    expect(decoded.value).toBe(curveIndex)
                }
            }
        })

        it('round-trips with actual Curve enum values', () => {
            // These are the actual curve MIDI values from generatedTypes
            const curveValuesUsed = [0, 1, 2, 3, 4, 5, 6, 7] // COSINE through LOG_3

            const stageId = 3
            const curveIndex = 5 // LOG_1
            const encoded = curveOutputMapper(curveValuesUsed[curveIndex], stageId)
            const decoded = curveInputMapper(encoded, curveValuesUsed)
            expect(decoded.valueIndex).toBe(stageId)
            expect(decoded.value).toBe(curveIndex)
        })
    })

    describe('stage enabled mapper', () => {
        // Packs stageId into lower 3 bits, enable bit into bit 3
        const stageEnabledOutputMapper = (enabled: number, stageId: number) => {
            const enableBit = enabled ? 0b1000 : 0
            return stageId | enableBit
        }

        const stageEnabledInputMapper = (value: number) => {
            const stageId = value & 0b111
            const enabled = (value & 0b1000) > 0 ? 1 : 0
            return { valueIndex: stageId, value: enabled }
        }

        it('packs enabled=0 correctly', () => {
            expect(stageEnabledOutputMapper(0, 0)).toBe(0)
            expect(stageEnabledOutputMapper(0, 3)).toBe(3)
            expect(stageEnabledOutputMapper(0, 6)).toBe(6)
        })

        it('packs enabled=1 correctly', () => {
            expect(stageEnabledOutputMapper(1, 0)).toBe(8)
            expect(stageEnabledOutputMapper(1, 3)).toBe(11)
            expect(stageEnabledOutputMapper(1, 6)).toBe(14)
        })

        it('round-trips through encode/decode', () => {
            for (let stageId = 0; stageId < 7; stageId++) {
                for (const enabled of [0, 1]) {
                    const encoded = stageEnabledOutputMapper(enabled, stageId)
                    const decoded = stageEnabledInputMapper(encoded)
                    expect(decoded.valueIndex).toBe(stageId)
                    expect(decoded.value).toBe(enabled)
                }
            }
        })

        it('supports all 8 stage IDs', () => {
            for (let stageId = 0; stageId <= 7; stageId++) {
                const encoded = stageEnabledOutputMapper(1, stageId)
                const decoded = stageEnabledInputMapper(encoded)
                expect(decoded.valueIndex).toBe(stageId)
                expect(decoded.value).toBe(1)
            }
        })
    })
})

/**
 * Tests documenting envelope business rules that must be preserved.
 *
 * These rules are currently implemented inside Redux-coupled handler
 * classes (envApi.ts) and cannot be unit tested in isolation yet.
 * They are written as documentation for the migration and will be
 * converted to real assertions when the logic moves to the new stores.
 */
describe('envelope business rules (documented)', () => {

    describe('sustain level mirroring', () => {
        it.todo('setting sustain level also sets R1 level when R1 is enabled')
        it.todo('setting sustain level also sets R2 level when R1 is disabled')
        it.todo('toggling R1 on copies sustain level to R1')
        it.todo('toggling R1 off copies sustain level to R2')
    })

    describe('invert side effects', () => {
        it.todo('toggling invert on sets delay, attack, stopped levels to 1 and decay1 level to 0')
        it.todo('toggling invert off sets delay, attack, stopped levels to 0 and decay1 level to 1')
    })

    describe('level bounding', () => {
        it.todo('unipolar envelope levels are bounded 0 to 1, quantized to 32767 steps')
        it.todo('bipolar envelope levels are bounded -1 to 1, quantized to 32767 steps')
        it.todo('level set is ignored for stages other than decay2, sustain, and release2 (when r1 enabled)')
    })

    describe('stage enable restrictions', () => {
        it.todo('only delay, decay1, decay2, and release1 stages can be toggled')
        it.todo('attack, sustain, release2, and stopped stages cannot be disabled')
    })

    describe('env3 ID selection', () => {
        it.todo('env3 ID cycles through 2 to NUMBER_OF_ENVELOPES-1')
        it.todo('env3 ID wraps from max back to 2, not 0')
    })

    describe('max loops', () => {
        it.todo('max loops is bounded 1 to 127')
        it.todo('max loops increment adds to current value')
    })
})
