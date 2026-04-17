import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/synthcore/synthcoreMiddleware', () => ({
    synthcoreMiddleware: () => (next: any) => (action: any) => next(action),
}))

import { cc, nrpn } from '@/midi/midibus'
import type { ControllerConfigCC } from '@/midi/types'
import { MidiGroup } from '@/midi/types'
import { withMidiReceive } from '@/store/midi/midiGuard'
import {
    createModuleParamSend,
    createSelectSender,
    createStoreMidiSend,
    curveOutputMapper,
    stageEnabledOutputMapper,
} from '@/store/midi/midiSendUtils'
import { createPatchStore, voiceGroupStores } from '@/store/patchStore'
import { lfoCtrls } from '@/synthcore/modules/lfo/lfoControllers'

describe('shared output mappers', () => {
    describe('curveOutputMapper', () => {
        it('packs valueIndex into upper 7 bits and curve into lower 7', () => {
            expect(curveOutputMapper(0, {}, 0)).toBe(0)
            expect(curveOutputMapper(5, {}, 0)).toBe(5)
            expect(curveOutputMapper(0, {}, 1)).toBe(128)
            expect(curveOutputMapper(3, {}, 2)).toBe(259)
        })

        it('defaults valueIndex to 0', () => {
            expect(curveOutputMapper(5, {})).toBe(5)
        })
    })

    describe('stageEnabledOutputMapper', () => {
        it('packs enabled=0 with stageId', () => {
            expect(stageEnabledOutputMapper(0, {}, 0)).toBe(0)
            expect(stageEnabledOutputMapper(0, {}, 3)).toBe(3)
            expect(stageEnabledOutputMapper(0, {}, 6)).toBe(6)
        })

        it('packs enabled=1 with stageId', () => {
            expect(stageEnabledOutputMapper(1, {}, 0)).toBe(8)
            expect(stageEnabledOutputMapper(1, {}, 3)).toBe(11)
            expect(stageEnabledOutputMapper(1, {}, 6)).toBe(14)
        })

        it('defaults valueIndex to 0', () => {
            expect(stageEnabledOutputMapper(1, {})).toBe(8)
            expect(stageEnabledOutputMapper(0, {})).toBe(0)
        })

        it('round-trips through encode/decode', () => {
            const decode = (value: number) => ({
                stageId: value & 0b111,
                enabled: (value & 0b1000) > 0 ? 1 : 0,
            })

            for (let stageId = 0; stageId <= 7; stageId++) {
                for (const enabled of [0, 1]) {
                    const encoded = stageEnabledOutputMapper(enabled, {}, stageId)
                    const decoded = decode(encoded)
                    expect(decoded.stageId).toBe(stageId)
                    expect(decoded.enabled).toBe(enabled)
                }
            }
        })
    })
})

describe('createSelectSender', () => {
    const origCCSend = cc.send
    let sentCC: { ccNum: number; value: number }[] = []

    beforeEach(() => {
        sentCC = []
        cc.send = vi.fn((_vg, ctrl, value) => {
            sentCC.push({ ccNum: ctrl.cc, value })
        }) as any
    })

    afterEach(() => {
        cc.send = origCCSend
    })

    it('sends select on first call', () => {
        const sender = createSelectSender(lfoCtrls.SELECT as ControllerConfigCC, MidiGroup.LFO)
        sender.send(0, 2)
        expect(sentCC).toHaveLength(1)
        expect(sentCC[0].value).toBe(2)
    })

    it('does not resend same id immediately', () => {
        const sender = createSelectSender(lfoCtrls.SELECT as ControllerConfigCC, MidiGroup.LFO)
        sender.send(0, 2)
        sender.send(0, 2)
        expect(sentCC).toHaveLength(1)
    })

    it('resends when id changes', () => {
        const sender = createSelectSender(lfoCtrls.SELECT as ControllerConfigCC, MidiGroup.LFO)
        sender.send(0, 2)
        sender.send(0, 3)
        expect(sentCC).toHaveLength(2)
        expect(sentCC[1].value).toBe(3)
    })

    it('resends after reset', () => {
        const sender = createSelectSender(lfoCtrls.SELECT as ControllerConfigCC, MidiGroup.LFO)
        sender.send(0, 2)
        sender.reset()
        sender.send(0, 2)
        expect(sentCC).toHaveLength(2)
    })
})

