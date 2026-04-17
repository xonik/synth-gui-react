import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/synthcore/synthcoreMiddleware', () => ({
    synthcoreMiddleware: () => (next: any) => (action: any) => next(action),
}))

import { buttonMidiValues } from '@/midi/buttonMidiValues'
import { button, cc, nrpn } from '@/midi/midibus'
import { startLfoMidiReceive, stopLfoMidiReceive } from '@/store/midi/lfoMidiReceive'
import { startLfoMidiSend, stopLfoMidiSend } from '@/store/midi/lfoMidiSend'
import { createPatchStore, voiceGroupStores } from '@/store/patchStore'
import { lfoCtrls } from '@/synthcore/modules/lfo/lfoControllers'

const VG = 0
const LFO = 1

function selectLfo(lfoId: number) {
    cc.publish(VG, (lfoCtrls.SELECT as any).cc, lfoId)
}

function getLfo(lfoId = LFO) {
    return voiceGroupStores[VG].getState().lfos[lfoId]
}

function resetStore() {
    const fresh = createPatchStore()
    voiceGroupStores[VG].getState().loadPatch(fresh.getState().getPatch())
}

describe('LFO MIDI receive', () => {
    beforeEach(() => {
        resetStore()
        startLfoMidiReceive()
        selectLfo(LFO)
    })

    afterEach(() => {
        stopLfoMidiReceive()
    })

    it('sets rate from NRPN', () => {
        const midiValue = Math.floor(65535 * 0.75)
        nrpn.publish(VG, lfoCtrls.RATE.addr, midiValue)
        expect(getLfo().rate).toBeCloseTo(0.75, 3)
    })

    it('sets depth from NRPN', () => {
        const midiValue = Math.floor(65535 * 0.5)
        nrpn.publish(VG, lfoCtrls.DEPTH.addr, midiValue)
        expect(getLfo().depth).toBeCloseTo(0.5, 3)
    })

    it('sets levelOffset from NRPN (bipolar)', () => {
        const midiValue = Math.floor(32767 * -0.5 + 32767)
        nrpn.publish(VG, lfoCtrls.LEVEL_OFFSET.addr, midiValue)
        expect(getLfo().levelOffset).toBeCloseTo(-0.5, 2)
    })

    it('sets shape from button MIDI', () => {
        button.publish(VG, buttonMidiValues.LFO_SHAPE_SQR)
        expect(getLfo().shape).toBe(2)
    })

    it('sets sync from button MIDI', () => {
        button.publish(VG, buttonMidiValues.LFO_SYNC_ON)
        expect(getLfo().sync).toBe(1)
    })

    it('sets bipolar from button MIDI', () => {
        button.publish(VG, buttonMidiValues.LFO_BIPOLAR_ON)
        expect(getLfo().bipolar).toBe(1)
    })

    it('sets maxLoops from CC', () => {
        cc.publish(VG, (lfoCtrls.MAX_LOOPS as any).cc, 10)
        expect(getLfo().maxLoops).toBe(10)
    })

    it('bounds max loops to 1-127', () => {
        cc.publish(VG, lfoCtrls.MAX_LOOPS.cc, 0)
        expect(getLfo().maxLoops).toBe(1)
    })

    it('targets correct LFO after select', () => {
        selectLfo(2)
        button.publish(VG, buttonMidiValues.LFO_INVERT_ON)
        expect(voiceGroupStores[VG].getState().lfos[2].invert).toBe(1)
        expect(getLfo().invert).toBe(0)
    })
})

describe('LFO MIDI send', () => {
    let sentNrpn: { addr: number; value: number }[] = []
    let sentCC: { ccNum: number; value: number }[] = []
    let sentButtons: { ctrl: any; value: number }[] = []
    const origNrpnSend = nrpn.send
    const origCCSend = cc.send
    const origButtonSend = button.send

    beforeEach(() => {
        resetStore()
        sentNrpn = []
        sentCC = []
        sentButtons = []
        nrpn.send = vi.fn((_vg, ctrl, value) => {
            sentNrpn.push({ addr: ctrl.addr, value })
        }) as any
        cc.send = vi.fn((_vg, ctrl, value) => {
            sentCC.push({ ccNum: ctrl.cc, value })
        }) as any
        button.send = vi.fn((_vg, ctrl, value) => {
            sentButtons.push({ ctrl, value })
        }) as any
        startLfoMidiSend()
    })

    afterEach(() => {
        stopLfoMidiSend()
        nrpn.send = origNrpnSend
        cc.send = origCCSend
        button.send = origButtonSend
    })

    it('sends rate change as NRPN', () => {
        voiceGroupStores[VG].getState().set((s) => {
            s.lfos[0].rate = 0.3
        })
        const sent = sentNrpn.find((s) => s.addr === lfoCtrls.RATE.addr)
        expect(sent).toBeDefined()
        expect(sent?.value).toBe(Math.floor(65535 * 0.3))
    })

    it('sends LFO select CC before param', () => {
        voiceGroupStores[VG].getState().set((s) => {
            s.lfos[2].depth = 0.8
        })
        const selectSent = sentCC.find((s) => s.ccNum === (lfoCtrls.SELECT as any).cc)
        expect(selectSent).toBeDefined()
        expect(selectSent?.value).toBe(2)
    })

    it('sends shape change as button MIDI', () => {
        voiceGroupStores[VG].getState().set((s) => {
            s.lfos[0].shape = 3
        })
        const sent = sentButtons.find((s) => s.value === buttonMidiValues.LFO_SHAPE_SIN)
        expect(sent).toBeDefined()
    })

    it('sends levelOffset as bipolar NRPN', () => {
        voiceGroupStores[VG].getState().set((s) => {
            s.lfos[0].levelOffset = -0.5
        })
        const sent = sentNrpn.find((s) => s.addr === lfoCtrls.LEVEL_OFFSET.addr)
        expect(sent).toBeDefined()
        expect(sent?.value).toBe(Math.floor(32767 * -0.5 + 32767))
    })
})
