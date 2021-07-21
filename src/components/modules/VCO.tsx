import React from 'react';
import RotaryPot32 from '../pots/RotaryPot32';
import RotaryPot10 from '../pots/RotaryPot10';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import Header from '../misc/Header';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import midiConstants from '../../midi/controllers'

interface Props {
  x: number,
  y: number
}


const vco = ({ x, y }: Props) => {
  const topRow = y - 35;
  const bottomRow1 = y + 40;
  const bottomRow2 = bottomRow1 + 25;

  const col1 = x - 39;
  const col2 = x - 13;
  const col3 = x + 13;
  const col4 = x + 39;

  return <>
    <Header label="Oscillator 3" x={x} y={topRow - 20} width={100} align="center"/>
    <RotaryPot32 x={x} y={y} ledMode="single" label="Waveform" position={0.8} midiConfig={midiConstants.VCO.WAVEFORM}/>

    <RotaryPot10 x={col1} y={topRow} ledMode="single" label="Note" position={0.5} midiConfig={midiConstants.VCO.NOTE}/>
    <RotaryPot10 x={col1} y={y} ledMode="single" label="Detune" position={0.5} midiConfig={midiConstants.VCO.DETUNE}/>

    <RoundPushButton8 x={col2} y={topRow}
                      ledPosition="right" ledCount={3} ledLabels={['Hard', 'CEM Hard', 'CEM Soft']}
                      label="Sync" labelPosition="bottom"
                      hasOff
                      midiConfig={midiConstants.VCO.SYNC}
    />

    <RotaryPot10 x={col1} y={bottomRow1} ledMode="multi" label="Cross mod" position={0.1} midiConfig={midiConstants.VCO.CROSS_MOD}/>
    <RoundPushButton8 x={col2} y={bottomRow1}
                      ledPosition="right" ledCount={2} ledLabels={['Osc 1', 'Ext']}
                      label="Source" labelPosition="bottom"
                      midiConfig={midiConstants.VCO.CROSS_MOD_SRC}
    />
    <RotaryPot10 x={col4} y={bottomRow1} ledMode="single" label="PW" position={0.3} midiConfig={midiConstants.VCO.PW}/>

    <RoundLedPushButton8 x={col1} y={bottomRow2} label="Ext CV" labelPosition="bottom" midiConfig={midiConstants.VCO.EXT_CV}/>
    <RoundLedPushButton8 x={col2} y={bottomRow2} label="Wheel" labelPosition="bottom" midiConfig={midiConstants.VCO.WHEEL}/>
    <RoundLedPushButton8 x={col3} y={bottomRow2} label="LFO" labelPosition="bottom" midiConfig={midiConstants.VCO.LFO}/>
    <RoundLedPushButton8 x={col4} y={bottomRow2} label="Kbd" labelPosition="bottom" midiConfig={midiConstants.VCO.KBD}/>
  </>;
};

export default vco;