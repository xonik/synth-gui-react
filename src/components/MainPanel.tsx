import React from 'react';
import RotaryPot from './pots/RotaryPot';
import './MainPanel.scss';

export default () => {

  return (
    <svg width="120cm" height="50cm" viewBox="0 0 1200 500" className="panel">
      <RotaryPot x={200} y={100}/>
    </svg>
  );
}