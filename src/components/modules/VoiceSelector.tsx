import React from 'react';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import { useAppSelector } from '../../synthcore/hooks'
import { selectVoices } from '../../synthcore/modules/voices/voicesReducer'
import { ControllerGroupIds } from '../../synthcore/types'
import voicesControllers from '../../synthcore/modules/voices/voicesControllers'

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.VOICES

const VoiceSelector = ({ x, y }: Props) => {
    const offsetX = 5;
    const buttonDistance = 25;

    const voices = useAppSelector(selectVoices)

    return <svg x={x} y={y}>
        <RoundLedPushButton8 labelPosition="bottom" x={offsetX} y={0} label="1"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE1}
                             value={voices[0].state}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance} y={0} label="2"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE2}
                             value={voices[1].state}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 2} y={0} label="3"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE3}
                             value={voices[2].state}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 3} y={0} label="4"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE4}
                             value={voices[3].state}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 4} y={0} label="5"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE5}
                             value={voices[4].state}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 5} y={0} label="6"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE6}
                             value={voices[5].state}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 6} y={0} label="7"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE7}
                             value={voices[6].state}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 7} y={0} label="8"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE8}
                             value={voices[7].state}
        />

    </svg>;
};

export default VoiceSelector;