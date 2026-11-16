import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { notifyParamChangeById, paramPopupStore } from '@/store/paramPopupStore'
import { ScreenId, useUiStore } from '@/store/uiStore'
import oscControllers from '@/synthcore/modules/osc/oscControllers'

describe('oscillator parameter popup formatting', () => {
    beforeEach(() => {
        vi.useFakeTimers()
        useUiStore.getState().setScreen(ScreenId.ENV)
    })

    afterEach(() => {
        paramPopupStore.getState().hide()
        vi.useRealTimers()
    })

    it('shows note values in semitones', () => {
        notifyParamChangeById(oscControllers.DCO1.NOTE.id, 0)
        expect(paramPopupStore.getState().paramValue).toBe('-11.81 semitones')

        notifyParamChangeById(oscControllers.VCO.NOTE.id, 1)
        expect(paramPopupStore.getState().paramValue).toBe('+12.00 semitones')
    })

    it('shows DCO detune in cents', () => {
        notifyParamChangeById(oscControllers.DCO2.DETUNE.id, 1)
        expect(paramPopupStore.getState().paramValue).toBe('+50.0 cents')
    })

    it('shows VCO detune using its MIDI pitch range in cents', () => {
        notifyParamChangeById(oscControllers.VCO.DETUNE.id, 1)
        expect(paramPopupStore.getState().paramValue).toBe('6350.0 cents')
    })
})
