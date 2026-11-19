import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { button, cc, getActiveMidiIds, nrpn, sendSysex, sysex } from '@/midi/midibus'
import * as rpc from '@/midi/rpc/api'
import { sendVoiceGroupPatch } from '@/store/midi/sendVoiceGroupPatch'
import { defaultVoiceGroupPatch, voiceGroupStores } from '@/store/patchStore'
import { FIRST_DST, FIRST_ENV_DST, FIRST_INTERMEDIATE } from '@/synthcore/modules/controllers/controllerIds'
import { curveValuesUsed } from '@/synthcore/modules/env/generatedTypes'
import oscControllers from '@/synthcore/modules/osc/oscControllers'

vi.mock('@/midi/midibus', async (importOriginal) => {
    const original = await importOriginal<typeof import('@/midi/midibus')>()
    return {
        ...original,
        getActiveMidiIds: vi.fn(() => ({ inputId: null, input2Id: null, outputId: 'output' })),
        button: { ...original.button, send: vi.fn() },
        cc: { ...original.cc, send: vi.fn() },
        nrpn: { ...original.nrpn, send: vi.fn() },
        sysex: { ...original.sysex, send: vi.fn() },
        sendSysex: vi.fn(),
    }
})

beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.mocked(getActiveMidiIds).mockReturnValue({ inputId: null, input2Id: null, outputId: 'output' })
    voiceGroupStores.forEach((store) => {
        store.getState().loadPatch(defaultVoiceGroupPatch())
    })
})

afterEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
    vi.useRealTimers()
})

