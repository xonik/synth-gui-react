import React from 'react'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import Header from '../misc/Header'
import { ControllerGroupIds } from '../../synthcore/types'
import noiseControllers from '../../synthcore/modules/noise/noiseControllers'

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.NOISE

const Noise = ({ x, y }: Props) => {

    return <>
        <Header label="Noise" x={x} y={y} width={40}/>
        <RoundPushButton8 x={x + 10} y={y + 22}
                          ledPosition="right" ledCount={3} ledLabels={['White', 'Pink', 'Red']}
                          label="" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={noiseControllers.COLOUR}
        />
    </>
}


export default Noise