import React from 'react';
import Header from '../../misc/Header';
import RoundPushButton8 from '../../buttons/RoundPushButton8';
import { ControllerGroupIds } from '../../../synthcore/types'
import fxControllers from '../../../synthcore/modules/fx/fxControllers'
import RotaryPot12 from "../../pots/RotaryPot12";
import {
    DUAL_LED_BUTTON_NO_LABEL_OFFSET_Y,
    POT_DISTANCE_M,
    POT_OFFSET_Y
} from "../../../constants";

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.FX

const BitCrusherPre = ({ x, y }: Props) => {

    const row1 = y
    const row2 = row1 + POT_OFFSET_Y
    const row3 = row2 + DUAL_LED_BUTTON_NO_LABEL_OFFSET_Y

    const col1 = x + 10
    const col2 = col1 + POT_DISTANCE_M
    const col3 = col2 + POT_DISTANCE_M
    const col4 = col3 + POT_DISTANCE_M
    const col5 = col4 + POT_DISTANCE_M

    return <>
        <RoundPushButton8 x={col1} y={row3} ledPosition="top" ledCount={2}
                          ledLabels={['S', 'L']}
                          ctrlGroup={ctrlGroup}
                          ctrl={fxControllers.BIT_CRUSHER.IN}
        />

        <RotaryPot12 ledMode="single" ledCount={12} label="Bits" x={col2} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrl={fxControllers.BIT_CRUSHER.BITS}
        />

        <RotaryPot12 ledMode="single" label="Rate" x={col3} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrl={fxControllers.BIT_CRUSHER.RATE}
        />

        {/*        <RoundLedPushButton8 x={col4} y={row2 + 3}
                             label="Recon"
                             labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={fxControllers.BIT_CRUSHER.RECON}
        />*/}

        <RotaryPot12 ledMode="multi" label="Level" x={col4} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrl={fxControllers.BIT_CRUSHER.LEVEL}
        />

        <RoundPushButton8 x={col5} y={row3} ledPosition="top" ledCount={2}
                          ledLabels={['S', 'L']}
                          ctrlGroup={ctrlGroup}
                          hasOff
                          ctrl={fxControllers.BIT_CRUSHER.OUT}
        />

    </>;
};

export default BitCrusherPre;