import React from 'react';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import { useAppSelector } from '../../synthcore/hooks'
import { selectVoices } from '../../synthcore/modules/voices/voicesReducer'
import { ControllerGroupIds } from '../../synthcore/types'
import { VoicesControllerIds } from '../../synthcore/modules/voices/types'

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
                             ctrlId={VoicesControllerIds.VOICE1}
                             storeValue={voices[0].state}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance} y={0} label="2"
                             ctrlGroup={ctrlGroup}
                             ctrlId={VoicesControllerIds.VOICE2}
                             storeValue={voices[1].state}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 2} y={0} label="3"
                             ctrlGroup={ctrlGroup}
                             ctrlId={VoicesControllerIds.VOICE3}
                             storeValue={voices[2].state}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 3} y={0} label="4"
                             ctrlGroup={ctrlGroup}
                             ctrlId={VoicesControllerIds.VOICE4}
                             storeValue={voices[3].state}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 4} y={0} label="5"
                             ctrlGroup={ctrlGroup}
                             ctrlId={VoicesControllerIds.VOICE5}
                             storeValue={voices[4].state}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 5} y={0} label="6"
                             ctrlGroup={ctrlGroup}
                             ctrlId={VoicesControllerIds.VOICE6}
                             storeValue={voices[5].state}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 6} y={0} label="7"
                             ctrlGroup={ctrlGroup}
                             ctrlId={VoicesControllerIds.VOICE7}
                             storeValue={voices[6].state}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={offsetX + buttonDistance * 7} y={0} label="8"
                             ctrlGroup={ctrlGroup}
                             ctrlId={VoicesControllerIds.VOICE8}
                             storeValue={voices[7].state}
        />

    </svg>;
};

export default VoiceSelector;