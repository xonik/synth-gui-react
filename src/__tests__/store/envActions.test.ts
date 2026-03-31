import { beforeEach, describe, expect, it } from 'vitest'
import {
    incrementMaxLoops,
    isLevelEditable,
    isToggleable,
    STAGE_NAMES,
    setInvert,
    setMaxLoops,
    setStageCurve,
    setStageEnabled,
    setStageLevel,
    setStageTime,
    toggleInvert,
    toggleStageEnabled,
} from '../../store/modules/envActions'
import { defaultVoiceGroupPatch, type VoiceGroupPatch } from '../../store/patchStore'

describe('envActions', () => {
    let state: VoiceGroupPatch

    beforeEach(() => {
        state = defaultVoiceGroupPatch()
        // Set up a known starting state for envelope 0
        state.envelopes[0].bipolar = 0
        state.envelopes[0].stages.sustain.level = 0.5
        state.envelopes[0].stages.release1.enabled = 0
        state.envelopes[0].stages.release2.enabled = 1
    })

    describe('setStageLevel', () => {
        it('sets sustain level', () => {
            setStageLevel(state, 0, 'sustain', 0.7)
            expect(state.envelopes[0].stages.sustain.level).toBeCloseTo(0.7, 3)
        })

        it('setting sustain also sets R2 level when R1 is disabled', () => {
            state.envelopes[0].stages.release1.enabled = 0
            setStageLevel(state, 0, 'sustain', 0.8)
            expect(state.envelopes[0].stages.sustain.level).toBeCloseTo(0.8, 3)
            expect(state.envelopes[0].stages.release2.level).toBeCloseTo(0.8, 3)
        })

        it('setting sustain also sets R1 level when R1 is enabled', () => {
            state.envelopes[0].stages.release1.enabled = 1
            setStageLevel(state, 0, 'sustain', 0.6)
            expect(state.envelopes[0].stages.sustain.level).toBeCloseTo(0.6, 3)
            expect(state.envelopes[0].stages.release1.level).toBeCloseTo(0.6, 3)
        })

        it('sets decay2 level', () => {
            setStageLevel(state, 0, 'decay2', 0.3)
            expect(state.envelopes[0].stages.decay2.level).toBeCloseTo(0.3, 3)
        })

        it('sets release2 level when R1 is enabled', () => {
            state.envelopes[0].stages.release1.enabled = 1
            setStageLevel(state, 0, 'release2', 0.4)
            expect(state.envelopes[0].stages.release2.level).toBeCloseTo(0.4, 3)
        })

        it('does not set release2 level when R1 is disabled', () => {
            state.envelopes[0].stages.release1.enabled = 0
            state.envelopes[0].stages.release2.level = 0.99
            setStageLevel(state, 0, 'release2', 0.1)
            expect(state.envelopes[0].stages.release2.level).toBe(0.99)
        })

        it('does not set attack level directly', () => {
            state.envelopes[0].stages.attack.level = 0.99
            setStageLevel(state, 0, 'attack', 0.1)
            expect(state.envelopes[0].stages.attack.level).toBe(0.99)
        })

        it('bounds unipolar levels to 0-1', () => {
            state.envelopes[0].bipolar = 0
            setStageLevel(state, 0, 'sustain', 1.5)
            expect(state.envelopes[0].stages.sustain.level).toBeLessThanOrEqual(1)
            setStageLevel(state, 0, 'sustain', -0.5)
            expect(state.envelopes[0].stages.sustain.level).toBeGreaterThanOrEqual(0)
        })

        it('bounds bipolar levels to -1 to 1', () => {
            state.envelopes[0].bipolar = 1
            setStageLevel(state, 0, 'sustain', 1.5)
            expect(state.envelopes[0].stages.sustain.level).toBeLessThanOrEqual(1)
            setStageLevel(state, 0, 'sustain', -1.5)
            expect(state.envelopes[0].stages.sustain.level).toBeGreaterThanOrEqual(-1)
        })

        it('quantizes levels to 32767 steps', () => {
            setStageLevel(state, 0, 'sustain', 1 / 3)
            const level = state.envelopes[0].stages.sustain.level
            expect(level * 32767).toBe(Math.round(level * 32767))
        })
    })

    describe('setStageTime', () => {
        it('sets time value', () => {
            setStageTime(state, 0, 'attack', 0.5)
            expect(state.envelopes[0].stages.attack.time).toBeCloseTo(0.5, 3)
        })

        it('bounds time to 0-1', () => {
            setStageTime(state, 0, 'attack', 1.5)
            expect(state.envelopes[0].stages.attack.time).toBeLessThanOrEqual(1)
            setStageTime(state, 0, 'attack', -0.5)
            expect(state.envelopes[0].stages.attack.time).toBeGreaterThanOrEqual(0)
        })
    })

    describe('toggleStageEnabled', () => {
        it('toggles delay on', () => {
            state.envelopes[0].stages.delay.enabled = 0
            toggleStageEnabled(state, 0, 'delay')
            expect(state.envelopes[0].stages.delay.enabled).toBe(1)
        })

        it('toggles delay off', () => {
            state.envelopes[0].stages.delay.enabled = 1
            toggleStageEnabled(state, 0, 'delay')
            expect(state.envelopes[0].stages.delay.enabled).toBe(0)
        })

        it('does not toggle attack (not toggleable)', () => {
            state.envelopes[0].stages.attack.enabled = 1
            toggleStageEnabled(state, 0, 'attack')
            expect(state.envelopes[0].stages.attack.enabled).toBe(1)
        })

        it('does not toggle sustain (not toggleable)', () => {
            state.envelopes[0].stages.sustain.enabled = 1
            toggleStageEnabled(state, 0, 'sustain')
            expect(state.envelopes[0].stages.sustain.enabled).toBe(1)
        })

        it('toggling R1 on copies sustain level to R1', () => {
            state.envelopes[0].stages.release1.enabled = 0
            state.envelopes[0].stages.sustain.level = 0.75
            toggleStageEnabled(state, 0, 'release1')
            expect(state.envelopes[0].stages.release1.enabled).toBe(1)
            expect(state.envelopes[0].stages.release1.level).toBe(0.75)
        })

        it('toggling R1 off copies sustain level to R2', () => {
            state.envelopes[0].stages.release1.enabled = 1
            state.envelopes[0].stages.sustain.level = 0.6
            toggleStageEnabled(state, 0, 'release1')
            expect(state.envelopes[0].stages.release1.enabled).toBe(0)
            expect(state.envelopes[0].stages.release2.level).toBe(0.6)
        })
    })

    describe('setStageEnabled', () => {
        it('sets enabled state directly', () => {
            setStageEnabled(state, 0, 'decay1', 0)
            expect(state.envelopes[0].stages.decay1.enabled).toBe(0)
            setStageEnabled(state, 0, 'decay1', 1)
            expect(state.envelopes[0].stages.decay1.enabled).toBe(1)
        })

        it('ignores non-toggleable stages', () => {
            state.envelopes[0].stages.attack.enabled = 1
            setStageEnabled(state, 0, 'attack', 0)
            expect(state.envelopes[0].stages.attack.enabled).toBe(1)
        })

        it('copies sustain to R1 when enabling R1', () => {
            state.envelopes[0].stages.sustain.level = 0.42
            setStageEnabled(state, 0, 'release1', 1)
            expect(state.envelopes[0].stages.release1.level).toBe(0.42)
        })

        it('copies sustain to R2 when disabling R1', () => {
            state.envelopes[0].stages.sustain.level = 0.33
            setStageEnabled(state, 0, 'release1', 0)
            expect(state.envelopes[0].stages.release2.level).toBe(0.33)
        })
    })

    describe('setStageCurve', () => {
        it('sets curve index', () => {
            setStageCurve(state, 0, 'attack', 5, 8)
            expect(state.envelopes[0].stages.attack.curve).toBe(5)
        })

        it('bounds curve index', () => {
            setStageCurve(state, 0, 'attack', 10, 8)
            expect(state.envelopes[0].stages.attack.curve).toBe(7)
            setStageCurve(state, 0, 'attack', -1, 8)
            expect(state.envelopes[0].stages.attack.curve).toBe(0)
        })
    })

    describe('toggleInvert', () => {
        it('toggling invert on sets delay/attack levels to 1, decay1 to 0', () => {
            state.envelopes[0].invert = 0
            toggleInvert(state, 0)
            expect(state.envelopes[0].invert).toBe(1)
            expect(state.envelopes[0].stages.delay.level).toBe(1)
            expect(state.envelopes[0].stages.attack.level).toBe(1)
            expect(state.envelopes[0].stages.decay1.level).toBe(0)
        })

        it('toggling invert off sets delay/attack levels to 0, decay1 to 1', () => {
            state.envelopes[0].invert = 1
            toggleInvert(state, 0)
            expect(state.envelopes[0].invert).toBe(0)
            expect(state.envelopes[0].stages.delay.level).toBe(0)
            expect(state.envelopes[0].stages.attack.level).toBe(0)
            expect(state.envelopes[0].stages.decay1.level).toBe(1)
        })
    })

    describe('setInvert', () => {
        it('sets invert with level resets', () => {
            setInvert(state, 0, 1)
            expect(state.envelopes[0].invert).toBe(1)
            expect(state.envelopes[0].stages.delay.level).toBe(1)
            expect(state.envelopes[0].stages.attack.level).toBe(1)
            expect(state.envelopes[0].stages.decay1.level).toBe(0)
        })
    })

    describe('setMaxLoops', () => {
        it('sets max loops', () => {
            setMaxLoops(state, 0, 5)
            expect(state.envelopes[0].maxLoops).toBe(5)
        })

        it('bounds max loops to 1-127', () => {
            setMaxLoops(state, 0, 0)
            expect(state.envelopes[0].maxLoops).toBe(1)
            setMaxLoops(state, 0, 200)
            expect(state.envelopes[0].maxLoops).toBe(127)
        })
    })

    describe('incrementMaxLoops', () => {
        it('increments from current value', () => {
            state.envelopes[0].maxLoops = 5
            incrementMaxLoops(state, 0, 3)
            expect(state.envelopes[0].maxLoops).toBe(8)
        })

        it('respects bounds on increment', () => {
            state.envelopes[0].maxLoops = 126
            incrementMaxLoops(state, 0, 5)
            expect(state.envelopes[0].maxLoops).toBe(127)
        })

        it('respects bounds on decrement', () => {
            state.envelopes[0].maxLoops = 2
            incrementMaxLoops(state, 0, -5)
            expect(state.envelopes[0].maxLoops).toBe(1)
        })
    })

    describe('isToggleable', () => {
        it('returns true for toggleable stages', () => {
            expect(isToggleable('delay')).toBe(true)
            expect(isToggleable('decay1')).toBe(true)
            expect(isToggleable('decay2')).toBe(true)
            expect(isToggleable('release1')).toBe(true)
        })

        it('returns false for non-toggleable stages', () => {
            expect(isToggleable('attack')).toBe(false)
            expect(isToggleable('sustain')).toBe(false)
            expect(isToggleable('release2')).toBe(false)
        })
    })

    describe('isLevelEditable', () => {
        it('decay2 and sustain are always editable', () => {
            expect(isLevelEditable('decay2', false)).toBe(true)
            expect(isLevelEditable('decay2', true)).toBe(true)
            expect(isLevelEditable('sustain', false)).toBe(true)
            expect(isLevelEditable('sustain', true)).toBe(true)
        })

        it('release2 is editable only when R1 is enabled', () => {
            expect(isLevelEditable('release2', true)).toBe(true)
            expect(isLevelEditable('release2', false)).toBe(false)
        })

        it('attack and delay are not directly editable', () => {
            expect(isLevelEditable('attack', false)).toBe(false)
            expect(isLevelEditable('delay', false)).toBe(false)
        })
    })

    describe('works across multiple envelopes', () => {
        it('modifying env 2 does not affect env 0', () => {
            state.envelopes[0].stages.sustain.level = 0.5
            state.envelopes[2].stages.sustain.level = 0.5
            setStageLevel(state, 2, 'sustain', 0.9)
            expect(state.envelopes[0].stages.sustain.level).toBe(0.5)
            expect(state.envelopes[2].stages.sustain.level).toBeCloseTo(0.9, 3)
        })
    })
})
