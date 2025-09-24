import React from 'react';
import RotaryPot12 from '../pots/RotaryPot12';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import { ControllerGroupIds } from '../../synthcore/types'
import masterClockControllers from '../../synthcore/modules/masterClock/masterClockControllers'
import SubHeader from "../misc/SubHeader";

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.MASTER_CLOCK

const Clock = ({ x, y }: Props) => {

    const row1 = 0;
    const row2 = 17.5;
    const col1 = 10;
    const col2 = col1 + 47.5;

    return <svg x={x} y={y}>
        <SubHeader label="Master clock" x={0} y={row1} width={70}/>
        <RoundPushButton8 labelPosition="bottom-pot" x={col1} y={row2} label="Source" ledCount={3} ledPosition="right" ledLabels={['Master', 'Midi', 'Ext']}
                          ctrlGroup={ctrlGroup}
                          ctrl={masterClockControllers.SOURCE}
        />

        <RotaryPot12 ledMode="single" label="Rate" x={col2} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrl={masterClockControllers.RATE}
        />

    </svg>;
};

export default Clock;