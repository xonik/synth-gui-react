import { describe, expect, it } from 'vitest'
import { isMidiReceiving, withMidiReceive } from '../../store/midi/midiGuard'

describe('midiGuard', () => {
    it('is not receiving by default', () => {
        expect(isMidiReceiving()).toBe(false)
    })

    it('sets receiving flag during callback', () => {
        let wasMidiReceiving = false
        withMidiReceive(() => {
            wasMidiReceiving = isMidiReceiving()
        })
        expect(wasMidiReceiving).toBe(true)
        expect(isMidiReceiving()).toBe(false)
    })

    it('resets flag even if callback throws', () => {
        try {
            withMidiReceive(() => {
                throw new Error('test')
            })
        } catch {
            // expected
        }
        expect(isMidiReceiving()).toBe(false)
    })
})
