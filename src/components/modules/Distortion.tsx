import React from 'react';
import RotaryPot17 from '../pots/RotaryPot17';
import Header from '../misc/Header';
import RoundPushButton8 from '../buttons/RoundPushButton8';

interface Props {
    x: number,
    y: number
}

const Distortion = ({ x, y }: Props) => {

    const row1 = y;
    const row2 = row1+30;

    const col1 = x + 7;
    const col2 = col1 + 25;
    const col3 = col2 + 25;
    const col4 = col3 + 10;
    const col5 = col4 + 25;
    const col6 = col5 + 25;

    return <>
        <Header label="Distortion" x={x} y={row1} width={125}/>
        <RoundPushButton8 x={col1} y={row2+8} ledPosition="top" ledCount={2} ledOn={[true, false]} label="In" labelPosition="bottom"/>
        <RotaryPot17 ledMode="multi" label="Drive" x={col2} y={row2} position={0.4}/>
        <RoundPushButton8 x={col3} y={row2+8} ledCount={2} ledPosition="top" ledLabels={['Soft', 'Hard']} ledOn={[false, true]} label="Clip" labelPosition="bottom"/>
        <RotaryPot17 ledMode="multi" label="Level" x={col5} y={row2} position={0.4}/>
        <RoundPushButton8 x={col6} y={row2+8} ledPosition="top" ledCount={2} ledOn={[true, false]} label="Out" labelPosition="bottom"/>
    </>;
};

export default Distortion;