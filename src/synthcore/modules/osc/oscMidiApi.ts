/**
 * oscMidiApi.ts
 *
 * Placeholder for oscillator / wavetable MIDI API.
 * Will be wired up when MIDI communication for wavetables is implemented.
 */

// TODO: import cc, paramSend, paramReceive etc. from MIDI infrastructure when implementing

export type ApiSource = 'GUI' | 'MIDI'

const wavetableSelect = (() => {
    return {
        send: (_source: ApiSource, _wavetableIndex: number) => {
            // TODO: send wavetable select CC
        },
        receive: () => {
            // TODO: subscribe to wavetable select CC
        },
    }
})()

const wavetableEntry = (() => {
    return {
        send: (
            _source: ApiSource,
            _wavetableIndex: number,
            _entryIndex: number,
            _bankIndex: number,
            _waveIndex: number,
            _position: number
        ) => {
            // TODO: send wavetable entry data
        },
        receive: () => {
            // TODO: subscribe to wavetable entry updates
        },
    }
})()

const initReceive = () => {
    wavetableSelect.receive()
    wavetableEntry.receive()
}

const oscMidiApi = {
    wavetableSelect,
    wavetableEntry,
    initReceive,
}

export default oscMidiApi
