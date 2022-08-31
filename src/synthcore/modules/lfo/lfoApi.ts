import { NUMBER_OF_LFOS, StageId } from './types'
import {
    deselectStage,
    selectGuiLfoId,
    selectGuiStageId,
    selectStage,
    selectUiLfoId,
    setGuiLfo as setGuiLfoAction,
    setUiLfo as setUiLfoAction,
} from './lfoReducer'
import { store } from '../../store'
import { ApiSource } from '../../types'
import { dispatch, getBounded, getQuantized } from '../../utils'
import { createSetterFuncs } from '../common/utils'
import { lfoCtrls } from './lfoControllers'
import { selectController, selectUiController, setController } from '../controllers/controllersReducer'
import { ButtonInputProperty, NumericInputProperty } from '../common/types'
import { lfoParamReceive, lfoParamSend } from './lfoMidiApi'

const depth = (() => {

    const getBoundedController = (value: number, lfoId: number) => {
        const bipolar = selectController(lfoCtrls.BIPOLAR, lfoId)(store.getState()) === 1
        return bipolar
            ? getQuantized(getBounded(value, -1, 1), 32767)
            : getQuantized(getBounded(value), 32767)
    }

    const set = (input: NumericInputProperty, uiValue?: number) => {
        const { ctrlIndex: lfoId = 0, value, ctrl } = input

        const boundedValue = getBoundedController(value, lfoId)
        const currentLevel = selectController(ctrl, lfoId)(store.getState())
        if (boundedValue === currentLevel) {
            return
        }

        dispatch(setController({ ...input, value: boundedValue, uiValue }))

        lfoParamSend({ ...input, value: boundedValue })
    }

    const increment = (input: NumericInputProperty) => {
        const { ctrlIndex: lfoId = 0, value: inc, ctrl } = input

        if (ctrl.uiResponse) {
            const currentValue = selectUiController(ctrl, lfoId)(store.getState())
            const uiValue = getBoundedController(currentValue + inc, lfoId)

            const bipolar = selectController(lfoCtrls.BIPOLAR, lfoId)(store.getState()) === 1
            const updatedValue = ctrl.uiResponse.output(uiValue, bipolar)
            set({ ...input, value: updatedValue }, uiValue)
        } else {
            const currentValue = selectController(ctrl, lfoId)(store.getState())
            set({ ...input, value: currentValue + inc })
        }

    }

    const setWithUiUpdate = (input: NumericInputProperty) => {

        const lfoId = selectController(lfoCtrls.SELECT)(store.getState())
        const bipolar = selectController(lfoCtrls.BIPOLAR, lfoId)(store.getState()) === 1
        const updatedLevel = input.ctrl.uiResponse?.input(input.value, bipolar) || 0
        const uiValue = getQuantized(getBounded(updatedLevel))
        set(input, uiValue)
    }

    lfoParamReceive(lfoCtrls.DEPTH, setWithUiUpdate)

    return {
        set,
        increment,
        toggle: (input: ButtonInputProperty) => {
        }
    }
})()

const toggleStageSelected = (lfoId: number, stageId: StageId, source: ApiSource) => {
    const currStageId = selectGuiStageId(store.getState())
    if (currStageId === stageId) {
        dispatch(selectStage({ lfo: -1, stage: stageId }))
    } else {
        dispatch(deselectStage({ lfo: -1, stage: stageId }))
    }
}

const setGuiLfo = (lfoId: number, source: ApiSource) => {
    const boundedLfo = getBounded(lfoId, 0, NUMBER_OF_LFOS - 1)
    if (selectGuiLfoId(store.getState()) !== boundedLfo) {
        dispatch(setGuiLfoAction({ lfo: boundedLfo }))
    }
}

const incrementGuiLfo = (increment: number, source: ApiSource) => {
    setGuiLfo(selectGuiLfoId(store.getState()) + increment, source)
}

const setUiLfo = (id: number, source: ApiSource) => {
    const currentUiLfoId = selectUiLfoId(store.getState())
    if (id !== currentUiLfoId && id < NUMBER_OF_LFOS && id > -1) {
        dispatch(setUiLfoAction({ value: id }))
    }
}

const toggleUiLfo = (source: ApiSource) => {
    const currentId = selectUiLfoId(store.getState())
    const nextId = (currentId + 1 + NUMBER_OF_LFOS) % NUMBER_OF_LFOS // + lfo to keep modulo positive
    setUiLfo(nextId, source)
}

const { increment: commonInc, toggle: commonToggle, set: commonSet } = createSetterFuncs([
        lfoCtrls.RATE,
        lfoCtrls.DELAY,
        lfoCtrls.SHAPE,
        lfoCtrls.SYNC,
        lfoCtrls.RESET,
        lfoCtrls.ONCE,
    ],
    { send: lfoParamSend, receive: lfoParamReceive })

const customSetterFuncs = {
    [lfoCtrls.DEPTH.id]: depth,
}

const increment = (input: NumericInputProperty) => {
    customSetterFuncs[input.ctrl.id]?.increment(input)
    commonInc(input)
}

const toggle = (input: ButtonInputProperty) => {
    commonToggle(input)
}

const set = (input: NumericInputProperty) => {
    customSetterFuncs[input.ctrl.id]?.set(input)
    commonSet(input)
}

const lfoApi = {

    toggleStageSelected,

    setGuiLfo,
    incrementGuiLfo,
    setUiLfo,
    toggleUiLfo,

    increment,
    toggle,
    set,
}

export default lfoApi