import { POT_DISTANCE_L, POT_DISTANCE_M, POT_OFFSET_Y, ROW_HEIGHT } from '../../../constants'
import { useButton } from '../../../store/hooks'
import RoundPushButton8 from '../../buttons/RoundPushButton8'
import { ModuleBorder } from '../../misc/ModuleBorder'
import SubHeader from '../../misc/SubHeader'
import { VerticalDividerLine } from '../../misc/VerticalDividerLine'
import type { ModuleProps } from '../types'
import '../Modules.scss'

const NoiseAndRing = ({ x, y, width, height }: ModuleProps) => {
    const center = x + width / 2

    const col1 = x + POT_DISTANCE_M / 2
    const col2 = col1 + POT_DISTANCE_L

    const { value: colourValue, toggle: colourToggle } = useButton(
        (s) => s.noise.colour,
        (s, v) => {
            s.noise.colour = v
        },
        3
    )
    const { value: sourceValue, toggle: sourceToggle } = useButton(
        (s) => s.ringMod.source,
        (s, v) => {
            s.ringMod.source = v
        },
        3
    )

    return (
        <>
            <ModuleBorder x={x} y={y} height={height} width={width} className="audio-elements-border" />
            <SubHeader
                label="Noise"
                labelPosition="center"
                labelWidth={15}
                x={x}
                y={y}
                width={width / 2}
                padding="left"
            />

            <RoundPushButton8
                x={col1}
                y={y + POT_OFFSET_Y}
                ledPosition="right"
                ledCount={3}
                ledLabels={['White', 'Pink', 'Red']}
                label=""
                labelPosition="bottom"
                value={colourValue}
                onButtonClick={colourToggle}
            />
            <VerticalDividerLine x={center} y={y} length={ROW_HEIGHT} />

            <SubHeader
                label="Ring"
                labelPosition="center"
                labelWidth={15}
                x={center}
                y={y}
                width={width / 2}
                padding="right"
            />
            <RoundPushButton8
                x={col2}
                y={y + POT_OFFSET_Y}
                ledPosition="right"
                ledCount={3}
                ledLabels={['1 -> 2', 'E -> 2', '3 -> 2']}
                label=""
                labelPosition="bottom"
                value={sourceValue}
                onButtonClick={sourceToggle}
            />
        </>
    )
}

export default NoiseAndRing
