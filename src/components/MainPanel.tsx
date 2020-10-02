import React from 'react';
import RotaryPot from './pots/RotaryPot';
import './MainPanel.scss';

export default () => {

  return (
    <svg width="120cm" height="50cm" viewBox="0 0 1200 500" className="panel">
      <RotaryPot x={50} y={100} ledMode="multi" potMode="spread" label="Attack" position={0.5}/>
      <RotaryPot x={90} y={100} ledMode="multi" label="Decay" position={0.8}/>
      <RotaryPot x={130} y={100} ledMode="multi" label="Sustain" position={0.2}/>
      <RotaryPot x={170} y={100} ledMode="multi" label="Release" position={0.5}/>
    </svg>
  );
}