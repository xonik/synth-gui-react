const MIDI_LOG_KEY = 'midi_log_enabled'

const loadMidiLogging = (): boolean => {
    try {
        const saved = localStorage.getItem(MIDI_LOG_KEY)
        if (saved !== null) return JSON.parse(saved)
    } catch {}
    return true
}

let logMidi = loadMidiLogging()

export const setMidiLogging = (enabled: boolean) => {
    logMidi = enabled
    try {
        localStorage.setItem(MIDI_LOG_KEY, JSON.stringify(enabled))
    } catch {}
}

export const getMidiLogging = (): boolean => logMidi

const midi = (...logItems: any[]) => {
    if (logMidi) {
        console.log(...logItems)
    }
}
const midiMsg = (data: number[]) => {
    if (logMidi) {
        console.log(data.join(','))
    }
}

const logger = {
    midi,
    midiMsg,
}

export default logger