describe('manual voice group patch send', () => {
    it('sends the selected group without changing stores or sending global controllers', async () => {
        const group = 2
        voiceGroupStores[group].getState().set((patch) => {
            patch.oscillators[0].waveform = 0.75
        })
        const before = voiceGroupStores.map((store) => store.getState())
        expect(sendSysex).not.toHaveBeenCalled()

        const sending = sendVoiceGroupPatch(group)
        await vi.runAllTimersAsync()
        await sending

        expect(cc.send).toHaveBeenCalledWith(group, oscControllers.DCO1.WAVEFORM, Math.floor(127 * 0.75))
        for (const send of [cc.send, button.send, nrpn.send]) {
            for (const [sentGroup, controller] of vi.mocked(send).mock.calls) {
                expect(sentGroup).toBe(group)
                expect(controller.global).not.toBe(true)
            }
        }
        for (const [route] of vi.mocked(sendSysex).mock.calls) {
            expect(route).toEqual({ type: 'voiceGroup', index: group })
        }
        expect(sysex.send).toHaveBeenCalledTimes(2)
        expect(voiceGroupStores.map((store) => store.getState())).toEqual(before)
    })

    it('encodes signed envelope/LFO values and actual curve IDs in bulk RPCs', async () => {
        const envParams = vi.spyOn(rpc, 'setCtrlAllEnvParams')
        const envSettings = vi.spyOn(rpc, 'setCtrlAllEnvSettings')
        const envStageSettings = vi.spyOn(rpc, 'setCtrlAllEnvStageSettings')
        const lfoParams = vi.spyOn(rpc, 'setCtrlAllLfoParams')
        voiceGroupStores[0].getState().set((patch) => {
            patch.envelopes[0].stages.attack.time = 1
            patch.envelopes[0].stages.sustain.level = -0.5
            patch.envelopes[0].stages.attack.curve = 1
            patch.lfos[0].levelOffset = -0.5
        })

        const sending = sendVoiceGroupPatch(0)
        await vi.runAllTimersAsync()
        await sending

        expect(envParams).toHaveBeenCalledTimes(5)
        expect(envParams.mock.calls[0][1][1]).toBe(32767)
        expect(envParams.mock.calls[0][1][4]).toBe(Math.floor(-0.5 * 32767))
        expect(envSettings.mock.calls[0][1]).toHaveLength(8)
        expect(envStageSettings).toHaveBeenCalledWith(0, 1, [curveValuesUsed[1], 1], { type: 'voiceGroup', index: 0 })
        expect(lfoParams).toHaveBeenCalledTimes(4)
        expect(lfoParams.mock.calls[0][1][5]).toBe(Math.floor(-0.5 * 32767) - 1)
    })

    it('sends complete modulation rows including zeros to clear stale routes', async () => {
        const mods = vi.spyOn(rpc, 'setAllModAmounts')
        const envMods = vi.spyOn(rpc, 'setAllEnvModAmounts')
        const lfoMods = vi.spyOn(rpc, 'setAllLfoModAmounts')
        voiceGroupStores[1].getState().set((patch) => {
            patch.mods[2] = { [FIRST_ENV_DST]: { 3: -0.5 } }
        })
        const sending = sendVoiceGroupPatch(1)
        await vi.runAllTimersAsync()
        await sending

        expect(mods).toHaveBeenCalledTimes(FIRST_ENV_DST - FIRST_INTERMEDIATE)
        expect(envMods).toHaveBeenCalledTimes(50)
        expect(lfoMods).toHaveBeenCalledTimes(24)
        expect(mods.mock.calls[0][1]).toEqual(Array(FIRST_DST).fill(0))
        const row = envMods.mock.calls.find(([env, dst]) => env === 3 && dst === 0)?.[2]
        expect(row).toHaveLength(FIRST_DST)
        expect(row?.[2]).toBe(Math.round(-0.5 * 32767))
        for (const [, , data] of vi.mocked(sendSysex).mock.calls) {
            expect(data.every((value) => Number.isInteger(value) && value >= 0 && value <= 127)).toBe(true)
            expect(data.length + 7).toBeLessThanOrEqual(128)
        }
    })

    it('rejects invalid groups or missing output without sending anything', async () => {
        await expect(sendVoiceGroupPatch(-1)).rejects.toThrow('Invalid voice group')
        await expect(sendVoiceGroupPatch(0.5)).rejects.toThrow('Invalid voice group')
        vi.mocked(getActiveMidiIds).mockReturnValue({ inputId: null, input2Id: null, outputId: null })
        await expect(sendVoiceGroupPatch(0)).rejects.toThrow('MIDI output')
        expect(cc.send).not.toHaveBeenCalled()
    })

    it('paces sends, prevents concurrent transfers and reports output changes', async () => {
        const sending = sendVoiceGroupPatch(0)
        expect(cc.send).toHaveBeenCalledTimes(1)
        await expect(sendVoiceGroupPatch(1)).rejects.toThrow('already being sent')
        vi.mocked(getActiveMidiIds).mockReturnValue({ inputId: null, input2Id: null, outputId: 'different' })
        const failed = expect(sending).rejects.toThrow('MIDI output changed')
        await vi.runAllTimersAsync()
        await failed
        expect(cc.send).toHaveBeenCalledTimes(1)
    })

    it('sends a fixed snapshot even if the UI patch changes during transmission', async () => {
        const envParams = vi.spyOn(rpc, 'setCtrlAllEnvParams')
        voiceGroupStores[0].getState().set((patch) => {
            patch.envelopes[0].stages.attack.time = 1
        })
        const sending = sendVoiceGroupPatch(0)
        voiceGroupStores[0].getState().set((patch) => {
            patch.envelopes[0].stages.attack.time = 0
        })
        await vi.runAllTimersAsync()
        await sending
        expect(envParams.mock.calls[0][1][1]).toBe(32767)
    })

    it('sends active oscillator sync after inactive sync-off messages', async () => {
        voiceGroupStores[0].getState().set((patch) => {
            patch.oscillators[0].sync = 1
        })
        const sending = sendVoiceGroupPatch(0)
        await vi.runAllTimersAsync()
        await sending
        const calls = vi.mocked(button.send).mock.calls
        const syncOn = calls.findIndex(
            ([, ctrl, value]) => ctrl === oscControllers.DCO1.SYNC && value === ctrl.values[1]
        )
        const syncOff = calls.findIndex(
            ([, ctrl, value]) => ctrl === oscControllers.DCO2.SYNC && value === ctrl.values[0]
        )
        expect(syncOff).toBeGreaterThanOrEqual(0)
        expect(syncOn).toBeGreaterThan(syncOff)
    })

    it('propagates MIDI send failures and allows retrying', async () => {
        vi.mocked(cc.send).mockImplementationOnce(() => {
            throw new Error('MIDI device unavailable')
        })
        await expect(sendVoiceGroupPatch(0)).rejects.toThrow('MIDI device unavailable')
        const retry = sendVoiceGroupPatch(0)
        await vi.runAllTimersAsync()
        await expect(retry).resolves.toBeUndefined()
    })
})
