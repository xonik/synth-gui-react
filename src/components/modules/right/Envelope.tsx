import { BUTTON_DISTANCE_S, POT_DISTANCE_L, POT_DISTANCE_M, POT_OFFSET_Y, ROW_HEIGHT } from '../../../constants'
import { button } from '../../../midi/midibus'
import { useEnvLevel, useEnvStageEnabled, useEnvTime, useEnvToggle } from '../../../store/modules/useEnvelope'
import { useUiStore } from '../../../store/uiStore'
import { envCtrls } from '../../../synthcore/modules/env/envControllers'
import RoundLedPushButton8 from '../../buttons/RoundLedPushButton8'
import RoundPushButton8 from '../../buttons/RoundPushButton8'
import { ModuleBorder } from '../../misc/ModuleBorder'
import SubHeader from '../../misc/SubHeader'
import RotaryPot12 from '../../pots/RotaryPot12'
import type { ModuleProps } from '../types'

type Props = ModuleProps & {
    x: number
    y: number
    label: string
    header?: string
    envId: number
    showSelect?: boolean
}

const EnvTimePot = ({
    envId,
    stageName,
    label,
    x,
    y,
    disabled,
}: {
    envId: number
    stageName: 'delay' | 'attack' | 'decay1' | 'decay2' | 'sustain' | 'release1' | 'release2'
    label: string
    x: number
    y: number
    disabled?: boolean
}) => {
    const { displayValue, increment } = useEnvTime(envId, stageName)
    return (
        <RotaryPot12
            ledMode="single"
            label={label}
            x={x}
            y={y}
            value={displayValue}
            onValueIncrement={increment}
            disabled={disabled}
        />
    )
}

const EnvLevelPot = ({
    envId,
    stageName,
    label,
    x,
    y,
    disabled,
}: {
    envId: number
    stageName: 'delay' | 'attack' | 'decay1' | 'decay2' | 'sustain' | 'release1' | 'release2'
    label: string
    x: number
    y: number
    disabled?: boolean
}) => {
    const { displayValue, bipolar, increment } = useEnvLevel(envId, stageName)
    return (
        <RotaryPot12
            ledMode="multi"
            label={label}
            x={x}
            y={y}
            value={displayValue}
            potMode={bipolar ? 'pan' : 'normal'}
            onValueIncrement={increment}
            disabled={disabled}
        />
    )
}

const EnvToggleButton = ({
    envId,
    param,
    label,
    x,
    y,
}: {
    envId: number
    param: 'loop' | 'invert' | 'velocity'
    label: string
    x: number
    y: number
}) => {
    const { value, toggle } = useEnvToggle(envId, param)
    return (
        <RoundLedPushButton8
            label={label}
            x={x}
            y={y}
            labelPosition="bottom-pot"
            value={value}
            onButtonClick={toggle}
        />
    )
}

const EnvSelectButton = ({ x, y }: { x: number; y: number }) => {
    const env3Id = useUiStore((s) => s.selectedEnv3Id)
    const selectEnv3Id = useUiStore((s) => s.selectEnv3Id)
    const onToggle = () => selectEnv3Id(((env3Id - 2 + 1) % 3) + 2)
    return (
        <RoundPushButton8
            ledPosition="top-horizontal"
            ledCount={3}
            ledLabels={['3', '4', '5']}
            label="Env sel"
            x={x}
            y={y}
            labelPosition="bottom"
            value={env3Id - 2}
            onButtonClick={onToggle}
        />
    )
}

const Envelope = ({ x, y, height, width, label, header, showSelect = false, envId }: Props) => {
    const firstPotX = x + POT_DISTANCE_L / 2
    const topRowY = y + POT_OFFSET_Y
    const bottomRowY = topRowY + ROW_HEIGHT
    const potDistance = POT_DISTANCE_M

    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)
    const delayDisabled = useEnvStageEnabled(envId, 'delay') === 0
    const decay1Disabled = useEnvStageEnabled(envId, 'decay1') === 0
    const decay2Disabled = useEnvStageEnabled(envId, 'decay2') === 0
    const sustainDisabled = useEnvStageEnabled(envId, 'sustain') === 0
    const release1Disabled = useEnvStageEnabled(envId, 'release1') === 0

    return (
        <>
            <ModuleBorder x={x} y={y} height={height} width={width} />
            <SubHeader label={header} x={x} y={y} width={width} labelPosition="center" labelWidth={25} />
            <text
                x={firstPotX - potDistance * 0.5}
                y={topRowY - 2.5}
                className="header-label"
                textAnchor="middle"
                alignmentBaseline="baseline"
            >
                {label}
            </text>

            <EnvTimePot envId={envId} stageName="attack" label="Attack" x={firstPotX + potDistance * 1} y={topRowY} />
            <EnvTimePot
                envId={envId}
                stageName="decay1"
                label="Decay"
                x={firstPotX + potDistance * 2}
                y={topRowY}
                disabled={decay1Disabled}
            />
            <EnvLevelPot
                envId={envId}
                stageName="sustain"
                label="Sustain"
                x={firstPotX + potDistance * 3}
                y={topRowY}
                disabled={sustainDisabled}
            />
            <EnvTimePot
                envId={envId}
                stageName="release1"
                label="Release"
                x={firstPotX + potDistance * 4}
                y={topRowY}
                disabled={release1Disabled}
            />

            {showSelect && <EnvSelectButton x={firstPotX} y={topRowY + 4} />}

            <EnvTimePot
                envId={envId}
                stageName="delay"
                label="Delay"
                x={firstPotX}
                y={bottomRowY}
                disabled={delayDisabled}
            />
            <EnvLevelPot
                envId={envId}
                stageName="decay2"
                label="D2 Level"
                x={firstPotX + potDistance * 1}
                y={bottomRowY}
                disabled={decay2Disabled}
            />
            <EnvTimePot
                envId={envId}
                stageName="decay2"
                label="Decay 2"
                x={firstPotX + potDistance * 2}
                y={bottomRowY}
                disabled={decay2Disabled}
            />
            <EnvLevelPot
                envId={envId}
                stageName="release2"
                label="R2 Level"
                x={firstPotX + potDistance * 3}
                y={bottomRowY}
                disabled={release1Disabled}
            />
            <EnvTimePot
                envId={envId}
                stageName="release2"
                label="Release 2"
                x={firstPotX + potDistance * 4}
                y={bottomRowY}
            />

            <EnvToggleButton envId={envId} param="loop" label="Loop" x={firstPotX + potDistance * 5} y={topRowY} />
            <EnvToggleButton
                envId={envId}
                param="invert"
                label="Invert"
                x={firstPotX + potDistance * 5 + BUTTON_DISTANCE_S}
                y={topRowY}
            />
            <EnvToggleButton
                envId={envId}
                param="velocity"
                label="Velocity"
                x={firstPotX + potDistance * 5}
                y={bottomRowY}
            />

            <RoundPushButton8
                label="Trigger"
                x={firstPotX + potDistance * 5 + BUTTON_DISTANCE_S}
                y={bottomRowY}
                labelPosition="bottom-pot"
                momentary
                onButtonClick={() => button.send(voiceGroupIndex, envCtrls.ENV_GATE, envCtrls.ENV_GATE.values[0])}
                onButtonRelease={() => button.send(voiceGroupIndex, envCtrls.ENV_GATE, envCtrls.ENV_GATE.values[1])}
            />
        </>
    )
}

export default Envelope
