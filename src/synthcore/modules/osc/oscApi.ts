import { ApiSource } from '../../types'
import { dispatch, getBounded, getQuantized } from '../../utils'
import {
    setDco1Note,
    setDco1Waveform,
    setDco1Sub1Level,
    setDco1Sub2Level,
    setDco1SubWave,
    setDco1Pw,
    setDco2Note,
    setDco2Detune,
    setDco2Waveform,
    setDco2Sub1Level,
    setDco2Sub2Level,
    setDco2Pw,
    setVcoNote,
    setVcoDetune,
    setVcoWaveform,
    setVcoCrossMod,
    setVcoPw,
    NumericPayload,
    selectVco,
    selectDco1,
    selectDco2,
    setDco1Sync,
    setDco1Mode,
    setDco1Wheel,
    setDco1Lfo,
    setDco1Kbd,
    setDco2Sync,
    setDco2Mode,
    setDco2Wheel,
    setDco2Lfo,
    setDco2Kbd,
    setVcoCrossModSrc,
    setVcoSync,
    setVcoExtCv,
    setVcoWheel,
    setVcoKbd,
    setDco2SubWave,
    setVcoLfo,
} from './oscReducer'
import { store } from '../../store'
import oscMidiApi from './oscMidiApi'
import { AnyAction } from '@reduxjs/toolkit'
import controllers from '../../../midi/controllers'
import { ControllerConfigCCWithValue } from '../../../midi/types'

type NumericProperty = {
    selector: () => number
    action: (payload: NumericPayload) => AnyAction
    midi: (source: ApiSource, value: number) => void
}

type TogglableProperty = {
    config: ControllerConfigCCWithValue,
    selector: () => number
    action: (payload: NumericPayload) => AnyAction
    midi: (source: ApiSource, value: number) => void
}

const numericPropFuncs = (property: NumericProperty) => {
    const set = (value: number, source: ApiSource) => {
        const boundedValue = getQuantized(getBounded(value))
        const currentValue = property.selector()

        if (boundedValue === currentValue) {
            return
        }

        dispatch(property.action({ value: boundedValue }))
        property.midi(source, boundedValue)
    }

    const increment = (inc: number, source: ApiSource) => {
        const currentValue = property.selector()
        set(currentValue + inc, source)
    }

    return {
        set,
        increment
    }
}

const togglePropFuncs = (property: TogglableProperty) => {
    const set = (value: number, source: ApiSource) => {
        const currentValue = property.selector()
        if (value === currentValue) {
            return
        }
        const boundedValue = getBounded(value, 0, property.config.values.length - 1)

        dispatch(property.action({ value: boundedValue }))
        property.midi(source, boundedValue)
    }

    const toggle = (source: ApiSource) => {
        const currentValue = property.selector()
        set((currentValue + 1) % property.config.values.length, source)
    }

    return {
        set,
        toggle
    }
}

const dco1Note = numericPropFuncs({
    selector: () => selectDco1(store.getState()).note,
    action: setDco1Note,
    midi: oscMidiApi.setDco1Note,
})
const dco1Sub1Level = numericPropFuncs({
    selector: () => selectDco1(store.getState()).sub1Level,
    action: setDco1Sub1Level,
    midi: oscMidiApi.setDco1Sub1Level,
})
const dco1Sub2Level = numericPropFuncs({
    selector: () => selectDco1(store.getState()).sub2Level,
    action: setDco1Sub2Level,
    midi: oscMidiApi.setDco1Sub2Level,
})
const dco1Pw = numericPropFuncs({
    selector: () => selectDco1(store.getState()).pw,
    action: setDco1Pw,
    midi: oscMidiApi.setDco1Pw,
})
const dco1Waveform = numericPropFuncs({
    selector: () => selectDco1(store.getState()).waveform,
    action: setDco1Waveform,
    midi: oscMidiApi.setDco1Waveform,
})
const dco1Sync = togglePropFuncs({
    config: controllers.DCO1.SYNC,
    selector: () => selectDco1(store.getState()).sync,
    action: setDco1Sync,
    midi: oscMidiApi.setDco1Sync,
})
const dco1Mode = togglePropFuncs({
    config: controllers.DCO1.MODE,
    selector: () => selectDco1(store.getState()).mode,
    action: setDco1Mode,
    midi: oscMidiApi.setDco1Mode,
})
const dco1SubWave = togglePropFuncs({
    config: controllers.DCO1.SUB_WAVE,
    selector: () => selectDco1(store.getState()).subWave,
    action: setDco1SubWave,
    midi: oscMidiApi.setDco1SubWave,
})
const dco1Wheel = togglePropFuncs({
    config: controllers.DCO1.WHEEL,
    selector: () => selectDco1(store.getState()).wheel,
    action: setDco1Wheel,
    midi: oscMidiApi.setDco1Wheel,
})
const dco1Lfo = togglePropFuncs({
    config: controllers.DCO1.LFO,
    selector: () => selectDco1(store.getState()).lfo,
    action: setDco1Lfo,
    midi: oscMidiApi.setDco1Lfo,
})
const dco1Kbd = togglePropFuncs({
    config: controllers.DCO1.KBD,
    selector: () => selectDco1(store.getState()).kbd,
    action: setDco1Kbd,
    midi: oscMidiApi.setDco1Kbd,
})

