import { useCallback } from 'react'
import { POT_DISTANCE_M, POT_OFFSET_Y } from '../../constants'
import { useButton, usePatchValue, usePot } from '../../store/hooks'
import { voiceGroupStores } from '../../store/patchStore'
import { useUiStore } from '../../store/uiStore'
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import Led from '../leds/Led'
import { ModuleBorder } from '../misc/ModuleBorder'
import SubHeader from '../misc/SubHeader'
import RotaryPot12 from '../pots/RotaryPot12'
import type { ModuleProps } from './types'
import './KeyboardControls.scss'

export const Transpose = ({ x, y, height, width }: ModuleProps) => {
    const ledDistance = 8
    const col1 = x + POT_DISTANCE_M / 2
    const col7 = col1 + POT_DISTANCE_M * 2

    const ledStart = col1 + (col7 - col1 - 4 * ledDistance) / 2
    const col2 = ledStart
    const col3 = col2 + ledDistance
    const col4 = col3 + ledDistance
    const col5 = col4 + ledDistance
    const col6 = col5 + ledDistance

    const row1 = y + POT_OFFSET_Y

    const transpose = usePatchValue((s) => s.kbd.transpose)
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)

    const transposeDown = useCallback(() => {
        const store = voiceGroupStores[voiceGroupIndex].getState()
        const current = store.kbd.transpose
        if (current > 0) {
            store.set((state) => {
                state.kbd.transpose = current - 1
            })
        }
    }, [voiceGroupIndex])

    const transposeUp = useCallback(() => {
        const store = voiceGroupStores[voiceGroupIndex].getState()
        const current = store.kbd.transpose
        if (current < 4) {
            store.set((state) => {
                state.kbd.transpose = current + 1
            })
        }
    }, [voiceGroupIndex])

    return (
        <>
            <ModuleBorder x={x} y={y} height={height} width={width} className="keyboard-controls-background" />
            <SubHeader
                label="Transpose"
                labelPosition="center"
                labelWidth={22}
                labelBackgroundOn={false}
                x={x}
                y={y}
                width={width}
                className="keyboard-controls-header"
            />

            <RoundPushButton8 labelPosition="bottom-pot" x={col1} y={row1} label="Down" onButtonClick={transposeDown} />

            <Led x={col2} y={row1} label="-2" on={transpose === 0} />
            <Led x={col3} y={row1} label="-1" on={transpose === 1} />
            <Led x={col4} y={row1} label="0" on={transpose === 2} />
            <Led x={col5} y={row1} label="1" on={transpose === 3} />
            <Led x={col6} y={row1} label="2" on={transpose === 4} />
            <RoundPushButton8 labelPosition="bottom-pot" x={col7} y={row1} label="Up" onButtonClick={transposeUp} />
        </>
    )
}

export const Keyboard = ({ x, y, height, width }: ModuleProps) => {
    const row1 = y + POT_OFFSET_Y

    const col8 = x + POT_DISTANCE_M / 2
    const col9 = col8 + 25
    const col10 = col9 + 20
    const col11 = col10 + 20
    const col12 = col11 + 45

    const { displayValue: portValue, increment: portIncrement } = usePot(
        (s) => s.kbd.portamento,
        (s, v) => {
            s.kbd.portamento = v
        }
    )
    const { displayValue: detuneValue, increment: detuneIncrement } = usePot(
        (s) => s.kbd.unisonDetune,
        (s, v) => {
            s.kbd.unisonDetune = v
        }
    )
    const { value: holdValue, toggle: holdToggle } = useButton(
        (s) => s.kbd.hold,
        (s, v) => {
            s.kbd.hold = v
        },
        2
    )
    const { value: chordValue, toggle: chordToggle } = useButton(
        (s) => s.kbd.chord,
        (s, v) => {
            s.kbd.chord = v
        },
        2
    )
    const { value: modeValue, toggle: modeToggle } = useButton(
        (s) => s.kbd.mode,
        (s, v) => {
            s.kbd.mode = v
        },
        3
    )

    return (
        <>
            <ModuleBorder x={x} y={y} height={height} width={width} className="keyboard-controls-background" />
            <SubHeader
                label="Keyboard"
                labelPosition="center"
                labelWidth={22}
                labelBackgroundOn={false}
                x={x}
                y={y}
                width={width}
                className="keyboard-controls-header"
            />

            <RotaryPot12
                x={col8}
                y={row1}
                ledMode="single"
                label="Portamento"
                value={portValue}
                onValueIncrement={portIncrement}
            />

            <RoundLedPushButton8
                labelPosition="bottom-pot"
                x={col9}
                y={row1}
                label="Hold"
                value={holdValue}
                onButtonClick={holdToggle}
            />

            <RoundLedPushButton8
                labelPosition="bottom-pot"
                x={col10}
                y={row1}
                label="Chord"
                value={chordValue}
                onButtonClick={chordToggle}
            />

            <RoundPushButton8
                labelPosition="bottom-pot"
                x={col11}
                y={row1}
                label="Mode"
                ledCount={3}
                ledPosition="right"
                ledLabels={['Solo', 'Unison', 'Poly']}
                value={modeValue}
                onButtonClick={modeToggle}
            />

            <RotaryPot12
                x={col12}
                y={row1}
                ledMode="single"
                label="Unison detune"
                value={detuneValue}
                onValueIncrement={detuneIncrement}
            />
        </>
    )
}

const KeyboardControls = (_props: ModuleProps) => {
    return <></>
}

export default KeyboardControls
