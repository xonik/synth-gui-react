import type { Route } from './midibus'
import { sysex, sysexCommands } from './midibus'

export const SYNTH_HEARTBEAT_TIMEOUT_MS = 10_000
export const SYNTH_ID14_MAX = 0x3fff

export type SynthConnectionStatus = {
    connected: boolean
    synthId: number | null
}

const synthReadyController = { command: sysexCommands.SYNTH_READY }

let status: SynthConnectionStatus = { connected: false, synthId: null }
let disconnectTimeout: ReturnType<typeof setTimeout> | undefined
let unsubscribe: (() => void) | undefined
const listeners = new Set<() => void>()

export const encodeSynthId14 = (synthId: number): [number, number] => {
    if (!Number.isInteger(synthId) || synthId < 0 || synthId > SYNTH_ID14_MAX) {
        throw new RangeError(`Synth ID must be an integer from 0 to ${SYNTH_ID14_MAX}`)
    }
    return [(synthId >> 7) & 0x7f, synthId & 0x7f]
}

export const decodeSynthId14 = (payload: number[]): number | null => {
    if (payload.length !== 2 || payload.some((value) => !Number.isInteger(value) || value < 0 || value > 0x7f)) {
        return null
    }
    return (payload[0] << 7) | payload[1]
}

const updateStatus = (nextStatus: SynthConnectionStatus) => {
    if (status.connected === nextStatus.connected && status.synthId === nextStatus.synthId) return
    status = nextStatus
    listeners.forEach((listener) => {
        listener()
    })
}

const handleSynthReady = (route: Route, payload: number[]) => {
    if (route.type !== 'main') return
    const synthId = decodeSynthId14(payload)
    if (synthId === null) {
        console.warn('Ignoring malformed SYNTH_READY payload', payload)
        return
    }

    updateStatus({ connected: true, synthId })
    if (disconnectTimeout) clearTimeout(disconnectTimeout)
    disconnectTimeout = setTimeout(() => {
        updateStatus({ connected: false, synthId: status.synthId })
        disconnectTimeout = undefined
    }, SYNTH_HEARTBEAT_TIMEOUT_MS)
}

export const startSynthConnectionMonitor = () => {
    if (unsubscribe) return
    const subscriptionId = sysex.subscribe(handleSynthReady, synthReadyController)
    unsubscribe = () => sysex.unsubscribe(synthReadyController, subscriptionId)
}

export const stopSynthConnectionMonitor = () => {
    unsubscribe?.()
    unsubscribe = undefined
    if (disconnectTimeout) clearTimeout(disconnectTimeout)
    disconnectTimeout = undefined
}

export const getSynthConnectionStatus = (): SynthConnectionStatus => status

export const subscribeSynthConnectionStatus = (listener: () => void) => {
    listeners.add(listener)
    return () => {
        listeners.delete(listener)
    }
}
