import React from 'react';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';

interface Props {
    x: number,
    y: number
}

const Route = ({ x, y }: Props) => {
    return <svg x={x} y={y}>
        <RoundLedPushButton8 labelPosition="bottom" x={0} y={0} label="Route" ledOn={[true]}/>
    </svg>;
};

export default Route;