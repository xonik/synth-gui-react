import React from 'react';
import RotaryPot17 from '../pots/RotaryPot17';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import Header from '../misc/Header';

interface Props {
  x: number,
  y: number
  label: string,
  showSelect?: boolean
}

const LFO = ({ x, y, label, showSelect = false }: Props) => {
  const buttonCol = x + 10;
  const firstPotX = buttonCol + 5;
  const potY = y + 35;
  const topY = potY - 15;
  const bottomY = potY + 15;



  const potDistance = 40;
  return <>
    <Header align="left" label={label} x={x} y={y} width={170}/>
    {showSelect && <RoundLedPushButton8 label="LFO sel" x={firstPotX} y={potY} labelPosition="bottom"/>}
    <RotaryPot17 ledMode="single" label="Rate" x={firstPotX + potDistance} y={potY} position={0.4}/>
    <RotaryPot17 ledMode="single" label="Depth" x={firstPotX + potDistance * 2} y={potY} position={0.1}/>
    <RoundPushButton8 x={firstPotX + potDistance * 3} y={potY}
                         label="Shape" labelPosition="bottom"
                         ledPosition="right" ledCount="5"
                         ledOn={[true, false, false, false, false]}
                         ledLabels={['Saw', 'Tri', 'Sqr', 'Sin', 'S & H', ]}
    />
    <RoundLedPushButton8 label="Sync" x={buttonCol} y={topY} labelPosition="right"/>
    <RoundLedPushButton8 label="Reset" x={buttonCol} y={potY} labelPosition="right"/>
    <RoundLedPushButton8 label="Once" x={buttonCol} y={bottomY} labelPosition="right"/>
  </>;
};

export default LFO;