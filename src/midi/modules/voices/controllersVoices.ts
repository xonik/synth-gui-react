import { BUTTONS } from '../../buttons'
import { ControllerConfigCCWithValue, FuncProps } from '../../types'
import { ControllerId } from '../../controllerIds'


interface ControllersVoices {
    props: FuncProps
    VOICE1: ControllerConfigCCWithValue
    VOICE2: ControllerConfigCCWithValue
    VOICE3: ControllerConfigCCWithValue
    VOICE4: ControllerConfigCCWithValue
    VOICE5: ControllerConfigCCWithValue
    VOICE6: ControllerConfigCCWithValue
    VOICE7: ControllerConfigCCWithValue
    VOICE8: ControllerConfigCCWithValue
}

const controllersVoices: ControllersVoices = {
    props: { label: 'Voice selector' },
    VOICE1: {
        id: ControllerId.VOICE_SELECTOR_1,
        label: 'Voice 1',
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE1_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE1_ON,
        ],
    },
    VOICE2: {
        id: ControllerId.VOICE_SELECTOR_2,
        label: 'Voice 2',
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE2_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE2_ON,
        ],
    },
    VOICE3: {
        id: ControllerId.VOICE_SELECTOR_3,
        label: 'Voice 3',
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE3_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE3_ON,
        ],
    },
    VOICE4: {
        id: ControllerId.VOICE_SELECTOR_4,
        label: 'Voice 4',
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE4_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE4_ON,
        ],
    },
    VOICE5: {
        id: ControllerId.VOICE_SELECTOR_5,
        label: 'Voice 5',
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE5_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE5_ON,
        ],
    },
    VOICE6: {
        id: ControllerId.VOICE_SELECTOR_6,
        label: 'Voice 6',
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE6_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE6_ON,
        ],
    },
    VOICE7: {
        id: ControllerId.VOICE_SELECTOR_7,
        label: 'Voice 7',
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE7_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE7_ON,
        ],
    },
    VOICE8: {
        id: ControllerId.VOICE_SELECTOR_7,
        label: 'Voice 8',
        type: 'button',
            cc: BUTTONS.BUTTONS_CENTER.cc,
            values: [
            BUTTONS.BUTTONS_CENTER.values.VOICE8_OFF,
            BUTTONS.BUTTONS_CENTER.values.VOICE8_ON,
        ],
    },
}

export default controllersVoices