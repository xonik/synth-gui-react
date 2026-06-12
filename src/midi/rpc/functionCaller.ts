import logger from '../../utils/logger'
import type { DataType } from './dataTypes'

type MidiRPCCallback = (bytes: number[]) => void
type NonVoidDataType = Exclude<DataType, 'void'>

const TIMEOUT_MS = 5000

let nextId = 0
const callbacks: Map<number, MidiRPCCallback> = new Map()

export function call(label: string, funcToCall: () => void): void {
    logger.midi(`RPC call to ${label}`)
    funcToCall()
}

export function callWithReturn<T>(
    label: string,
    funcToCall: (id: number) => void,
    returnType: NonVoidDataType,
): Promise<T> {
    const returnId = nextId++
    logger.midi(`RPC call to ${label} (id ${returnId})`)

    return new Promise<T>((resolve, reject) => {
        const timerId = setTimeout(() => {
            callbacks.delete(returnId)
            reject(new Error(`Timeout waiting for ${label} return`))
        }, TIMEOUT_MS)

        callbacks.set(returnId, (bytes) => {
            clearTimeout(timerId)
            // TODO: implement deserializeMidi
            const value = deserializeMidi(bytes, returnType) as T
            resolve(value)
        })

        funcToCall(returnId)
    })
}

export function handleMidiRPCReturn(id: number, bytes: number[]) {
    const callback = callbacks.get(id)
    if (callback) {
        callbacks.delete(id)
        callback(bytes)
    }
}

declare function deserializeMidi(bytes: number[], type: NonVoidDataType): unknown
