import React from 'react';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import Header from '../misc/Header';
import midiConstants from '../../midi/midiControllers'

interface Props {
  x: number,
  y: number
}

const Ringmod = ({ x, y }: Props) => {
  return <>
    <Header label="Ring mod" x={x} y={y} width={30}/>
    <RoundPushButton8 x={x+13} y={y+38}
                      ledPosition="top"  ledCount={2} ledLabels={['1->2', 'Ext->2']}
                      label="Sources" labelPosition="bottom"
                      midiConfig={midiConstants.RING_MOD.SOURCE}
    />
  </>;
};



export default Ringmod;