import React from 'react'

type Props = {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const PulseWidth = ({x, y, width, height}: Props) => {

    const data = `M 0 ${height} L ${0} ${0} L ${width / 4} 0 L ${width / 4} ${height} L ${width} ${height} L ${width} 0`

    return <svg x={x} y={y} className="waveform">
        <path d={data} className="waveform-path" strokeWidth={1} fill="none" stroke="black"/>
    </svg>
}