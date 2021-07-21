import React from 'react';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import Header from '../misc/Header';
import midiConstants from '../../midi/controllers'

interface Props {
  x: number,
  y: number
}

const Noise = ({ x, y }: Props) => {
  return <>
    <Header label="Noise" x={x} y={y} width={35}/>
    <RoundPushButton8 x={x+15} y={y+38}
                      ledPosition="top" ledCount={3} ledLabels={['White', 'Pink', 'Red']}
                      label="Colour" labelPosition="bottom"
                      midiConfig={midiConstants.NOISE.COLOUR}
    />
  </>;
};



export default Noise;