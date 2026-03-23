import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

vi.mock('../../synthcore/synthcoreMiddleware', () => ({
    synthcoreMiddleware: () => (next: any) => (action: any) => next(action),
}))

import { button } from '../../midi/midibus'
import { voiceGroupStores, createPatchStore } from '../../store/patchStore'
import noiseControllers from '../../synthcore/modules/noise/noiseControllers'
import ringModControllers from '../../synthcore/modules/ringMod/ringModControllers'
import { buttonMidiValues } from '../../midi/buttonMidiValues'
import { startSimpleButtonMidiReceive, stopSimpleButtonMidiReceive } from '../../store/midi/simpleButtonMidiReceive'
import { startSimpleButtonMidiSend, stopSimpleButtonMidiSend } from '../../store/midi/simpleButtonMidiSend'

const VG = 0

function getState() {
    return voiceGroupStores[VG].getState()
}

function resetStore() {
    const fresh = createPatchStore()
    voiceGroupStores[VG].getState().loadPatch(fresh.getState().getPatch())
}

describe('simple button MIDI receive', () => {
    beforeEach(() => {
        resetStore()
        startSimpleButtonMidiReceive()
    })

    afterEach(() => {
        stopSimpleButtonMidiReceive()
    })

    describe('noise colour', () => {
        it('sets colour to Pink from MIDI', () => {
            button.publish(VG, buttonMidiValues.NOISE_COLOUR_PINK)
            expect(getState().noise.colour).toBe(1)
        })

        it('sets colour to Red from MIDI', () => {
            button.publish(VG, buttonMidiValues.NOISE_COLOUR_RED)
            expect(getState().noise.colour).toBe(2)
        })

        it('sets colour to White from MIDI', () => {
            getState().set(s => { s.noise.colour = 2 })
            button.publish(VG, buttonMidiValues.NOISE_COLOUR_WHITE)
            expect(getState().noise.colour).toBe(0)
        })
    })

    describe('ring mod source', () => {
        it('sets source to E->2 from MIDI', () => {
            button.publish(VG, buttonMidiValues.RING_MOD_SOURCE_EXT_2)
            expect(getState().ringMod.source).toBe(1)
        })

        it('sets source to 3->2 from MIDI', () => {
            button.publish(VG, buttonMidiValues.RING_MOD_SOURCE_VCO_2)
            expect(getState().ringMod.source).toBe(2)
        })

        it('sets source to 1->2 from MIDI', () => {
            getState().set(s => { s.ringMod.source = 2 })
            button.publish(VG, buttonMidiValues.RING_MOD_SOURCE_1_2)
            expect(getState().ringMod.source).toBe(0)
        })
    })
})

describe('simple button MIDI send', () => {
    let sentValues: { ctrl: any, value: number }[] = []
    const origSend = button.send

    beforeEach(() => {
        resetStore()
        sentValues = []
        button.send = vi.fn((vg, ctrl, value) => {
            sentValues.push({ ctrl, value })
        }) as any
        startSimpleButtonMidiSend()
    })

    afterEach(() => {
        stopSimpleButtonMidiSend()
        button.send = origSend
    })

    it('sends noise colour change over MIDI', () => {
        getState().set(s => { s.noise.colour = 1 })
        expect(sentValues).toHaveLength(1)
        expect(sentValues[0].value).toBe(buttonMidiValues.NOISE_COLOUR_PINK)
    })

    it('sends ring mod source change over MIDI', () => {
        getState().set(s => { s.ringMod.source = 2 })
        expect(sentValues).toHaveLength(1)
        expect(sentValues[0].value).toBe(buttonMidiValues.RING_MOD_SOURCE_VCO_2)
    })

    it('does not send when value unchanged', () => {
        const defaultColour = getState().noise.colour
        getState().set(s => { s.noise.colour = defaultColour })
        expect(sentValues).toHaveLength(0)
    })
})
