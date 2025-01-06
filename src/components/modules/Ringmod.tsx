import React from 'react'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import Header from '../misc/Header'
import { ControllerGroupIds } from '../../synthcore/types'
import ringModControllers from '../../synthcore/modules/ringMod/ringModControllers'

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.RING_MOD

const Ringmod = ({ x, y }: Props) => {
    return <>
        <Header label="Ring mod" x={x} y={y} width={26}/>
        <RoundPushButton8 x={x + 10} y={y + 35}
                          ledPosition="top" ledCount={3} ledLabels={['1 -> 2', 'Ext -> 2', 'VCO -> 2']}
                          label="" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={ringModControllers.SOURCE}
        />
    </>
}


export default Ringmod