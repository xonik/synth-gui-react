import React from 'react';
import './MainPanel.scss';
import RotaryPot10 from './pots/RotaryPot10';
import RotaryPot17 from './pots/RotaryPot17';
import RotaryPot32 from './pots/RotaryPot32';
import RotaryPot40 from './pots/RotaryPot40';
import RoundButton8 from './buttons/RoundButton8';

const row1 = 20;
const row2 = row1 + 35;
const row3 = row2 + 50;
const row4 = row3 + 60;

const buttonRow1 = 20;
const buttonRow2 = 40;

export default () => {

  return (
    <svg width="120cm" height="50cm" viewBox="0 0 1200 500" className="panel">
      <RotaryPot10 x={50} y={row1} ledMode="multi" potMode="spread" label="Attack" position={0.5}/>
      <RotaryPot10 x={90} y={row1} ledMode="multi" label="Decay" position={0.8}/>
      <RotaryPot10 x={130} y={row1} ledMode="multi" label="Sustain" position={0.2}/>
      <RotaryPot10 x={170} y={row1} ledMode="multi" label="Release" position={0.5}/>

      <RotaryPot17 x={50} y={row2} ledMode="multi" potMode="spread" label="Attack" position={0.5}/>
      <RotaryPot17 x={90} y={row2} ledMode="multi" label="Decay" position={0.8}/>
      <RotaryPot17 x={130} y={row2} ledMode="multi" label="Sustain" position={0.2}/>
      <RotaryPot17 x={170} y={row2} ledMode="multi" label="Release" position={0.5}/>

      <RotaryPot32 x={50} y={row3} ledMode="multi" potMode="spread" label="Attack" position={0.5}/>
      <RotaryPot32 x={110} y={row3} ledMode="multi" label="Decay" position={0.8}/>
      <RotaryPot32 x={170} y={row3} ledMode="multi" label="Release" position={0.5}/>

      <RotaryPot40 x={50} y={row4} ledMode="multi" potMode="spread" label="Attack" position={0.5}/>
      <RotaryPot40 x={170} y={row4} ledMode="multi" label="Release" position={0.5}/>

      <RoundButton8 x="220" y={buttonRow1} labelPosition="left" label="Button"/>
      <RoundButton8 x="240" y={buttonRow1} labelPosition="right" label="Button"/>
      <RoundButton8 x="220" y={buttonRow2} labelPosition="top" label="Button"/>
      <RoundButton8 x="240" y={buttonRow2} labelPosition="bottom" label="Button"/>

    </svg>
  );
}