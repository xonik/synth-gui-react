import { afterEach, describe, expect, it, vi } from 'vitest'
import { sysex } from '../../midi/midibus'
import {
    decodeSynthId14,
    encodeSynthId14,
    getSynthConnectionStatus,
    SYNTH_HEARTBEAT_TIMEOUT_MS,
    startSynthConnectionMonitor,
    stopSynthConnectionMonitor,
} from '../../midi/synthConnection'

afterEach(() => {
    stopSynthConnectionMonitor()
    vi.useRealTimers()
})

describe('synth ready ID payload', () => {
    it.each([0, 1, 127, 128, 8192, 16383])('round-trips 14-bit ID %i', (synthId) => {
        expect(decodeSynthId14(encodeSynthId14(synthId))).toBe(synthId)
    })

    it('rejects payloads that are not two 7-bit values', () => {
        expect(decodeSynthId14([])).toBeNull()
        expect(decodeSynthId14([0, 1, 2])).toBeNull()
        expect(decodeSynthId14([0, 128])).toBeNull()
    })

    it('rejects IDs outside the 14-bit range', () => {
        expect(() => encodeSynthId14(-1)).toThrow(RangeError)
        expect(() => encodeSynthId14(16384)).toThrow(RangeError)
    })

    it('tracks main-route heartbeats and marks the synth offline after the timeout', () => {
        vi.useFakeTimers()
        startSynthConnectionMonitor()

        sysex.publish({ type: 'main' }, 4, encodeSynthId14(12345))
        expect(getSynthConnectionStatus()).toEqual({ connected: true, synthId: 12345 })

        vi.advanceTimersByTime(SYNTH_HEARTBEAT_TIMEOUT_MS)
        expect(getSynthConnectionStatus()).toEqual({ connected: false, synthId: 12345 })
    })

    it('ignores heartbeats sent on routes other than main', () => {
        startSynthConnectionMonitor()
        const statusBeforeHeartbeat = getSynthConnectionStatus()
        sysex.publish({ type: 'voiceGroup', index: 0 }, 4, encodeSynthId14(12345))
        expect(getSynthConnectionStatus()).toEqual(statusBeforeHeartbeat)
    })
})
