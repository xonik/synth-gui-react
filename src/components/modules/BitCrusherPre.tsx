import React from 'react';
import RotaryPot10 from '../pots/RotaryPot10';
import RotaryPot17 from '../pots/RotaryPot17';
import Header from '../misc/Header';
import RoundPushButton8 from '../buttons/RoundPushButton8';

interface Props {
    x: number,
    y: number
}

const BitCrusherPre = ({ x, y }: Props) => {

    const row1 = y;
    const row2 = row1+30;

    const col1 = x + 7;
    const col2 = col1 + 20;
    const col3 = col2 + 20;
    const col4 = col3 + 30;
    const col5 = col4 + 25;

    return <>
        <Header label="Bit crusher" x={x} y={row1} width={110}/>
        <RoundPushButton8 x={col1} y={row2 + 8} ledPosition="top" ledCount="2" ledOn={[true, false]} label="In" labelPosition="bottom"/>
        <RotaryPot10 ledMode="single" ledCount="12" label="Bits" x={col2} y={row2-10} position={0.7}/>
        <RotaryPot10 ledMode="single" label="Rate" x={col3} y={row2 + 5} position={0.4}/>
        <RotaryPot17 ledMode="multi" label="Level" x={col4} y={row2} position={0.4}/>
        <RoundPushButton8 x={col5} y={row2 + 8} ledPosition="top" ledCount="2" ledOn={[true, false]} label="Out" labelPosition="bottom"/>

    </>;
};

export default BitCrusherPre;