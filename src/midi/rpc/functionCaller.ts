let id = 0;
type MidiRPCCallback = (bytes: number[]) => void

const callbacks: Map<number, MidiRPCCallback> = new Map()

function callWithReturn<T>(label: string, funcToCall: (id: number, ...rest: any[]) => void, returnType: ReturnTypes) {

    const returnId = id++;
    if(returnType === 'void'){
        // TODO: No need to register callback, return
    }

    return new Promise((resolve, reject) => {
        const timerId = setTimeout(() => {
            reject(new Error(`Timeout waiting for ${label} return`))
            callbacks.delete(returnId)
        }, 5000)

        const onReturn = (bytes: number[]) =>{
            // TODO:
            const value = deserializeMidi(bytes, returnType.)
            console.log(`received return ${value} for ${label} return`)
            clearTimeout(timerId)
            resolve(value)
        }
        callbacks.set(returnId, onReturn)

        funcToCall(returnId, rest)
    })
}

function handleMidiRPCReturn(id: number, bytes: number[]){
    const callback = callbacks.get(id)
    if (callback) {
        callbacks.delete(id)
        callback(bytes)
    }
}