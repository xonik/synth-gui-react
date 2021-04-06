import Header from '../misc/Header';
import RotaryPot10 from '../pots/RotaryPot10';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import Led from '../leds/Led';
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

    const ledDistance = 10;

    const row1 = 0;
    const row2 = 22;
    const col1 = 10;
    const col2 = col1 + ledDistance;
    const col3 = col2 + ledDistance;
    const col4 = col3 + ledDistance;
    const col5 = col4 + ledDistance;
    const col6 = col5 + ledDistance;
    const col7 = col6 + ledDistance;
    const col8 = col7 + 30;
    const col9 = col8 + 25;
    const col10 = col9 + 20;
    const col11 = col10 + 20;
    const col12 = col11 + 45;


    return <svg x={x} y={y}>
        <Header label="Transpose" x={0} y={row1} width={80}/>
        <Header label="Keyboard" x={85} y={row1} width={140}/>
        <RoundPushButton8 labelPosition="bottom" x={col1} y={row2} label="Down" ledOn={[true]}/>
        <Led x={col2} y={row2} label="-2" on={false}/>
        <Led x={col3} y={row2} label="-1" on={false}/>
        <Led x={col4} y={row2} label="0" on={true}/>
        <Led x={col5} y={row2} label="1" on={false}/>
        <Led x={col6} y={row2} label="2" on={false}/>
        <RoundPushButton8 labelPosition="bottom" x={col7} y={row2} label="Up" ledOn={[true]}/>
        <RotaryPot10 x={col8} y={row2} ledMode="single" label="Portamento" position={0.5}/>
        <RoundLedPushButton8 labelPosition="bottom" x={col9} y={row2} label="Hold" ledOn={[false]}/>
        <RoundLedPushButton8 labelPosition="bottom" x={col10} y={row2} label="Chord" ledOn={[false]}/>
        <RoundPushButton8 labelPosition="bottom" x={col11} y={row2} label="Mode" ledCount={3} ledPosition="right" ledLabels={['Solo', 'Unison', 'Poly']} ledOn={[false, true, false]}/>
        <RotaryPot10 x={col12} y={row2} ledMode="single" label="Unison detune" position={0.5}/>
    </svg>;
};

export default KeyboardControls;