const dco2Note = numericPropFuncs({
    selector: () => selectDco2(store.getState()).note,
    action: setDco2Note,
    midi: oscMidiApi.setDco2Note,
})
const dco2Detune = numericPropFuncs({
    selector: () => selectDco2(store.getState()).detune,
    action: setDco2Detune,
    midi: oscMidiApi.setDco2Detune,
})
const dco2Waveform = numericPropFuncs({
    selector: () => selectDco2(store.getState()).waveform,
    action: setDco2Waveform,
    midi: oscMidiApi.setDco2Waveform,
})
const dco2Sub1Level = numericPropFuncs({
    selector: () => selectDco2(store.getState()).sub1Level,
    action: setDco2Sub1Level,
    midi: oscMidiApi.setDco2Sub1Level,
})
const dco2Sub2Level = numericPropFuncs({
    selector: () => selectDco2(store.getState()).sub2Level,
    action: setDco2Sub2Level,
    midi: oscMidiApi.setDco2Sub2Level,
})
const dco2Pw = numericPropFuncs({
    selector: () => selectDco2(store.getState()).pw,
    action: setDco2Pw,
    midi: oscMidiApi.setDco2Pw,
})
const dco2Mode = togglePropFuncs({
    config: controllers.DCO2.MODE,
    selector: () => selectDco2(store.getState()).mode,
    action: setDco2Mode,
    midi: oscMidiApi.setDco2Mode,
})
const dco2SubWave = togglePropFuncs({
    config: controllers.DCO2.SUB_WAVE,
    selector: () => selectDco2(store.getState()).subWave,
    action: setDco2SubWave,
    midi: oscMidiApi.setDco2SubWave,
})
const dco2Wheel = togglePropFuncs({
    config: controllers.DCO2.WHEEL,
    selector: () => selectDco2(store.getState()).wheel,
    action: setDco2Wheel,
    midi: oscMidiApi.setDco2Wheel,
})
const dco2Lfo = togglePropFuncs({
    config: controllers.DCO2.LFO,
    selector: () => selectDco2(store.getState()).lfo,
    action: setDco2Lfo,
    midi: oscMidiApi.setDco2Lfo,
})
const dco2Kbd = togglePropFuncs({
    config: controllers.DCO2.KBD,
    selector: () => selectDco2(store.getState()).kbd,
    action: setDco2Kbd,
    midi: oscMidiApi.setDco2Kbd,
})

const vcoNote = numericPropFuncs({
    selector: () => selectVco(store.getState()).note,
    action: setVcoNote,
    midi: oscMidiApi.setVcoNote,
})
const vcoDetune = numericPropFuncs({
    selector: () => selectVco(store.getState()).detune,
    action: setVcoDetune,
    midi: oscMidiApi.setVcoDetune,
})
const vcoWaveform = numericPropFuncs({
    selector: () => selectVco(store.getState()).waveform,
    action: setVcoWaveform,
    midi: oscMidiApi.setVcoWaveform,
})
const vcoCrossMod = numericPropFuncs({
    selector: () => selectVco(store.getState()).crossMod,
    action: setVcoCrossMod,
    midi: oscMidiApi.setVcoCrossMod,
})
const vcoPw = numericPropFuncs({
    selector: () => selectVco(store.getState()).pw,
    action: setVcoPw,
    midi: oscMidiApi.setVcoPw,
})
const vcoSync = togglePropFuncs({
    config: controllers.VCO.SYNC,
    selector: () => selectVco(store.getState()).sync,
    action: setVcoSync,
    midi: oscMidiApi.setVcoSync,
})
const vcoCrossModSrc = togglePropFuncs({
    config: controllers.VCO.CROSS_MOD_SRC,
    selector: () => selectVco(store.getState()).crossModSrc,
    action: setVcoCrossModSrc,
    midi: oscMidiApi.setVcoCrossModSrc,
})
const vcoExtCv = togglePropFuncs({
    config: controllers.VCO.EXT_CV,
    selector: () => selectVco(store.getState()).extCv,
    action: setVcoExtCv,
    midi: oscMidiApi.setVcoExtCv,
})
const vcoWheel = togglePropFuncs({
    config: controllers.VCO.WHEEL,
    selector: () => selectVco(store.getState()).wheel,
    action: setVcoWheel,
    midi: oscMidiApi.setVcoWheel,
})
const vcoLfo = togglePropFuncs({
    config: controllers.VCO.LFO,
    selector: () => selectVco(store.getState()).lfo,
    action: setVcoLfo,
    midi: oscMidiApi.setVcoLfo,
})
const vcoKbd = togglePropFuncs({
    config: controllers.VCO.KBD,
    selector: () => selectVco(store.getState()).kbd,
    action: setVcoKbd,
    midi: oscMidiApi.setVcoKbd,
})

