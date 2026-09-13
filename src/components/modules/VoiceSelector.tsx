import { useCallback } from 'react'
import { useUiStore } from '@/store'
import { setVoiceGroupIndex } from '@/synthcore/modules/voices/currentVoiceGroupIndex'
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8'
import type { ModuleProps } from './types'

const VoiceButton = ({ x, y, index, label }: { x: number; y: number; index: number; label: string }) => {
    const currentVoiceGroup = useUiStore((s) => s.currentVoiceGroupIndex)
    const setVoiceGroup = useUiStore((s) => s.setVoiceGroup)

    const onClick = useCallback(() => {
        setVoiceGroup(index)
        setVoiceGroupIndex(index)
    }, [setVoiceGroup, index])

    return (
        <RoundLedPushButton8
            labelPosition="right"
            x={x}
            y={y}
            label={label}
            value={currentVoiceGroup === index ? 1 : 0}
            onButtonClick={onClick}
        />
    )
}

const VoiceSelector = ({ x, y, width }: ModuleProps) => {
    const buttonRow = y
    const buttonDistance = 25
    const offsetX = x + (width - 7 * buttonDistance) / 2
    const voiceIndices = Array.from({ length: 8 }, (_, i) => i)

    return (
        <>
            {voiceIndices.map((voiceIndex) => (
                <VoiceButton
                    key={`voice-${voiceIndex + 1}`}
                    x={offsetX + buttonDistance * voiceIndex}
                    y={buttonRow}
                    index={voiceIndex}
                    label={`${voiceIndex + 1}`}
                />
            ))}
        </>
    )
}

export default VoiceSelector
