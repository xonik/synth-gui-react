import RotaryPotBase from './RotaryPotBase'
import React, { useCallback, useEffect, useState } from 'react'
import { MidiConfig } from '../../midi/types'
import { sendCC, subscribe, unsubscribe } from '../../midi/midibus'
import { increment } from '../../synthcore/modules/ui/uiReducer'
import { useAppDispatch } from '../../synthcore/hooks'
import { ControllerGroupIds } from '../../synthcore/types'
import './RotaryPot.scss'

export interface Props {
    x: number,
    y: number,
    label?: string,
    midiConfig?: MidiConfig,
    ctrlGroup?: ControllerGroupIds;
    ctrlId?: number;
    ctrlIndex?: number
    resolution?: number
}

interface Config {
    knobRadius: number;
}

export default (props: Props & Config) => {
    const { x, y, label, knobRadius, midiConfig, ctrlGroup, ctrlId, ctrlIndex, resolution } = props
    const labelY = knobRadius + 5

    const [statePosition, setStatePosition] = useState(0);
    const localControl = ctrlGroup === null && ctrlId === null && ctrlIndex === null

    const dispatch = useAppDispatch()

    const onClick = useCallback(() => {
        if(midiConfig) {
            sendCC(midiConfig.cc, 0);
        }
    }, [midiConfig])

    // TODO: Remove once all functions go through redux store. Until then, pots without connection will send and receive midi
    // themselves.
    const sendMidi = useCallback((position: number) => {
        if(midiConfig){
            sendCC(midiConfig.cc, Math.round(127 * position));
        }
    }, [midiConfig]);

    const localIncrement = useCallback((steps: number, stepSize: number) => {
        const newPosition = statePosition + steps * stepSize;
        if(newPosition < 0){
            if(statePosition > 0){
                sendMidi(0);
            }
        } else if(newPosition > 1){
            if(statePosition < 1) {
                sendMidi(1);
            }
        } else if(newPosition !== statePosition){
            sendMidi(newPosition);
        }
    }, [sendMidi, statePosition])

    const onIncrement = useCallback((steps: number, stepSize: number) => {
        if(ctrlId !== undefined && ctrlGroup !== undefined) {
            dispatch(increment({ ctrlGroup, ctrlId, value: steps * stepSize, ctrlIndex }))
        }
    }, [ctrlGroup, ctrlId, ctrlIndex, dispatch])

    useEffect(() => {
        if(midiConfig) {
            const updateValueFromMidi = (midiValue: number) => {
                setStatePosition(midiValue / 127);
            }

            const subscriberId = subscribe(updateValueFromMidi, midiConfig)
            return function cleanup() {
                unsubscribe(midiConfig.cc, subscriberId);
            };
        }
    });

    return <svg x={x} y={y} className="pot">
        <RotaryPotBase
            knobRadius={knobRadius}
            onClick={onClick}
            onIncrement={localControl ? localIncrement : onIncrement}
            resolution={resolution}
        />
        {label && <text x={0} y={labelY} className="pot-label" textAnchor="middle">{label}</text>}
    </svg>
}