const oscApi = {
    setDco1Note: dco1Note.set,
    setDco1Waveform: dco1Waveform.set,
    setDco1Sub1Level: dco1Sub1Level.set,
    setDco1Sub2Level: dco1Sub2Level.set,
    setDco1Pw: dco1Pw.set,
    setDco1Sync: dco1Sync.set,
    setDco1Mode: dco1Mode.set,
    setDco1SubWave: dco1SubWave.set,
    setDco1Wheel: dco1Wheel.set,
    setDco1Lfo: dco1Lfo.set,
    setDco1Kbd: dco1Kbd.set,

    setDco2Note: dco2Note.set,
    setDco2Detune: dco2Detune.set,
    setDco2Waveform: dco2Waveform.set,
    setDco2Sub1Level: dco2Sub1Level.set,
    setDco2Sub2Level: dco2Sub2Level.set,
    setDco2Pw: dco2Pw.set,
    setDco2Mode: dco2Mode.set,
    setDco2SubWave: dco2SubWave.set,
    setDco2Wheel: dco2Wheel.set,
    setDco2Lfo: dco2Lfo.set,
    setDco2Kbd: dco2Kbd.set,

    setVcoNote: vcoNote.set,
    setVcoDetune: vcoDetune.set,
    setVcoWaveform: vcoWaveform.set,
    setVcoCrossMod: vcoCrossMod.set,
    setVcoPw: vcoPw.set,
    setVcoSync: vcoSync.set,
    setVcoCrossModSrc: vcoCrossModSrc.set,
    setVcoExtCv: vcoExtCv.set,
    setVcoWheel: vcoWheel.set,
    setVcoLfo: vcoLfo.set,
    setVcoKbd: vcoKbd.set,

    incrementDco1Note: dco1Note.increment,
    incrementDco1Waveform: dco1Waveform.increment,
    incrementDco1Sub1Level: dco1Sub1Level.increment,
    incrementDco1Sub2Level: dco1Sub2Level.increment,
    incrementDco1Pw: dco1Pw.increment,
    incrementDco2Note: dco2Note.increment,
    incrementDco2Detune: dco2Detune.increment,
    incrementDco2Waveform: dco2Waveform.increment,
    incrementDco2Sub1Level: dco2Sub1Level.increment,
    incrementDco2Sub2Level: dco2Sub2Level.increment,
    incrementDco2Pw: dco2Pw.increment,
    incrementVcoNote: vcoNote.increment,
    incrementVcoDetune: vcoDetune.increment,
    incrementVcoWaveform: vcoWaveform.increment,
    incrementVcoCrossMod: vcoCrossMod.increment,
    incrementVcoPw: vcoPw.increment,

    toggleDco1Sync: dco1Sync.toggle,
    toggleDco1Mode: dco1Mode.toggle,
    toggleDco1SubWave: dco1SubWave.toggle,
    toggleDco1Wheel: dco1Wheel.toggle,
    toggleDco1Lfo: dco1Lfo.toggle,
    toggleDco1Kbd: dco1Kbd.toggle,

    toggleDco2Mode: dco2Mode.toggle,
    toggleDco2SubWave: dco2SubWave.toggle,
    toggleDco2Wheel: dco2Wheel.toggle,
    toggleDco2Lfo: dco2Lfo.toggle,
    toggleDco2Kbd: dco2Kbd.toggle,

    toggleVcoSync: vcoSync.toggle,
    toggleVcoCrossModSrc: vcoCrossModSrc.toggle,
    toggleVcoExtCv: vcoExtCv.toggle,
    toggleVcoWheel: vcoWheel.toggle,
    toggleVcoLfo: vcoLfo.toggle,
    toggleVcoKbd: vcoKbd.toggle,    
}

export default oscApi