import React from 'react';
import './CheatSheet.scss';
import RotaryPot10 from './pots/RotaryPot10';
import RotaryPot17 from './pots/RotaryPot17';
import RotaryPot32 from './pots/RotaryPot32';
import RotaryPot40 from './pots/RotaryPot40';
import RoundPushButton8 from './buttons/RoundPushButton8';


const row1 = 20;
const row2 = row1 + 35;
const row3 = row2 + 50;
const row4 = row3 + 60;

const buttonRow1 = 20;
const buttonRow2 = 40;
const buttonRow3 = 70;
const buttonRow4 = 90;
const buttonRow5 = 120;
const buttonRow6 = 150;

export default () => {

  return (
    <svg width="120cm" height="50cm" viewBox="0 0 1200 500" className="cheat-sheet">
      <RotaryPot10 x={50} y={row1} ledMode="multi" potMode="spread" label="Attack"/>
      <RotaryPot10 x={90} y={row1} ledMode="multi" label="Decay"/>
      <RotaryPot10 x={130} y={row1} ledMode="multi" label="Sustain"/>
      <RotaryPot10 x={170} y={row1} ledMode="multi" label="Release"/>

      <RotaryPot17 x={50} y={row2} ledMode="multi" potMode="spread" label="Attack"/>
      <RotaryPot17 x={90} y={row2} ledMode="multi" label="Decay"/>
      <RotaryPot17 x={130} y={row2} ledMode="multi" label="Sustain"/>
      <RotaryPot17 x={170} y={row2} ledMode="multi" label="Release"/>

      <RotaryPot32 x={50} y={row3} ledMode="multi" potMode="spread" label="Attack"/>
      <RotaryPot32 x={110} y={row3} ledMode="multi" label="Decay"/>
      <RotaryPot32 x={170} y={row3} ledMode="multi" label="Release"/>

      <RotaryPot40 x={50} y={row4} ledMode="multi" potMode="spread" label="Attack"/>
      <RotaryPot40 x={170} y={row4} ledMode="multi" label="Release"/>

      <RoundPushButton8 x={220} y={buttonRow1} labelPosition="left" label="Button"/>
      <RoundPushButton8 x={240} y={buttonRow1} labelPosition="right" label="Button"/>
      <RoundPushButton8 x={220} y={buttonRow2} labelPosition="top" label="Button"/>
      <RoundPushButton8 x={240} y={buttonRow2} labelPosition="bottom" label="Button"/>

      <RoundPushButton8 x={220} y={buttonRow3} ledPosition="left" ledCount={1}/>
      <RoundPushButton8 x={240} y={buttonRow3} ledPosition="right" ledCount={1}/>
      <RoundPushButton8 x={220} y={buttonRow4} ledPosition="top" ledCount={1}/>
      <RoundPushButton8 x={240} y={buttonRow4} ledPosition="bottom" ledCount={1}/>

      <RoundPushButton8 x={220} y={buttonRow5} ledPosition="left" ledCount={2} ledLabels={['Lin', 'Log']}/>
      <RoundPushButton8 x={240} y={buttonRow5} ledPosition="right" ledCount={2} ledLabels={['Lin', 'Log']}/>
      <RoundPushButton8 x={220} y={buttonRow6} ledPosition="top" ledCount={2} ledLabels={['Lin', 'Log']}/>
      <RoundPushButton8 x={240} y={buttonRow6} ledPosition="bottom" ledCount={2} ledLabels={['Lin', 'Log']}/>

    </svg>
  );
}