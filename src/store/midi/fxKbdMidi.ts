import { button, cc } from '@/midi/midibus'
import type { ControllerConfigButton, ControllerConfigCC } from '@/midi/types'
import { type VoiceGroupPatch, voiceGroupStores } from '@/store'
import fxControllers from '@/synthcore/modules/fx/fxControllers'
import kbdControllers from '@/synthcore/modules/kbd/kbdControllers'
import { isMidiReceiving, withMidiReceive } from './midiGuard'

interface CCMapping {
    selector: (state: VoiceGroupPatch) => number
    mutator: (state: VoiceGroupPatch, value: number) => void
    ctrl: ControllerConfigCC
}

interface ButtonMapping {
    selector: (state: VoiceGroupPatch) => number
    mutator: (state: VoiceGroupPatch, value: number) => void
    ctrl: ControllerConfigButton
}

const ccMappings: CCMapping[] = [
    {
        selector: (s) => s.fx.distortion.drive,
        mutator: (s, v) => {
            s.fx.distortion.drive = v
        },
        ctrl: fxControllers.DISTORTION.DRIVE,
    },
    {
        selector: (s) => s.fx.distortion.level,
        mutator: (s, v) => {
            s.fx.distortion.level = v
        },
        ctrl: fxControllers.DISTORTION.LEVEL,
    },
    {
        selector: (s) => s.fx.bitCrusher.bits,
        mutator: (s, v) => {
            s.fx.bitCrusher.bits = v
        },
        ctrl: fxControllers.BIT_CRUSHER.BITS,
    },
    {
        selector: (s) => s.fx.bitCrusher.rate,
        mutator: (s, v) => {
            s.fx.bitCrusher.rate = v
        },
        ctrl: fxControllers.BIT_CRUSHER.RATE,
    },
    {
        selector: (s) => s.kbd.portamento,
        mutator: (s, v) => {
            s.kbd.portamento = v
        },
        ctrl: kbdControllers.PORTAMENTO,
    },
    {
        selector: (s) => s.kbd.unisonDetune,
        mutator: (s, v) => {
            s.kbd.unisonDetune = v
        },
        ctrl: kbdControllers.UNISON_DETUNE,
    },
]

const buttonMappings: ButtonMapping[] = [
    {
        selector: (s) => s.fx.distortion.in,
        mutator: (s, v) => {
            s.fx.distortion.in = v
        },
        ctrl: fxControllers.DISTORTION.IN,
    },
    {
        selector: (s) => s.fx.distortion.out,
        mutator: (s, v) => {
            s.fx.distortion.out = v
        },
        ctrl: fxControllers.DISTORTION.OUT,
    },
    {
        selector: (s) => s.fx.bitCrusher.in,
        mutator: (s, v) => {
            s.fx.bitCrusher.in = v
        },
        ctrl: fxControllers.BIT_CRUSHER.IN,
    },
    {
        selector: (s) => s.fx.bitCrusher.out,
        mutator: (s, v) => {
            s.fx.bitCrusher.out = v
        },
        ctrl: fxControllers.BIT_CRUSHER.OUT,
    },
    {
        selector: (s) => s.kbd.hold,
        mutator: (s, v) => {
            s.kbd.hold = v
        },
        ctrl: kbdControllers.HOLD,
    },
    {
        selector: (s) => s.kbd.chord,
        mutator: (s, v) => {
            s.kbd.chord = v
        },
        ctrl: kbdControllers.CHORD,
    },
    {
        selector: (s) => s.kbd.mode,
        mutator: (s, v) => {
            s.kbd.mode = v
        },
        ctrl: kbdControllers.MODE,
    },
    {
        selector: (s) => s.kbd.transpose,
        mutator: (s, v) => {
            s.kbd.transpose = v
        },
        ctrl: kbdControllers.TRANSPOSE,
    },
    {
        selector: (s) => s.kbd.voiceStealing,
        mutator: (s, v) => {
            s.kbd.voiceStealing = v
        },
        ctrl: kbdControllers.VOICE_STEALING,
    },
]

let sendUnsubscribers: (() => void)[] = []

export function startFxKbdMidiSend() {
    stopFxKbdMidiSend()

    voiceGroupStores.forEach((store, voiceGroupIndex) => {
        let prevState = store.getState()

        const unsub = store.subscribe((state) => {
            if (isMidiReceiving()) {
                prevState = state
                return
            }

            const prev = prevState
            prevState = state

            for (const m of ccMappings) {
                const current = m.selector(state)
                const previous = m.selector(prev)
                if (current !== previous) {
                    cc.send(voiceGroupIndex, m.ctrl, Math.floor(127 * current))
                }
            }

            for (const m of buttonMappings) {
                const current = m.selector(state)
                const previous = m.selector(prev)
                if (current !== previous) {
                    button.send(voiceGroupIndex, m.ctrl, m.ctrl.values[current])
                }
            }
        })

        sendUnsubscribers.push(unsub)
    })
}

export function stopFxKbdMidiSend() {
    sendUnsubscribers.forEach((unsub) => {
        unsub()
    })
    sendUnsubscribers = []
}

let receiveUnsubscribers: (() => void)[] = []

export function startFxKbdMidiReceive() {
    stopFxKbdMidiReceive()

    for (const m of ccMappings) {
        const id = cc.subscribe((voiceGroupIndex: number, midiValue: number) => {
            const value = midiValue / 127
            withMidiReceive(() => {
                voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                    m.mutator(state, value)
                })
            })
        }, m.ctrl)
        receiveUnsubscribers.push(() => cc.unsubscribe(m.ctrl, id))
    }

    for (const m of buttonMappings) {
        const id = button.subscribe((voiceGroupIndex: number, midiValue: number) => {
            const value = m.ctrl.values.indexOf(midiValue)
            if (value < 0) return
            withMidiReceive(() => {
                voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                    m.mutator(state, value)
                })
            })
        }, m.ctrl)
        receiveUnsubscribers.push(() => button.unsubscribe(m.ctrl, id))
    }
}

export function stopFxKbdMidiReceive() {
    receiveUnsubscribers.forEach((unsub) => {
        unsub()
    })
    receiveUnsubscribers = []
}
