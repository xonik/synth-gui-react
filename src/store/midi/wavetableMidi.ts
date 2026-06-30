/**
 * MIDI send/receive for wavetable edits.
 *
 * Unlike the other store/midi modules, wavetable edits are discrete sysex
 * commands (add/remove/move/load) rather than scalar parameter mirrors, so
 * sends are emitted from the store actions (which know the operation) via the
 * exported send helpers below instead of from a change-diffing subscription.
 * Receive writes are wrapped in withMidiReceive() so they don't echo back out.
 */

import { getMaxSysexPayloadLength, sysex } from '@/midi/midibus'
import { useWavetableStore, type WaveEntry } from '@/store/wavetableStore'
import wavetableControllers from '@/synthcore/modules/wavetable/wavetableControllers'
import logger from '@/utils/logger'
import { withMidiReceive } from './midiGuard'

const BYTES_PER_ENTRY = 3

// payload: [wavetableId, bankIndex, waveIndex, position]
export const sendAddWave = (wavetableId: number, bankIndex: number, waveIndex: number, position: number) => {
    logger.midi(`Adding wave (bank ${bankIndex}, wave ${waveIndex}) at ${position} to wavetable ${wavetableId}`)
    sysex.send(-1, { ...wavetableControllers.ADD_WAVE, values: [wavetableId, bankIndex, waveIndex, position] })
}

// payload: [wavetableId, position]
export const sendRemoveWave = (wavetableId: number, position: number) => {
    logger.midi(`Removing wave at ${position} from wavetable ${wavetableId}`)
    sysex.send(-1, { ...wavetableControllers.REMOVE_WAVE, values: [wavetableId, position] })
}

// payload: [wavetableId, fromPosition, toPosition]
export const sendMoveWave = (wavetableId: number, fromPosition: number, toPosition: number) => {
    logger.midi(`Moving wave in wavetable ${wavetableId} from ${fromPosition} to ${toPosition}`)
    sysex.send(-1, { ...wavetableControllers.MOVE_WAVE, values: [wavetableId, fromPosition, toPosition] })
}

// payload: [wavetableId, (bankIndex, waveIndex, position)...], split across
// several sysex messages when the entries don't fit the maximum sysex length.
export const sendLoadWavetable = (wavetableId: number, entries: WaveEntry[]) => {
    logger.midi(`Loading wavetable ${wavetableId} with ${entries.length} entries`)

    const sendChunk = (chunk: WaveEntry[]) => {
        const values = [wavetableId]
        chunk.forEach((entry) => {
            values.push(entry.bankIndex, entry.waveIndex, entry.position)
        })
        sysex.send(-1, { ...wavetableControllers.LOAD, values })
    }

    if (entries.length === 0) {
        sendChunk([])
        return
    }

    // Reserve one payload byte for the wavetable id.
    const maxEntriesPerChunk = Math.max(1, Math.floor((getMaxSysexPayloadLength() - 1) / BYTES_PER_ENTRY))
    for (let i = 0; i < entries.length; i += maxEntriesPerChunk) {
        sendChunk(entries.slice(i, i + maxEntriesPerChunk))
    }
}

let receiveUnsubscribers: (() => void)[] = []

export function startWavetableMidiReceive() {
    stopWavetableMidiReceive()

    const addId = sysex.subscribe((_voiceGroupIndex, [wavetableId, bankIndex, waveIndex, position]) => {
        withMidiReceive(() => {
            useWavetableStore.getState().addWaveAt(wavetableId, bankIndex, waveIndex, position)
        })
    }, wavetableControllers.ADD_WAVE)
    receiveUnsubscribers.push(() => sysex.unsubscribe(wavetableControllers.ADD_WAVE, addId))

    const removeId = sysex.subscribe((_voiceGroupIndex, [wavetableId, position]) => {
        withMidiReceive(() => {
            useWavetableStore.getState().removeWaveAt(wavetableId, position)
        })
    }, wavetableControllers.REMOVE_WAVE)
    receiveUnsubscribers.push(() => sysex.unsubscribe(wavetableControllers.REMOVE_WAVE, removeId))

    const moveId = sysex.subscribe((_voiceGroupIndex, [wavetableId, fromPosition, toPosition]) => {
        withMidiReceive(() => {
            useWavetableStore.getState().moveWaveTo(wavetableId, fromPosition, toPosition)
        })
    }, wavetableControllers.MOVE_WAVE)
    receiveUnsubscribers.push(() => sysex.unsubscribe(wavetableControllers.MOVE_WAVE, moveId))

    const loadId = sysex.subscribe((_voiceGroupIndex, values) => {
        const wavetableId = values[0]
        const entries: WaveEntry[] = []
        for (let i = 1; i + 2 < values.length; i += BYTES_PER_ENTRY) {
            entries.push({ bankIndex: values[i], waveIndex: values[i + 1], position: values[i + 2] })
        }
        withMidiReceive(() => {
            useWavetableStore.getState().loadWavetableEntries(wavetableId, entries)
        })
    }, wavetableControllers.LOAD)
    receiveUnsubscribers.push(() => sysex.unsubscribe(wavetableControllers.LOAD, loadId))
}

export function stopWavetableMidiReceive() {
    receiveUnsubscribers.forEach((unsub) => {
        unsub()
    })
    receiveUnsubscribers = []
}
