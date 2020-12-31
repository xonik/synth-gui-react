import React from 'react';
import RotaryPot32 from '../pots/RotaryPot32';
import RotaryPot10 from '../pots/RotaryPot10';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import Header from '../misc/Header';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';

interface Props {
  x: number,
  y: number
}


const vco = ({ x, y }: Props) => {
  const topRow = y - 35;
  const topMidRow = y - (75/6) + 2.5;
  const bottomMidRow = y + (75/6) + 2.5;
  const bottomRow1 = y + 40;
  const bottomRow2 = y + 65;

  const col0 = x - 65;
  const col1 = x - 39;
  const col2 = x - 13;
  const col3 = x + 13;
  const col4 = x + 39;

  return <>
    <Header label="Oscillator 3" x={x - 10} y={topRow - 20} width={125} align="center"/>
    <RotaryPot32 x={x} y={y} ledMode="single" label="Waveform" position={0.8}/>

    <RotaryPot10 x={col1} y={topRow} ledMode="single" label="Note" position={0.5}/>
    <RotaryPot10 x={col1} y={y} ledMode="single" label="Detune" position={0.5}/>

    <RoundPushButton8 x={col2} y={topRow}
                      ledPosition="right" ledCount="3" ledOn={[true, false]} ledLabels={['Hard', 'CEM Hard', 'CEM Soft']}
                      label="Sync" labelPosition="bottom"
    />

    <RotaryPot10 x={col1} y={bottomRow1} ledMode="multi" label="Cross mod" position={0.1}/>
    <RoundPushButton8 x={col2} y={bottomRow1}
                      ledPosition="right" ledCount="2" ledOn={[true, false]} ledLabels={['Osc 1', 'Ext']}
                      label="Source" labelPosition="bottom"
    />
    <RotaryPot10 x={col4} y={bottomRow1} ledMode="single" label="PW" position={0.3}/>

    <RoundLedPushButton8 x={col0} y={topRow} ledOn={[true]} label="Ext CV" labelPosition="bottom"/>
    <RoundLedPushButton8 x={col0} y={topMidRow} ledOn={[true]} label="Wheel" labelPosition="bottom"/>
    <RoundLedPushButton8 x={col0} y={bottomMidRow} ledOn={[true]} label="LFO" labelPosition="bottom"/>
    <RoundLedPushButton8 x={col0} y={bottomRow1} ledOn={[true]} label="Kbd" labelPosition="bottom"/>
  </>;
};

export default vco;