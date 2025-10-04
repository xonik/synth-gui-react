import React from 'react';
import RotaryPot12 from '../../pots/RotaryPot12';
import RoundPushButton8 from '../../buttons/RoundPushButton8';
import { ControllerGroupIds } from '../../../synthcore/types'
import masterClockControllers from '../../../synthcore/modules/masterClock/masterClockControllers'
import SubHeader from "../../misc/SubHeader";
import {
    POT_DISTANCE_L,
    POT_DISTANCE_M,
    POT_OFFSET_Y,
} from "../../../constants";
import { SHOW_CUT } from "../../../config";
import { ModuleProps } from "../types";
import { ModuleBorder } from "../../misc/ModuleBorder";

const ctrlGroup = ControllerGroupIds.MASTER_CLOCK

const Clock = ({ x, y, height, width }: ModuleProps) => {

    const row1 = y;
    const row2 = y + POT_OFFSET_Y
    const col1 = x + POT_DISTANCE_M / 2;
    const col2 = col1 + POT_DISTANCE_L;

    return <>
        {/*!SHOW_CUT && <rect x={0} y={0} width={64} height={ROW_HEIGHT - ROW_SPACING} className="module-background"/>*/}
        <ModuleBorder x={x} y={y} height={height} width={width} />
        <SubHeader label="Clock" x={x} y={row1} width={width} labelPosition="left"  labelWidth={15}/>

        <RoundPushButton8 labelPosition="bottom-pot" x={col1} y={row2} label="Source" ledCount={3} ledPosition="right" ledLabels={['Int', 'Midi', 'Ext']}
                          ctrlGroup={ctrlGroup}
                          ctrl={masterClockControllers.SOURCE}
        />

        <RotaryPot12 ledMode="single" label="Rate" x={col2} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrl={masterClockControllers.RATE}
        />

    </>;
};

export default Clock;