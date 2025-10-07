import React from 'react'

type Props = {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const Square = ({x, y, width, height}: Props) => {

    const data = `M 0 ${height} L ${0} ${0} L ${width / 2} 0 L ${width / 2} ${height} L ${width} ${height} L ${width} 0`

    return <svg x={x} y={y} className="waveform">
        <path d={data} className="waveform-path" strokeWidth={1} fill="none" stroke="black"/>
    </svg>
}