import RotaryPotBase from './RotaryPotBase'
import React from 'react'
import './RotaryPot.scss'

export interface Props {
    x: number,
    y: number,
    label?: string,
}

interface Config {
    knobRadius: number;
}

export default (props: Props & Config) => {
    const { x, y, label, knobRadius } = props
    const labelY = knobRadius + 5

    return <svg x={x} y={y} className="pot">
        <RotaryPotBase knobRadius={knobRadius}/>
        {label && <text x={0} y={labelY} className="pot-label" textAnchor="middle">{label}</text>}
    </svg>
}