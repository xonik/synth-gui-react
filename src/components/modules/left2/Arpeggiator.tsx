import React from 'react';
import RotaryPot12 from '../../pots/RotaryPot12';
import RoundPushButton8 from '../../buttons/RoundPushButton8';
import RoundLedPushButton8 from '../../buttons/RoundLedPushButton8';
import { ControllerGroupIds } from '../../../synthcore/types'
import arpControllers from '../../../synthcore/modules/arp/arpControllers'
import SubHeader from "../../misc/SubHeader";
import {
    POT_DISTANCE_M,
    POT_DISTANCE_L,
    POT_OFFSET_Y,
    ROW_HEIGHT,
    POT_DISTANCE_S
} from "../../../constants";
import { SHOW_CUT } from "../../../config";
import { ModuleBorder } from "../../misc/ModuleBorder";
import { ModuleProps } from "../types";

const ctrlGroup = ControllerGroupIds.ARP

const Arpeggiator = ({ x, y, height, width }: ModuleProps) => {

    const row1 = y;
    const row2 = y + POT_OFFSET_Y
    const row3 = row2 + ROW_HEIGHT

    const col1 = x + POT_DISTANCE_M  / 2
    const col2 = col1 + POT_DISTANCE_S
    const col3 = col1 + POT_DISTANCE_L

    return <>
        {/*!SHOW_CUT && <rect x={x} y={y} width={197} height={ROW_HEIGHT - ROW_SPACING} className="module-background"/>*/}
        <ModuleBorder x={x} y={y} height={height} width={width} />
        <SubHeader label="Arp" x={x} y={row1} width={width} labelPosition="center" labelWidth={15} />

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
                          ledCount={3} ledPosition="right" ledLabels={['Up', 'Down', 'Other']}
                          ctrlGroup={ctrlGroup}
                          ctrl={arpControllers.MODE}
        />

        <RoundPushButton8 x={col3} y={row3}
                          label="Range" labelPosition="bottom-pot"
                          ledCount={3} ledPosition="right" ledLabels={['1 oct', '2 oct', '3 oct']}
                          ctrlGroup={ctrlGroup}
                          ctrl={arpControllers.RANGE}
        />

        <RoundLedPushButton8 labelPosition="bottom-pot" x={col1} y={row3} label="On"
                             ctrlGroup={ctrlGroup}
                             ctrl={arpControllers.ON_OFF}
        />

        <RoundLedPushButton8 labelPosition="bottom-pot" x={col2} y={row3} label="Sequence"
                             ctrlGroup={ctrlGroup}
                             ctrl={arpControllers.SEQUENCE}
        />

    </>;
};

export default Arpeggiator;