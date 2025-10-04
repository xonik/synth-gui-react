import React from 'react'
import RoundPushButton8 from '../../buttons/RoundPushButton8'
import { ControllerGroupIds } from '../../../synthcore/types'
import fxControllers from '../../../synthcore/modules/fx/fxControllers'
import RotaryPot12 from "../../pots/RotaryPot12";
import SubHeader from "../../misc/SubHeader";
import {
    DUAL_LED_BUTTON_W_LABEL_OFFSET_Y,
    POT_DISTANCE_L,
    POT_DISTANCE_M,
    POT_DISTANCE_S,
    POT_OFFSET_Y,
    ROW_HEIGHT,
} from "../../../constants";
import { SHOW_CUT } from "../../../config";
import { ModuleProps } from "../types";
import { ModuleBorder } from "../../misc/ModuleBorder";

const ctrlGroup = ControllerGroupIds.FX

const Effects = ({ x, y, height, width }: ModuleProps) => {

    const row1 = y
    const row2 = row1 + POT_OFFSET_Y
    const row3 = row2 + ROW_HEIGHT

    const col1 = x + POT_DISTANCE_M / 2
    const col2 = col1 + POT_DISTANCE_S
    const col3 = col1 + POT_DISTANCE_L
    const col4 = col3 + POT_DISTANCE_S

    const center = x + POT_DISTANCE_L

    return <>
        {/*!SHOW_CUT && <rect x={x} y={y} width="131" height={2 * ROW_HEIGHT} className="module-background"/>*/}
        <ModuleBorder x={x} y={y} height={height} width={width} />
        <SubHeader
            x={x} y={row1}
            width={width / 2}
            label="Distort" labelWidth={20} labelPosition="center" padding="left"/>


        <SubHeader
            x={x + width / 2} y={row1}
            width={width / 2}
            label="Crush" labelWidth={20} labelPosition="center" padding="right"/>

        <RotaryPot12 ledMode="multi" label="Drive" x={col1} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrl={fxControllers.DISTORTION.DRIVE}
        />

        <RoundPushButton8 x={col2} y={row2 + DUAL_LED_BUTTON_W_LABEL_OFFSET_Y}
                          ledPosition="top-horizontal-no-label"
                          ledCount={2}
                          ledRingColors={['#00bfa6', '#ff8700']}
                          label="From"
                          labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={fxControllers.DISTORTION.IN}
        />

        <RotaryPot12 ledMode="multi" label="Level" x={col1} y={row3}
                     ctrlGroup={ctrlGroup}
                     ctrl={fxControllers.DISTORTION.LEVEL}
        />

        <RoundPushButton8 x={col2} y={row3 + DUAL_LED_BUTTON_W_LABEL_OFFSET_Y}
                          ledPosition="top-horizontal-no-label"
                          ledCount={2}
                          ledRingColors={['#00bfa6', '#ff8700']}
                          label="To"
                          labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          hasOff
                          ctrl={fxControllers.DISTORTION.OUT}
        />


        <RotaryPot12 ledMode="single" ledCount={12} label="Bits" x={col3} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrl={fxControllers.BIT_CRUSHER.BITS}
        />

        <RoundPushButton8 x={col4} y={row2 + DUAL_LED_BUTTON_W_LABEL_OFFSET_Y}
                          ledPosition="top-horizontal-no-label"
                          ledCount={2}
                          ledRingColors={['#00bfa6', '#ff8700']}
                          label="From"
                          labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={fxControllers.BIT_CRUSHER.IN}
        />

        <RotaryPot12 ledMode="single" label="Rate" x={col3} y={row3}
                     ctrlGroup={ctrlGroup}
                     ctrl={fxControllers.BIT_CRUSHER.RATE}
        />

        {/*        <RoundLedPushButton8 x={col4} y={row2 + 3}
                             label="Recon"
                             labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={fxControllers.BIT_CRUSHER.RECON}
        />

        <RotaryPot12 ledMode="multi" label="Level" x={col4} y={row3}
                     ctrlGroup={ctrlGroup}
                     ctrl={fxControllers.BIT_CRUSHER.LEVEL}
        />*/}

        <RoundPushButton8 x={col4} y={row3 + DUAL_LED_BUTTON_W_LABEL_OFFSET_Y}
                          ledPosition="top-horizontal-no-label"
                          ledCount={2}
                          ledRingColors={['#00bfa6', '#ff8700']}
                          label="To"
                          labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          hasOff
                          ctrl={fxControllers.BIT_CRUSHER.OUT}
        />
    </>
}

export default Effects