describe('createModuleParamSend', () => {
    const origCCSend = cc.send
    const origNrpnSend = nrpn.send
    let sentCC: { ccNum: number; value: number }[] = []
    let sentNrpn: { addr: number; value: number }[] = []

    beforeEach(() => {
        sentCC = []
        sentNrpn = []
        cc.send = vi.fn((_vg, ctrl, value) => {
            sentCC.push({ ccNum: ctrl.cc, value })
        }) as any
        nrpn.send = vi.fn((_vg, ctrl, value) => {
            sentNrpn.push({ addr: ctrl.addr, value })
        }) as any
    })

    afterEach(() => {
        cc.send = origCCSend
        nrpn.send = origNrpnSend
    })

    it('sends select CC before param', () => {
        const { moduleParamSend } = createModuleParamSend(
            lfoCtrls.SELECT as ControllerConfigCC,
            MidiGroup.LFO
        )

        moduleParamSend({
            ctrl: lfoCtrls.RATE,
            ctrlIndex: 1,
            value: 0.5,
            voiceGroupIndex: 0,
            source: 0 as any,
        })

        expect(sentCC).toHaveLength(1)
        expect(sentCC[0].value).toBe(1)
        expect(sentNrpn).toHaveLength(1)
    })
})

describe('createStoreMidiSend', () => {
    function resetStore() {
        const fresh = createPatchStore()
        voiceGroupStores[0].getState().loadPatch(fresh.getState().getPatch())
    }

    it('calls sendItem when store item changes', () => {
        resetStore()
        const sendItem = vi.fn()

        const { start, stop } = createStoreMidiSend({
            getItems: (state) => state.lfos,
            itemCount: 4,
            sendItem,
        })

        start()

        voiceGroupStores[0].getState().set((s) => {
            s.lfos[1].rate = 0.99
        })

        expect(sendItem).toHaveBeenCalledTimes(1)
        expect(sendItem).toHaveBeenCalledWith(
            0,
            1,
            expect.objectContaining({ rate: 0.99 }),
            expect.any(Object)
        )

        stop()
    })

    it('does not call sendItem for unchanged items', () => {
        resetStore()
        const sendItem = vi.fn()

        const { start, stop } = createStoreMidiSend({
            getItems: (state) => state.lfos,
            itemCount: 4,
            sendItem,
        })

        start()

        voiceGroupStores[0].getState().set((s) => {
            s.lfos[0].rate = 0.5
        })

        expect(sendItem).toHaveBeenCalledTimes(1)
        expect(sendItem).toHaveBeenCalledWith(0, 0, expect.any(Object), expect.any(Object))

        stop()
    })

    it('calls onStop when stopped', () => {
        const onStop = vi.fn()
        const { stop } = createStoreMidiSend({
            getItems: (state) => state.lfos,
            itemCount: 4,
            sendItem: vi.fn(),
            onStop,
        })

        stop()

        expect(onStop).toHaveBeenCalledTimes(1)
    })

    it('does not send during midi receive', () => {
        resetStore()
        const sendItem = vi.fn()

        const { start, stop } = createStoreMidiSend({
            getItems: (state) => state.lfos,
            itemCount: 4,
            sendItem,
        })

        start()

        withMidiReceive(() => {
            voiceGroupStores[0].getState().set((s) => {
                s.lfos[0].rate = 0.1
            })
        })

        expect(sendItem).not.toHaveBeenCalled()

        stop()
    })
})
