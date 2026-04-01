import { button, cc } from '@/midi/midibus'
import type { ControllerConfigButton, ControllerConfigCC } from '@/midi/types'
import { type VoiceGroupPatch, voiceGroupStores } from '@/store'
import commonFxControllers from '@/synthcore/modules/commonFx/commonFxControllers'
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
    // DSP1
    {
        selector: (s) => s.commonFx.dsp1.param1,
        mutator: (s, v) => {
            s.commonFx.dsp1.param1 = v
        },
        ctrl: commonFxControllers.DSP1.PARAM1,
    },
    {
        selector: (s) => s.commonFx.dsp1.param2,
        mutator: (s, v) => {
            s.commonFx.dsp1.param2 = v
        },
        ctrl: commonFxControllers.DSP1.PARAM2,
    },
    {
        selector: (s) => s.commonFx.dsp1.param3,
        mutator: (s, v) => {
            s.commonFx.dsp1.param3 = v
        },
        ctrl: commonFxControllers.DSP1.PARAM3,
    },
    {
        selector: (s) => s.commonFx.dsp1.effect,
        mutator: (s, v) => {
            s.commonFx.dsp1.effect = v
        },
        ctrl: commonFxControllers.DSP1.EFFECT,
    },

    // DSP2
    {
        selector: (s) => s.commonFx.dsp2.param1,
        mutator: (s, v) => {
            s.commonFx.dsp2.param1 = v
        },
        ctrl: commonFxControllers.DSP2.PARAM1,
    },
    {
        selector: (s) => s.commonFx.dsp2.param2,
        mutator: (s, v) => {
            s.commonFx.dsp2.param2 = v
        },
        ctrl: commonFxControllers.DSP2.PARAM2,
    },
    {
        selector: (s) => s.commonFx.dsp2.param3,
        mutator: (s, v) => {
            s.commonFx.dsp2.param3 = v
        },
        ctrl: commonFxControllers.DSP2.PARAM3,
    },
    {
        selector: (s) => s.commonFx.dsp2.effect,
        mutator: (s, v) => {
            s.commonFx.dsp2.effect = v
        },
        ctrl: commonFxControllers.DSP2.EFFECT,
    },

    // Chorus
    {
        selector: (s) => s.commonFx.chorus.rate,
        mutator: (s, v) => {
            s.commonFx.chorus.rate = v
        },
        ctrl: commonFxControllers.CHORUS.RATE,
    },
    {
        selector: (s) => s.commonFx.chorus.depth,
        mutator: (s, v) => {
            s.commonFx.chorus.depth = v
        },
        ctrl: commonFxControllers.CHORUS.DEPTH,
    },

    // FX Mix
    {
        selector: (s) => s.commonFx.fxMix.levelDsp1,
        mutator: (s, v) => {
            s.commonFx.fxMix.levelDsp1 = v
        },
        ctrl: commonFxControllers.FX_MIX.LEVEL_DSP1,
    },
    {
        selector: (s) => s.commonFx.fxMix.levelDsp2,
        mutator: (s, v) => {
            s.commonFx.fxMix.levelDsp2 = v
        },
        ctrl: commonFxControllers.FX_MIX.LEVEL_DSP2,
    },
    {
        selector: (s) => s.commonFx.fxMix.levelChorus,
        mutator: (s, v) => {
            s.commonFx.fxMix.levelChorus = v
        },
        ctrl: commonFxControllers.FX_MIX.LEVEL_CHORUS,
    },
    {
        selector: (s) => s.commonFx.fxMix.levelBitCrusher,
        mutator: (s, v) => {
            s.commonFx.fxMix.levelBitCrusher = v
        },
        ctrl: commonFxControllers.FX_MIX.LEVEL_BIT_CRUSHER,
    },
]

const buttonMappings: ButtonMapping[] = [
    // DSP1
    {
        selector: (s) => s.commonFx.dsp1.source,
        mutator: (s, v) => {
            s.commonFx.dsp1.source = v
        },
        ctrl: commonFxControllers.DSP1.SOURCE,
    },

    // DSP2
    {
        selector: (s) => s.commonFx.dsp2.source,
        mutator: (s, v) => {
            s.commonFx.dsp2.source = v
        },
        ctrl: commonFxControllers.DSP2.SOURCE,
    },

    // Chorus
    {
        selector: (s) => s.commonFx.chorus.source,
        mutator: (s, v) => {
            s.commonFx.chorus.source = v
        },
        ctrl: commonFxControllers.CHORUS.SOURCE,
    },
    {
        selector: (s) => s.commonFx.chorus.mode,
        mutator: (s, v) => {
            s.commonFx.chorus.mode = v
        },
        ctrl: commonFxControllers.CHORUS.MODE,
    },
]

let sendUnsubscribers: (() => void)[] = []

export function startCommonFxMidiSend() {
    stopCommonFxMidiSend()

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

export function stopCommonFxMidiSend() {
    sendUnsubscribers.forEach((unsub) => {
        unsub()
    })
    sendUnsubscribers = []
}

let receiveUnsubscribers: (() => void)[] = []

export function startCommonFxMidiReceive() {
    stopCommonFxMidiReceive()

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

export function stopCommonFxMidiReceive() {
    receiveUnsubscribers.forEach((unsub) => {
        unsub()
    })
    receiveUnsubscribers = []
}
