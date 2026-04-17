import { cc, lastSentMidiGroup } from '@/midi/midibus'
import type { ControllerConfig, ControllerConfigCC } from '@/midi/types'
import { type MidiGroup } from '@/midi/types'
import { paramSend } from '@/synthcore/modules/common/commonMidiApi'
import type { NumericInputProperty } from '@/synthcore/modules/common/types'
import { type PatchStore, voiceGroupStores } from '@/store/patchStore'
import { isMidiReceiving } from './midiGuard'

// --- Shared output mappers ---

export const curveOutputMapper = (curveIndex: number, _cfg: unknown, valueIndex: number = 0) =>
    (valueIndex << 7) + curveIndex

export const stageEnabledOutputMapper = (enabled: number, _cfg: unknown, valueIndex: number = 0) => {
    const enableBit = enabled ? 0b1000 : 0
    return valueIndex | enableBit
}

// --- Select sender factory ---

export function createSelectSender(cfg: ControllerConfigCC, midiGroup: MidiGroup) {
    let currentSentId = -1
    let lastSentTimestamp = 0

    return {
        send: (voiceGroupIndex: number, id: number) => {
            if (
                id !== currentSentId ||
                (lastSentMidiGroup !== midiGroup && Date.now() - lastSentTimestamp > 10000) ||
                Date.now() - lastSentTimestamp > 30000
            ) {
                currentSentId = id
                lastSentTimestamp = Date.now()
                cc.send(voiceGroupIndex, cfg, id)
            }
        },
        reset: () => {
            currentSentId = -1
            lastSentTimestamp = 0
        },
    }
}

// --- Module paramSend factory ---

type OutputMapper = (value: number, ctrl: ControllerConfig, valueIndex?: number) => number

export function createModuleParamSend(selectCfg: ControllerConfigCC, midiGroup: MidiGroup) {
    const selectSender = createSelectSender(selectCfg, midiGroup)

    const moduleParamSend = (input: NumericInputProperty, outputMapper?: OutputMapper) => {
        selectSender.send(input.voiceGroupIndex, input.ctrlIndex || 0)
        paramSend(input, outputMapper)
    }

    return { moduleParamSend, selectSender }
}

// --- Store subscription factory ---

export function createStoreMidiSend<T>(config: {
    getItems: (state: PatchStore) => T[]
    itemCount: number
    sendItem: (voiceGroupIndex: number, itemId: number, current: T, previous: T) => void
    onStop?: () => void
}): { start: () => void; stop: () => void } {
    let unsubscribers: (() => void)[] = []

    function start() {
        stop()
        voiceGroupStores.forEach((store, voiceGroupIndex) => {
            let previousItems = config.getItems(store.getState())

            const unsub = store.subscribe((state) => {
                if (isMidiReceiving()) {
                    previousItems = config.getItems(state)
                    return
                }
                const currentItems = config.getItems(state)
                if (currentItems !== previousItems) {
                    const prev = previousItems
                    previousItems = currentItems

                    for (let i = 0; i < Math.min(currentItems.length, config.itemCount); i++) {
                        if (currentItems[i] !== prev[i]) {
                            config.sendItem(voiceGroupIndex, i, currentItems[i], prev[i])
                        }
                    }
                }
            })

            unsubscribers.push(unsub)
        })
    }

    function stop() {
        unsubscribers.forEach((unsub) => unsub())
        unsubscribers = []
        config.onStop?.()
    }

    return { start, stop }
}
