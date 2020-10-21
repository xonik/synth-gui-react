import React from 'react';
import RotaryPot17 from '../pots/RotaryPot17';
import RotaryPot10 from '../pots/RotaryPot10';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import Header from '../misc/Header';

interface Props {
  x: number,
  y: number
  label: string,
  showSelect?: boolean
}

const Envelope = ({ x, y, label, showSelect = false }: Props) => {
  const firstPotX =  x + 30 ;
  const topRowY = y + 20;
  const potY = y + 45;
  const potDistance = 40;
  return <>
    <Header align="left" label={label} x={x} y={y} width={260}/>
    <RotaryPot17 ledMode="multi" label="Attack" x={firstPotX} y={potY} position={0.4}/>
    <RotaryPot17 ledMode="multi" label="Decay 1" x={firstPotX + potDistance} y={potY} position={0.1}/>
    <RotaryPot17 ledMode="multi" label="Decay 2" x={firstPotX + potDistance * 2} y={potY} position={0.4}/>
    <RotaryPot17 ledMode="multi" label="Sustain" x={firstPotX + potDistance * 3} y={potY} position={0.8}/>
    <RotaryPot17 ledMode="multi" label="Release 1" x={firstPotX + potDistance * 4} y={potY} position={0.7}/>
    <RotaryPot17 ledMode="multi" label="Release 2" x={firstPotX + potDistance * 5} y={potY} position={1}/>

    {showSelect && <RoundPushButton8 label="Env sel" x={firstPotX - potDistance * 0.5} y={topRowY} labelPosition="bottom"/>}
    <RotaryPot10 ledMode="multi" label="Delay" x={firstPotX + potDistance * 0.5} y={topRowY} position={0.4}/>
    <RotaryPot10 ledMode="multi" label="D1 Level" x={firstPotX + potDistance * 1.5} y={topRowY} position={0.4}/>
    <RoundPushButton8 label="Trigger" x={firstPotX + potDistance * 2.5} y={topRowY} labelPosition="bottom"/>
    <RoundLedPushButton8 label="Loop" x={firstPotX + potDistance * 3.5} y={topRowY} labelPosition="bottom"/>
    <RotaryPot10 ledMode="multi" label="R1 Level" x={firstPotX + potDistance * 4.5} y={topRowY} position={0.4}/>
    <RoundLedPushButton8 label="Invert" x={firstPotX + potDistance * 5.5} y={topRowY} labelPosition="bottom"/>
  </>;
};



export default Envelope;