import React from 'react'
import RotaryPot21 from '../pots/RotaryPot21'
import RotaryPot12 from '../pots/RotaryPot12'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8'
import { ControllerGroupIds } from '../../synthcore/types'
import oscControllers from '../../synthcore/modules/osc/oscControllers'
import SubHeader from "../misc/SubHeader";
import { DUAL_LED_BUTTON_W_LABEL_OFFSET_Y, POT_DISTANCE_M, POT_OFFSET_Y, ROW_HEIGHT } from "../../constants";

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.OSC

const DCO2 = ({ x, y }: Props) => {

    const topRow = y + POT_OFFSET_Y
    const buttonRow1 = topRow + 22.5
    const buttonRow2 = topRow + 40
    const centerRow = topRow + ROW_HEIGHT
    const bottomRow1 = centerRow + ROW_HEIGHT
    const bottomRow2 = bottomRow1 + ROW_HEIGHT

    const col1 = x - 1.5 * POT_DISTANCE_M
    const col2 = x - 0.5 * POT_DISTANCE_M
    const col3 = x + 0.5 * POT_DISTANCE_M
    const col4 = x + 1.5 * POT_DISTANCE_M

    return <>
        <SubHeader label="Oscillator 2" x={x} y={y} width={105} align="center"/>
        <RotaryPot21 x={x} y={centerRow} ledMode="single" label="Waveform"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO2.WAVEFORM}
        />

        <RotaryPot12 x={col1} y={topRow} ledMode="single" label="Note"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO2.NOTE}
        />

        <RoundPushButton8 x={col2} y={topRow}
                          ledPosition="right" ledCount={2} ledLabels={['Hard', 'Metal']}
                          label="Sync" labelPosition="bottom"
                          hasOff
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.DCO2.SYNC}
        />

        <RotaryPot12 x={col4} y={topRow} ledMode="single" label="Detune"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO2.DETUNE}
        />

        {/*<RotaryPot12 x={col4} y={topRow} ledMode="multi" label="Super saw"/>*/}
        <RoundLedPushButton8 x={col1} y={buttonRow1} label="Saw inv" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.DCO2.SAW_INV}
        />

        <RoundLedPushButton8 x={col1} y={buttonRow2} label="Sine" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.DCO2.PRE_FILTER_SINE}
        />

        <RoundPushButton8 x={col4} y={buttonRow2}
                          ledPosition="top" ledCount={3} ledLabels={['DCO', 'WT', 'PCM']}
                          label="Mode" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.DCO2.MODE}
        />


        <RoundPushButton8 x={col1} y={bottomRow1 + DUAL_LED_BUTTON_W_LABEL_OFFSET_Y}
                          ledPosition="top" ledCount={2} ledLabels={['Sqr', 'Saw']}
                          label="Sub wave" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.DCO2.SUB_WAVE}
        />

        <RotaryPot12 x={col2} y={bottomRow1} ledMode="multi" label="Sub -1"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO2.SUB1}
        />

        <RotaryPot12 x={col3} y={bottomRow1} ledMode="multi" label="Sub -2"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO2.SUB2}
        />

        <RotaryPot12 x={col4} y={bottomRow1} ledMode="single" label="PW"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO2.PW}
        />

        <RotaryPot12 x={col2} y={bottomRow2} label="Wheel"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO2.WHEEL}
        />

        <RotaryPot12 x={col3} y={bottomRow2} label="LFO"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO2.LFO}
        />

        <RotaryPot12 x={col4} y={bottomRow2} label="Kbd"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO2.KBD}
        />

    </>
}

export default DCO2