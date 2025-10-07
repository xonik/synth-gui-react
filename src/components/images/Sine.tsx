import React from 'react'
import { IconProps } from "./types";
import { WaveformIcon } from "./WaveformIcon";
import './Waveform.scss'


export const Sine = (props: IconProps) => {

    const { height, width } = props

    // https://math.stackexchange.com/questions/4235124/getting-the-most-accurate-bezier-curve-that-plots-a-sine-wave
    const handleXStart = width * 3 / (2*Math.PI)
    const handleXEnd = width * (2 * Math.PI - 3) / (2 * Math.PI)
    /*
        width * (
            (1  - 3 / (2 * Math.PI))
        )
     */
    const handleYStart = height / 2 + 3 * height * (- 2 * Math.sqrt(3)) / (2*Math.PI)
    /*
        height / 2 + 3 * height * (-Math.sqrt(3)) / (Math.PI)
     */
    const handleYEnd = (height * (1 + 6 * (Math.sqrt(3)) / (Math.PI))) / 2

    const start = [0, height / 2]
    const end = [width, height / 2]

    const path = `M ${start.join(' ')} C ${handleXStart} ${handleYStart} ${handleXEnd} ${handleYEnd} ${end.join(' ')}`

    return <WaveformIcon {...props} path={path}/>
}