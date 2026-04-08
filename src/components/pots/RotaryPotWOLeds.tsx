import { useCallback, useEffect, useRef } from 'react'
import { notifyParamChangeById } from '@/store/paramPopupStore'
import RotaryPotBase from './RotaryPotBase'
import './RotaryPot.scss'

export interface Props {
    x: number
    y: number
    label?: string
    resolution?: number
    silver?: boolean
    value?: number
    ctrlId?: number
    onValueIncrement?: (delta: number) => void
}

interface Config {
    knobRadius: number
}

const RotaryPotWOLeds = (props: Props & Config) => {
    const { x, y, label, knobRadius, resolution, silver, value, ctrlId, onValueIncrement } = props
    const labelY = knobRadius + 5

    const prevValueRef = useRef(value)
    useEffect(() => {
        if (prevValueRef.current !== value && ctrlId !== undefined && value !== undefined) {
            notifyParamChangeById(ctrlId, value)
        }
        prevValueRef.current = value
    }, [value, ctrlId])

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
