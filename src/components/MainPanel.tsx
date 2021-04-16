import React from 'react';
import DCO1 from './modules/DCO1';
import DCO2 from './modules/DCO2';
import VCO from './modules/VCO';
import PreFilterMixer from './modules/PreFilterMixer';
import PostFilterMixer from './modules/PostFilterMixer';
import Noise from './modules/Noise';
import Ringmod from './modules/Ringmod';
import Distortion from './modules/Distortion';
import LowPassFilter from './modules/LowPassFilter';
import StateVariableFilter from './modules/StateVariableFilter';
import Envelope from './modules/Envelope';
import LFO from './modules/LFO';
import DigitalFX from './modules/DigitalFX';
import OutputMixer from './modules/OutputMixer';
import Chorus from './modules/Chorus';
import BitCrusher from './modules/BitCrusher';
import Arpeggiator from './modules/Arpeggiator';
import MainDisplay from './modules/MainDisplay';
import Clock from './modules/Clock';
import BitCrusherPre from './modules/BitCrusherPre';
import Route from './modules/Route';
import KeyboardControls from './modules/KeyboardControls';
import VoiceSelector from './modules/VoiceSelector';
import midiConstants from '../midi/midiControllers'
import './MainPanel.scss';

/**
 * TODO:
 * VCO sync sources
 * Cross mod source, hvilke
 * Saw polarity button
 * Env amount for D/VCOs - dette er en felles pot med knapp på A6
 * Lin/log FM? necessary?
 * SEE RESEARCH.md for more
 */
export default () => {

    //const panelHeight = 350;
    //const panelWidth = 1050;

    const osc1Col = 70;
    const osc2Col = osc1Col + 115;
    const osc3Col = osc2Col + 115;

    const lfoCol = 20;
    const noiseCol = 20;
    const ringModCol = noiseCol + 45;
    const fxCol = ringModCol + 41;

    const routeCol = 20;
    const clockCol = routeCol + 56;
    const arpCol = clockCol + 84;

    const sourceMixCol = 180;
    const displayCol = osc3Col + 85;
    const keyCtrlCol = displayCol-22;
    const voiceSelCol = displayCol;

    const filterCol = displayCol + 270;
    const voiceMixCol = filterCol + 70;

    const envCol = voiceMixCol + 55;
    const outFx1Col = envCol;
    const outFx2Col = outFx1Col + 130;
    const outputMixerCol = envCol + 5;

    const oscRow = 60;

    const noiseRow = oscRow + 85;
    const sourceMixRow = noiseRow + 55;
    const fxRow = noiseRow;
    const lfo1Row = noiseRow + 55;
    const clockRow = lfo1Row + 90;

    const voiceSelRow = 12;
    const displayRow = voiceSelRow + 58;
    const keyCtrlRow = displayRow + 233;

    const outputFxRow = 210;
    const arpRow = clockRow;

    const outputMixerRow = outputFxRow + 85;

    const midiConfigsEnv1 = {
        a:  midiConstants.ENV1.ATTACK,
        d1: midiConstants.ENV1.DECAY1,
        d2: midiConstants.ENV1.DECAY2,
        s: midiConstants.ENV1.SUSTAIN,
        r1: midiConstants.ENV1.RELEASE1,
        r2: midiConstants.ENV1.RELEASE2,
        delay: midiConstants.ENV1.DELAY,
        d1_lev: midiConstants.ENV1.D1_LEVEL,
        trigger: midiConstants.ENV1.TRIGGER,
        loop: midiConstants.ENV1.LOOP,
        r1_lev: midiConstants.ENV1.R1_LEVEL,
        invert: midiConstants.ENV1.INVERT,
    }

    const midiConfigsEnv2 = {
        a:  midiConstants.ENV2.ATTACK,
        d1: midiConstants.ENV2.DECAY1,
        d2: midiConstants.ENV2.DECAY2,
        s: midiConstants.ENV2.SUSTAIN,
        r1: midiConstants.ENV2.RELEASE1,
        r2: midiConstants.ENV2.RELEASE2,
        delay: midiConstants.ENV2.DELAY,
        d1_lev: midiConstants.ENV2.D1_LEVEL,
        trigger: midiConstants.ENV2.TRIGGER,
        loop: midiConstants.ENV2.LOOP,
        r1_lev: midiConstants.ENV2.R1_LEVEL,
        invert: midiConstants.ENV2.INVERT,
    }

    const midiConfigsEnv3 = {
        a:  midiConstants.ENV3.ATTACK,
        d1: midiConstants.ENV3.DECAY1,
        d2: midiConstants.ENV3.DECAY2,
        s: midiConstants.ENV3.SUSTAIN,
        r1: midiConstants.ENV3.RELEASE1,
        r2: midiConstants.ENV3.RELEASE2,
        envSel: midiConstants.ENV3.ENV_SELECT,
        delay: midiConstants.ENV3.DELAY,
        d1_lev: midiConstants.ENV3.D1_LEVEL,
        trigger: midiConstants.ENV3.TRIGGER,
        loop: midiConstants.ENV3.LOOP,
        r1_lev: midiConstants.ENV3.R1_LEVEL,
        invert: midiConstants.ENV3.INVERT,
    }

    return (
        <svg width="105cm" height="35cm" viewBox="0 0 1050 350" className="panel">
            <DCO1 x={osc1Col} y={oscRow}/>
            <DCO2 x={osc2Col} y={oscRow}/>
            <VCO x={osc3Col} y={oscRow}/>

            <Noise x={noiseCol} y={noiseRow}/>
            <Ringmod x={ringModCol} y={noiseRow}/>
            <Distortion x={fxCol} y={fxRow}/>
            <BitCrusherPre x={fxCol + 135} y={fxRow}/>

            <LFO x={lfoCol} y={lfo1Row}/>
            <PreFilterMixer x={sourceMixCol} y={sourceMixRow}/>

            <Route x={routeCol} y={clockRow}/>
            <Clock x={clockCol} y={clockRow}/>
            <Arpeggiator x={arpCol} y={arpRow}/>

            <VoiceSelector x={voiceSelCol} y={voiceSelRow}/>
            <MainDisplay x={displayCol} y={displayRow}/>
            <KeyboardControls x={keyCtrlCol} y={keyCtrlRow}/>

            <LowPassFilter x={filterCol} y={82}/>
            <StateVariableFilter x={filterCol} y={250}/>
            <PostFilterMixer x={voiceMixCol} y={5}/>


            <Envelope x={envCol} y={5} label="Env 1 - filter" midiConfigs={midiConfigsEnv1}/>
            <Envelope x={envCol} y={75} label="Env 2 - amp" midiConfigs={midiConfigsEnv2}/>
            <Envelope x={envCol} y={145} label="Env 3 - N" showSelect={true} midiConfigs={midiConfigsEnv3}/>

            <DigitalFX x={outFx1Col} y={outputFxRow}/>
            <Chorus x={outFx2Col} y={outputFxRow + 10}/>
            <BitCrusher x={outFx2Col} y={outputFxRow + 40}/>

            <OutputMixer x={outputMixerCol} y={outputMixerRow}/>
        </svg>
    );
}