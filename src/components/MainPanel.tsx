import React from 'react';
import './MainPanel.scss';
import DCO1 from './modules/DCO1';
import DCO2 from './modules/DCO2';
import VCO from './modules/VCO';
import PreFilterMixer from './modules/PreFilterMixer';
import Noise from './modules/Noise';
import Ringmod from './modules/Ringmod';
import PreFilterFx from './modules/PreFilterFx';
import LowPassFilter from './modules/LowPassFilter';
import StateVariableFilter from './modules/StateVariableFilter';

export default () => {

  return (
    <svg width="105cm" height="45cm" viewBox="0 0 1050 450" className="panel">
        <DCO1 x={100} y={55}/>
        <DCO2 x={100} y={195}/>
        <VCO x={100} y={345}/>
        <PreFilterMixer x={170} y={5}/>
        <Noise x={170} y={260}/>
        <Ringmod x={170} y={300}/>
        <PreFilterFx x={170} y={340}/>

        <LowPassFilter x={350} y={75}/>
        <StateVariableFilter x={350} y={240}/>
    </svg>
  );
}