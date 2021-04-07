import React from 'react';
import RotaryPot40 from '../pots/RotaryPot40';
import RotaryPot10 from '../pots/RotaryPot10';
import RotaryPot17 from '../pots/RotaryPot17';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import Header from '../misc/Header';
import midiConstants from '../../midiConstants'

interface Props {
    x: number,
    y: number
}


const LowPassFilter = ({ x, y }: Props) => {
    const topRow = y - 50;
    const bottomRow2 = y + 45;

    const col1 = x - 39;
    const col2 = x - 13;
    const col3 = x + 13;
    const col4 = x + 39;

    return <>
        <Header label="Low pass filter" x={x} y={topRow - 27} width={110} align="center"/>
        <RotaryPot40 x={x} y={y} ledMode="single" label="Cutoff" position={0.8}/>
        <RotaryPot17 x={col1} y={topRow} ledMode="multi" label="Input" position={0.5}/>

        <RotaryPot17 x={x} y={topRow} ledMode="multi" label="Drive" position={0.5}/>
        <RotaryPot17 x={col4} y={topRow} ledMode="multi" label="Resonance" position={0.3}/>

        <RoundPushButton8 x={col4} y={y + 10} ledPosition="top" ledCount={2} ledLabels={['12dB', '24dB']} label="Slope" labelPosition="bottom" midiConfig={midiConstants.LPF.SLOPE}/>

        <RoundLedPushButton8 x={col1} y={y -10} label="Ext CV" labelPosition="bottom" midiConfig={midiConstants.LPF.EXT_CV}/>
        <RoundLedPushButton8 x={col1} y={y + 10} label="Wheel" labelPosition="bottom" midiConfig={midiConstants.LPF.WHEEL}/>


        <RotaryPot10 x={col1} y={bottomRow2} ledMode="multi" label="FM amt" position={0.1}/>
        <RotaryPot10 x={col2} y={bottomRow2} ledMode="multi" label="Env amt" position={0.1}/>
        <RotaryPot10 x={col3} y={bottomRow2} ledMode="multi" label="LFO amt" position={0.1}/>
        <RotaryPot10 x={col4} y={bottomRow2} ledMode="multi" label="Kbd amt" position={0.1}/>
    </>;
};

export default LowPassFilter;