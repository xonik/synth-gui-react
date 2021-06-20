import React from 'react'
import { Stage, StageId } from '../../forces/envelope/types'
import './StageParams.scss'

interface Props {
    stage: Stage
    x: number
    y: number
    width: number
    height: number
}

const formatTime = (time: number) => {
    const timeMillis = Math.floor(65534 * time) + 1;
    if(timeMillis < 500){
        return `${timeMillis}ms`;
    } else if(timeMillis < 20000) {
        return `${Math.floor(timeMillis / 10) / 100}s`;
    } else {
        const seconds = Math.floor(timeMillis / 1000)
        return `${seconds}s`;
    }
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const StageParams = ({ x, y, width, height, stage }: Props) => {
    return <svg x={x} y={y} className="stage-params">
        <rect width={width} height={height} className="stage-params"/>
        {stage.id !== StageId.SUSTAIN && <text
            x={width / 2}
            y={5}
            className="stage-params-time"
            textAnchor="middle"
            alignmentBaseline="middle"
        >{formatTime(stage.time)}</text>}
    </svg>
}

export default StageParams