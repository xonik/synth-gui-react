import React from 'react';
import RotaryPot40 from '../pots/RotaryPot40';
import RotaryPot10 from '../pots/RotaryPot10';
import RotaryPot17 from '../pots/RotaryPot17';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import Header from '../misc/Header';
import HorizontalLine from '../misc/HorizontalLine';
import RoundRotaryButton17 from '../buttons/RoundRotaryButton17';

interface Props {
    x: number,
    y: number
}


const StateVariableFilter = ({ x, y }: Props) => {
    const topRow = y - 50;
    const bottomRow1 = y + 45;
    const bottomRow2 = y + 75;

    const col1 = x - 39;
    const col2 = x - 13;
    const col3 = x + 13;
    const col4 = x + 39;

    // modes:
    /*
    2p LP
    2p HP
    4P LP
    4p HP
    2p BP
    4p BP
    2p LP + 2p BP
    2p HP + 2p BP
    Notch
    Notch + LP
     */

    return <>
        <HorizontalLine x={x} y={topRow - 62} width={110} align="center"/>
        <RoundLedPushButton8 x={col2} y={topRow -42}
                          ledOn={[true]} label="Link cutoff" labelPosition="bottom"/>

        <RoundPushButton8 x={col3} y={topRow - 42} ledPosition="right"
                          ledCount={2} ledOn={[true, false]}
                          ledLabels={['Series', 'Parallel']} label="Routing" labelPosition="bottom"/>

        <Header label="State variable filter" x={x} y={topRow - 27} width={110} align="center"/>
        <RotaryPot40 x={x} y={y} ledMode="single" label="Cutoff" position={0.8}/>

        <RotaryPot17 x={col1} y={topRow} ledMode="multi" label="Input" position={0.5}/>
        <RotaryPot17 x={x} y={topRow} ledMode="multi" label="Drive" position={0.5}/>
        <RotaryPot17 x={col4} y={topRow} ledMode="multi" label="Resonance" position={0.3}/>

        <RoundLedPushButton8 x={col1} y={y -10} label="Ext CV" labelPosition="bottom"/>
        <RoundLedPushButton8 x={col1} y={y + 10} label="Wheel" labelPosition="bottom"/>

        <RoundRotaryButton17 x={x} y={bottomRow1}
                             label="Slope" labelPosition="bottom"
                             ledPosition="sides" ledCount={10}
                             ledOn={[true, false, false, false, false, false, false, false]}
                             ledLabels={[
                                 '12dB LP', '24dB LP', '12dB BP', '24dB BP', 'LP + BP',
                                 '12dB HP', '24dB HP', 'HP + BP', 'Notch', 'Notch + LP'
                             ]}
        />

        <RotaryPot10 x={col1} y={bottomRow2} ledMode="multi" label="FM amt" position={0.1}/>
        <RotaryPot10 x={col2} y={bottomRow2} ledMode="multi" label="Env amt" position={0.1}/>
        <RotaryPot10 x={col3} y={bottomRow2} ledMode="multi" label="LFO amt" position={0.1}/>
        <RotaryPot10 x={col4} y={bottomRow2} ledMode="multi" label="Kbd amt" position={0.1}/>
    </>;
};

export default StateVariableFilter;