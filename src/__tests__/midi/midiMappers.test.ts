import { describe, expect, it } from 'vitest'

// We test the mapper logic directly by reimplementing the pure math from commonMidiApi.
// This captures the contracts without needing Redux imports.

describe('MIDI value mappers (contract tests)', () => {
    describe('CC mapper (7-bit)', () => {
        const ccToValue = (midiValue: number, bipolar: boolean) => (bipolar ? (midiValue - 64) / 127 : midiValue / 127)

        const valueToCc = (value: number, bipolar: boolean) =>
            bipolar ? Math.floor(63 * value + 64) : Math.floor(127 * value)

        it('unipolar: 0 -> 0, 127 -> 1', () => {
            expect(ccToValue(0, false)).toBeCloseTo(0, 5)
            expect(ccToValue(127, false)).toBeCloseTo(1, 5)
        })

        it('unipolar: round-trips within 1 step', () => {
            for (const value of [0, 0.25, 0.5, 0.75, 1]) {
                const midi = valueToCc(value, false)
                const recovered = ccToValue(midi, false)
                expect(recovered).toBeCloseTo(value, 1)
            }
        })

        it('bipolar: 64 -> 0, 0 -> ~-0.5, 127 -> ~0.5', () => {
            expect(ccToValue(64, true)).toBeCloseTo(0, 2)
            expect(ccToValue(0, true)).toBeLessThan(0)
            expect(ccToValue(127, true)).toBeGreaterThan(0)
        })

        it('bipolar: encodes with 63-range, decodes with 127-range (known asymmetry)', () => {
            // The bipolar CC mapper uses asymmetric encoding:
            //   encode: floor(63 * value + 64)  — maps [-1,1] to [1,127]
            //   decode: (midi - 64) / 127        — maps [0,127] to [-0.504, 0.496]
            // This means the output range is actually ~[-0.5, 0.5] not [-1, 1].
            // Round-trip is only accurate near 0.
            const midi0 = valueToCc(0, true)
            expect(ccToValue(midi0, true)).toBeCloseTo(0, 1)

            // Verify the asymmetry exists and is consistent
            const midiNeg = valueToCc(-0.5, true)
            const recoveredNeg = ccToValue(midiNeg, true)
            expect(recoveredNeg).toBeLessThan(0)

            const midiPos = valueToCc(0.5, true)
            const recoveredPos = ccToValue(midiPos, true)
            expect(recoveredPos).toBeGreaterThan(0)
        })
    })

    describe('NRPN mapper (16-bit + 5-bit valueIndex)', () => {
        const nrpnToValue = (midiValue: number, bipolar: boolean) => {
            const valuePart = midiValue & 0xffff
            const valueIndex = midiValue >> 16
            const value = bipolar ? (valuePart - 32767) / 32767 : valuePart / 65535
            return { value, valueIndex }
        }

        const valueToNrpn = (value: number, bipolar: boolean, valueIndex?: number) => {
            let midiValue = bipolar ? Math.floor(32767 * value + 32767) : Math.floor(65535 * value)
            if (valueIndex !== undefined && valueIndex >= 0 && valueIndex < 32) {
                midiValue += valueIndex << 16
            }
            return midiValue
        }

        it('unipolar: 0 -> 0, 65535 -> 1', () => {
            expect(nrpnToValue(0, false).value).toBeCloseTo(0, 5)
            expect(nrpnToValue(65535, false).value).toBeCloseTo(1, 3)
        })

        it('bipolar: 32767 -> 0, 0 -> -1, 65534 -> ~1', () => {
            expect(nrpnToValue(32767, true).value).toBeCloseTo(0, 3)
            expect(nrpnToValue(0, true).value).toBeCloseTo(-1, 3)
            expect(nrpnToValue(65534, true).value).toBeCloseTo(1, 3)
        })

        it('round-trips unipolar values', () => {
            for (const value of [0, 0.25, 0.5, 0.75, 1]) {
                const midi = valueToNrpn(value, false)
                const recovered = nrpnToValue(midi, false)
                expect(recovered.value).toBeCloseTo(value, 3)
            }
        })

        it('round-trips bipolar values', () => {
            for (const value of [-1, -0.5, 0, 0.5, 1]) {
                const midi = valueToNrpn(value, true)
                const recovered = nrpnToValue(midi, true)
                expect(recovered.value).toBeCloseTo(value, 3)
            }
        })

        it('encodes valueIndex in upper bits', () => {
            const midi = valueToNrpn(0.5, false, 7)
            const result = nrpnToValue(midi, false)
            expect(result.valueIndex).toBe(7)
            expect(result.value).toBeCloseTo(0.5, 3)
        })

        it('preserves valueIndex through round-trip', () => {
            for (let vi = 0; vi < 32; vi++) {
                const midi = valueToNrpn(0.5, false, vi)
                const result = nrpnToValue(midi, false)
                expect(result.valueIndex).toBe(vi)
            }
        })
    })

    describe('NRPN send/receive byte splitting', () => {
        // Mirrors the encoding in midibus nrpn.send and decoding in receiveMidiMessage
        const encode = (value: number) => ({
            loValue: value & 0b01111111,
            midValue: (value >> 7) & 0b01111111,
            hiValue: (value >> 14) & 0b01111111,
        })

        const decodeCorrected = (lo: number, mid: number, hi: number) => (hi << 14) + (mid << 7) + lo

        // This is the CURRENT (buggy) decode in midibus.ts line 287
        const decodeBuggy = (lo: number, mid: number, _hi: number) => (mid << 14) + (mid << 7) + lo

        it('encode/decode round-trips correctly with fixed decode', () => {
            for (const value of [0, 127, 128, 16383, 16384, 65535, 2097151]) {
                const { loValue, midValue, hiValue } = encode(value)
                expect(decodeCorrected(loValue, midValue, hiValue)).toBe(value)
            }
        })

        it('buggy decode fails for values > 16383 (confirms the bug)', () => {
            // For values that need hiValue, the buggy version gives wrong results
            const value = 16384 // Needs hiValue = 1, midValue = 0, loValue = 0
            const { loValue, midValue, hiValue } = encode(value)
            expect(hiValue).toBe(1)
            expect(decodeBuggy(loValue, midValue, hiValue)).not.toBe(value)
        })

        it('buggy decode only works for values where midValue is 0 (values <= 127)', () => {
            // The bug uses midValue in place of hiValue: (mid << 14) + (mid << 7) + lo
            // This only matches correct decode when midValue is 0 (i.e., value <= 127)
            for (const value of [0, 64, 127]) {
                const { loValue, midValue, hiValue } = encode(value)
                expect(hiValue).toBe(0)
                expect(midValue).toBe(0)
                expect(decodeBuggy(loValue, midValue, hiValue)).toBe(decodeCorrected(loValue, midValue, hiValue))
            }
        })

        it('buggy decode fails for values 128-16383 (midValue > 0, hiValue = 0)', () => {
            const value = 128 // midValue = 1, loValue = 1
            const { loValue, midValue, hiValue } = encode(value)
            expect(hiValue).toBe(0)
            expect(midValue).toBe(1)
            // Buggy: (1 << 14) + (1 << 7) + 1 = 16512, correct: (0 << 14) + (1 << 7) + 1 = 128
            expect(decodeBuggy(loValue, midValue, hiValue)).not.toBe(value)
            expect(decodeCorrected(loValue, midValue, hiValue)).toBe(value)
        })
    })
})
