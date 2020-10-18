import React from 'react';
import './MainPanel.scss';
import DCO1 from './DCO1';
import DCO2 from './DCO2';
import VCO from './VCO';
import PreFilterMixer from './PreFilterMixer';

export default () => {

  return (
    <svg width="120cm" height="50cm" viewBox="0 0 1200 500" className="panel">
        <DCO1 x={100} y={50}/>
        <DCO2 x={100} y={180}/>
        <VCO x={100} y={310}/>
        <PreFilterMixer x={200} y={20}/>
    </svg>
  );
}