import React from 'react'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import { ControllerGroupIds } from '../../synthcore/types'
import ringModControllers from '../../synthcore/modules/ringMod/ringModControllers'
import SubHeader from "../misc/SubHeader";

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.RING_MOD

const Ringmod = ({ x, y }: Props) => {
    return <>
        <SubHeader label="Ring" labelPosition="left" x={x} y={y} width={40}/>
        <RoundPushButton8 x={x + 10} y={y + 15}
                          ledPosition="right" ledCount={3} ledLabels={['1 -> 2', 'E -> 2', '3 -> 2']}
                          label="" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={ringModControllers.SOURCE}
        />
    </>
}


export default Ringmod