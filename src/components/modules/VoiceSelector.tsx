import React, { useCallback } from 'react';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import { ModuleProps } from "./types";
import { useUiStore } from '../../store/uiStore'
import { setVoiceGroupIndex } from '../../synthcore/modules/voices/currentVoiceGroupIndex'
import voicesControllers from '../../synthcore/modules/voices/voicesControllers'
import { setController } from '../../synthcore/modules/controllers/controllersReducer'
import { dispatch } from '../../synthcore/utils'

const VoiceButton = ({ x, y, index, label }: { x: number, y: number, index: number, label: string }) => {
    const currentVoiceGroup = useUiStore(s => s.currentVoiceGroupIndex)
    const setVoiceGroup = useUiStore(s => s.setVoiceGroup)

    const onClick = useCallback(() => {
        setVoiceGroup(index)
        setVoiceGroupIndex(index)
        // Dispatch to Redux so display components re-render
        dispatch(setController({
            ctrl: voicesControllers.VOICE,
            value: index,
            voiceGroupIndex: index,
        }))
    }, [setVoiceGroup, index])

    return <RoundLedPushButton8
        labelPosition="right"
        x={x}
        y={y}
        label={label}
        value={currentVoiceGroup === index ? 1 : 0}
        onButtonClick={onClick}
    />
}

const VoiceSelector = ({ x, y, width, height }: ModuleProps) => {
    const buttonRow = y
    const buttonDistance = 25;
    const offsetX = x + (width - 7 * buttonDistance) / 2

    return <>
        {Array.from({ length: 8 }, (_, i) => (
            <VoiceButton key={i} x={offsetX + buttonDistance * i} y={buttonRow} index={i} label={`${i + 1}`} />
        ))}
    </>
};

export default VoiceSelector;
