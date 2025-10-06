import React from 'react'
import RotaryPot21 from '../../pots/RotaryPot21'
import RotaryPot12 from '../../pots/RotaryPot12'
import RoundPushButton8 from '../../buttons/RoundPushButton8'
import RoundLedPushButton8 from '../../buttons/RoundLedPushButton8'
import { ControllerGroupIds } from '../../../synthcore/types'
import oscControllers from '../../../synthcore/modules/osc/oscControllers'
import SubHeader from "../../misc/SubHeader";
import {
    DUAL_LED_BUTTON_W_LABEL_OFFSET_Y, POT_DISTANCE_L,
    POT_DISTANCE_M, POT_DISTANCE_S, POT_OFFSET_Y,
    ROW_HEIGHT,
} from "../../../constants";
import { SHOW_CUT } from "../../../config";
import { VerticalDividerLine } from "../../misc/VerticalDividerLine";
import { ModuleBorder } from "../../misc/ModuleBorder";
import { ModuleProps } from "../types";
import "../Modules.scss"

const ctrlGroup = ControllerGroupIds.OSC

const DCO1 = ({ x, y, height, width }: ModuleProps) => {

    const topRow = y + POT_OFFSET_Y
    const bottomRow = topRow + ROW_HEIGHT
    const buttonRow1 = topRow - 5
    const centerRow = topRow + ROW_HEIGHT * 0.5

    const col1 = x + POT_DISTANCE_M / 2;
    const col2 = col1 + POT_DISTANCE_L
    const col3 = col2 + POT_DISTANCE_M
    const col4 = col3 + POT_DISTANCE_M
    const col5 = col4 + POT_DISTANCE_S
    const col6 = col5 + POT_DISTANCE_S
    const col7 = col6 + POT_DISTANCE_S
    const col8 = col7 + POT_DISTANCE_S
    const col9 = col8 + POT_DISTANCE_M

    return <>
        {/*!SHOW_CUT && <rect x={x-52.5} y={y} width="105" height={130 - ROW_SPACING} className="module-background"/>*/}
        <ModuleBorder x={x} y={y} height={height} width={width} className="audio-elements-border"/>
        <SubHeader label="Osc 1" x={x} y={y} width={width} labelPosition={col6} labelWidth={15}/>
        <VerticalDividerLine x={col1 + POT_DISTANCE_L - POT_DISTANCE_M / 2} y={y} length={2 * ROW_HEIGHT}/>
        <VerticalDividerLine x={col3 + POT_DISTANCE_M / 2} y={y} length={2 * ROW_HEIGHT}/>

        <RoundPushButton8 x={col1} y={topRow}
                          ledPosition="right" ledCount={3} ledLabels={['DCO', 'WT', 'PCM']}
                          label="Mode" labelPosition="bottom-pot"
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.DCO1.MODE}
        />


        <RotaryPot12 x={col2} y={topRow} label="Kbd"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO1.KBD}
        />

        <RotaryPot12 x={col3} y={topRow} label="LFO"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO1.LFO}
        />


        <RotaryPot12 x={col4} y={topRow} ledMode="single" label="Note"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO1.NOTE}
        />

        {/* TODO: DCO1 DETUNE */}

        <RoundPushButton8 x={col1} y={bottomRow}
                          ledPosition="right" ledCount={2} ledLabels={['Hard', 'Metal']}
                          label="Sync" labelPosition="bottom-pot"
                          hasOff
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.DCO1.SYNC}
        />

        <RotaryPot12 x={col3} y={bottomRow} label="Wheel"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO1.WHEEL}
        />

        <RoundLedPushButton8 x={col5} y={buttonRow1} label="Saw inv" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.DCO1.SAW_INV}
        />

        <RotaryPot21 x={col6} y={centerRow} ledMode="single" label="Waveform"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO1.WAVEFORM}
        />

        <RoundLedPushButton8 x={col7} y={buttonRow1} label="Sine" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.DCO1.PRE_FILTER_SINE}
        />

        <RoundPushButton8 x={col9} y={bottomRow + DUAL_LED_BUTTON_W_LABEL_OFFSET_Y}
                          ledPosition="top-horizontal" ledCount={2} ledLabels={['Sq', 'Sw']}
                          label="Sub wave" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.DCO1.SUB_WAVE}
        />

        <RotaryPot12 x={col8} y={topRow} ledMode="multi" label="Sub -1"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO1.SUB1}
        />

        <RotaryPot12 x={col8} y={bottomRow} ledMode="single" label="PW"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO1.PW}
        />

        <RotaryPot12 x={col9} y={topRow} ledMode="multi" label="Sub -2"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO1.SUB2}
        />


        {/*<RotaryPot12 x={col4} y={topRow} ledMode="multi" label="Super saw"/>*/}


    </>
}

export default DCO1