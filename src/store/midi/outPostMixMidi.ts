import outControllers from '../../synthcore/modules/out/outControllers'
import postMixControllers from '../../synthcore/modules/postMix/postMixControllers'
import { type CCPotMapping, createCCPotMidiReceive, createCCPotMidiSend } from './ccPotMidi'

const outputMappings: CCPotMapping[] = [
    {
        selector: (s) => s.output.volume,
        mutator: (s, v) => {
            s.output.volume = v
        },
        ctrl: outControllers.VOLUME,
    },
    {
        selector: (s) => s.output.headphones,
        mutator: (s, v) => {
            s.output.headphones = v
        },
        ctrl: outControllers.HEADPHONES,
    },
    {
        selector: (s) => s.output.spread,
        mutator: (s, v) => {
            s.output.spread = v
        },
        ctrl: outControllers.SPREAD,
    },
]

const postMixMappings: CCPotMapping[] = [
    {
        selector: (s) => s.postMix.lpf,
        mutator: (s, v) => {
            s.postMix.lpf = v
        },
        ctrl: postMixControllers.LPF,
    },
    {
        selector: (s) => s.postMix.svf,
        mutator: (s, v) => {
            s.postMix.svf = v
        },
        ctrl: postMixControllers.SVF,
    },
    {
        selector: (s) => s.postMix.sine1,
        mutator: (s, v) => {
            s.postMix.sine1 = v
        },
        ctrl: postMixControllers.SINE1,
    },
    {
        selector: (s) => s.postMix.sine2,
        mutator: (s, v) => {
            s.postMix.sine2 = v
        },
        ctrl: postMixControllers.SINE2,
    },
    {
        selector: (s) => s.postMix.pan,
        mutator: (s, v) => {
            s.postMix.pan = v
        },
        ctrl: postMixControllers.PAN,
    },
    {
        selector: (s) => s.postMix.amount,
        mutator: (s, v) => {
            s.postMix.amount = v
        },
        ctrl: postMixControllers.AMOUNT,
    },
    {
        selector: (s) => s.postMix.fx1Send,
        mutator: (s, v) => {
            s.postMix.fx1Send = v
        },
        ctrl: postMixControllers.FX1_SEND,
    },
    {
        selector: (s) => s.postMix.fx2Send,
        mutator: (s, v) => {
            s.postMix.fx2Send = v
        },
        ctrl: postMixControllers.FX2_SEND,
    },
]

const allMappings = [...outputMappings, ...postMixMappings]

const send = createCCPotMidiSend(allMappings)
const receive = createCCPotMidiReceive(allMappings)

export function startOutPostMixMidiSend() {
    send.start()
}
export function stopOutPostMixMidiSend() {
    send.stop()
}
export function startOutPostMixMidiReceive() {
    receive.start()
}
export function stopOutPostMixMidiReceive() {
    receive.stop()
}
