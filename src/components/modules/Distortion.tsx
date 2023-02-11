import React from 'react'
import RotaryPot15 from '../pots/RotaryPot15'
import Header from '../misc/Header'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import { ControllerGroupIds } from '../../synthcore/types'
import fxControllers from '../../synthcore/modules/fx/fxControllers'

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.FX

const Distortion = ({ x, y }: Props) => {

    const row1 = y
    const row2 = row1 + 30

    const col1 = x + 5
    const col2 = col1 + 25
    const col5 = col2 + 40
    const col6 = col5 + 25

    return <>
        <Header label="Distortion" x={x} y={row1} width={105}/>
        <RoundPushButton8 x={col1} y={row2 + 8} ledPosition="top" ledCount={2} label="In" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={fxControllers.DISTORTION.IN}
        />

        <RotaryPot15 ledMode="multi" label="Drive" x={col2} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrl={fxControllers.DISTORTION.DRIVE}
        />

        <RotaryPot15 ledMode="multi" label="Level" x={col5} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrl={fxControllers.DISTORTION.LEVEL}
        />

        <RoundPushButton8 x={col6} y={row2 + 8} ledPosition="top" ledCount={2} label="Out" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          hasOff
                          ctrl={fxControllers.DISTORTION.OUT}
        />

    </>
}

export default Distortion