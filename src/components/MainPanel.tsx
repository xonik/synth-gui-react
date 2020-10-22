import React from 'react';
import './MainPanel.scss';
import DCO1 from './modules/DCO1';
import DCO2 from './modules/DCO2';
import VCO from './modules/VCO';
import PreFilterMixer from './modules/PreFilterMixer';
import PostFilterMixer from './modules/PostFilterMixer';
import Noise from './modules/Noise';
import Ringmod from './modules/Ringmod';
import PreFilterFx from './modules/PreFilterFx';
import LowPassFilter from './modules/LowPassFilter';
import StateVariableFilter from './modules/StateVariableFilter';
import Envelope from './modules/Envelope';
import LFO from './modules/LFO';
import DigitalFX from './modules/DigitalFX';
import OutputMixer from './modules/OutputMixer';

export default () => {

      const osc1Col = 80;
      const osc2Col = osc1Col + 120;
      const osc3Col = osc2Col + 120;
      const sourceMixCol = osc3Col + 70;
      const filterCol = sourceMixCol + 180;
      const voiceMixCol = filterCol + 70;
      const envCol = voiceMixCol + 55;
      const outputMixerCol = envCol + 275;
      const fxCol = 290;
      const lfoCol = 20;

      const oscRow = 60;
      const noiseRow = oscRow + 112;
      const ringModRow = noiseRow + 40;

  return (
    <svg width="105cm" height="35cm" viewBox="0 0 1050 350" className="panel">
        <DCO1 x={osc1Col} y={oscRow}/>
        <DCO2 x={osc2Col} y={oscRow}/>
        <VCO x={osc3Col} y={oscRow}/>
        <LFO x={lfoCol} y={noiseRow} label="LFO 1" showSelect={false}/>

        <PreFilterMixer x={sourceMixCol} y={5}/>
        <Noise x={sourceMixCol - 100} y={noiseRow}/>
        <Ringmod x={sourceMixCol - 100} y={ringModRow}/>
        <PreFilterFx x={fxCol} y={250}/>

        <LowPassFilter x={filterCol} y={72}/>
        <StateVariableFilter x={filterCol} y={240}/>

        <PostFilterMixer x={voiceMixCol} y={5}/>

        <Envelope x={envCol} y={5} label="Env 1 - filter"/>
        <Envelope x={envCol} y={75} label="Env 2 - amp"/>
        <Envelope x={envCol} y={145} label="Env 3 - N" showSelect={true}/>

        <DigitalFX x={envCol} y={225}/>

        <OutputMixer x={outputMixerCol} y={5}/>

    </svg>
  );
}