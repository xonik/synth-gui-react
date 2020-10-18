import React from 'react';
import './MainPanel.scss';
import DCO1 from './DCO1';
import DCO2 from './DCO2';
import VCO from './VCO';
import PreFilterMixer from './PreFilterMixer';
import Noise from './Noise';
import Ringmod from './Ringmod';

export default () => {

  return (
    <svg width="120cm" height="50cm" viewBox="0 0 1200 500" className="panel">
        <DCO1 x={100} y={55}/>
        <DCO2 x={100} y={195}/>
        <VCO x={100} y={335}/>
        <PreFilterMixer x={170} y={5}/>
        <Noise x={170} y={260}/>
        <Ringmod x={170} y={300}/>
    </svg>
  );
}