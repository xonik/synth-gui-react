import RotaryPotBase from './RotaryPotBase'
import React, { useCallback } from 'react'
import { MidiConfig } from '../../midi/midiControllers'
import { sendCC } from '../../midi/midibus'
import { ControllerGroupIds, EnvControllerId } from '../../forces/synthcore/controllers'
import './RotaryPot.scss'

export interface Props {
    x: number,
    y: number,
    label?: string,
    midiConfig?: MidiConfig,
    ctrlGroup?: ControllerGroupIds;
    ctrlId?: EnvControllerId;
    ctrlIndex?: number
}

interface Config {
    knobRadius: number;
}

export default (props: Props & Config) => {
    const { x, y, label, knobRadius, midiConfig } = props
    const labelY = knobRadius + 5

    const onClick = useCallback(() => {
        if(midiConfig) {
            sendCC(midiConfig.cc, 0);
        }
    }, [midiConfig])

    return <svg x={x} y={y} className="pot">
        <RotaryPotBase knobRadius={knobRadius} onClick={onClick}/>
        {label && <text x={0} y={labelY} className="pot-label" textAnchor="middle">{label}</text>}
    </svg>
}