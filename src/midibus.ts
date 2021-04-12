import { MidiConfig } from './midiConstants'

type MIDIInput = WebMidi.MIDIInput
type MIDIOutput = WebMidi.MIDIOutput
type MIDIAccess = WebMidi.MIDIAccess

type Subscriber = {
    id: number;
    values: number[] | undefined;
    callback: (value: number) => void;
}

const midiConfig = {
    inputIds: ['-961056816'],
    outputIds: ['-259958146'],
}

let midiOut: MIDIOutput | undefined;
let midiIn:  MIDIInput | undefined;

const loopback = true;
let idPool = 0;
const subscribers: {[key: number]: Subscriber[]} = {}

export const subscribe = (callback: (value: number) => void, { cc, values }: MidiConfig) => {
    const id = idPool++;
    subscribers[cc] = [...(subscribers[cc] || []), {id, values, callback}];
    return id;
}

export const unsubscribe = (cc: number, id: number) => {
    const subscribersForCC = subscribers[cc];
    const index = subscribersForCC.map(sub => sub.id).indexOf(id);
    if(index > -1){
        subscribers[cc] = [...subscribersForCC.slice(0, index), ...subscribersForCC.slice(index+1)];
    }
}

const publishCC = (cc: number, value: number) => {
    if(subscribers[cc]) {
        subscribers[cc].forEach((subscriber) => {
            if(!subscriber.values || subscriber.values.includes(value)){
                subscriber.callback(value);
            }
        })
    }
}

export const sendCC = (cc: number, value: number) => {
    console.log(`Sending ${cc} with value ${value}`);
    if(loopback) {
        publishCC(cc, value);
    }
    // TODO: Send with midi
}

export const receiveCC = (cc: number, value: number) => {
    // publish event
    publishCC(cc, value);
}

const updateSelectedMidi = (midiAccess: MIDIAccess) => {
    console.log('UPDATING MIDI CONFIG');

    const foundInputId = midiConfig.inputIds.find(id => midiAccess.inputs.has(id));
    const foundOutputId = midiConfig.outputIds.find(id => midiAccess.outputs.has(id));

    if(foundInputId){
        midiIn = midiAccess.inputs.get(foundInputId);
        console.log('Selected midi input', midiIn?.name);
    } else {
        midiIn = undefined;
        console.log('Desired midi input not found');
    }

    if(foundOutputId){
        midiOut = midiAccess.outputs.get(foundOutputId);
        console.log('Selected midi output', midiOut?.name);
    } else {
        midiOut = undefined;
        console.log('Desired midi output not found');
    }

}

const onMIDISuccess = (midiAccess: MIDIAccess) => {

    updateSelectedMidi(midiAccess);

    midiAccess.onstatechange = (connectionEvent) => {
        console.log(`Midi port ${connectionEvent.port.name} state changed to ${connectionEvent.port.state}, updating connections`);
        updateSelectedMidi(midiAccess);
    }
}

const onMIDIFailure = () => {
    console.log('Could not access your MIDI devices.');
}

if(navigator.requestMIDIAccess) navigator.requestMIDIAccess({sysex: true}).then(onMIDISuccess, onMIDIFailure);

//TODO: Close midi connection on app close!