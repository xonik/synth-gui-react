import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../../synthcore/synthcoreMiddleware', () => ({
    synthcoreMiddleware: () => (next: any) => (action: any) => next(action),
}))

import { buttonMidiValues } from '../../midi/buttonMidiValues'
import { button, cc } from '../../midi/midibus'
import {
    startSrcMixMidiReceive,
    startSrcMixMidiSend,
    stopSrcMixMidiReceive,
    stopSrcMixMidiSend,
} from '../../store/midi/srcMixMidi'
import { createPatchStore, voiceGroupStores } from '../../store/patchStore'
import srcMixControllers from '../../synthcore/modules/srcMix/srcMixControllers'

const VG = 0

function getState() {
    return voiceGroupStores[VG].getState()
}

function resetStore() {
    const fresh = createPatchStore()
    voiceGroupStores[VG].getState().loadPatch(fresh.getState().getPatch())
}

describe('source mixer MIDI receive', () => {
    beforeEach(() => {
        resetStore()
        startSrcMixMidiReceive()
    })

    afterEach(() => {
        stopSrcMixMidiReceive()
    })

    describe('levels', () => {
        it('sets levelOsc1 from CC', () => {
            cc.publish(VG, srcMixControllers.LEVEL_OSC1.cc, 100)
            expect(getState().srcMix.levelOsc1).toBeCloseTo(100 / 127, 2)
        })

        it('sets levelNoise from CC', () => {
            cc.publish(VG, srcMixControllers.LEVEL_NOISE.cc, 64)
            expect(getState().srcMix.levelNoise).toBeCloseTo(64 / 127, 2)
        })

        it('sets levelExtAudio to zero', () => {
            cc.publish(VG, srcMixControllers.LEVEL_EXT_AUDIO.cc, 0)
            expect(getState().srcMix.levelExtAudio).toBeCloseTo(0, 2)
        })
    })

    describe('output routing', () => {
        it('sets outOsc1 to A from button MIDI', () => {
            button.publish(VG, buttonMidiValues.OSC1_OUT_A)
            expect(getState().srcMix.outOsc1).toBe(1)
        })

        it('sets outOsc1 to B from button MIDI', () => {
            button.publish(VG, buttonMidiValues.OSC1_OUT_B)
            expect(getState().srcMix.outOsc1).toBe(2)
        })

        it('sets outOsc1 to Both from button MIDI', () => {
            button.publish(VG, buttonMidiValues.OSC1_OUT_BOTH)
            expect(getState().srcMix.outOsc1).toBe(3)
        })

        it('sets outOsc1 to Off from button MIDI', () => {
            getState().set((s) => {
                s.srcMix.outOsc1 = 2
            })
            button.publish(VG, buttonMidiValues.OSC1_OUT_OFF)
            expect(getState().srcMix.outOsc1).toBe(0)
        })

        it('sets outNoise from button MIDI', () => {
            button.publish(VG, buttonMidiValues.NOISE_OUT_B)
            expect(getState().srcMix.outNoise).toBe(2)
        })

        it('sets outRingMod from button MIDI', () => {
            button.publish(VG, buttonMidiValues.RING_MOD_OUT_BOTH)
            expect(getState().srcMix.outRingMod).toBe(3)
        })
    })
})

describe('source mixer MIDI send', () => {
    let sentCC: { ccNum: number; value: number }[] = []
    let sentButtons: { ctrl: any; value: number }[] = []
    const origCCSend = cc.send
    const origButtonSend = button.send

    beforeEach(() => {
        resetStore()
        sentCC = []
        sentButtons = []
        cc.send = vi.fn((vg, ctrl, value) => {
            sentCC.push({ ccNum: ctrl.cc, value })
        }) as any
        button.send = vi.fn((vg, ctrl, value) => {
            sentButtons.push({ ctrl, value })
        }) as any
        startSrcMixMidiSend()
    })

    afterEach(() => {
        stopSrcMixMidiSend()
        cc.send = origCCSend
        button.send = origButtonSend
    })

    it('sends levelOsc1 change as CC', () => {
        getState().set((s) => {
            s.srcMix.levelOsc1 = 0.5
        })
        const sent = sentCC.find((s) => s.ccNum === srcMixControllers.LEVEL_OSC1.cc)
        expect(sent).toBeDefined()
        expect(sent!.value).toBe(Math.floor(127 * 0.5))
    })

    it('sends levelRingMod change as CC', () => {
        getState().set((s) => {
            s.srcMix.levelRingMod = 0.8
        })
        const sent = sentCC.find((s) => s.ccNum === srcMixControllers.LEVEL_RING_MOD.cc)
        expect(sent).toBeDefined()
        expect(sent!.value).toBe(Math.floor(127 * 0.8))
    })

    it('sends outOsc2 change as button MIDI', () => {
        getState().set((s) => {
            s.srcMix.outOsc2 = 2
        })
        expect(sentButtons).toHaveLength(1)
        expect(sentButtons[0].value).toBe(buttonMidiValues.OSC2_OUT_B)
    })

    it('sends outExtAudio change as button MIDI', () => {
        getState().set((s) => {
            s.srcMix.outExtAudio = 3
        })
        expect(sentButtons).toHaveLength(1)
        expect(sentButtons[0].value).toBe(buttonMidiValues.EXT_AUDIO_OUT_BOTH)
    })

    it('does not send when value unchanged', () => {
        const defaultLevel = getState().srcMix.levelOsc2
        getState().set((s) => {
            s.srcMix.levelOsc2 = defaultLevel
        })
        expect(sentCC.find((s) => s.ccNum === srcMixControllers.LEVEL_OSC2.cc)).toBeUndefined()
    })
})
