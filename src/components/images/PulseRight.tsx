import React from 'react'
import { IconProps } from "./types";
import { WaveformIcon } from "./WaveformIcon";
import './Waveform.scss'

export const PulseRight = (props: IconProps) => {

    const { height, width } = props
    const path = `M 0 ${height} L ${0} ${0} L ${width - width / 4} 0 L ${width - width / 4} ${height} L ${width} ${height} L ${width} 0`

    return <WaveformIcon {...props} path={path}/>
}