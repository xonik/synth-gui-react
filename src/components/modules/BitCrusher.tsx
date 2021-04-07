import React from 'react';
import RotaryPot10 from '../pots/RotaryPot10';
import Header from '../misc/Header';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import midiConstants from '../../midiConstants'

interface Props {
    x: number,
    y: number
}

const BitCrusher = ({ x, y }: Props) => {

    const row1 = 10;
    const row2 = 30;
    const row3 = 40;
    const col1 = 10;
    const col2 = col1 + 25;
    const col3 = col2 + 30;


    return <svg x={x} y={y}>
        <Header label="Bit crusher" x={25} y={row1} width={50}/>
        <RoundPushButton8 x={col1} y={row3} ledCount={2} ledPosition="top" ledLabels={['FX1', 'FX2']} midiConfig={midiConstants.FX_BIT_CRUSHER.SOURCE}/>
        <RotaryPot10 ledMode="single" label="Bits" x={col2} y={row2} position={0.4}/>
        <RotaryPot10 ledMode="single" label="Rate" x={col3} y={row2} position={0.4}/>
    </svg>;
};

export default BitCrusher;