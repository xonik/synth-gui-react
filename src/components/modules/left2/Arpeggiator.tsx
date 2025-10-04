/*
- Button - Mode
- Button w/multiple leds Range (octaves)
- Button - On/off
- Button - trigger (triggers on first key press?)
- 17mm pot - Tempo (or separate clock and clock sunc)
- Button - Sync (button) - int clock, Lfo, ext clock
 */
import React from 'react';
import RotaryPot12 from '../../pots/RotaryPot12';
import RoundPushButton8 from '../../buttons/RoundPushButton8';
import RoundLedPushButton8 from '../../buttons/RoundLedPushButton8';
import { ControllerGroupIds } from '../../../synthcore/types'
import arpControllers from '../../../synthcore/modules/arp/arpControllers'
import SubHeader from "../../misc/SubHeader";
import {
    BUTTON_DISTANCE_S,
    POT_DISTANCE_M,
    POT_DISTANCE_L,
    POT_OFFSET_Y,
    ROW_HEIGHT,
    ROW_SPACING, POT_DISTANCE_S
} from "../../../constants";
import { SHOW_CUT } from "../../../config";

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.ARP

const Arpeggiator = ({ x, y }: Props) => {

    const row1 = y;
    const row2 = y + POT_OFFSET_Y
    const row3 = row2 + ROW_HEIGHT

    const col1 = x + POT_DISTANCE_M  / 2
    const col2 = col1 + POT_DISTANCE_S
    const col3 = col1 + POT_DISTANCE_L
    const col4 = col1 + POT_DISTANCE_L + BUTTON_DISTANCE_S / 2

    return <>
        {/*!SHOW_CUT && <rect x={x} y={y} width={197} height={ROW_HEIGHT - ROW_SPACING} className="module-background"/>*/}
        <SubHeader label="Arp" x={x} y={row1} width={2 * POT_DISTANCE_L} labelPosition="left"/>

        <RotaryPot12 ledMode="single" label="Rate" x={col2} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrl={arpControllers.TEMPO}
        />

        {/* Let sync source be settable from main panel */  }
        <RoundLedPushButton8 labelPosition="bottom-pot" x={col1} y={row2} label="Sync"
                          ctrlGroup={ctrlGroup}
                          ctrl={arpControllers.SYNC}
        />


        {/* TODO: Make this 'binary' style so multiple can be selected. Let Other default be random */}
        <RoundPushButton8 x={col3} y={row2}
                          label="Mode" labelPosition="bottom-pot"
                          ledCount={3} ledPosition="right" ledLabels={['U', 'D', '+']}
                          ctrlGroup={ctrlGroup}
                          ctrl={arpControllers.MODE}
        />

        <RoundPushButton8 x={col3} y={row3}
                          label="Range" labelPosition="bottom-pot"
                          ledCount={3} ledPosition="right" ledLabels={['1', '2', '3']}
                          ctrlGroup={ctrlGroup}
                          ctrl={arpControllers.RANGE}
        />

        <RoundLedPushButton8 labelPosition="bottom-pot" x={col1} y={row3} label="On"
                             ctrlGroup={ctrlGroup}
                             ctrl={arpControllers.ON_OFF}
        />

        { /* Rename to latch? */}
        <RoundLedPushButton8 labelPosition="bottom-pot" x={col2} y={row3} label="Latch"
                             ctrlGroup={ctrlGroup}
                             ctrl={arpControllers.TRIGGER}
        />

    </>;
};

export default Arpeggiator;