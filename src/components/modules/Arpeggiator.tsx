/*
- Button - Mode
- Button w/multiple leds Range (octaves)
- Button - On/off
- Button - trigger (triggers on first key press?)
- 17mm pot - Tempo (or separate clock and clock sunc)
- Button - Sync (button) - int clock, Lfo, ext clock
 */
import React from 'react';
import RotaryPot12 from '../pots/RotaryPot12';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import { ControllerGroupIds } from '../../synthcore/types'
import arpControllers from '../../synthcore/modules/arp/arpControllers'
import SubHeader from "../misc/SubHeader";
import { BUTTON_DISTANCE_S, PADDING_LEFT, POT_DISTANCE_M, POT_OFFSET_Y } from "../../constants";

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.ARP

const Arpeggiator = ({ x, y }: Props) => {

    const row1 = 0;
    const row2 = POT_OFFSET_Y
    const col1 = POT_DISTANCE_M
    const col2 = POT_DISTANCE_M * 0.75;
    const col3 = col2 + POT_DISTANCE_M;
    const col7 = col2 + POT_DISTANCE_M * 6
    const col6 = col7 - BUTTON_DISTANCE_S
    const col5 = col6 - 2 * BUTTON_DISTANCE_S;
    const col4 = col3 + 2 * BUTTON_DISTANCE_S;

    return <svg x={x} y={y}>
        <SubHeader label="Arp" x={0} y={row1} width={197} labelPosition="left"/>

        <RotaryPot12 ledMode="single" label="Rate" x={col2} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrl={arpControllers.TEMPO}
        />

        <RoundPushButton8 labelPosition="bottom-pot" x={col3} y={row2} label="Sync" ledCount={3} ledPosition="right" ledLabels={['Clock', 'LFO1', 'Ext']} hasOff
                          ctrlGroup={ctrlGroup}
                          ctrl={arpControllers.SYNC}
        />

        <RoundPushButton8 labelPosition="bottom-pot" x={col4} y={row2} label="Range" ledCount={3} ledPosition="right" ledLabels={['1', '2', '3']}
                          ctrlGroup={ctrlGroup}
                          ctrl={arpControllers.RANGE}
        />

        <RoundPushButton8 labelPosition="bottom-pot" x={col5} y={row2} label="Mode" ledCount={5} ledPosition="sides" ledLabels={['Up', 'Down', 'U/D', 'Rand', 'Other']}
                          ctrlGroup={ctrlGroup}
                          ctrl={arpControllers.MODE}
        />

        <RoundLedPushButton8 labelPosition="bottom-pot" x={col6} y={row2} label="On"
                             ctrlGroup={ctrlGroup}
                             ctrl={arpControllers.ON_OFF}
        />

        <RoundLedPushButton8 labelPosition="bottom-pot" x={col7} y={row2} label="Trigger"
                             ctrlGroup={ctrlGroup}
                             ctrl={arpControllers.TRIGGER}
        />

    </svg>;
};

export default Arpeggiator;