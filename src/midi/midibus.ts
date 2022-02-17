import { ControllerConfigCC, ControllerConfigNRPN } from './types'
import { store } from '../synthcore/store'
import { selectMidiChannel } from '../synthcore/modules/settings/settingsReducer'
import CC from './mapCC'
import logger from '../utils/logger'
import { handleMpk25 } from './mpk25translator'

type MIDIMessageEvent = WebMidi.MIDIMessageEvent
type MIDIInput = WebMidi.MIDIInput
type MIDIOutput = WebMidi.MIDIOutput
type MIDIAccess = WebMidi.MIDIAccess

type CCSubscriber = {
    id: number;
    values: number[] | undefined;
    callback: (value: number) => void;
}

type NRPNSubscriber = {
    id: number;
    values: number[] | undefined;
    callback: (value: number) => void;
}

const midiConfig = {
    inputIds: [
        '-213316575', // Akai MPK25 Port 1/A
        '1211529875', // Steinberg UR22C Port 1
        //'-762163153', // Steinberg UR22C Port 2

    ],
    outputIds: [
        '-259958146',
        '437363294', // Steinberg UR22C Port 1
        // '298365873', // Steinberg UR22C Port 2
    ],
    sysexAddr: [1, 2, 3],
    channel: 0,
}

const MIDI_CC = 0b10110000

let midiOut: MIDIOutput | undefined
let midiIn: MIDIInput | undefined

let idPool = 0
const ccSubscribers: { [key: number]: CCSubscriber[] } = {}
const nrpnSubscribers: { [key: number]: NRPNSubscriber[] } = {}

const getChannel = () => selectMidiChannel(store.getState())

export const cc = {
    subscribe: (callback: (value: number) => void, { cc, values }: ControllerConfigCC) => {
        const id = idPool++
        ccSubscribers[cc] = [...(ccSubscribers[cc] || []), { id, values, callback }]
        return id
    },
    unsubscribe: (controller: ControllerConfigCC, id: number) => {
        const subscribersForCC = ccSubscribers[controller.cc]
        const index = subscribersForCC.map(sub => sub.id).indexOf(id)
        if (index > -1) {
            ccSubscribers[controller.cc] = [...subscribersForCC.slice(0, index), ...subscribersForCC.slice(index + 1)]
        }
    },
    publish: (cc: number, value: number) => {
        if (ccSubscribers[cc]) {
            ccSubscribers[cc].forEach((subscriber) => {
                if (!subscriber.values || subscriber.values.includes(value)) {
                    subscriber.callback(value)
                }
            })
        }
    },
    send: (controller: ControllerConfigCC, value: number, loopback = false) => {
        if (loopback) {
            cc.publish(controller.cc, value)
        }
        if (midiOut) {
            const ccForChannel = MIDI_CC + getChannel()
            const data = [ccForChannel, controller.cc, value]
            logger.midiMsg(data)
            midiOut.send(data)
        }
    }
}

export const nrpn = {
    subscribe: (callback: (value: number) => void, { addr, values }: ControllerConfigNRPN) => {
        const id = idPool++
        nrpnSubscribers[addr] = [...(nrpnSubscribers[addr] || []), { id, values, callback }]
        return id
    },
    unsubscribe: (controller: ControllerConfigNRPN, id: number) => {
        const subscribersForNRPN = nrpnSubscribers[controller.addr]
        const index = subscribersForNRPN.map(sub => sub.id).indexOf(id)
        if (index > -1) {
            nrpnSubscribers[controller.addr] = [...subscribersForNRPN.slice(0, index), ...subscribersForNRPN.slice(index + 1)]
        }
    },
    publish: (addr: number, value: number) => {
        if (nrpnSubscribers[addr]) {
            nrpnSubscribers[addr].forEach((subscriber) => {
                if (!subscriber.values || subscriber.values.includes(value)) {
                    subscriber.callback(value)
                }
            })
        }
    },
    send: (controller: ControllerConfigNRPN, value: number, loopback = false) => {
        if (loopback) {
            nrpn.publish(controller.addr, value)
        }
        if (midiOut) {
            const loAddr = controller.addr & 0b01111111
            const hiAddr = (controller.addr >> 7) & 0b01111111

            const loValue = value & 0b01111111
            const midValue = (value >> 7) & 0b01111111
            const hiValue = (value >> 14) & 0b01111111

            const ccForChannel = MIDI_CC + getChannel()

            let data = [ccForChannel, CC.NRPN_MSB, hiAddr, ccForChannel, CC.NRPN_LSB, loAddr]
            if(value > 16383) {
                data.push(ccForChannel)
                data.push(CC.DATA_ENTRY_HSB)
                data.push(hiValue)
            }
            if(value > 127) {
                data.push(ccForChannel)
                data.push(CC.DATA_ENTRY_MSB)
                data.push(midValue)
            }
            data.push(ccForChannel)
            data.push(CC.DATA_ENTRY_LSB)
            data.push(loValue)

            logger.midiMsg(data)
            midiOut.send(data)
        }
    }
}

const currNRPN = {
    hiAddr: 0,
    loAddr: 0,
    hiValue: 0,
    midValue: 0,
    loValue: 0,
}

export const receiveMidiMessage = (midiEvent: MIDIMessageEvent) => {
    const midiData = midiEvent.data
    const ccForChannel = MIDI_CC + getChannel()
    if (midiData[0] === ccForChannel) {
        if(handleMpk25(midiData[1], midiData[2])){
            return
        }
        if (midiData[1] === CC.NRPN_MSB) {
            currNRPN.hiAddr = midiData[2]
        } else if(midiData[1] === CC.NRPN_LSB) {
            currNRPN.loAddr = midiData[2]
        } else if(midiData[1] === CC.DATA_ENTRY_HSB) {
            currNRPN.hiValue = midiData[2]
        } else if(midiData[1] === CC.DATA_ENTRY_MSB) {
            currNRPN.midValue = midiData[2]
        } else if(midiData[1] === CC.DATA_ENTRY_LSB) {
            // triggering an update on lsb means we don't have to send hsb and msb if we
            // don't want to
            currNRPN.loValue = midiData[2]
            const addr = (currNRPN.hiAddr << 7) + currNRPN.loAddr
            const value = (currNRPN.midValue << 14) + (currNRPN.midValue << 7) + currNRPN.loValue
            nrpn.publish(addr, value)
            currNRPN.hiValue = 0
            currNRPN.midValue = 0
            currNRPN.loValue = 0
        } else {
            cc.publish(midiData[1], midiData[2])
        }
    } else {
        midiOut?.send(midiData)
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