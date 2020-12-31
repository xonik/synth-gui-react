import React from 'react';
import RotaryPot17 from '../pots/RotaryPot17';
import Header from '../misc/Header';
import RoundPushButton8 from '../buttons/RoundPushButton8';

interface Props {
    x: number,
    y: number
}

const Clock = ({ x, y }: Props) => {

    const row1 = 0;
    const row2 = 30;
    const col1 = 20;
    const col2 = col1 + 30;

    return <svg x={x} y={y}>
        <Header label="Master clock" x={0} y={row1} width={85}/>
        <RotaryPot17 ledMode="single" label="Rate" x={col1} y={row2} position={0.4}/>
        <RoundPushButton8 labelPosition="bottom" x={col2} y={row2} label="Source" ledCount="3" ledPosition="right" ledLabels={['Master', 'Midi', 'Ext']} ledOn={[false, false, false]}/>
    </svg>;
};

export default Clock;