import { createSetterFuncs } from '../common/utils'
import oscControllers from './oscControllers'
import { ButtonInputProperty, NumericInputProperty } from '../common/types'
import { setController } from '../controllers/controllersReducer'
import { dispatch } from '../../utils'

const osc1Sync = (() => {
    const {
        toggle: internalToggle,
        set: internalSet,
        increment: internalIncrement,
    } = createSetterFuncs([oscControllers.DCO1.SYNC])

    const set = (input: NumericInputProperty) => {
        console.log('Set sync')
        /*dispatch(setController({
            ctrl: oscControllers.DCO2.SYNC, value: 0
        }))*/
        internalSet(input)
    }

    const toggle = (input: ButtonInputProperty) => {
        console.log('toggle sync', input)
        dispatch(setController({
            ctrl: oscControllers.DCO2.SYNC, value: 0
        }))
        internalToggle(input)
    }

    const increment = (input: NumericInputProperty) => {
        console.log('increment sync')
        internalIncrement(input)
    }

    return {
        set,
        increment,
        toggle,
    }
})()

const osc2Sync = (() => {
    const {
        toggle: internalToggle,
        set: internalSet,
        increment: internalIncrement,
    } = createSetterFuncs([oscControllers.DCO2.SYNC])

    const set = (input: NumericInputProperty) => {
        console.log('Set sync')
        /*dispatch(setController({
            ctrl: oscControllers.DCO1.SYNC, value: 0
        }))*/
        internalSet(input)
    }

    const toggle = (input: ButtonInputProperty) => {
        console.log('toggle sync')
        dispatch(setController({
            ctrl: oscControllers.DCO1.SYNC, value: 0
        }))
        internalToggle(input)
    }

    const increment = (input: NumericInputProperty) => {
        console.log('increment sync')
        internalIncrement(input)
    }


    return {
        set,
        increment,
        toggle,
    }
})()

const customSetterFuncs = {
    [oscControllers.DCO1.SYNC.id]: osc1Sync,
    [oscControllers.DCO2.SYNC.id]: osc2Sync,
}

const setterFuncs = createSetterFuncs(
    [
        oscControllers.DCO1.NOTE,
        oscControllers.DCO1.WAVEFORM,
        oscControllers.DCO1.SUB1,
        oscControllers.DCO1.SUB2,
        oscControllers.DCO1.PW,
        oscControllers.DCO1.MODE,
        oscControllers.DCO1.SUB_WAVE,
        oscControllers.DCO1.WHEEL,
        oscControllers.DCO1.LFO,
        oscControllers.DCO1.KBD,
        oscControllers.DCO1.SAW_INV,
        oscControllers.DCO1.PRE_FILTER_SINE,

        oscControllers.DCO2.NOTE,
        oscControllers.DCO2.DETUNE,
        oscControllers.DCO2.WAVEFORM,
        oscControllers.DCO2.SUB1,
        oscControllers.DCO2.SUB2,
        oscControllers.DCO2.PW,
        oscControllers.DCO2.MODE,
        oscControllers.DCO2.SUB_WAVE,
        oscControllers.DCO2.WHEEL,
        oscControllers.DCO2.LFO,
        oscControllers.DCO2.KBD,
        oscControllers.DCO2.SAW_INV,
        oscControllers.DCO2.PRE_FILTER_SINE,

        oscControllers.VCO.NOTE,
        oscControllers.VCO.DETUNE,
        oscControllers.VCO.WAVEFORM,
        oscControllers.VCO.CROSS_MOD,
        oscControllers.VCO.PW,
        oscControllers.VCO.SYNC,
        oscControllers.VCO.CROSS_MOD_SRC,
        oscControllers.VCO.EXT_CV,
        oscControllers.VCO.WHEEL,
        oscControllers.VCO.LFO,
        oscControllers.VCO.KBD,
    ])


const increment = (input: NumericInputProperty) => {
    customSetterFuncs[input.ctrl.id]?.increment(input)
    setterFuncs.increment(input)
}

const toggle = (input: ButtonInputProperty) => {
    customSetterFuncs[input.ctrl.id]?.toggle(input)
    setterFuncs.toggle(input)
}

const set = (input: NumericInputProperty) => {
    customSetterFuncs[input.ctrl.id]?.set(input)
    setterFuncs.set(input)
}



const api = {
    increment,
    toggle,
    set,
}

export default api