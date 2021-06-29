import RotaryPotBase from './RotaryPotBase'
import React, { useCallback } from 'react'
import { MidiConfig } from '../../midi/midiControllers'
import { sendCC } from '../../midi/midibus'
import { ControllerGroupIds, EnvControllerId } from '../../forces/synthcore/controllers'
import './RotaryPot.scss'
import { increment } from '../../forces/controller/controllerReducer'
import { useAppDispatch } from '../../forces/hooks'
import RotaryPotBaseLocalControl from './RotaryPotBaseLocalControl'

export interface Props {
    x: number,
    y: number,
    label?: string,
    midiConfig?: MidiConfig,
    ctrlGroup?: ControllerGroupIds;
    ctrlId?: number;
    ctrlIndex?: number
}

interface Config {
    knobRadius: number;
}

export default (props: Props & Config) => {
    const { x, y, label, knobRadius, midiConfig, ctrlGroup, ctrlId, ctrlIndex } = props
    const labelY = knobRadius + 5

    const dispatch = useAppDispatch()

    const onClick = useCallback(() => {
        if(midiConfig) {
            sendCC(midiConfig.cc, 0);
        }
    }, [midiConfig])

    const positionUpdated = useCallback((newPosition) => {
        if(midiConfig){
            sendCC(midiConfig.cc, Math.round(127 * newPosition));
        }
        if(ctrlId !== undefined && ctrlGroup !== undefined) {
            dispatch(increment({ctrlGroup, ctrlId, value: newPosition, ctrlIndex}))
        }
    }, [midiConfig, ctrlGroup, ctrlId, dispatch, ctrlIndex])

    return <svg x={x} y={y} className="pot">
        <RotaryPotBaseLocalControl knobRadius={knobRadius} onClick={onClick} onPositionChange={positionUpdated}/>
        {label && <text x={0} y={labelY} className="pot-label" textAnchor="middle">{label}</text>}
    </svg>
}