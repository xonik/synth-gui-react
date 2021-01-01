import React from 'react';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import Header from '../misc/Header';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import RotaryPot17 from '../pots/RotaryPot17';

interface Props {
    x: number,
    y: number
}

const Route = ({ x, y }: Props) => {
    return <svg x={x} y={y}>
        <Header label="Route" x={0} y={0} width={50}/>
        <RoundLedPushButton8 labelPosition="bottom" x={10} y={17.5} label="From" ledOn={[false]}/>
        <RoundLedPushButton8 labelPosition="bottom" x={10} y={37.5} label="To" ledOn={[false]}/>
        <RotaryPot17 ledMode="single" label="Amount" x={35} y={30} position={0.4}/>
    </svg>;
};

export default Route;