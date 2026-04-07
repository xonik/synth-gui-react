import {
    DUAL_LED_BUTTON_W_LABEL_OFFSET_Y,
    POT_DISTANCE_L,
    POT_DISTANCE_M,
    POT_DISTANCE_S,
    POT_OFFSET_Y,
    ROW_HEIGHT,
} from '@/constants'
import { useButton, usePot } from '@/store'
import type { PopupConfig } from '@/store/hooks'
import { ScreenId } from '@/store/uiStore'
import RoundPushButton8 from '../../buttons/RoundPushButton8'
import { ModuleBorder } from '../../misc/ModuleBorder'
import SubHeader from '../../misc/SubHeader'
import RotaryPot12 from '../../pots/RotaryPot12'
import type { ModuleProps } from '../types'
import '../Modules.scss'

const Effects = ({ x, y, height, width }: ModuleProps) => {
    const popup = (moduleName: string, paramLabel: string): PopupConfig => ({
        moduleName,
        paramLabel,
        screen: ScreenId.FX,
    })

    const { displayValue: driveValue, increment: driveIncrement } = usePot(
        (s) => s.fx.distortion.drive,
        (s, v) => {
            s.fx.distortion.drive = v
        },
        { popup: popup('Distort', 'Drive') }
    )
    const { displayValue: levelValue, increment: levelIncrement } = usePot(
        (s) => s.fx.distortion.level,
        (s, v) => {
            s.fx.distortion.level = v
        },
        { popup: popup('Distort', 'Level') }
    )
    const { value: distInValue, toggle: distInToggle } = useButton(
        (s) => s.fx.distortion.in,
        (s, v) => {
            s.fx.distortion.in = v
        },
        2,
        { popup: popup('Distort', 'In') }
    )
    const { value: distOutValue, toggle: distOutToggle } = useButton(
        (s) => s.fx.distortion.out,
        (s, v) => {
            s.fx.distortion.out = v
        },
        4,
        { popup: popup('Distort', 'Out') }
    )
    const { displayValue: bitsValue, increment: bitsIncrement } = usePot(
        (s) => s.fx.bitCrusher.bits,
        (s, v) => {
            s.fx.bitCrusher.bits = v
        },
        { popup: popup('Crush', 'Bits') }
    )
    const { displayValue: rateValue, increment: rateIncrement } = usePot(
        (s) => s.fx.bitCrusher.rate,
        (s, v) => {
            s.fx.bitCrusher.rate = v
        },
        { popup: popup('Crush', 'Rate') }
    )
    const { value: crushInValue, toggle: crushInToggle } = useButton(
        (s) => s.fx.bitCrusher.in,
        (s, v) => {
            s.fx.bitCrusher.in = v
        },
        2,
        { popup: popup('Crush', 'In') }
    )
    const { value: crushOutValue, toggle: crushOutToggle } = useButton(
        (s) => s.fx.bitCrusher.out,
        (s, v) => {
            s.fx.bitCrusher.out = v
        },
        4,
        { popup: popup('Crush', 'Out') }
    )

    const row1 = y
    const row2 = row1 + POT_OFFSET_Y
    const row3 = row2 + ROW_HEIGHT

    const col1 = x + POT_DISTANCE_M / 2
    const col2 = col1 + POT_DISTANCE_S
    const col3 = col1 + POT_DISTANCE_L
    const col4 = col3 + POT_DISTANCE_S

    return (
        <>
            <ModuleBorder x={x} y={y} height={height} width={width} className="audio-elements-border" />
            <SubHeader
                x={x}
                y={row1}
                width={width / 2}
                label="Distort"
                labelWidth={20}
                labelPosition="center"
                padding="left"
            />

            <SubHeader
                x={x + width / 2}
                y={row1}
                width={width / 2}
                label="Crush"
                labelWidth={20}
                labelPosition="center"
                padding="right"
            />

            <RotaryPot12
                ledMode="multi"
                label="Drive"
                x={col1}
                y={row2}
                value={driveValue}
                onValueIncrement={driveIncrement}
            />

            <RoundPushButton8
                x={col2}
                y={row2 + DUAL_LED_BUTTON_W_LABEL_OFFSET_Y}
                ledPosition="top-horizontal-no-label"
                ledCount={2}
                ledRingColors={['#00bfa6', '#ff8700']}
                label="From"
                labelPosition="bottom"
                value={distInValue}
                onButtonClick={distInToggle}
            />

            <RotaryPot12
                ledMode="multi"
                label="Level"
                x={col1}
                y={row3}
                value={levelValue}
                onValueIncrement={levelIncrement}
            />

            <RoundPushButton8
                x={col2}
                y={row3 + DUAL_LED_BUTTON_W_LABEL_OFFSET_Y}
                ledPosition="top-horizontal-no-label"
                ledCount={2}
                ledRingColors={['#00bfa6', '#ff8700']}
                label="To"
                labelPosition="bottom"
                hasOff
                value={distOutValue}
                onButtonClick={distOutToggle}
            />

            <RotaryPot12
                ledMode="single"
                ledCount={12}
                label="Bits"
                x={col3}
                y={row2}
                value={bitsValue}
                onValueIncrement={bitsIncrement}
            />

            <RoundPushButton8
                x={col4}
                y={row2 + DUAL_LED_BUTTON_W_LABEL_OFFSET_Y}
                ledPosition="top-horizontal-no-label"
                ledCount={2}
                ledRingColors={['#00bfa6', '#ff8700']}
                label="From"
                labelPosition="bottom"
                value={crushInValue}
                onButtonClick={crushInToggle}
            />

            <RotaryPot12
                ledMode="single"
                label="Rate"
                x={col3}
                y={row3}
                value={rateValue}
                onValueIncrement={rateIncrement}
            />

            <RoundPushButton8
                x={col4}
                y={row3 + DUAL_LED_BUTTON_W_LABEL_OFFSET_Y}
                ledPosition="top-horizontal-no-label"
                ledCount={2}
                ledRingColors={['#00bfa6', '#ff8700']}
                label="To"
                labelPosition="bottom"
                hasOff
                value={crushOutValue}
                onButtonClick={crushOutToggle}
            />
        </>
    )
}

export default Effects
