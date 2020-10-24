import Header from '../misc/Header';
import RotaryPot10 from '../pots/RotaryPot10';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import React from 'react';

interface Props {
    x: number,
    y: number
}

const KeyboardControls = ({ x, y }: Props) => {
    /*
    - Two Buttons, 5 leds - Transpose - up/down
    - 17mm pot - Portamento (amount/speed?) or glide
      - Button, two leds - Direction - up/down/both ?
      (- Modulate)
    - Button - Unison
    - 17mm pot - Unison detune pot
    - Button - Split
    - Button - Hold (whhat does it do?)
    - Button - Chord
     */

    const row1 = 0;
    const row2 = 22;
    const col1 = 10;
    const col2 = col1 + 37;
    const col3 = col2 + 30;
    const col4 = col3 + 30;
    const col5 = col4 + 30;
    const col6 = col5 + 30;


    return <svg x={x} y={y}>
        <Header label="Arpeggiator" x={0} y={row1} width={130}/>
        <RotaryPot10 ledMode="single" label="Tempo" x={col1} y={row2} position={0.4}/>
        <RoundLedPushButton8 labelPosition="bottom" x={col2} y={row2} label="On/Off" ledOn={[true]}/>
        <RoundLedPushButton8 labelPosition="bottom" x={col3} y={row2} label="Trigger" ledOn={[false]}/>
        <RoundPushButton8 labelPosition="bottom" x={col6} y={row2} label="Mode" ledCount="5" ledPosition="right" ledLabels={['Master', 'LFO1', 'Ext']} ledOn={[false, false, false]}/>
        <RoundLedPushButton8 labelPosition="bottom" x={col4} y={row2} label="Sync" ledOn={[false]}/>
        <RoundPushButton8 labelPosition="bottom" x={col5} y={row2} label="Range" ledCount="3" ledPosition="right" ledLabels={['1', '2', '3']} ledOn={[false, true, false]}/>
        <RoundPushButton8 labelPosition="bottom" x={col6} y={row2} label="Mode" ledCount="5" ledPosition="right" ledLabels={['up', 'down', 'up/down', 'random', 'other']} ledOn={[true, false, false, false, false]}/>

    </svg>;
};

export default KeyboardControls;