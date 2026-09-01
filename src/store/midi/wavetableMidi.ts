/**
 * MIDI send/receive for wavetable edits.
 *
 * Wavetable updates are sent as a full snapshot load message instead of
 * discrete add/remove/move operations. Receive writes are wrapped in
 * withMidiReceive() so they don't echo back out.
 */

import { sysex } from '@/midi/midibus'
import { useWavetableStore, type WaveEntry } from '@/store/wavetableStore'
import wavetableControllers from '@/synthcore/modules/wavetable/wavetableControllers'
import logger from '@/utils/logger'
import { withMidiReceive } from './midiGuard'

const BYTES_PER_ENTRY = 3

// payload: [wavetableId, count, (index, bankIndex, waveIndex)...]
export const updateWavetable = (wavetableId: number, entries: WaveEntry[]) => {
    logger.midi(`Updating wavetable ${wavetableId} with ${entries.length} entries`)

    const values = [wavetableId, entries.length]
    entries.forEach((entry) => {
        values.push(entry.position, entry.bankIndex, entry.waveIndex)
    })
    sysex.send(-1, { ...wavetableControllers.UPDATE, values })
}

let receiveUnsubscribers: (() => void)[] = []

export function startWavetableMidiReceive() {
    stopWavetableMidiReceive()

    const loadId = sysex.subscribe((_voiceGroupIndex, values) => {
        const wavetableId = values[0] ?? 0
        const count = values[1] ?? 0
        const entries: WaveEntry[] = []
        for (let i = 2; i + 2 < values.length && entries.length < count; i += BYTES_PER_ENTRY) {
            entries.push({ position: values[i], bankIndex: values[i + 1], waveIndex: values[i + 2] })
        }
        withMidiReceive(() => {
            useWavetableStore.getState().loadWavetableEntries(wavetableId, entries)
        })
    }, wavetableControllers.UPDATE)
    receiveUnsubscribers.push(() => sysex.unsubscribe(wavetableControllers.UPDATE, loadId))
}

export function stopWavetableMidiReceive() {
    receiveUnsubscribers.forEach((unsub) => {
        unsub()
    })
    receiveUnsubscribers = []
}
