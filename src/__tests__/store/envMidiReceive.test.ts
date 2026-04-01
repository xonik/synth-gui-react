import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/synthcore/synthcoreMiddleware', () => ({
    synthcoreMiddleware: () => (next: any) => (action: any) => next(action),
}))

import { buttonMidiValues } from '../../midi/buttonMidiValues'
import { button, cc, nrpn } from '../../midi/midibus'
import { startEnvelopeMidiReceive, stopEnvelopeMidiReceive } from '../../store/midi/envMidiReceive'
import { createPatchStore, voiceGroupStores } from '../../store/patchStore'
import { envCtrls } from '@/synthcore/modules/env/envControllers'
import { curveValuesUsed } from '@/synthcore/modules/env/generatedTypes'
import { StageId } from '@/synthcore/modules/env/types'

const VG = 0
const ENV = 0

function selectEnv(envId: number) {
    cc.publish(VG, envCtrls.SELECT.cc, envId)
}

function getEnv(envId = ENV) {
    return voiceGroupStores[VG].getState().envelopes[envId]
}

function encodeNrpn(value: number, valueIndex: number) {
    return (valueIndex << 16) | (value & 0xffff)
}

function encodeLevel(level: number, stageId: number, bipolar: boolean) {
    const midiValue = bipolar ? Math.floor(32767 * level + 32767) : Math.floor(65535 * level)
    return encodeNrpn(midiValue, stageId)
}

function encodeTime(time: number, stageId: number) {
    const midiValue = Math.floor(65535 * time)
    return encodeNrpn(midiValue, stageId)
}

function encodeCurve(curveIndex: number, stageId: number) {
    return (stageId << 7) + curveValuesUsed[curveIndex]
}

function encodeStageEnabled(stageId: number, enabled: boolean) {
    return stageId | (enabled ? 0b1000 : 0)
}

