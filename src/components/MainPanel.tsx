import React from 'react';
import BasicKnob from './knobs/BasicKnob';
import './MainPanel.scss';

export default () => {

  // For objects centered around 0, use overflow: visible
  // For scaling, use viewBox on the outer svg and unitless the rest of the way
  return (
    <svg width="120cm" height="50cm" viewBox="0 0 1200 500" className="panel">
      <BasicKnob x={200} y={100}/>
    </svg>
  );
}