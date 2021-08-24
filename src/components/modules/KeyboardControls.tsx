import Header from '../misc/Header';
import RotaryPot10 from '../pots/RotaryPot10';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import Led from '../leds/Led';
import React, { useCallback, useState } from 'react'
import midiConstants from '../../midi/controllers'

interface Props {
    x: number,
    y: number
}

type TransposeProps = {
    row2: number;
}

const Transpose = ({row2}: TransposeProps) => {
    const ledDistance = 10;
    const col1 = 10;
    const col2 = col1 + ledDistance;
    const col3 = col2 + ledDistance;
    const col4 = col3 + ledDistance;
    const col5 = col4 + ledDistance;
    const col6 = col5 + ledDistance;
    const col7 = col6 + ledDistance;

    const defaultValueIndex = 2;
    const [currentValue, setCurrentValue] = useState(defaultValueIndex);
    const onClick = useCallback((value) => {
        setCurrentValue(value);
    }, [setCurrentValue]);

    return <>
        <RoundPushButton8 labelPosition="bottom" x={col1} y={row2}
                          label="Down" onUpdate={onClick} reverse loop={false}
                          midiConfig={midiConstants.TRANSPOSE.TRANSPOSE}
                          defaultValueIndex={defaultValueIndex}
        />
        <Led x={col2} y={row2} label="-2" on={currentValue === 0}/>
        <Led x={col3} y={row2} label="-1" on={currentValue === 1}/>
        <Led x={col4} y={row2} label="0" on={currentValue === 2}/>
        <Led x={col5} y={row2} label="1" on={currentValue === 3}/>
        <Led x={col6} y={row2} label="2" on={currentValue === 4}/>
        <RoundPushButton8 labelPosition="bottom" x={col7} y={row2}
                          label="Up" onUpdate={onClick} loop={false}
                          midiConfig={midiConstants.TRANSPOSE.TRANSPOSE}
                          defaultValueIndex={defaultValueIndex}
        />
    </>
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

    const col8 = 100;
    const col9 = col8 + 25;
    const col10 = col9 + 20;
    const col11 = col10 + 20;
    const col12 = col11 + 45;


    return <svg x={x} y={y}>
        <Header label="Transpose" x={0} y={row1} width={80}/>
        <Header label="Keyboard" x={85} y={row1} width={140}/>
        <Transpose row2={row2} />
        <RotaryPot10 x={col8} y={row2} ledMode="single" label="Portamento" position={0.5} midiConfig={midiConstants.KBD.PORTAMENTO}/>
        <RoundLedPushButton8 labelPosition="bottom" x={col9} y={row2} label="Hold" midiConfig={midiConstants.KBD.HOLD}/>
        <RoundLedPushButton8 labelPosition="bottom" x={col10} y={row2} label="Chord" midiConfig={midiConstants.KBD.CHORD}/>
        <RoundPushButton8 labelPosition="bottom" x={col11} y={row2} label="Mode" ledCount={3} ledPosition="right" ledLabels={['Solo', 'Unison', 'Poly']} midiConfig={midiConstants.KBD.MODE}/>
        <RotaryPot10 x={col12} y={row2} ledMode="single" label="Unison detune" position={0.5} midiConfig={midiConstants.KBD.UNISON_DETUNE}/>
    </svg>;
};

export default KeyboardControls;