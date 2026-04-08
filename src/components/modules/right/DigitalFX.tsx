import { BUTTON_DISTANCE_S, POT_DISTANCE_M, POT_OFFSET_Y, ROW_HEIGHT } from '@/constants'
import { useButton, usePot } from '@/store'
import commonFxControllers from '@/synthcore/modules/commonFx/commonFxControllers'
import RoundPushButton8 from '../../buttons/RoundPushButton8'
import Display from '../../misc/Display'
import { ModuleBorder } from '../../misc/ModuleBorder'
import SubHeader from '../../misc/SubHeader'
import RotaryPotWOLeds10 from '../../pots/RotaryPotWOLeds10'
import type { ModuleProps } from '../types'
import '../Modules.scss'

const DigitalFX = ({ x, y, height, width }: ModuleProps) => {
    const displayHeight = 30
    const displayWidth = 70

    const row1 = y + POT_OFFSET_Y
    const row2 = row1 + ROW_HEIGHT

    const displayX = x + width / 2 - displayWidth / 2
    const displayY = y + 10

    const col1 = x + 12.5
    const col2 = x + 7.5 + POT_DISTANCE_M
    const col3 = col2 + POT_DISTANCE_M
    const col4 = col3 + POT_DISTANCE_M
    const col5 = col4 + BUTTON_DISTANCE_S

    const { value: sourceValue, toggle: sourceToggle } = useButton(
        (s) => s.commonFx.dsp2.source,
        (s, v) => {
            s.commonFx.dsp2.source = v
        },
        2
    )
    const { displayValue: param1Value, increment: param1Increment } = usePot(
        (s) => s.commonFx.dsp2.param1,
        (s, v) => {
            s.commonFx.dsp2.param1 = v
        }
    )
    const { displayValue: param2Value, increment: param2Increment } = usePot(
        (s) => s.commonFx.dsp2.param2,
        (s, v) => {
            s.commonFx.dsp2.param2 = v
        }
    )
    const { displayValue: param3Value, increment: param3Increment } = usePot(
        (s) => s.commonFx.dsp2.param3,
        (s, v) => {
            s.commonFx.dsp2.param3 = v
        }
    )
    const { displayValue: effectValue, increment: effectIncrement } = usePot(
        (s) => s.commonFx.dsp2.effect,
        (s, v) => {
            s.commonFx.dsp2.effect = v
        }
    )

    return (
        <>
            <ModuleBorder x={x} y={y} height={height} width={width} className="shared-elements-border" />
            <SubHeader label="DSP" x={x} y={y} width={width} />

            <RoundPushButton8
                x={col1}
                y={row1}
                label="DSP"
                ledCount={2}
                labelPosition="bottom-pot"
                ledPosition="top-horizontal-no-label"
                ctrlId={commonFxControllers.DSP2.SOURCE.id}
                value={sourceValue}
                onButtonClick={sourceToggle}
            />

            <RoundPushButton8
                x={col1}
                y={row2}
                label="Source"
                ledCount={2}
                ledLabels={['FX1', 'FX2']}
                labelPosition="bottom-pot"
                ledPosition="top-horizontal"
                ctrlId={commonFxControllers.DSP2.SOURCE.id}
                value={sourceValue}
                onButtonClick={sourceToggle}
            />

            {<Display x={displayX} y={displayY} width={displayWidth} height={displayHeight} />}

            <RotaryPotWOLeds10 x={col2} y={row2} ctrlId={commonFxControllers.DSP2.PARAM1.id} value={param1Value} onValueIncrement={param1Increment} />

            <RotaryPotWOLeds10 x={col3} y={row2} ctrlId={commonFxControllers.DSP2.PARAM2.id} value={param2Value} onValueIncrement={param2Increment} />

            <RotaryPotWOLeds10 x={col4} y={row2} ctrlId={commonFxControllers.DSP2.PARAM3.id} value={param3Value} onValueIncrement={param3Increment} />

            <RotaryPotWOLeds10 x={col5} y={row1} label="Effect" ctrlId={commonFxControllers.DSP2.EFFECT.id} value={effectValue} onValueIncrement={effectIncrement} />
        </>
    )
}

export default DigitalFX
