import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/synthcore/synthcoreMiddleware', () => ({
    synthcoreMiddleware: () => (next: any) => (action: any) => next(action),
}))

import { buttonMidiValues } from '../../midi/buttonMidiValues'
import { button, cc } from '../../midi/midibus'
import {
    startFxKbdMidiReceive,
    startFxKbdMidiSend,
    stopFxKbdMidiReceive,
    stopFxKbdMidiSend,
} from '../../store/midi/fxKbdMidi'
import { createPatchStore, voiceGroupStores } from '../../store/patchStore'
import fxControllers from '@/synthcore/modules/fx/fxControllers'
import kbdControllers from '@/synthcore/modules/kbd/kbdControllers'

const VG = 0

function getState() {
    return voiceGroupStores[VG].getState()
}

function resetStore() {
    const fresh = createPatchStore()
    voiceGroupStores[VG].getState().loadPatch(fresh.getState().getPatch())
}

describe('FX/Kbd MIDI receive', () => {
    beforeEach(() => {
        resetStore()
        startFxKbdMidiReceive()
    })

    afterEach(() => {
        stopFxKbdMidiReceive()
    })

    it('sets distortion drive from CC', () => {
        cc.publish(VG, fxControllers.DISTORTION.DRIVE.cc, 80)
        expect(getState().fx.distortion.drive).toBeCloseTo(80 / 127, 2)
    })

    it('sets bit crusher bits from CC', () => {
        cc.publish(VG, fxControllers.BIT_CRUSHER.BITS.cc, 64)
        expect(getState().fx.bitCrusher.bits).toBeCloseTo(64 / 127, 2)
    })

    it('sets kbd portamento from CC', () => {
        cc.publish(VG, kbdControllers.PORTAMENTO.cc, 100)
        expect(getState().kbd.portamento).toBeCloseTo(100 / 127, 2)
    })

    it('sets distortion out from button MIDI', () => {
        button.publish(VG, buttonMidiValues.DISTORTION_OUT_B)
        expect(getState().fx.distortion.out).toBe(2)
    })

    it('sets bit crusher in from button MIDI', () => {
        button.publish(VG, buttonMidiValues.BIT_CRUSHER_IN_A)
        expect(getState().fx.bitCrusher.in).toBe(0)
    })

    it('sets kbd mode from button MIDI', () => {
        button.publish(VG, buttonMidiValues.KBD_MODE_UNISON)
        expect(getState().kbd.mode).toBe(1)
    })

    it('sets kbd transpose from button MIDI', () => {
        button.publish(VG, buttonMidiValues.TRANSPOSE_POS_2)
        expect(getState().kbd.transpose).toBe(4)
    })

    it('sets kbd hold from button MIDI', () => {
        button.publish(VG, buttonMidiValues.KBD_HOLD_ON)
        expect(getState().kbd.hold).toBe(1)
    })
})

describe('FX/Kbd MIDI send', () => {
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
        startFxKbdMidiSend()
    })

    afterEach(() => {
        stopFxKbdMidiSend()
        cc.send = origCCSend
        button.send = origButtonSend
    })

    it('sends distortion drive as CC', () => {
        getState().set((s) => {
            s.fx.distortion.drive = 0.6
        })
        const sent = sentCC.find((s) => s.ccNum === fxControllers.DISTORTION.DRIVE.cc)
        expect(sent).toBeDefined()
        expect(sent?.value).toBe(Math.floor(127 * 0.6))
    })

    it('sends kbd portamento as CC', () => {
        getState().set((s) => {
            s.kbd.portamento = 0.3
        })
        const sent = sentCC.find((s) => s.ccNum === kbdControllers.PORTAMENTO.cc)
        expect(sent).toBeDefined()
        expect(sent?.value).toBe(Math.floor(127 * 0.3))
    })

    it('sends distortion out as button MIDI', () => {
        getState().set((s) => {
            s.fx.distortion.out = 3
        })
        const sent = sentButtons.find((s) => s.value === buttonMidiValues.DISTORTION_OUT_BOTH)
        expect(sent).toBeDefined()
    })

    it('sends kbd transpose as button MIDI', () => {
        getState().set((s) => {
            s.kbd.transpose = 2
        })
        const sent = sentButtons.find((s) => s.value === buttonMidiValues.TRANSPOSE_0)
        expect(sent).toBeDefined()
    })

    it('sends kbd mode as button MIDI', () => {
        getState().set((s) => {
            s.kbd.mode = 2
        })
        const sent = sentButtons.find((s) => s.value === buttonMidiValues.KBD_MODE_POLY)
        expect(sent).toBeDefined()
    })
})
