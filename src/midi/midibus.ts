import {
    ControllerConfigButton,
    ControllerConfigCC,
    ControllerConfigNRPN,
    MidiGroup
} from './types'
import { store } from '../synthcore/store'
import status from './midiStatus'
import {
    getVoiceGroupIdFromMidiChannel,
    selectGlobalMidiChannel,
    selectVoiceGroupMidiChannel
} from '../synthcore/modules/settings/settingsReducer'
import CC, { buttonCCs } from './mapCC'
import logger from '../utils/logger'
import { handleMpk25 } from './mpk25translator'

type MIDIMessageEvent = WebMidi.MIDIMessageEvent
type MIDIInput = WebMidi.MIDIInput
type MIDIOutput = WebMidi.MIDIOutput
type MIDIAccess = WebMidi.MIDIAccess

export let lastSentMidiGroup: MidiGroup | undefined;

type CCSubscriber = {
    id: number;
    values: number[] | undefined;
    callback: (voiceGroupIndex: number, value: number) => void;
}

type ButtonSubscriber = {
    id: number;
    values: number[] | undefined;
    callback: (voiceGroupIndex: number, value: number) => void;
}

type NRPNSubscriber = {
    id: number;
    values: number[] | undefined;
    callback: (voiceGroupIndex: number, value: number) => void;
}

/*
{key: '505084812', value: MIDIInput}
midibus.ts:191 {key: '1055775126', value: MIDIInput}
midibus.ts:192 {key: '-746118775', value: MIDIOutput}
midibus.ts:192 {key: '347087974', value: MIDIOutput}
 */
const midiConfig = {
    inputIds: [
        '-213316575', // Akai MPK25 Port 1/A
        '1211529875', // Steinberg UR22C Port 1
        '505084812', // Steinberg UR22C Port 1
        'vdYvBfG28aCbHM9U6S3RAB8EwW4YMLWpA6pdZ0Eq9tM=', // Steinberg UR22C Port 1 Firefox
        //'-762163153', // Steinberg UR22C Port 2

    ],
    outputIds: [
        '-259958146',
        '437363294', // Steinberg UR22C Port 1
        '-746118775', // Steinberg UR22C Port 1
        'vdYvBfG28aCbHM9U6S3RAB8EwW4YMLWpA6pdZ0Eq9tM=', // Steinberg UR22C Port 1 Firefox
        // '298365873', // Steinberg UR22C Port 2
    ],
    sysexAddr: [1, 2, 3],
    channel: 0,
}

export const sysexCommands = {
    RPC: 0,
}

let midiOut: MIDIOutput | undefined
let midiIn: MIDIInput | undefined

let idPool = 0
let buttonSubscribers: ButtonSubscriber[] = []
const ccSubscribers: { [key: number]: CCSubscriber[] } = {}
const nrpnSubscribers: { [key: number]: NRPNSubscriber[] } = {}

const getChannel = (global: boolean, voiceGroupIndex: number) => {
    if (global) {
        return selectGlobalMidiChannel(store.getState())
    } else {
        return selectVoiceGroupMidiChannel(store.getState(), voiceGroupIndex)
    }
}

export const button = {
    subscribe: (callback: (voiceGroupIndex: number, value: number) => void, { values }: ControllerConfigButton) => {
        const id = idPool++
        buttonSubscribers = [
            ...(buttonSubscribers || []), { id, values, callback }
        ]
        return id
    },
    unsubscribe: (controller: ControllerConfigButton, id: number) => {
        const index = buttonSubscribers.map(sub => sub.id).indexOf(id)
        if (index > -1) {
            buttonSubscribers = [...buttonSubscribers.slice(0, index), ...buttonSubscribers.slice(index + 1)]
        }
    },
    publish: (voiceGroupIndex: number, value: number) => {
        if (buttonSubscribers) {
            buttonSubscribers.forEach((subscriber) => {
                if (!subscriber.values || subscriber.values.includes(value)) {
                    subscriber.callback(voiceGroupIndex, value)
                }
            })
        }
    },
    send: (voiceGroupIndex: number, controller: ControllerConfigButton, value: number, loopback = false) => {

        const midiChannel = getChannel(Boolean(controller.global), voiceGroupIndex)

        if (loopback) {
            button.publish(voiceGroupIndex, value)
        }
        if (true || midiOut) {
            // serialize value - button value is split across multiple CCs so
            // we need to pick the correct one.
            const buttonMidiCC = buttonCCs[Math.floor(value / 128)]
            const buttonMidiValue = value % 128

            const ccForChannel = status.CC + midiChannel
            console.log(`Sending CC ${buttonMidiCC}`)
            const data = [ccForChannel, buttonMidiCC, buttonMidiValue]
            logger.midiMsg(data)
            midiOut?.send(data)
        }
    }
}

