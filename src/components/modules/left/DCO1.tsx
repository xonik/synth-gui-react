import { useCallback } from 'react'
import {
    DUAL_LED_BUTTON_W_LABEL_OFFSET_Y,
    POT_DISTANCE_L,
    POT_DISTANCE_M,
    POT_DISTANCE_S,
    POT_OFFSET_Y,
    ROW_HEIGHT,
} from '../../../constants'
import { useButton, usePot } from '../../../store/hooks'
import { type VoiceGroupPatch, voiceGroupStores } from '../../../store/patchStore'
import { useUiStore } from '../../../store/uiStore'
import RoundLedPushButton8 from '../../buttons/RoundLedPushButton8'
import RoundPushButton8 from '../../buttons/RoundPushButton8'
import { SawRight } from '../../images/SawRight'
import { Square } from '../../images/Square'
import { ModuleBorder } from '../../misc/ModuleBorder'
import SubHeader from '../../misc/SubHeader'
import { VerticalDividerLine } from '../../misc/VerticalDividerLine'
import RotaryPot12 from '../../pots/RotaryPot12'
import RotaryPot21 from '../../pots/RotaryPot21'
import type { ModuleProps } from '../types'
import { WaveformIconsRing } from './WaveformIconsRing'
import '../Modules.scss'

const OSC = 0

const OscTogglePot = ({
    x,
    y,
    label,
    selector,
    mutator,
}: {
    x: number
    y: number
    label: string
    selector: (s: VoiceGroupPatch) => number
    mutator: (s: VoiceGroupPatch, v: number) => void
}) => {
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)
    const { value } = useButton(selector, mutator, 2)
    const onIncrement = useCallback(
        (delta: number) => {
            voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                mutator(state, delta > 0 ? 1 : 0)
            })
        },
        [voiceGroupIndex, mutator]
    )
    return <RotaryPot12 x={x} y={y} label={label} value={value} onValueIncrement={onIncrement} />
}

const OscPot = ({
    x,
    y,
    label,
    ledMode = 'single' as const,
    selector,
    mutator,
}: {
    x: number
    y: number
    label: string
    ledMode?: 'single' | 'multi'
    selector: (s: VoiceGroupPatch) => number
    mutator: (s: VoiceGroupPatch, v: number) => void
}) => {
    const { displayValue, increment } = usePot(selector, mutator)
    return <RotaryPot12 x={x} y={y} ledMode={ledMode} label={label} value={displayValue} onValueIncrement={increment} />
}

