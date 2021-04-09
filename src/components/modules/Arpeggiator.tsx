/*
- Button - Mode
- Button w/multiple leds Range (octaves)
- Button - On/off
- Button - trigger (triggers on first key press?)
- 17mm pot - Tempo (or separate clock and clock sunc)
- Button - Sync (button) - int clock, Lfo, ext clock
 */
import React from 'react';
import RotaryPot17 from '../pots/RotaryPot17';
import Header from '../misc/Header';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import midiConstants from '../../midiConstants'

interface Props {
    x: number,
    y: number
}

const Arpeggiator = ({ x, y }: Props) => {

    const row1 = 0;
    const row2 = 30;
    const col1 = 10;
    const col2 = col1 + 20;
    const col3 = col2 + 25;
    const col4 = col3 + 25;
    const col5 = col4 + 35;
    const col6 = col5 + 35;


    return <svg x={x} y={y}>
        <Header label="Arpeggiator" x={0} y={row1} width={190}/>
        <RoundLedPushButton8 labelPosition="bottom" x={col1} y={row2} label="On/Off" midiConfig={midiConstants.ARPEGGIATOR.ON_OFF}/>
        <RoundLedPushButton8 labelPosition="bottom" x={col2} y={row2} label="Trigger" midiConfig={midiConstants.ARPEGGIATOR.TRIGGER}/>
        <RotaryPot17 ledMode="single" label="Tempo" x={col3} y={row2} position={0.4} midiConfig={midiConstants.ARPEGGIATOR.TEMPO}/>
        <RoundPushButton8 labelPosition="bottom" x={col4} y={row2} label="Sync" ledCount={3} ledPosition="right" ledLabels={['Master', 'LFO1', 'Ext']} hasOff midiConfig={midiConstants.ARPEGGIATOR.SYNC}/>
        <RoundPushButton8 labelPosition="bottom" x={col5} y={row2} label="Range" ledCount={3} ledPosition="right" ledLabels={['1', '2', '3']} midiConfig={midiConstants.ARPEGGIATOR.RANGE}/>
        <RoundPushButton8 labelPosition="bottom" x={col6} y={row2} label="Mode" ledCount={5} ledPosition="right" ledLabels={['Up', 'Down', 'Up/down', 'Random', 'Other']} midiConfig={midiConstants.ARPEGGIATOR.MODE}/>
    </svg>;
};

export default Arpeggiator;