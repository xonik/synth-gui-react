import React from 'react';
import RotaryPot10 from '../pots/RotaryPot10';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import Header from '../misc/Header';
import RoundPushButton8 from '../buttons/RoundPushButton8';

interface Props {
    x: number,
    y: number
}

const PreFilterFx = ({ x, y }: Props) => {

    const row1 = y;
    const row2 = y+20;
    const row3 = y+40;
    const row4 = y+60;

    return <>
        <Header label="Distortion" x={x} y={row1} width={175}/>
        <RoundLedPushButton8 x={x+10} y={row2} ledOn={[true]}/>
        <RoundLedPushButton8 x={x+30} y={row2}/>
        <RotaryPot10 ledMode="multi" label="Drive" x={x+55} y={row2} position={0.4}/>
        <RoundPushButton8 x={x+75} y={row2} ledCount="2" ledPosition="right" ledLabels={['Soft', 'Hard']} ledOn={[false, true]}/>
        <RotaryPot10 ledMode="multi" label="Level" x={x+115} y={row2} position={0.4}/>
        <RoundLedPushButton8 x={x+145} y={row2} ledOn={[true]}/>
        <RoundLedPushButton8 x={x+165} y={row2}/>

        <Header label="Bit crusher" x={x} y={row3} width={175}/>
        <RoundLedPushButton8 x={x+10} y={row4} ledOn={[true]}/>
        <RoundLedPushButton8 x={x+30} y={row4}/>
        <RotaryPot10 ledMode="single" ledCount="12" label="Bits" x={x+55} y={row4} position={0.7}/>
        <RotaryPot10 ledMode="single" label="Rate" x={x+85} y={row4} position={0.4}/>
        <RotaryPot10 ledMode="multi" label="Level" x={x+115} y={row4} position={0.4}/>
        <RoundLedPushButton8 x={x+145} y={row4} ledOn={[true]}/>
        <RoundLedPushButton8 x={x+165} y={row4}/>

    </>;
};

export default PreFilterFx;