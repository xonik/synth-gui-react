import RotaryPot32 from './pots/RotaryPot32';
import React from 'react';
import RotaryPot10 from './pots/RotaryPot10';
import RoundPushButton8 from './buttons/RoundPushButton8';
import Header from './misc/Header';

interface Props {
  x: number,
  y: number
}


const vco = ({ x, y }: Props) => {
  const topRow = y - 30;
  const bottomRow1 = y + 40;
  const bottomRow2 = y + 70;

  const col1 = x - 39;
  const col2 = x - 13;
  const col3 = x + 13;
  const col4 = x + 39;

  return <>
    <Header label="Oscillator 3" x={x} y={topRow - 20} width={110} align="center"/>
    <RotaryPot32 x={x} y={y} ledMode="single" label="Waveform" position={0.8}/>

    <RotaryPot10 x={col1} y={topRow} ledMode="single" label="Tune" position={0.5}/>
    <RotaryPot10 x={col1} y={y} ledMode="single" label="Detune" position={0.5}/>

    <RotaryPot10 x={col1} y={bottomRow1} ledMode="multi" label="Cross mod" position={0.1}/>
    <RoundPushButton8 x={col2} y={bottomRow1}
                      ledPosition="right" ledCount="2" ledOn={[true, false]} ledLabels={['Osc 1', 'Ext']}
                      label="Source" labelPosition="bottom"
    />
    <RotaryPot10 x={col4} y={bottomRow1} ledMode="single" label="PW" position={0.3}/>

    <RoundPushButton8 x={col1} y={bottomRow2} ledPosition="top" ledCount="1" ledOn={[true]} label="Ext CV" labelPosition="bottom"/>
    <RoundPushButton8 x={col2} y={bottomRow2} ledPosition="top" ledCount="1" ledOn={[true]} label="Wheel" labelPosition="bottom"/>
    <RoundPushButton8 x={col3} y={bottomRow2} ledPosition="top" ledCount="1" ledOn={[true]} label="LFO" labelPosition="bottom"/>
    <RoundPushButton8 x={col4} y={bottomRow2} ledPosition="top" ledCount="1" ledOn={[true]} label="Kbd" labelPosition="bottom"/>
  </>;
};

export default vco;