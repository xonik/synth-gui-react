import React from 'react'
import { WaveformIcon } from "./WaveformIcon";
import { IconProps } from "./types";
import './Waveform.scss'

export const SawRight = (props: IconProps) => {

    const { height, width } = props
    const path = `M 0 ${height} L ${width} ${0} L ${width} ${height}`

    return <WaveformIcon {...props} path={path}/>
}