import React from 'react';
import RotaryPot10 from '../pots/RotaryPot10';
import Header from '../misc/Header';
import RoundPushButton8 from '../buttons/RoundPushButton8';

interface Props {
    x: number,
    y: number
}

const BitCrusher = ({ x, y }: Props) => {

    const row1 = 0;
    const row2 = 22;
    const col1 = 10;
    const col2 = col1 + 37;
    const col3 = col2 + 30;


    return <svg x={x} y={y}>
        <Header label="Bit crusher" x={0} y={row1} width={130}/>
        <RoundPushButton8 x={col1} y={row2} ledCount="2" ledPosition="right" ledLabels={['FX1', 'FX2']} ledOn={[false, true]}/>
        <RotaryPot10 ledMode="single" label="Bits" x={col2} y={row2} position={0.4}/>
        <RotaryPot10 ledMode="single" label="Rate" x={col3} y={row2} position={0.4}/>
    </svg>;
};

export default BitCrusher;