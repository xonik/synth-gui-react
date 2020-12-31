import React from 'react';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import Header from '../misc/Header';

interface Props {
  x: number,
  y: number
}

const Ringmod = ({ x, y }: Props) => {
  return <>
    <Header label="Ring mod" x={x} y={y} width={30}/>
    <RoundPushButton8 x={x+10} y={y+30}
                      ledPosition="top"  ledCount="2" ledOn={[true, false, false]} ledLabels={['1->2', 'Ext->2']}
                      label="Sources" labelPosition="bottom"
    />
  </>;
};



export default Ringmod;