describe('envelope MIDI receive', () => {
    beforeEach(() => {
        const fresh = createPatchStore()
        const freshState = fresh.getState().getPatch()
        voiceGroupStores[VG].getState().loadPatch(freshState)
        startEnvelopeMidiReceive()
        selectEnv(ENV)
    })

    afterEach(() => {
        stopEnvelopeMidiReceive()
    })

    describe('level', () => {
        it('sets decay2 level from NRPN', () => {
            nrpn.publish(VG, envCtrls.LEVEL.addr, encodeLevel(0.75, StageId.DECAY2, false))
            expect(getEnv().stages.decay2.level).toBeCloseTo(0.75, 3)
        })

        it('sets sustain level and mirrors to release stage', () => {
            nrpn.publish(VG, envCtrls.LEVEL.addr, encodeLevel(0.6, StageId.SUSTAIN, false))
            const env = getEnv()
            expect(env.stages.sustain.level).toBeCloseTo(0.6, 3)
            expect(env.stages.release2.level).toBeCloseTo(0.6, 3)
        })

        it('handles bipolar level correctly', () => {
            button.publish(VG, buttonMidiValues.ENV_BIPOLAR_ON)
            nrpn.publish(VG, envCtrls.LEVEL.addr, encodeLevel(-0.5, StageId.SUSTAIN, true))
            expect(getEnv().stages.sustain.level).toBeCloseTo(-0.5, 3)
        })
    })

    describe('time', () => {
        it('sets attack time from NRPN', () => {
            nrpn.publish(VG, envCtrls.TIME.addr, encodeTime(0.3, StageId.ATTACK))
            expect(getEnv().stages.attack.time).toBeCloseTo(0.3, 3)
        })

        it('sets release1 time', () => {
            nrpn.publish(VG, envCtrls.TIME.addr, encodeTime(0.8, StageId.RELEASE1))
            expect(getEnv().stages.release1.time).toBeCloseTo(0.8, 3)
        })
    })

    describe('curve', () => {
        it('sets stage curve from NRPN', () => {
            const curveIdx = 3
            nrpn.publish(VG, envCtrls.CURVE.addr, encodeCurve(curveIdx, StageId.ATTACK))
            expect(getEnv().stages.attack.curve).toBe(curveIdx)
        })

        it('ignores invalid curve values', () => {
            const before = getEnv().stages.attack.curve
            nrpn.publish(VG, envCtrls.CURVE.addr, (StageId.ATTACK << 7) + 255)
            expect(getEnv().stages.attack.curve).toBe(before)
        })
    })

    describe('toggle stage', () => {
        it('enables delay stage from CC', () => {
            cc.publish(VG, envCtrls.TOGGLE_STAGE.cc, encodeStageEnabled(StageId.DELAY, true))
            expect(getEnv().stages.delay.enabled).toBe(1)
        })

        it('disables decay1 stage', () => {
            cc.publish(VG, envCtrls.TOGGLE_STAGE.cc, encodeStageEnabled(StageId.DECAY1, false))
            expect(getEnv().stages.decay1.enabled).toBe(0)
        })

        it('mirrors sustain to release1 when release1 enabled', () => {
            nrpn.publish(VG, envCtrls.LEVEL.addr, encodeLevel(0.7, StageId.SUSTAIN, false))
            cc.publish(VG, envCtrls.TOGGLE_STAGE.cc, encodeStageEnabled(StageId.RELEASE1, true))
            expect(getEnv().stages.release1.level).toBeCloseTo(0.7, 3)
        })
    })

    describe('offset', () => {
        it('sets offset from NRPN', () => {
            const midiValue = Math.floor(32767 * 0.5 + 32767)
            nrpn.publish(VG, envCtrls.OFFSET.addr, midiValue)
            expect(getEnv().offset).toBeCloseTo(0.5, 3)
        })
    })

    describe('max loops', () => {
        it('sets max loops from CC', () => {
            cc.publish(VG, envCtrls.MAX_LOOPS.cc, 42)
            expect(getEnv().maxLoops).toBe(42)
        })

        it('bounds max loops to 1-127', () => {
            cc.publish(VG, envCtrls.MAX_LOOPS.cc, 0)
            expect(getEnv().maxLoops).toBe(1)
        })
    })

    describe('invert', () => {
        it('sets invert and resets levels', () => {
            button.publish(VG, buttonMidiValues.ENV_INVERT_ON)
            const env = getEnv()
            expect(env.invert).toBe(1)
            expect(env.stages.delay.level).toBe(1)
            expect(env.stages.attack.level).toBe(1)
            expect(env.stages.decay1.level).toBe(0)
            expect(env.stages.stopped.level).toBe(1)
        })
    })

    describe('button params', () => {
        it('sets loop', () => {
            button.publish(VG, buttonMidiValues.ENV_LOOP_ON)
            expect(getEnv().loop).toBe(1)
        })

        it('sets velocity', () => {
            button.publish(VG, buttonMidiValues.ENV_VELOCITY_ON)
            expect(getEnv().velocity).toBe(1)
        })

        it('sets loop mode', () => {
            button.publish(VG, buttonMidiValues.ENV_LOOP_MODE_INFINITE)
            expect(getEnv().loopMode).toBe(2)
        })

        it('sets release mode', () => {
            button.publish(VG, buttonMidiValues.ENV_RELEASE_MODE_FREE_RUN)
            expect(getEnv().releaseMode).toBe(2)
        })

        it('sets reset on trigger', () => {
            button.publish(VG, buttonMidiValues.ENV_RESET_ON_TRIGGER_ON)
            expect(getEnv().resetOnTrigger).toBe(1)
        })

        it('sets bipolar', () => {
            button.publish(VG, buttonMidiValues.ENV_BIPOLAR_ON)
            expect(getEnv().bipolar).toBe(1)
        })
    })

    describe('env selection', () => {
        it('routes to correct envelope after select', () => {
            selectEnv(2)
            nrpn.publish(VG, envCtrls.TIME.addr, encodeTime(0.9, StageId.ATTACK))
            expect(voiceGroupStores[VG].getState().envelopes[2].stages.attack.time).toBeCloseTo(0.9, 3)
            expect(getEnv().stages.attack.time).not.toBeCloseTo(0.9, 3)
        })

        it('ignores messages before env select', () => {
            stopEnvelopeMidiReceive()
            startEnvelopeMidiReceive()
            const before = getEnv().stages.attack.time
            nrpn.publish(VG, envCtrls.TIME.addr, encodeTime(0.9, StageId.ATTACK))
            expect(getEnv().stages.attack.time).toBe(before)
        })
    })
})
