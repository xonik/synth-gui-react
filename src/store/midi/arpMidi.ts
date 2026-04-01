import { button, nrpn } from '@/midi/midibus'
import type { ControllerConfigButton } from '@/midi/types'
import { globalStore } from '@/store'
import arpControllers from '../../synthcore/modules/arp/arpControllers'
import { isMidiReceiving, withMidiReceive } from './midiGuard'

interface ButtonMapping {
    field: keyof typeof fields
    ctrl: ControllerConfigButton
}

const fields = {
    onOff: 'onOff' as const,
    trigger: 'trigger' as const,
    sync: 'sync' as const,
    range: 'range' as const,
    mode: 'mode' as const,
    sequence: 'sequence' as const,
}

const buttonMappings: ButtonMapping[] = [
    { field: 'onOff', ctrl: arpControllers.ON_OFF },
    { field: 'trigger', ctrl: arpControllers.TRIGGER },
    { field: 'sync', ctrl: arpControllers.SYNC },
    { field: 'range', ctrl: arpControllers.RANGE },
    { field: 'mode', ctrl: arpControllers.MODE },
    { field: 'sequence', ctrl: arpControllers.SEQUENCE },
]

let sendUnsub: (() => void) | undefined

export function startArpMidiSend() {
    stopArpMidiSend()

    let prev = globalStore.getState()

    sendUnsub = globalStore.subscribe((state) => {
        if (isMidiReceiving()) {
            prev = state
            return
        }

        const prevState = prev
        prev = state

        if (state.arp.bpm !== prevState.arp.bpm) {
            nrpn.send(0, arpControllers.BPM, Math.floor(65535 * state.arp.bpm))
        }

        for (const m of buttonMappings) {
            const current = state.arp[m.field]
            const previous = prevState.arp[m.field]
            if (current !== previous) {
                button.send(0, m.ctrl, m.ctrl.values[current])
            }
        }
    })
}

export function stopArpMidiSend() {
    sendUnsub?.()
    sendUnsub = undefined
}

let receiveUnsubscribers: (() => void)[] = []

export function startArpMidiReceive() {
    stopArpMidiReceive()

    const bpmId = nrpn.subscribe((_voiceGroupIndex: number, midiValue: number) => {
        const value = midiValue / 65535
        withMidiReceive(() => {
            globalStore.getState().set((state) => {
                state.arp.bpm = value
            })
        })
    }, arpControllers.BPM)
    receiveUnsubscribers.push(() => nrpn.unsubscribe(arpControllers.BPM, bpmId))

    for (const m of buttonMappings) {
        const id = button.subscribe((_voiceGroupIndex: number, midiValue: number) => {
            const value = m.ctrl.values.indexOf(midiValue)
            if (value < 0) return
            withMidiReceive(() => {
                globalStore.getState().set((state) => {
                    state.arp[m.field] = value
                })
            })
        }, m.ctrl)
        receiveUnsubscribers.push(() => button.unsubscribe(m.ctrl, id))
    }
}

export function stopArpMidiReceive() {
    receiveUnsubscribers.forEach((unsub) => {
        unsub()
    })
    receiveUnsubscribers = []
}
