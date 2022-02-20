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
        <Header label="Noise" x={x} y={y} width={35}/>
        <RoundPushButton8 x={x + 15} y={y + 38}
                          ledPosition="top" ledCount={3} ledLabels={['White', 'Pink', 'Red']}
                          label="Colour" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={noiseControllers.COLOUR}
        />
    </>
}


export default Noise