export const cc = {
    subscribe: (callback: (voiceGroupIndex: number, value: number) => void, { cc, values }: ControllerConfigCC) => {
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
    publish: (voiceGroupIndex: number, cc: number, value: number) => {
        if (ccSubscribers[cc]) {
            ccSubscribers[cc].forEach((subscriber) => {
                if (!subscriber.values || subscriber.values.includes(value)) {
                    subscriber.callback(voiceGroupIndex, value)
                }
            })
        }
    },
    send: (voiceGroupIndex: number, controller: ControllerConfigCC, value: number, loopback = false) => {
        lastSentMidiGroup = controller.midiGroup
        const midiChannel = getChannel(Boolean(controller.global), voiceGroupIndex)
        if (loopback) {
            cc.publish(voiceGroupIndex, controller.cc, value)
        }
        if (midiOut) {
            const ccForChannel = status.CC + midiChannel
            const data = [ccForChannel, controller.cc, value]
            logger.midiMsg(data)
            midiOut.send(data)
        }
    }
}

export const nrpn = {
    subscribe: (callback: (voiceGroupIndex: number, value: number) => void, { addr, values }: ControllerConfigNRPN) => {
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
    publish: (voiceGroupIndex: number, addr: number, value: number) => {
        if (nrpnSubscribers[addr]) {
            nrpnSubscribers[addr].forEach((subscriber) => {
                if (!subscriber.values || subscriber.values.includes(value)) {
                    subscriber.callback(voiceGroupIndex, value)
                }
            })
        }
    },
    send: (voiceGroupIndex: number, controller: ControllerConfigNRPN, value: number, loopback = false) => {
        lastSentMidiGroup = controller.midiGroup
        const midiChannel = getChannel(Boolean(controller.global), voiceGroupIndex)

        if (loopback) {
            nrpn.publish(voiceGroupIndex, controller.addr, value)
        }
        if (midiOut) {
            const loAddr = controller.addr & 0b01111111
            const hiAddr = (controller.addr >> 7) & 0b01111111

            const loValue = value & 0b01111111
            const midValue = (value >> 7) & 0b01111111
            const hiValue = (value >> 14) & 0b01111111

            const ccForChannel = status.CC + midiChannel

            let data = [ccForChannel, CC.NRPN_MSB, hiAddr, ccForChannel, CC.NRPN_LSB, loAddr]
            if (value > 16383) {
                data.push(ccForChannel)
                data.push(CC.DATA_ENTRY_HSB)
                data.push(hiValue)
            }
            if (value > 127) {
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

export const sendSysex = (command: number, data: number[]) => {
    const midiBytes = [
        status.SYSEX_START,
        ...midiConfig.sysexAddr,
        command,
        ...data,
        status.SYSEX_END,
    ]
    console.log('sending sysex', midiBytes)
    if (midiBytes.length > 60) {
        console.warn('Sysex message is more than 60 bytes, it may not work with teensy', midiBytes)
    }

    midiOut?.send(midiBytes)
}

export const receiveMidiMessage = (midiEvent: MIDIMessageEvent) => {
    const midiData = midiEvent.data
    const channel = midiData[0] & 0x0F;
    const midiStatus = midiData[0] & 0xF0;

    const voiceGroupId = getVoiceGroupIdFromMidiChannel(store.getState(), channel)
    const isGlobal = channel === selectGlobalMidiChannel(store.getState())

    // TODO: Currently reception won't care about midi channel, it will publish messages and use the currently
    // selected voice group. This is not ideal.
    if (midiStatus === status.CC && (isGlobal || voiceGroupId > -1)) {

        const ccKey = midiData[1]
        const ccValue = midiData[2]

        if (handleMpk25(ccKey, ccValue)) {
            return
        }
        if (ccKey === CC.NRPN_MSB) {
            currNRPN.hiAddr = ccValue
        } else if (ccKey === CC.NRPN_LSB) {
            currNRPN.loAddr = ccValue
        } else if (ccKey === CC.DATA_ENTRY_HSB) {
            currNRPN.hiValue = ccValue
        } else if (ccKey === CC.DATA_ENTRY_MSB) {
            currNRPN.midValue = ccValue
        } else if (ccKey === CC.DATA_ENTRY_LSB) {
            // triggering an update on lsb means we don't have to send hsb and msb if we
            // don't want to
            currNRPN.loValue = ccValue
            const addr = (currNRPN.hiAddr << 7) + currNRPN.loAddr
            const value = (currNRPN.midValue << 14) + (currNRPN.midValue << 7) + currNRPN.loValue
            nrpn.publish(voiceGroupId, addr, value)
            currNRPN.hiValue = 0
            currNRPN.midValue = 0
            currNRPN.loValue = 0
        } else if (ccKey == CC.BUTTONS_1 || ccKey == CC.BUTTONS_2 || ccKey == CC.BUTTONS_3) {
            const multiplier = buttonCCs.indexOf(ccKey)
            const buttonValue = multiplier * 128 + ccValue
            button.publish(voiceGroupId, buttonValue)
        } else {
            cc.publish(voiceGroupId, ccKey, ccValue)
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
        console.log(midiConfig)
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

    console.log('on midi success', midiAccess)
    await updateSelectedMidi(midiAccess)

    midiAccess.onstatechange = async (connectionEvent) => {
        console.log(`Midi port ${connectionEvent.port.name} state changed to ${connectionEvent.port.state}, updating connections`)
        console.log(midiAccess)
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