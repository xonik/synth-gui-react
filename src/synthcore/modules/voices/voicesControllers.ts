import { ControllerConfigButton, FuncProps } from '../../../midi/types'
import { ControllerIdNonMod } from '../controllers/controllerIds'
import {buttonMidiValues} from "../../../midi/buttonMidiValues";


interface VoicesControllers {
    props: FuncProps
    VOICE1: ControllerConfigButton
    VOICE2: ControllerConfigButton
    VOICE3: ControllerConfigButton
    VOICE4: ControllerConfigButton
    VOICE5: ControllerConfigButton
    VOICE6: ControllerConfigButton
    VOICE7: ControllerConfigButton
    VOICE8: ControllerConfigButton
}

const voicesControllers: VoicesControllers = {
    props: { label: 'Voice selector' },
    VOICE1: {
        id: ControllerIdNonMod.VOICE_SELECTOR_1,
        label: 'Voice 1',
        type: 'button',
        values: [
            buttonMidiValues.VOICE1_OFF,
            buttonMidiValues.VOICE1_ON,
        ],
    },
    VOICE2: {
        id: ControllerIdNonMod.VOICE_SELECTOR_2,
        label: 'Voice 2',
        type: 'button',
        values: [
            buttonMidiValues.VOICE2_OFF,
            buttonMidiValues.VOICE2_ON,
        ],
    },
    VOICE3: {
        id: ControllerIdNonMod.VOICE_SELECTOR_3,
        label: 'Voice 3',
        type: 'button',
        values: [
            buttonMidiValues.VOICE3_OFF,
            buttonMidiValues.VOICE3_ON,
        ],
    },
    VOICE4: {
        id: ControllerIdNonMod.VOICE_SELECTOR_4,
        label: 'Voice 4',
        type: 'button',
        values: [
            buttonMidiValues.VOICE4_OFF,
            buttonMidiValues.VOICE4_ON,
        ],
    },
    VOICE5: {
        id: ControllerIdNonMod.VOICE_SELECTOR_5,
        label: 'Voice 5',
        type: 'button',
        values: [
            buttonMidiValues.VOICE5_OFF,
            buttonMidiValues.VOICE5_ON,
        ],
    },
    VOICE6: {
        id: ControllerIdNonMod.VOICE_SELECTOR_6,
        label: 'Voice 6',
        type: 'button',
        values: [
            buttonMidiValues.VOICE6_OFF,
            buttonMidiValues.VOICE6_ON,
        ],
    },
    VOICE7: {
        id: ControllerIdNonMod.VOICE_SELECTOR_7,
        label: 'Voice 7',
        type: 'button',
        values: [
            buttonMidiValues.VOICE7_OFF,
            buttonMidiValues.VOICE7_ON,
        ],
    },
    VOICE8: {
        id: ControllerIdNonMod.VOICE_SELECTOR_8,
        label: 'Voice 8',
        type: 'button',
        values: [
            buttonMidiValues.VOICE8_OFF,
            buttonMidiValues.VOICE8_ON,
        ],
    },
}

export default voicesControllers