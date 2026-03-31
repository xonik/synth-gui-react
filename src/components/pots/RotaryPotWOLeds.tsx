import { useCallback } from 'react'
import RotaryPotBase from './RotaryPotBase'
import './RotaryPot.scss'

export interface Props {
    x: number
    y: number
    label?: string
    resolution?: number
    silver?: boolean
    onValueIncrement?: (delta: number) => void
}

interface Config {
    knobRadius: number
}

const RotaryPotWOLeds = (props: Props & Config) => {
    const { x, y, label, knobRadius, resolution, silver, onValueIncrement } = props
    const labelY = knobRadius + 5

    const onIncrement = useCallback(
        (steps: number, stepSize: number) => {
            if (onValueIncrement) {
                onValueIncrement(steps * stepSize)
            }
        },
        [onValueIncrement]
    )

    return (
        <svg x={x} y={y} className="pot">
            <RotaryPotBase knobRadius={knobRadius} onIncrement={onIncrement} resolution={resolution} silver={silver} />
            {label && (
                <text x={0} y={labelY} className="pot-label" textAnchor="middle">
                    {label}
                </text>
            )}
        </svg>
    )
}

export default RotaryPotWOLeds
