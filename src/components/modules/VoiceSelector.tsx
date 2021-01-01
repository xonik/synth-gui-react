import React from 'react';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';

interface Props {
    x: number,
    y: number
}

const VoiceSelector = ({ x, y }: Props) => {
    const offsetX = 5;
    const buttonDistance = 25;
    return <svg x={x} y={y}>
        <RoundLedPushButton8 labelPosition="bottom" x={offsetX} y={0} label="1" ledOn={[true]}/>
        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance} y={0} label="2" ledOn={[true]}/>
        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 2} y={0} label="3" ledOn={[true]}/>
        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 3} y={0} label="4" ledOn={[true]}/>
        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 4} y={0} label="5" ledOn={[true]}/>
        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 5} y={0} label="6" ledOn={[true]}/>
        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 6} y={0} label="7" ledOn={[true]}/>
        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 7} y={0} label="8" ledOn={[true]}/>
    </svg>;
};

export default VoiceSelector;