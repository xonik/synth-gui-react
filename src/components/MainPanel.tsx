import React from 'react';
import './MainPanel.scss';
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

/**
 * TODO:
 * Waveform/mode-knapp på DCOer
 * X LFO-selector
 * Load/save, dial w. click.
 * X Sync source på DCOer
 * Tettere Oscillatorer
 * Vurdere å droppe digital fx-output og ha output-mixer under envelopes
 * Prøve horisontale osc igjen
 * X Voice volume i tillegg til pan. Kan også funke som wet/dry.
 *  - DRY/WET MIX! Nå går det ikke an å skru av originallyd'en!
 * X Clock ctrl
 * X Route-button
 * Flytte key ctrl opp på hovedpanel fordi de ikke kan overlappe tangenter. Bytte med arp?
 */
export default () => {

    const panelHeight = 350;
    const panelWidth = 1050;

    const osc1Col = 70;
    const osc2Col = osc1Col + 115;
    const osc3Col = osc2Col + 115;

    const lfoCol = 20;
    const noiseCol = 20;
    const ringModCol = noiseCol + 55;
    const fxCol = ringModCol + 35;

    const clockCol = 45;

    const sourceMixCol = 180;
    const displayCol = osc3Col + 85;
    const arpCol = clockCol + 93;

    const filterCol = displayCol + 270;
    const voiceMixCol = filterCol + 70;

    const envCol = voiceMixCol + 55;
    const outFx1Col = envCol;
    const outFx2Col = outFx1Col + 130;
    const outputMixerCol = envCol + 275;



    const oscRow = 60;

    const noiseRow = oscRow + 85;
    const sourceMixRow = noiseRow + 55;
    const fxRow = noiseRow;
    const lfo1Row = noiseRow + 55;
    const clockRow = lfo1Row + 90;

    const displayRow = 60;

    const outputFxRow = 225;
    const arpRow = clockRow;

    return (
        <svg width="105cm" height="35cm" viewBox="0 0 1050 350" className="panel">
            <DCO1 x={osc1Col} y={oscRow}/>
            <DCO2 x={osc2Col} y={oscRow}/>
            <VCO x={osc3Col} y={oscRow}/>

            <Noise x={noiseCol} y={noiseRow}/>
            <Ringmod x={ringModCol} y={noiseRow}/>
            <Distortion x={fxCol} y={fxRow}/>
            <BitCrusherPre x={fxCol + 120} y={fxRow}/>

            <LFO x={lfoCol} y={lfo1Row}/>
            <PreFilterMixer x={sourceMixCol} y={sourceMixRow}/>

            <Route x={30} y={clockRow+30}/>
            <Clock x={clockCol} y={clockRow}/>
            <Arpeggiator x={arpCol} y={arpRow}/>


            <MainDisplay x={displayCol} y={displayRow}/>

            <LowPassFilter x={filterCol} y={82}/>
            <StateVariableFilter x={filterCol} y={250}/>
            <PostFilterMixer x={voiceMixCol} y={5}/>


            <Envelope x={envCol} y={5} label="Env 1 - filter"/>
            <Envelope x={envCol} y={75} label="Env 2 - amp"/>
            <Envelope x={envCol} y={145} label="Env 3 - N" showSelect={true}/>

            <DigitalFX x={outFx1Col} y={outputFxRow}/>
            <Chorus x={outFx2Col} y={outputFxRow}/>
            <BitCrusher x={outFx2Col} y={outputFxRow + 40}/>

            <OutputMixer x={outputMixerCol} y={5}/>
        </svg>
    );
}