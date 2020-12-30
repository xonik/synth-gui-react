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
import Chorus from './modules/Chorus';
import BitCrusher from './modules/BitCrusher';
import Arpeggiator from './modules/Arpeggiator';
import KeyboardControls from './modules/KeyboardControls';
import MainDisplay from './modules/MainDisplay';

export default () => {

      const panelHeight = 350;
      const panelWidth = 1050;
      const keyboardWidth = 849;

      const osc1Col = 90;
      const osc2Col = osc1Col + 120;
      const osc3Col = osc2Col + 120;

      const lfoCol = osc1Col + 70;
      const noiseCol = lfoCol;
      const ringModCol = noiseCol + 90;

      const sourceMixCol = lfoCol;
      const filterCol = sourceMixCol + 250;
      const voiceMixCol = filterCol + 70;

      const displayCol = voiceMixCol + 40;

      const envCol = voiceMixCol + 240;
      const outFx1Col = envCol;
      const outFx2Col = outFx1Col + 130;
      const outputMixerCol = envCol + 275;
      const fxCol = lfoCol + 40;
      const arpCol = 20;

      const oscRow = 60;
      const osc2Row = oscRow + panelHeight / 3;
      const osc3Row = osc2Row + panelHeight / 3;

      const sourceMixRow = 5;
      const noiseRow = sourceMixRow + 100;
      const fxRow = noiseRow + 40;
      const lfo1Row = fxRow + 85;
      const lfo2Row = lfo1Row + 60;

      const displayRow = 100;

      const outputFxRow = 225;
      const arpRow = 250;
      const keyboardRow = 300;

      // TODO:
      //  Patch select
      //  LFO 2
      //  Display ++

      /*
      // Move these to keyboard part.
      <KeyboardControls x={arpCol} y={keyboardRow}/>

      */
  return (
    <svg width="105cm" height="35cm" viewBox="0 0 1050 350" className="panel">
        <DCO1 x={osc1Col} y={oscRow}/>
        <DCO2 x={osc1Col} y={osc2Row}/>
        <VCO x={osc1Col} y={osc3Row}/>
        <LFO x={lfoCol} y={lfo1Row} label="LFOS" showSelect={false}/>
          <Arpeggiator x={arpCol} y={arpRow}/>


        <PreFilterMixer x={sourceMixCol} y={sourceMixRow}/>
        <Noise x={noiseCol} y={noiseRow}/>
        <Ringmod x={ringModCol} y={noiseRow}/>
        <PreFilterFx x={fxCol} y={fxRow}/>

        <LowPassFilter x={filterCol} y={82}/>
        <StateVariableFilter x={filterCol} y={250}/>

        <PostFilterMixer x={voiceMixCol} y={5}/>
        <MainDisplay x={displayCol} y={displayRow}/>

        <Envelope x={envCol} y={5} label="Env 1 - filter"/>
        <Envelope x={envCol} y={75} label="Env 2 - amp"/>
        <Envelope x={envCol} y={145} label="Env 3 - N" showSelect={true}/>

        <DigitalFX x={outFx1Col} y={outputFxRow}/>
        <Chorus x={outFx2Col} y={outputFxRow}/>
        <BitCrusher x={outFx2Col} y={outputFxRow+40}/>

        <OutputMixer x={outputMixerCol} y={5}/>
        <line x1={panelWidth - keyboardWidth -5 + keyboardWidth / 2} y1={0} x2={panelWidth - keyboardWidth - 5 + keyboardWidth / 2} y2={350} className="line" />
        <line x1={panelWidth / 2} y1={0} x2={panelWidth / 2} y2={350} className="line" />
    </svg>
  );
}