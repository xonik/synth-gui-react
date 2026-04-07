import { POT_DISTANCE_L, POT_DISTANCE_M, POT_OFFSET_Y } from '@/constants'
import { useGlobalButton, useGlobalPot } from '@/store/hooks'
import type { PopupConfig } from '@/store/hooks'
import masterClockControllers from '@/synthcore/modules/masterClock/masterClockControllers'
import { ScreenId } from '@/store/uiStore'
import RoundPushButton8 from '../../buttons/RoundPushButton8'
import { ModuleBorder } from '../../misc/ModuleBorder'
import SubHeader from '../../misc/SubHeader'
import RotaryPot12 from '../../pots/RotaryPot12'
import type { ModuleProps } from '../types'

const popup = (paramLabel: string): PopupConfig => ({
    moduleName: 'Clock',
    paramLabel,
    screen: ScreenId.ARP,
})

const Clock = ({ x, y, height, width }: ModuleProps) => {
    const row1 = y
    const row2 = y + POT_OFFSET_Y
    const col1 = x + POT_DISTANCE_M / 2
    const col2 = col1 + POT_DISTANCE_L

    const { value: sourceValue, toggle: sourceToggle } = useGlobalButton(
        (s) => s.masterClock.source,
        (s, v) => {
            s.masterClock.source = v
        },
        3,
        { popup: popup('Source') }
    )
    const { displayValue: rateValue, increment: rateIncrement } = useGlobalPot(
        (s) => s.masterClock.rate,
        (s, v) => {
            s.masterClock.rate = v
        },
        { popup: popup('Rate') }
    )

    return (
        <>
            <ModuleBorder x={x} y={y} height={height} width={width} />
            <SubHeader label="Clock" x={x} y={row1} width={width} labelPosition="center" labelWidth={15} />

            <RoundPushButton8
                labelPosition="bottom-pot"
                x={col1}
                y={row2}
                label="Source"
                ledCount={3}
                ledPosition="right"
                ledLabels={['Int', 'Midi', 'Ext']}
                value={sourceValue}
                onButtonClick={sourceToggle}
            />

            <RotaryPot12
                ledMode="single"
                label="Rate"
                x={col2}
                y={row2}
                ctrlId={masterClockControllers.RATE.id}
                value={rateValue}
                onValueIncrement={rateIncrement}
            />
        </>
    )
}

export default Clock
