import React from 'react';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import Header from '../misc/Header';
import { ControllerGroupIds } from '../../synthcore/types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectNoise } from '../../synthcore/modules/noise/noiseReducer'
import { NoiseControllerIds } from '../../synthcore/modules/noise/types'

interface Props {
  x: number,
  y: number
}

const ctrlGroup = ControllerGroupIds.NOISE

const Noise = ({ x, y }: Props) => {
  const noise = useAppSelector(selectNoise)

  return <>
    <Header label="Noise" x={x} y={y} width={35}/>
    <RoundPushButton8 x={x+15} y={y+38}
                      ledPosition="top" ledCount={3} ledLabels={['White', 'Pink', 'Red']}
                      label="Colour" labelPosition="bottom"
                      ctrlGroup={ctrlGroup}
                      ctrlId={NoiseControllerIds.COLOUR}
                      value={noise.colour}
    />
  </>;
};



export default Noise;