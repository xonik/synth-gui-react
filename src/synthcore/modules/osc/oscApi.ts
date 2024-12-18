import { createGroupedHandlers, ControllerHandler } from '../common/utils'
import oscControllers from './oscControllers'
import { ButtonInputProperty, NumericInputProperty, PatchControllers } from '../common/types'
import { setController } from '../controllers/controllersReducer'
import { dispatch } from '../../utils'

const osc1Sync = new ControllerHandler(oscControllers.DCO1.SYNC, undefined, undefined,() => {
    // clear any osc 2 sync as we can only have either osc1->osc2 or osc2->osc1 sync
    dispatch(setController({
        ctrl: oscControllers.DCO2.SYNC, value: 0
    }))
})

const osc2Sync = new ControllerHandler(oscControllers.DCO2.SYNC, undefined, undefined,() => {
    // clear any osc 1 sync as we can only have either osc1->osc2 or osc2->osc1 sync
    dispatch(setController({
        ctrl: oscControllers.DCO1.SYNC, value: 0
    }))
})

const customHandlers = {
    [oscControllers.DCO1.SYNC.id]: osc1Sync,
    [oscControllers.DCO2.SYNC.id]: osc2Sync,
}

const handlers = createGroupedHandlers(
    [
        oscControllers.DCO1.NOTE,
        oscControllers.DCO1.RANGE,
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
        oscControllers.DCO2.RANGE,
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
        oscControllers.VCO.FM_AMT,
        oscControllers.VCO.PW,
        oscControllers.VCO.SYNC,
        oscControllers.VCO.SYNC_SRC,
        oscControllers.VCO.FM_SRC,
        oscControllers.VCO.FM_MODE,
        oscControllers.VCO.EXT_CV,
        oscControllers.VCO.WHEEL,
        oscControllers.VCO.LFO,
        oscControllers.VCO.KBD,
    ])

const increment = (input: NumericInputProperty) => {
    customHandlers[input.ctrl.id]?.increment(input)
    handlers.increment(input)
}

const toggle = (input: ButtonInputProperty) => {
    customHandlers[input.ctrl.id]?.toggle(input)
    handlers.toggle(input)
}

const set = (input: NumericInputProperty) => {
    customHandlers[input.ctrl.id]?.set(input)
    handlers.set(input)
}

const getForSave = (): PatchControllers => {
    return {
        ...handlers.getForSave(),
        ...{
            [osc1Sync.ctrl.id]: {
                label: osc1Sync.ctrl.label, 
                instances: {0: osc1Sync.get()}
            },
            [osc2Sync.ctrl.id]: {
                label: osc2Sync.ctrl.label, 
                instances: {0: osc2Sync.get()}
            },
        }
    }
}

const setFromLoad = (patchController: PatchControllers) => {
    if(patchController[osc1Sync.ctrl.id]){
        osc1Sync.setFromLoad(patchController[osc1Sync.ctrl.id].instances[0][0])
    }
    if(patchController[osc2Sync.ctrl.id]){
        osc2Sync.setFromLoad(patchController[osc2Sync.ctrl.id].instances[0][0])
    }
    handlers.setFromLoad(patchController)
}

const api = {
    increment,
    toggle,
    set,

    getForSave,
    setFromLoad,
}

export default api