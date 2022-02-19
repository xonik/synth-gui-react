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
    ctrlGroup: ControllerGroupIds;
    ctrl: ControllerConfig
    ctrlIndex?: number
    resolution?: number
}

interface Config {
    knobRadius: number;
}

const RotaryPotWOLeds = (props: Props & Config) => {
    const { x, y, label, knobRadius, ctrlGroup, ctrl, ctrlIndex, resolution } = props
    const labelY = knobRadius + 5

    const dispatch = useAppDispatch()

    const onIncrement = useCallback((steps: number, stepSize: number) => {
        dispatch(increment({ ctrlGroup, ctrl, value: steps * stepSize, ctrlIndex, source: ApiSource.UI }))
    }, [ctrl, ctrlGroup, ctrlIndex, dispatch])

    return <svg x={x} y={y} className="pot">
        <RotaryPotBase
            knobRadius={knobRadius}
            onIncrement={onIncrement}
            resolution={resolution}
        />
        {label && <text x={0} y={labelY} className="pot-label" textAnchor="middle">{label}</text>}
    </svg>
}

export default RotaryPotWOLeds