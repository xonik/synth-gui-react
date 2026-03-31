import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../../synthcore/synthcoreMiddleware', () => ({
    synthcoreMiddleware: () => (next: any) => (action: any) => next(action),
}))

import { buttonMidiValues } from '../../midi/buttonMidiValues'
import { button, cc } from '../../midi/midibus'
import {
    startFilterMidiReceive,
    startFilterMidiSend,
    stopFilterMidiReceive,
    stopFilterMidiSend,
} from '../../store/midi/filterMidi'
import { createPatchStore, voiceGroupStores } from '../../store/patchStore'
import filtersControllers from '../../synthcore/modules/filters/filtersControllers'

const VG = 0

function getState() {
    return voiceGroupStores[VG].getState()
}

function resetStore() {
    const fresh = createPatchStore()
    voiceGroupStores[VG].getState().loadPatch(fresh.getState().getPatch())
}

describe('filter MIDI receive', () => {
    beforeEach(() => {
        resetStore()
        startFilterMidiReceive()
    })

    afterEach(() => {
        stopFilterMidiReceive()
    })

    it('sets LPF cutoff from CC', () => {
        cc.publish(VG, filtersControllers.LPF.CUTOFF.cc, 100)
        expect(getState().filters[0].cutoff).toBeCloseTo(100 / 127, 2)
    })

    it('sets SVF resonance from CC', () => {
        cc.publish(VG, filtersControllers.SVF.RESONANCE.cc, 64)
        expect(getState().filters[1].resonance).toBeCloseTo(64 / 127, 2)
    })

    it('sets LPF fm mode from button MIDI', () => {
        button.publish(VG, buttonMidiValues.LPF_FM_MODE_LIN)
        expect(getState().filters[0].fmMode).toBe(1)
    })

    it('sets SVF slope from button MIDI', () => {
        button.publish(VG, buttonMidiValues.SVF_SLOPE_24DB_BP)
        expect(getState().filters[1].slope).toBe(3)
    })

    it('sets SVF invert from button MIDI', () => {
        button.publish(VG, buttonMidiValues.SVF_INVERT_ON)
        expect(getState().filters[1].invert).toBe(1)
    })

    it('sets shared routing from button MIDI', () => {
        button.publish(VG, buttonMidiValues.FILTER_ROUTING_PARALLEL)
        expect(getState().filters[0].routing).toBe(1)
    })

    it('sets shared link cutoff from button MIDI', () => {
        button.publish(VG, buttonMidiValues.FILTER_LINK_CUTOFF_ON)
        expect(getState().filters[0].linkCutoff).toBe(1)
    })
})

describe('filter MIDI send', () => {
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
        startFilterMidiSend()
    })

    afterEach(() => {
        stopFilterMidiSend()
        cc.send = origCCSend
        button.send = origButtonSend
    })

    it('sends LPF cutoff as CC', () => {
        getState().set((s) => {
            s.filters[0].cutoff = 0.6
        })
        const sent = sentCC.find((s) => s.ccNum === filtersControllers.LPF.CUTOFF.cc)
        expect(sent).toBeDefined()
        expect(sent!.value).toBe(Math.floor(127 * 0.6))
    })

    it('sends SVF input as CC', () => {
        getState().set((s) => {
            s.filters[1].input = 0.8
        })
        const sent = sentCC.find((s) => s.ccNum === filtersControllers.SVF.INPUT.cc)
        expect(sent).toBeDefined()
        expect(sent!.value).toBe(Math.floor(127 * 0.8))
    })

    it('sends LPF filter type as button MIDI', () => {
        getState().set((s) => {
            s.filters[0].filterType = 1
        })
        const sent = sentButtons.find((s) => s.value === buttonMidiValues.LPF_FILTER_TYPE_LADDER)
        expect(sent).toBeDefined()
    })

    it('sends SVF invert as button MIDI', () => {
        getState().set((s) => {
            s.filters[1].invert = 1
        })
        const sent = sentButtons.find((s) => s.value === buttonMidiValues.SVF_INVERT_ON)
        expect(sent).toBeDefined()
    })

    it('does not send when value unchanged', () => {
        const defaultCutoff = getState().filters[0].cutoff
        getState().set((s) => {
            s.filters[0].cutoff = defaultCutoff
        })
        expect(sentCC.find((s) => s.ccNum === filtersControllers.LPF.CUTOFF.cc)).toBeUndefined()
    })
})
