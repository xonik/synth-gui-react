import React from 'react';
import RotaryPot32 from '../pots/RotaryPot32';
import RotaryPot10 from '../pots/RotaryPot10';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import Header from '../misc/Header';

interface Props {
  x: number,
  y: number
}


const dco1 = ({ x, y }: Props) => {

  const topRow = y - 35;
  const bottomRow1 = y + 40;
  const bottomRow2 = bottomRow1 + 25;

  const col1 = x - 39;
  const col2 = x - 13;
  const col3 = x + 13;
  const col4 = x + 39;

  return <>
    <Header label="Oscillator 1" x={x} y={topRow - 20} width={100} align="center"/>
    <RotaryPot32 x={x} y={y} ledMode="single" label="Waveform" position={0.8}/>

    <RotaryPot10 x={col1} y={topRow} ledMode="single" label="Note" position={0.5}/>
    <RoundPushButton8 x={col2} y={topRow}
                      ledPosition="right" ledCount="2" ledOn={[true, false]} ledLabels={['1 -> 2', '2 -> 1']}
                      label="Sync" labelPosition="bottom"
    />
    <RotaryPot10 x={col4} y={topRow} ledMode="multi" label="Super saw" position={0.3}/>

    <RoundPushButton8 x={col1} y={bottomRow1}
                      ledPosition="top" ledCount="2" ledOn={[true, false]} ledLabels={['Sqr', 'Saw']}
                      label="Sub wave" labelPosition="bottom"
    />
    <RotaryPot10 x={col2} y={bottomRow1} ledMode="multi" label="Sub -1" position={0.1}/>
    <RotaryPot10 x={col3} y={bottomRow1} ledMode="multi" label="Sub -2" position={0.6}/>
    <RotaryPot10 x={col4} y={bottomRow1} ledMode="single" label="PW" position={0.3}/>
    <RoundLedPushButton8 x={col2} y={bottomRow2} ledOn={[true]} label="Wheel" labelPosition="bottom"/>
    <RoundLedPushButton8 x={col3} y={bottomRow2} ledOn={[true]} label="LFO" labelPosition="bottom"/>
    <RoundLedPushButton8 x={col4} y={bottomRow2} ledOn={[true]} label="Kbd" labelPosition="bottom"/>
  </>;
};

export default dco1;