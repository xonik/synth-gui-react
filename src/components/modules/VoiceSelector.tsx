import React from 'react';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import midiConstants from '../../midiConstants'

interface Props {
    x: number,
    y: number
}

const VoiceSelector = ({ x, y }: Props) => {
    const offsetX = 5;
    const buttonDistance = 25;
    return <svg x={x} y={y}>
        <RoundLedPushButton8 labelPosition="bottom" x={offsetX} y={0} label="1" midiConfig={midiConstants.VOICES.VOICE1}/>
        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance} y={0} label="2" midiConfig={midiConstants.VOICES.VOICE2}/>
        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 2} y={0} label="3" midiConfig={midiConstants.VOICES.VOICE3}/>
        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 3} y={0} label="4" midiConfig={midiConstants.VOICES.VOICE4}/>
        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 4} y={0} label="5" midiConfig={midiConstants.VOICES.VOICE5}/>
        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 5} y={0} label="6" midiConfig={midiConstants.VOICES.VOICE6}/>
        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 6} y={0} label="7" midiConfig={midiConstants.VOICES.VOICE7}/>
        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 7} y={0} label="8" midiConfig={midiConstants.VOICES.VOICE8}/>
    </svg>;
};

export default VoiceSelector;