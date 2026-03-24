import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

vi.mock('../../synthcore/synthcoreMiddleware', () => ({
    synthcoreMiddleware: () => (next: any) => (action: any) => next(action),
}))

import { cc } from '../../midi/midibus'
import { voiceGroupStores, createPatchStore } from '../../store/patchStore'
import outControllers from '../../synthcore/modules/out/outControllers'
import postMixControllers from '../../synthcore/modules/postMix/postMixControllers'
import {
    startOutPostMixMidiSend,
    stopOutPostMixMidiSend,
    startOutPostMixMidiReceive,
    stopOutPostMixMidiReceive,
} from '../../store/midi/outPostMixMidi'

const VG = 0

function getState() {
    return voiceGroupStores[VG].getState()
}

function resetStore() {
    const fresh = createPatchStore()
    voiceGroupStores[VG].getState().loadPatch(fresh.getState().getPatch())
}

describe('CC pot MIDI receive', () => {
    beforeEach(() => {
        resetStore()
        startOutPostMixMidiReceive()
    })

    afterEach(() => {
        stopOutPostMixMidiReceive()
    })

    describe('output', () => {
        it('sets volume from CC', () => {
            cc.publish(VG, outControllers.VOLUME.cc, 64)
            expect(getState().output.volume).toBeCloseTo(64 / 127, 2)
        })

        it('sets headphones from CC', () => {
            cc.publish(VG, outControllers.HEADPHONES.cc, 100)
            expect(getState().output.headphones).toBeCloseTo(100 / 127, 2)
        })

        it('sets spread from CC', () => {
            cc.publish(VG, outControllers.SPREAD.cc, 64)
            expect(getState().output.spread).toBeCloseTo(64 / 127, 2)
        })

        it('sets spread to zero from CC', () => {
            cc.publish(VG, outControllers.SPREAD.cc, 0)
            expect(getState().output.spread).toBeCloseTo(0, 2)
        })
    })

    describe('postMix', () => {
        it('sets LPF from CC', () => {
            cc.publish(VG, postMixControllers.LPF.cc, 100)
            expect(getState().postMix.lpf).toBeCloseTo(100 / 127, 2)
        })

        it('sets SVF from CC', () => {
            cc.publish(VG, postMixControllers.SVF.cc, 50)
            expect(getState().postMix.svf).toBeCloseTo(50 / 127, 2)
        })

        it('sets pan from CC', () => {
            cc.publish(VG, postMixControllers.PAN.cc, 96)
            expect(getState().postMix.pan).toBeCloseTo(96 / 127, 2)
        })

        it('sets amount from CC', () => {
            cc.publish(VG, postMixControllers.AMOUNT.cc, 127)
            expect(getState().postMix.amount).toBeCloseTo(1, 2)
        })

        it('sets fx1Send from CC', () => {
            cc.publish(VG, postMixControllers.FX1_SEND.cc, 63)
            expect(getState().postMix.fx1Send).toBeCloseTo(63 / 127, 2)
        })
    })
})

describe('CC pot MIDI send', () => {
    let sentValues: { ccNum: number, value: number }[] = []
    const origSend = cc.send

    beforeEach(() => {
        resetStore()
        sentValues = []
        cc.send = vi.fn((vg, ctrl, value) => {
            sentValues.push({ ccNum: ctrl.cc, value })
        }) as any
        startOutPostMixMidiSend()
    })

    afterEach(() => {
        stopOutPostMixMidiSend()
        cc.send = origSend
    })

    it('sends volume change as CC', () => {
        getState().set(s => { s.output.volume = 0.5 })
        const sent = sentValues.find(s => s.ccNum === outControllers.VOLUME.cc)
        expect(sent).toBeDefined()
        expect(sent!.value).toBe(Math.floor(127 * 0.5))
    })

    it('sends spread change as CC', () => {
        getState().set(s => { s.output.spread = 0.75 })
        const sent = sentValues.find(s => s.ccNum === outControllers.SPREAD.cc)
        expect(sent).toBeDefined()
        expect(sent!.value).toBe(Math.floor(127 * 0.75))
    })

    it('sends postMix pan change as CC', () => {
        getState().set(s => { s.postMix.pan = 0.75 })
        const sent = sentValues.find(s => s.ccNum === postMixControllers.PAN.cc)
        expect(sent).toBeDefined()
        expect(sent!.value).toBe(Math.floor(127 * 0.75))
    })

    it('sends postMix LPF change as CC', () => {
        getState().set(s => { s.postMix.lpf = 0.8 })
        const sent = sentValues.find(s => s.ccNum === postMixControllers.LPF.cc)
        expect(sent).toBeDefined()
        expect(sent!.value).toBe(Math.floor(127 * 0.8))
    })

    it('does not send when value unchanged', () => {
        const defaultVolume = getState().output.volume
        getState().set(s => { s.output.volume = defaultVolume })
        expect(sentValues.find(s => s.ccNum === outControllers.VOLUME.cc)).toBeUndefined()
    })
})