const DCO1 = ({ x, y, height, width }: ModuleProps) => {
    const topRow = y + POT_OFFSET_Y
    const bottomRow = topRow + ROW_HEIGHT
    const centerRow = topRow + ROW_HEIGHT * 0.5

    const col1 = x + POT_DISTANCE_M / 2
    const col2 = col1 + POT_DISTANCE_L
    const col3 = col2 + POT_DISTANCE_M
    const col4 = col3 + POT_DISTANCE_M
    const col5 = col4 + POT_DISTANCE_S
    const col6 = col5 + POT_DISTANCE_S
    const col7 = col6 + POT_DISTANCE_S
    const col8 = col7 + POT_DISTANCE_S
    const col9 = col8 + POT_DISTANCE_M

    const { value: modeValue, toggle: modeToggle } = useButton(
        (s) => s.oscillators[OSC].mode,
        (s, v) => {
            s.oscillators[OSC].mode = v
        },
        3
    )
    const { value: syncValue, toggle: syncToggle } = useButton(
        (s) => s.oscillators[OSC].sync,
        (s, v) => {
            s.oscillators[OSC].sync = v
        },
        3
    )
    const { value: sawInvValue, toggle: sawInvToggle } = useButton(
        (s) => s.oscillators[OSC].sawInv,
        (s, v) => {
            s.oscillators[OSC].sawInv = v
        },
        2
    )
    const { value: preFilterSineValue, toggle: preFilterSineToggle } = useButton(
        (s) => s.oscillators[OSC].preFilterSine,
        (s, v) => {
            s.oscillators[OSC].preFilterSine = v
        },
        2
    )
    const { value: subWaveValue, toggle: subWaveToggle } = useButton(
        (s) => s.oscillators[OSC].subWave,
        (s, v) => {
            s.oscillators[OSC].subWave = v
        },
        2
    )
    const { displayValue: wfValue, increment: wfIncrement } = usePot(
        (s) => s.oscillators[OSC].waveform,
        (s, v) => {
            s.oscillators[OSC].waveform = v
        }
    )

    return (
        <>
            <ModuleBorder x={x} y={y} height={height} width={width} className="audio-elements-border" />
            <SubHeader label="Osc 1" x={x} y={y} width={width} labelPosition={col6} labelWidth={15} />
            <VerticalDividerLine x={col1 + POT_DISTANCE_L - POT_DISTANCE_M / 2} y={y} length={2 * ROW_HEIGHT} />
            <VerticalDividerLine x={col3 + POT_DISTANCE_M / 2} y={y} length={2 * ROW_HEIGHT} />

            <RoundPushButton8
                x={col1}
                y={topRow}
                ledPosition="right"
                ledCount={3}
                ledLabels={['DCO', 'WT', 'PCM']}
                label="Mode"
                labelPosition="bottom-pot"
                value={modeValue}
                onButtonClick={modeToggle}
            />

            <OscTogglePot
                x={col2}
                y={topRow}
                label="Keyboard"
                selector={(s) => s.oscillators[OSC].kbd}
                mutator={(s, v) => {
                    s.oscillators[OSC].kbd = v
                }}
            />

            <OscTogglePot
                x={col3}
                y={topRow}
                label="LFO"
                selector={(s) => s.oscillators[OSC].lfo}
                mutator={(s, v) => {
                    s.oscillators[OSC].lfo = v
                }}
            />

            <OscPot
                x={col4}
                y={topRow}
                ledMode="single"
                label="Note"
                selector={(s) => s.oscillators[OSC].note}
                mutator={(s, v) => {
                    s.oscillators[OSC].note = v
                }}
            />

            <OscPot
                x={col4}
                y={bottomRow}
                ledMode="single"
                label="Detune"
                selector={(s) => s.oscillators[OSC].detune}
                mutator={(s, v) => {
                    s.oscillators[OSC].detune = v
                }}
            />

            <RoundPushButton8
                x={col1}
                y={bottomRow}
                ledPosition="right"
                ledCount={2}
                ledLabels={['Hard', 'Metal']}
                label="Sync"
                labelPosition="bottom-pot"
                hasOff
                value={syncValue}
                onButtonClick={syncToggle}
            />

            <OscTogglePot
                x={col3}
                y={bottomRow}
                label="Wheel"
                selector={(s) => s.oscillators[OSC].wheel}
                mutator={(s, v) => {
                    s.oscillators[OSC].wheel = v
                }}
            />

            <RoundLedPushButton8
                x={col5}
                y={topRow}
                label="Inv saw"
                labelPosition="bottom"
                value={sawInvValue}
                onButtonClick={sawInvToggle}
            />

            <RotaryPot21
                x={col6}
                y={centerRow}
                ledMode="single"
                label="Waveform"
                value={wfValue}
                onValueIncrement={wfIncrement}
            />

            <WaveformIconsRing x={col6} y={centerRow} />

            <RoundLedPushButton8
                x={col7}
                y={topRow}
                label="Sine"
                labelPosition="bottom"
                value={preFilterSineValue}
                onButtonClick={preFilterSineToggle}
            />

            <RoundPushButton8
                x={col9}
                y={bottomRow + DUAL_LED_BUTTON_W_LABEL_OFFSET_Y}
                ledPosition="top-horizontal"
                ledCount={2}
                ledLabels={[
                    <Square key="sqr" x={0} y={0} width={3} height={2} />,
                    <SawRight key="saw" x={0} y={0} width={3} height={2} />,
                ]}
                label="Sub wave"
                labelPosition="bottom"
                value={subWaveValue}
                onButtonClick={subWaveToggle}
            />

            <OscPot
                x={col8}
                y={topRow}
                ledMode="multi"
                label="Sub -1"
                selector={(s) => s.oscillators[OSC].sub1}
                mutator={(s, v) => {
                    s.oscillators[OSC].sub1 = v
                }}
            />

            <OscPot
                x={col8}
                y={bottomRow}
                ledMode="single"
                label="Pulse width"
                selector={(s) => s.oscillators[OSC].pw}
                mutator={(s, v) => {
                    s.oscillators[OSC].pw = v
                }}
            />

            <OscPot
                x={col9}
                y={topRow}
                ledMode="multi"
                label="Sub -2"
                selector={(s) => s.oscillators[OSC].sub2}
                mutator={(s, v) => {
                    s.oscillators[OSC].sub2 = v
                }}
            />
        </>
    )
}

export default DCO1
