import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/synthcore/synthcoreMiddleware', () => ({
    synthcoreMiddleware: () => (next: any) => (action: any) => next(action),
}))

import { buttonMidiValues } from '@/midi/buttonMidiValues'
import { button, cc } from '@/midi/midibus'
import { startOscMidiReceive, startOscMidiSend, stopOscMidiReceive, stopOscMidiSend } from '@/store/midi/oscMidi'
import { createPatchStore, voiceGroupStores } from '@/store/patchStore'
import oscControllers from '@/synthcore/modules/osc/oscControllers'

const VG = 0

function getState() {
    return voiceGroupStores[VG].getState()
}

function resetStore() {
    const fresh = createPatchStore()
    voiceGroupStores[VG].getState().loadPatch(fresh.getState().getPatch())
}

describe('oscillator MIDI receive', () => {
    beforeEach(() => {
        resetStore()
        startOscMidiReceive()
    })

    afterEach(() => {
        stopOscMidiReceive()
    })

    it('sets DCO1 note from CC', () => {
        cc.publish(VG, oscControllers.DCO1.NOTE.cc, 80)
        expect(getState().oscillators[0].note).toBeCloseTo(80 / 127, 2)
    })

    it('sets DCO2 waveform from CC', () => {
        cc.publish(VG, oscControllers.DCO2.WAVEFORM.cc, 64)
        expect(getState().oscillators[1].waveform).toBeCloseTo(64 / 127, 2)
    })

    it('sets VCO fmAmt from CC', () => {
        cc.publish(VG, oscControllers.VCO.FM_AMT.cc, 100)
        expect(getState().oscillators[2].fmAmt).toBeCloseTo(100 / 127, 2)
    })

    it('sets DCO1 sync from button MIDI', () => {
        button.publish(VG, buttonMidiValues.OSC1_SYNC_HARD)
        expect(getState().oscillators[0].sync).toBe(1)
    })

    it('sets DCO1 mode from button MIDI', () => {
        button.publish(VG, buttonMidiValues.OSC1_MODE_PCM)
        expect(getState().oscillators[0].mode).toBe(2)
    })

    it('sets DCO2 wheel on from button MIDI', () => {
        button.publish(VG, buttonMidiValues.OSC2_WHEEL_ON)
        expect(getState().oscillators[1].wheel).toBe(1)
    })

    it('sets VCO sync src from button MIDI', () => {
        button.publish(VG, buttonMidiValues.OSC3_SYNC_SRC_OSC_2)
        expect(getState().oscillators[2].syncSrc).toBe(1)
    })

    it('sets VCO fm mode from button MIDI', () => {
        button.publish(VG, buttonMidiValues.OSC3_FM_MODE_LOG)
        expect(getState().oscillators[2].fmMode).toBe(2)
    })
})

describe('oscillator MIDI send', () => {
    let sentCC: { ccNum: number; value: number }[] = []
    let sentButtons: { ctrl: any; value: number }[] = []
    const origCCSend = cc.send
    const origButtonSend = button.send

    beforeEach(() => {
        resetStore()
        sentCC = []
        sentButtons = []
        cc.send = vi.fn((_vg, ctrl, value) => {
            sentCC.push({ ccNum: ctrl.cc, value })
        }) as any
        button.send = vi.fn((_vg, ctrl, value) => {
            sentButtons.push({ ctrl, value })
        }) as any
        startOscMidiSend()
    })

    afterEach(() => {
        stopOscMidiSend()
        cc.send = origCCSend
        button.send = origButtonSend
    })

    it('sends DCO1 note change as CC', () => {
        getState().set((s) => {
            s.oscillators[0].note = 0.5
        })
        const sent = sentCC.find((s) => s.ccNum === oscControllers.DCO1.NOTE.cc)
        expect(sent).toBeDefined()
        expect(sent?.value).toBe(Math.floor(127 * 0.5))
    })

    it('sends VCO pw change as CC', () => {
        getState().set((s) => {
            s.oscillators[2].pw = 0.3
        })
        const sent = sentCC.find((s) => s.ccNum === oscControllers.VCO.PW.cc)
        expect(sent).toBeDefined()
        expect(sent?.value).toBe(Math.floor(127 * 0.3))
    })

    it('sends DCO1 sync change as button MIDI', () => {
        getState().set((s) => {
            s.oscillators[0].sync = 2
        })
        const sent = sentButtons.find((s) => s.value === buttonMidiValues.OSC1_SYNC_METAL)
        expect(sent).toBeDefined()
    })

    it('sends VCO ext CV change as button MIDI', () => {
        getState().set((s) => {
            s.oscillators[2].extCv = 1
        })
        const sent = sentButtons.find((s) => s.value === buttonMidiValues.OSC3_EXT_CV_ON)
        expect(sent).toBeDefined()
    })

    it('does not send when value unchanged', () => {
        const defaultNote = getState().oscillators[0].note
        getState().set((s) => {
            s.oscillators[0].note = defaultNote
        })
        expect(sentCC.find((s) => s.ccNum === oscControllers.DCO1.NOTE.cc)).toBeUndefined()
    })
})
