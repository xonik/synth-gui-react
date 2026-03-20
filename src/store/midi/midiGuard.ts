/**
 * Guard to prevent MIDI send/receive feedback loops.
 *
 * When MIDI receive writes to the Zustand store, the store subscription
 * in MIDI send would otherwise re-send the same values back out.
 * Wrap receive-side store writes with withMidiReceive() to suppress sends.
 */

let receiving = false

export function isMidiReceiving(): boolean {
    return receiving
}

export function withMidiReceive(fn: () => void): void {
    receiving = true
    try {
        fn()
    } finally {
        receiving = false
    }
}
