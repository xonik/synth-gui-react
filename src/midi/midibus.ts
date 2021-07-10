import { MidiConfig } from './types'

type MIDIMessageEvent = WebMidi.MIDIMessageEvent
type MIDIInput = WebMidi.MIDIInput
type MIDIOutput = WebMidi.MIDIOutput
type MIDIAccess = WebMidi.MIDIAccess

const sysexStartByte = 0xF0
const sysexEndByte = 0xF7

type CCSubscriber = {
    id: number;
    values: number[] | undefined;
    callback: (value: number) => void;
}

type CmdSubscriber = {
    id: number;
    values: number[] | undefined;
    callback: (values: number[]) => void;
}

const midiConfig = {
    inputIds: [
        '-213316575', // Akai MPK25 Port 1/A
    ],
    outputIds: ['-259958146'],
    sysexAddr: [1, 2, 3],
    channel: 0,
}

let ccForChannel = 0b10110000 + midiConfig.channel

let midiOut: MIDIOutput | undefined
let midiIn: MIDIInput | undefined

const loopback = true
let idPool = 0
const ccSubscribers: { [key: number]: CCSubscriber[] } = {}
const cmdSubscribers: { [key: number]: CmdSubscriber[] } = {}

export const subscribe = (callback: (value: number) => void, { cc, values }: MidiConfig) => {
    const id = idPool++
    ccSubscribers[cc] = [...(ccSubscribers[cc] || []), { id, values, callback }]
    return id
}

export const unsubscribe = (cc: number, id: number) => {
    const subscribersForCC = ccSubscribers[cc]
    const index = subscribersForCC.map(sub => sub.id).indexOf(id)
    if (index > -1) {
        ccSubscribers[cc] = [...subscribersForCC.slice(0, index), ...subscribersForCC.slice(index + 1)]
    }
}

export const subscribeToCmd = (callback: (values: number[]) => void, { cc, values }: MidiConfig) => {
    const id = idPool++
    cmdSubscribers[cc] = [...(cmdSubscribers[cc] || []), { id, values, callback }]
    return id
}

export const unsubscribeFromCmd = (cmd: number, id: number) => {
    const subscribersForCmd = cmdSubscribers[cmd]
    const index = subscribersForCmd.map(sub => sub.id).indexOf(id)
    if (index > -1) {
        cmdSubscribers[cmd] = [...subscribersForCmd.slice(0, index), ...subscribersForCmd.slice(index + 1)]
    }
}

const publishCC = (cc: number, value: number) => {
    if (ccSubscribers[cc]) {
        ccSubscribers[cc].forEach((subscriber) => {
            if (!subscriber.values || subscriber.values.includes(value)) {
                subscriber.callback(value)
            }
        })
    }
}

const publishCmd = (cmd: number, values: number[]) => {
    if (cmdSubscribers[cmd] && values.length > 0) {
        cmdSubscribers[cmd].forEach((subscriber) => {
            if (!subscriber.values || subscriber.values.includes(values[0])) {
                subscriber.callback(values)
            }
        })
    }
}

export const sendCC = (cc: number, value: number) => {
    if (loopback) {
        publishCC(cc, value)
    }
    if (midiOut) {
        midiOut.send([ccForChannel, cc, value])
    }
}

// Data must be max 16 bit.
export const send16 = (command: number, data: number) => {

    const B3 = data & 0b01111111;
    const B2 = (data >> 7) & 0b01111111;
    const B1 = (data >> 14) & 0b01111111;

    if (midiOut) {
        midiOut.send([sysexStartByte, ...midiConfig.sysexAddr, command, B1, B2, B3, sysexEndByte])
    }
}

export const send2x7 = (command: number, data1: number, data2: number) => {
    if (midiOut) {
        midiOut.send([sysexStartByte, ...midiConfig.sysexAddr, command, data1, data2, sysexEndByte])
    }
}

export const receiveMidiMessage = (midiEvent: MIDIMessageEvent) => {
    const midiData = midiEvent.data
    if (midiData[0] === ccForChannel) {
        publishCC(midiData[1], midiData[2])
    }
}

const updateSelectedMidi = async (midiAccess: MIDIAccess) => {
    console.log('UPDATING MIDI CONFIG')
    midiAccess.inputs.forEach((value, key) => console.log({ key, value }))
    midiAccess.outputs.forEach((value, key) => console.log({ key, value }))

    const foundInputId = midiConfig.inputIds.find(id => midiAccess.inputs.has(id))
    const foundOutputId = midiConfig.outputIds.find(id => midiAccess.outputs.has(id))

    if (foundInputId) {
        midiIn = midiAccess.inputs.get(foundInputId)
        if (midiIn) {
            midiIn.onmidimessage = receiveMidiMessage
        }
        console.log('Selected midi input', midiIn?.name)
    } else {
        midiIn = undefined
        console.log('Desired midi input not found')
    }

    if (foundOutputId) {
        midiOut = midiAccess.outputs.get(foundOutputId)
        console.log('Selected midi output', midiOut?.name)
    } else {
        midiOut = undefined
        console.log('Desired midi output not found')
    }

}

const onMIDISuccess = async (midiAccess: MIDIAccess) => {

    await updateSelectedMidi(midiAccess)

    midiAccess.onstatechange = async (connectionEvent) => {
        console.log(`Midi port ${connectionEvent.port.name} state changed to ${connectionEvent.port.state}, updating connections`)
        await updateSelectedMidi(midiAccess)
    }
}

const onMIDIFailure = () => {
    console.log('Could not access your MIDI devices.')
}

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({ sysex: true }).then(onMIDISuccess, onMIDIFailure)
}

//TODO: Close midi connection on app close!