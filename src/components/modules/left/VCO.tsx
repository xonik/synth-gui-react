import { useCallback } from 'react'
import {
    DUAL_LED_BUTTON_W_LABEL_OFFSET_Y,
    POT_DISTANCE_L,
    POT_DISTANCE_M,
    POT_DISTANCE_S,
    POT_OFFSET_Y,
    ROW_HEIGHT,
} from '@/constants'
import { useButton, usePot, useUiStore, type VoiceGroupPatch, voiceGroupStores } from '@/store'
import oscControllers from '@/synthcore/modules/osc/oscControllers'
import RoundLedPushButton8 from '../../buttons/RoundLedPushButton8'
import RoundPushButton8 from '../../buttons/RoundPushButton8'
import { ModuleBorder } from '../../misc/ModuleBorder'
import SubHeader from '../../misc/SubHeader'
import { VerticalDividerLine } from '../../misc/VerticalDividerLine'
import RotaryPot12 from '../../pots/RotaryPot12'
import RotaryPot21 from '../../pots/RotaryPot21'
import type { ModuleProps } from '../types'
import { WaveformIconsRing } from './WaveformIconsRing'
import '../Modules.scss'

const OSC = 2

const OscPot = ({
    x,
    y,
    label,
    ledMode = 'single' as const,
    ctrlId,
    selector,
    mutator,
}: {
    x: number
    y: number
    label: string
    ledMode?: 'single' | 'multi'
    ctrlId: number
    selector: (s: VoiceGroupPatch) => number
    mutator: (s: VoiceGroupPatch, v: number) => void
}) => {
    const { displayValue, increment } = usePot(selector, mutator)
    return <RotaryPot12 x={x} y={y} ledMode={ledMode} label={label} value={displayValue} ctrlId={ctrlId} onValueIncrement={increment} />
}

const OscTogglePot = ({
    x,
    y,
    label,
    ctrlId,
    selector,
    mutator,
}: {
    x: number
    y: number
    label: string
    ctrlId: number
    selector: (s: VoiceGroupPatch) => number
    mutator: (s: VoiceGroupPatch, v: number) => void
}) => {
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)
    const { value } = useButton(selector, mutator, 2)
    const onIncrement = useCallback(
        (delta: number) => {
            const newValue = delta > 0 ? 1 : 0
            voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                mutator(state, newValue)
            })
        },
        [voiceGroupIndex, mutator]
    )
    return <RotaryPot12 x={x} y={y} label={label} value={value} ctrlId={ctrlId} onValueIncrement={onIncrement} />
}

