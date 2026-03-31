import { useCallback } from 'react'
import { BUTTON_DISTANCE_S, POT_DISTANCE_L, POT_DISTANCE_M, POT_OFFSET_Y } from '../../../constants'
import { useUiStore } from '../../../store/uiStore'
import { getBounded } from '../../../store/utils'
import RoundLedPushButton8 from '../../buttons/RoundLedPushButton8'
import { ModuleBorder } from '../../misc/ModuleBorder'
import SubHeader from '../../misc/SubHeader'
import RotaryPot12 from '../../pots/RotaryPot12'
import type { ModuleProps } from '../types'

const Route = ({ x, y, height, width }: ModuleProps) => {
    const routeButton = useUiStore((s) => s.modRouteButton)
    const setRouteButton = useUiStore((s) => s.setModRouteButton)
    const amount = useUiStore((s) => s.modAmount)
    const setAmount = useUiStore((s) => s.setModAmount)

    const onRouteClick = useCallback(() => {
        setRouteButton((routeButton + 1) % 3)
    }, [routeButton, setRouteButton])

    const onAmountIncrement = useCallback(
        (delta: number) => {
            setAmount(getBounded(amount + delta, -1, 1))
        },
        [amount, setAmount]
    )

    const col1 = x + POT_DISTANCE_M / 2
    const col2 = col1 + BUTTON_DISTANCE_S
    const col3 = col1 + POT_DISTANCE_L

    return (
        <>
            {/*!SHOW_CUT && <rect x={x} y={y} width={64} height={ROW_HEIGHT - ROW_SPACING} className="module-background"/>*/}
            <ModuleBorder x={x} y={y} height={height} width={width} />
            <SubHeader label="Route" x={x} y={y} width={width} labelPosition="center" labelWidth={15} />

            <RoundLedPushButton8
                labelPosition="bottom-pot"
                x={col1}
                y={y + POT_OFFSET_Y}
                hasOff
                label="Source"
                value={routeButton}
                onButtonClick={onRouteClick}
            />

            <RoundLedPushButton8
                labelPosition="bottom-pot"
                x={col2}
                y={y + POT_OFFSET_Y}
                hasOff
                label="Dest"
                value={routeButton}
                onButtonClick={onRouteClick}
            />

            <RotaryPot12
                ledMode="single"
                potMode="pan"
                label="Amount"
                x={col3}
                y={y + POT_OFFSET_Y}
                value={amount}
                onValueIncrement={onAmountIncrement}
            />
        </>
    )
}

export default Route
