import { button, nrpn } from '../../midi/midibus'
import masterClockControllers from '../../synthcore/modules/masterClock/masterClockControllers'
import { GlobalPatchState, globalStore } from '../globalStore'
import { isMidiReceiving, withMidiReceive } from './midiGuard'

let sendUnsub: (() => void) | undefined

export function startClockMidiSend() {
    stopClockMidiSend()

    let prev = globalStore.getState()

    sendUnsub = globalStore.subscribe((state) => {
        if (isMidiReceiving()) {
            prev = state
            return
        }

        const prevState = prev
        prev = state

        if (state.masterClock.rate !== prevState.masterClock.rate) {
            nrpn.send(0, masterClockControllers.RATE, Math.floor(65535 * state.masterClock.rate))
        }

        if (state.masterClock.source !== prevState.masterClock.source) {
            button.send(
                0,
                masterClockControllers.SOURCE,
                masterClockControllers.SOURCE.values[state.masterClock.source]
            )
        }
    })
}

export function stopClockMidiSend() {
    sendUnsub?.()
    sendUnsub = undefined
}

let receiveUnsubscribers: (() => void)[] = []

export function startClockMidiReceive() {
    stopClockMidiReceive()

    const rateId = nrpn.subscribe((_voiceGroupIndex: number, midiValue: number) => {
        const value = midiValue / 65535
        withMidiReceive(() => {
            globalStore.getState().set((state) => {
                state.masterClock.rate = value
            })
        })
    }, masterClockControllers.RATE)
    receiveUnsubscribers.push(() => nrpn.unsubscribe(masterClockControllers.RATE, rateId))

    const sourceId = button.subscribe((_voiceGroupIndex: number, midiValue: number) => {
        const value = masterClockControllers.SOURCE.values.indexOf(midiValue)
        if (value < 0) return
        withMidiReceive(() => {
            globalStore.getState().set((state) => {
                state.masterClock.source = value
            })
        })
    }, masterClockControllers.SOURCE)
    receiveUnsubscribers.push(() => button.unsubscribe(masterClockControllers.SOURCE, sourceId))
}

export function stopClockMidiReceive() {
    receiveUnsubscribers.forEach((unsub) => unsub())
    receiveUnsubscribers = []
}
