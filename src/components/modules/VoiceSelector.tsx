import React from 'react';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
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

    //const voices = useAppSelector(selectController(voicesControllers.VOICE))

    return <svg x={x} y={y}>
        <RoundLedPushButton8 labelPosition="bottom" x={offsetX} y={0} label="1"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE}
                             radioButtonIndex={0}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance} y={0} label="2"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE}
                             radioButtonIndex={1}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 2} y={0} label="3"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE}
                             radioButtonIndex={2}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 3} y={0} label="4"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE}
                             radioButtonIndex={3}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 4} y={0} label="5"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE}
                             radioButtonIndex={4}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 5} y={0} label="6"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE}
                             radioButtonIndex={5}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 6} y={0} label="7"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE}
                             radioButtonIndex={6}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 7} y={0} label="8"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE}
                             radioButtonIndex={7}
        />

    </svg>;
};

export default VoiceSelector;