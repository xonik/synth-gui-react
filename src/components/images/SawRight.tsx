import React from 'react'

type Props = {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const SawRight = ({x, y, width, height}: Props) => {

    const data = `M 0 ${height} L ${width} ${0} L ${width} ${height}`

    return <svg x={x} y={y} className="waveform">
        <path d={data} className="waveform-path" strokeWidth={1} fill="none" stroke="black"/>
    </svg>
}