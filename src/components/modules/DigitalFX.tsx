import React from 'react';
import RotaryPotWOLeds10 from '../pots/RotaryPotWOLeds10';
import Display from '../misc/Display';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import midiConstants from '../../midiConstants'

interface Props {
  x: number,
  y: number
}


const DigitalFX = ({ x, y }: Props) => {

  const displayHeight = 40;
  const displayWidth = 80;

  const row1 = y + 20;

  const displayX = x + 20;
  const displayY = row1 + 10;


  const row4 = row1 + displayHeight + 20;

  const displayCenterY = displayY + displayHeight / 2;
  const row2left = displayCenterY - 15;
  const row3left = displayCenterY + 15;
  const row1right = displayCenterY - 20;
  const row4right = displayCenterY + 20;

  const knobSpacing = 25;
  const col1 = x+5;
  const col2 = displayX + displayWidth / 2 - knobSpacing;
  const col3 = displayX + displayWidth / 2;
  const col4 = displayX + displayWidth / 2 + knobSpacing;
  const col5 = displayX + displayWidth + 15

  return <>
    <RoundPushButton8 x={col1} y={row2left} label="Source" ledCount={2} ledLabels={['FX1', 'FX1']} labelPosition="bottom" ledPosition="top" midiConfig={midiConstants.DSP1.SOURCE}/>
    <RoundPushButton8 x={col1} y={row3left} label="Source" ledCount={2} ledLabels={['FX2', 'FX2']} labelPosition="top" ledPosition="bottom" midiConfig={midiConstants.DSP2.SOURCE}/>

    <RotaryPotWOLeds10 x={col2} y={row1} midiConfig={midiConstants.DSP1.POT1}/>
    <RotaryPotWOLeds10 x={col3} y={row1} midiConfig={midiConstants.DSP1.POT2}/>
    <RotaryPotWOLeds10 x={col4} y={row1} midiConfig={midiConstants.DSP1.POT3}/>

    <Display x={displayX} y={displayY} width={displayWidth} height={displayHeight}/>

    <RotaryPotWOLeds10 x={col2} y={row4} midiConfig={midiConstants.DSP2.POT1}/>
    <RotaryPotWOLeds10 x={col3} y={row4} midiConfig={midiConstants.DSP2.POT2}/>
    <RotaryPotWOLeds10 x={col4} y={row4} midiConfig={midiConstants.DSP2.POT3}/>

    <RotaryPotWOLeds10 x={col5} y={row1right} label="Effect" midiConfig={midiConstants.DSP1.EFFECT}/>
    <RoundLedPushButton8 x={col5} y={displayCenterY} label="Chain" labelPosition="bottom" midiConfig={midiConstants.DSP2.CHAIN}/>
    <RotaryPotWOLeds10 x={col5} y={row4right} label="Effect" midiConfig={midiConstants.DSP2.EFFECT}/>
  </>;
};

export default DigitalFX;