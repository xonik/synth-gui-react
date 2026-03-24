import RotaryPotBase from './RotaryPotBase'
import React, { useCallback} from 'react'
import { ControllerConfig } from '../../midi/types'
import { increment } from '../../synthcore/modules/ui/uiReducer'
import { useAppDispatch } from '../../synthcore/hooks'
import { ApiSource, ControllerGroupIds } from '../../synthcore/types'
import './RotaryPot.scss'

export interface Props {
    x: number,
    y: number,
    label?: string,
    ctrlGroup?: ControllerGroupIds;
    ctrl?: ControllerConfig
    ctrlIndex?: number
    valueIndex?: number
    resolution?: number
    silver?: boolean;
    onValueIncrement?: (delta: number) => void;
}

interface Config {
    knobRadius: number;
}

const RotaryPotWOLeds = (props: Props & Config) => {
    const { x, y, label, knobRadius, ctrlGroup, ctrl, ctrlIndex, valueIndex, resolution, silver, onValueIncrement } = props
    const labelY = knobRadius + 5

    const dispatch = useAppDispatch()

    const onIncrement = useCallback((steps: number, stepSize: number) => {
        if (onValueIncrement) {
            onValueIncrement(steps * stepSize)
        } else if (ctrl && ctrlGroup !== undefined) {
            dispatch(increment({ ctrlGroup, ctrl, value: steps * stepSize, valueIndex, ctrlIndex, source: ApiSource.UI }))
        }
    }, [ctrl, ctrlGroup, ctrlIndex, dispatch, valueIndex, onValueIncrement])

    return <svg x={x} y={y} className="pot">
        <RotaryPotBase
            knobRadius={knobRadius}
            onIncrement={onIncrement}
            resolution={resolution}
            silver={silver}
        />
        {label && <text x={0} y={labelY} className="pot-label" textAnchor="middle">{label}</text>}
    </svg>
}

export default RotaryPotWOLeds
