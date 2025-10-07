import React from 'react'

type Props = {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const Sine = ({x, y, width, height}: Props) => {

    // https://math.stackexchange.com/questions/4235124/getting-the-most-accurate-bezier-curve-that-plots-a-sine-wave
    const handleXStart = width * 3 / (2*Math.PI)
    const handleXEnd = width * (2 * Math.PI - 3) / (2 * Math.PI)
    const handleYStart = height / 2 + 3 * height * (- 2 * Math.sqrt(3)) / (2*Math.PI)
    const handleYEnd = height / 2 + 3 * height * (2 * Math.sqrt(3)) / (2*Math.PI)

    const start = [0, height / 2]
    const end = [width, height / 2]

    const data = `M ${start.join(' ')} C ${handleXStart} ${handleYStart} ${handleXEnd} ${handleYEnd} ${end.join(' ')}`

    return <svg x={x} y={y} className="waveform">
        <path d={data} className="waveform-path" strokeWidth={1} fill="none" stroke="black"/>
    </svg>
}