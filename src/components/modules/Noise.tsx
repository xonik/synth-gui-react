import React from 'react'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import { ControllerGroupIds } from '../../synthcore/types'
import noiseControllers from '../../synthcore/modules/noise/noiseControllers'
import SubHeader from "../misc/SubHeader";
import { PADDING_LEFT, POT_OFFSET_Y } from "../../constants";

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.NOISE

const Noise = ({ x, y }: Props) => {

    return <>
        <SubHeader label="Noise" labelPosition="left" x={x} y={y} width={45}/>
        <RoundPushButton8 x={x + PADDING_LEFT} y={y + POT_OFFSET_Y}
                          ledPosition="right" ledCount={3} ledLabels={['White', 'Pink', 'Red']}
                          label="" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={noiseControllers.COLOUR}
        />
    </>
}


export default Noise