const VCO = ({ x, y, height, width }: ModuleProps) => {
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

    const { value: syncSrcValue, toggle: syncSrcToggle } = useButton(
        (s) => s.oscillators[OSC].syncSrc,
        (s, v) => {
            s.oscillators[OSC].syncSrc = v
        },
        2
    )
    const { value: syncValue, toggle: syncToggle } = useButton(
        (s) => s.oscillators[OSC].sync,
        (s, v) => {
            s.oscillators[OSC].sync = v
        },
        3
    )
    const { value: extCvValue, toggle: extCvToggle } = useButton(
        (s) => s.oscillators[OSC].extCv,
        (s, v) => {
            s.oscillators[OSC].extCv = v
        },
        2
    )
    const { displayValue: waveformValue, increment: waveformIncrement } = usePot(
        (s) => s.oscillators[OSC].waveform,
        (s, v) => {
            s.oscillators[OSC].waveform = v
        }
    )
    const { value: fmSrcValue, toggle: fmSrcToggle } = useButton(
        (s) => s.oscillators[OSC].fmSrc,
        (s, v) => {
            s.oscillators[OSC].fmSrc = v
        },
        2
    )
    const { value: fmModeValue, toggle: fmModeToggle } = useButton(
        (s) => s.oscillators[OSC].fmMode,
        (s, v) => {
            s.oscillators[OSC].fmMode = v
        },
        3
    )

    return (
        <>
            {/*!SHOW_CUT && <rect x={x-52.5} y={y} width="105" height={130 - ROW_SPACING} className="module-background"/>*/}
            <ModuleBorder x={x} y={y} height={height} width={width} className="audio-elements-border" />
            <SubHeader label="Osc 3" x={x} y={y} width={width} labelPosition={col6} labelWidth={15} />
            <VerticalDividerLine x={col1 + POT_DISTANCE_L - POT_DISTANCE_M / 2} y={y} length={2 * ROW_HEIGHT} />
            <VerticalDividerLine x={col3 + POT_DISTANCE_M / 2} y={y} length={2 * ROW_HEIGHT} />

            <RoundPushButton8
                x={col1}
                y={topRow}
                ledPosition="right"
                ledCount={2}
                ledLabels={['1', '2']}
                label="Sync src"
                labelPosition="bottom-pot"
                value={syncSrcValue}
                ctrlId={oscControllers.VCO.SYNC_SRC.id}
                onButtonClick={syncSrcToggle}
            />

            <OscTogglePot
                x={col2}
                y={topRow}
                label="Keyboard"
                ctrlId={oscControllers.VCO.KBD.id}
                selector={(s) => s.oscillators[OSC].kbd}
                mutator={(s, v) => {
                    s.oscillators[OSC].kbd = v
                }}
            />

            <OscTogglePot
                x={col3}
                y={topRow}
                label="LFO"
                ctrlId={oscControllers.VCO.LFO.id}
                selector={(s) => s.oscillators[OSC].lfo}
                mutator={(s, v) => {
                    s.oscillators[OSC].lfo = v
                }}
            />

            <OscPot
                x={col4}
                y={topRow}
                label="Note"
                ctrlId={oscControllers.VCO.NOTE.id}
                selector={(s) => s.oscillators[OSC].note}
                mutator={(s, v) => {
                    s.oscillators[OSC].note = v
                }}
            />

            <OscPot
                x={col4}
                y={bottomRow}
                label="Detune"
                ctrlId={oscControllers.VCO.DETUNE.id}
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
                ledLabels={['Hard', 'CEM']}
                label="Sync"
                labelPosition="bottom-pot"
                hasOff
                value={syncValue}
                ctrlId={oscControllers.VCO.SYNC.id}
                onButtonClick={syncToggle}
            />

            <RoundLedPushButton8
                x={col2}
                y={bottomRow}
                label="Ext CV"
                labelPosition="bottom-pot"
                value={extCvValue}
                ctrlId={oscControllers.VCO.EXT_CV.id}
                onButtonClick={extCvToggle}
            />

            <OscTogglePot
                x={col3}
                y={bottomRow}
                label="Wheel"
                ctrlId={oscControllers.VCO.WHEEL.id}
                selector={(s) => s.oscillators[OSC].wheel}
                mutator={(s, v) => {
                    s.oscillators[OSC].wheel = v
                }}
            />

            <RotaryPot21
                x={col6}
                y={centerRow}
                ledMode="single"
                label="Waveform"
                value={waveformValue}
                ctrlId={oscControllers.VCO.WAVEFORM.id}
                onValueIncrement={waveformIncrement}
            />

            <WaveformIconsRing x={col6} y={centerRow} />

            <OscPot
                x={col8}
                y={topRow}
                ledMode="multi"
                label="FM"
                ctrlId={oscControllers.VCO.FM_AMT.id}
                selector={(s) => s.oscillators[OSC].fmAmt}
                mutator={(s, v) => {
                    s.oscillators[OSC].fmAmt = v
                }}
            />

            <RoundPushButton8
                x={col9}
                y={topRow + DUAL_LED_BUTTON_W_LABEL_OFFSET_Y}
                ledPosition="top-horizontal"
                ledCount={2}
                ledLabels={['2', 'Ext']}
                label="FM src"
                labelPosition="bottom"
                value={fmSrcValue}
                ctrlId={oscControllers.VCO.FM_SRC.id}
                onButtonClick={fmSrcToggle}
            />

            <OscPot
                x={col8}
                y={bottomRow}
                label="Pulse width"
                ctrlId={oscControllers.VCO.PW.id}
                selector={(s) => s.oscillators[OSC].pw}
                mutator={(s, v) => {
                    s.oscillators[OSC].pw = v
                }}
            />

            <RoundPushButton8
                x={col9}
                y={bottomRow + +DUAL_LED_BUTTON_W_LABEL_OFFSET_Y}
                ledPosition="top-horizontal"
                ledCount={2}
                ledLabels={['Lin', 'Log']}
                label="FM mode"
                labelPosition="bottom"
                hasOff
                value={fmModeValue}
                ctrlId={oscControllers.VCO.FM_MODE.id}
                onButtonClick={fmModeToggle}
            />
        </>
    )
}

export default VCO
