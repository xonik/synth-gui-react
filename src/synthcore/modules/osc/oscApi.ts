import { ApiSource } from '../../types'
import { dispatch, getBounded, getQuantized } from '../../utils'
import {
    setDco1Note,
    setDco1Waveform,
    setDco1Sub1Level,
    setDco1Sub2Level,
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
} from './oscReducer'
import { store } from '../../store'
import oscMidiApi from './oscMidiApi'
import { AnyAction } from '@reduxjs/toolkit'

type NumericProperty = {
    selector: () => number
    action: (payload: NumericPayload) => AnyAction
    midi: (source: ApiSource, value: number) => void
}

const funcs = (property: NumericProperty) => {
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

const dco1Note = funcs({
    selector: () => selectDco1(store.getState()).note,
    action: setDco1Note,
    midi: oscMidiApi.setDco1Note,
})
const dco1Waveform = funcs({
    selector: () => selectDco1(store.getState()).waveform,
    action: setDco1Waveform,
    midi: oscMidiApi.setDco1Waveform,
})
const dco1Sub1Level = funcs({
    selector: () => selectDco1(store.getState()).sub1Level,
    action: setDco1Sub1Level,
    midi: oscMidiApi.setDco1Sub1Level,
})
const dco1Sub2Level = funcs({
    selector: () => selectDco1(store.getState()).sub2Level,
    action: setDco1Sub2Level,
    midi: oscMidiApi.setDco1Sub2Level,
})
const dco1Pw = funcs({
    selector: () => selectDco1(store.getState()).pw,
    action: setDco1Pw,
    midi: oscMidiApi.setDco1Pw,
})
const dco2Note = funcs({
    selector: () => selectDco2(store.getState()).note,
    action: setDco2Note,
    midi: oscMidiApi.setDco2Note,
})
const dco2Detune = funcs({
    selector: () => selectDco2(store.getState()).detune,
    action: setDco2Detune,
    midi: oscMidiApi.setDco2Detune,
})
const dco2Waveform = funcs({
    selector: () => selectDco2(store.getState()).waveform,
    action: setDco2Waveform,
    midi: oscMidiApi.setDco2Waveform,
})
const dco2Sub1Level = funcs({
    selector: () => selectDco2(store.getState()).sub1Level,
    action: setDco2Sub1Level,
    midi: oscMidiApi.setDco2Sub1Level,
})
const dco2Sub2Level = funcs({
    selector: () => selectDco2(store.getState()).sub2Level,
    action: setDco2Sub2Level,
    midi: oscMidiApi.setDco2Sub2Level,
})
const dco2Pw = funcs({
    selector: () => selectDco2(store.getState()).pw,
    action: setDco2Pw,
    midi: oscMidiApi.setDco2Pw,
})
const vcoNote = funcs({
    selector: () => selectVco(store.getState()).note,
    action: setVcoNote,
    midi: oscMidiApi.setVcoNote,
})
const vcoDetune = funcs({
    selector: () => selectVco(store.getState()).detune,
    action: setVcoDetune,
    midi: oscMidiApi.setVcoDetune,
})
const vcoWaveform = funcs({
    selector: () => selectVco(store.getState()).waveform,
    action: setVcoWaveform,
    midi: oscMidiApi.setVcoWaveform,
})
const vcoCrossMod = funcs({
    selector: () => selectVco(store.getState()).crossMod,
    action: setVcoCrossMod,
    midi: oscMidiApi.setVcoCrossMod,
})
const vcoPw = funcs({
    selector: () => selectVco(store.getState()).pw,
    action: setVcoPw,
    midi: oscMidiApi.setVcoPw,
})


const oscApi = {
    setDco1Note: dco1Note.set,
    setDco1Waveform: dco1Waveform.set,
    setDco1Sub1Level: dco1Sub1Level.set,
    setDco1Sub2Level: dco1Sub2Level.set,
    setDco1Pw: dco1Pw.set,
    setDco2Note: dco2Note.set,
    setDco2Detune: dco2Detune.set,
    setDco2Waveform: dco2Waveform.set,
    setDco2Sub1Level: dco2Sub1Level.set,
    setDco2Sub2Level: dco2Sub2Level.set,
    setDco2Pw: dco2Pw.set,
    setVcoNote: vcoNote.set,
    setVcoDetune: vcoDetune.set,
    setVcoWaveform: vcoWaveform.set,
    setVcoCrossMod: vcoCrossMod.set,
    setVcoPw: vcoPw.set,

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
}

export default oscApi