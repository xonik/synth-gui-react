import React from 'react'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import { ControllerGroupIds } from '../../synthcore/types'
import fxControllers from '../../synthcore/modules/fx/fxControllers'
import RotaryPot12 from "../pots/RotaryPot12";
import SubHeader from "../misc/SubHeader";
import {
    DUAL_LED_BUTTON_NO_LABEL_OFFSET_Y,
    POT_DISTANCE_M,
    POT_OFFSET_Y, ROW_HEIGHT, ROW_SPACING
} from "../../constants";

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.FX

const Distortion = ({ x, y }: Props) => {

    const row1 = y
    const row2 = row1 + POT_OFFSET_Y
    const row3 = row2 + DUAL_LED_BUTTON_NO_LABEL_OFFSET_Y

    const col1 = x + 10
    const col2 = col1 + POT_DISTANCE_M
    const col3 = col2 + 2 * POT_DISTANCE_M
    const col4 = col3 + POT_DISTANCE_M

    return <>
        <rect x={x} y={y} width="131" height={2 * ROW_HEIGHT - ROW_SPACING} className="module-background"/>
        <SubHeader x={x} y={row1} width={131} label="Effects"/>
        <RoundPushButton8 x={col1} y={row3}
                          ledPosition="top"
                          ledCount={2}
                          ledLabels={['S','L']}
                          ctrlGroup={ctrlGroup}
                          ctrl={fxControllers.DISTORTION.IN}
        />

        <RotaryPot12 ledMode="multi" label="Drive" x={col2} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrl={fxControllers.DISTORTION.DRIVE}
        />

        <RotaryPot12 ledMode="multi" label="Level" x={col3} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrl={fxControllers.DISTORTION.LEVEL}
        />

        <RoundPushButton8 x={col4} y={row3}
                          ledPosition="top"
                          ledCount={2}
                          ledLabels={['S','L']}
                          ctrlGroup={ctrlGroup}
                          hasOff
                          ctrl={fxControllers.DISTORTION.OUT}
        />

    </>
}

export default Distortion