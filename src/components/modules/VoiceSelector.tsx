import React from 'react';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import { ControllerGroupIds } from '../../synthcore/types'
import voicesControllers from '../../synthcore/modules/voices/voicesControllers'
import { ModuleProps } from "./types";

const ctrlGroup = ControllerGroupIds.VOICES

const VoiceSelector = ({ x, y, width, height }: ModuleProps) => {
    const buttonRow = y
    const buttonDistance = 25;
    const offsetX = x + (width - 7 * buttonDistance) / 2

    //const voices = useAppSelector(selectController(voicesControllers.VOICE))

    return <>
        <RoundLedPushButton8 labelPosition="right" x={offsetX} y={buttonRow} label="1"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE}
                             radioButtonIndex={0}
        />

        <RoundLedPushButton8 labelPosition="right" x={offsetX + buttonDistance} y={buttonRow} label="2"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE}
                             radioButtonIndex={1}
        />

        <RoundLedPushButton8 labelPosition="right" x={offsetX + buttonDistance * 2} y={buttonRow} label="3"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE}
                             radioButtonIndex={2}
        />

        <RoundLedPushButton8 labelPosition="right" x={offsetX + buttonDistance * 3} y={buttonRow} label="4"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE}
                             radioButtonIndex={3}
        />

        <RoundLedPushButton8 labelPosition="right" x={offsetX + buttonDistance * 4} y={buttonRow} label="5"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE}
                             radioButtonIndex={4}
        />

        <RoundLedPushButton8 labelPosition="right" x={offsetX + buttonDistance * 5} y={buttonRow} label="6"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE}
                             radioButtonIndex={5}
        />

        <RoundLedPushButton8 labelPosition="right" x={offsetX + buttonDistance * 6} y={buttonRow} label="7"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE}
                             radioButtonIndex={6}
        />

        <RoundLedPushButton8 labelPosition="right" x={offsetX + buttonDistance * 7} y={buttonRow} label="8"
                             ctrlGroup={ctrlGroup}
                             ctrl={voicesControllers.VOICE}
                             radioButtonIndex={7}
        />

    </>;
};

export default VoiceSelector;