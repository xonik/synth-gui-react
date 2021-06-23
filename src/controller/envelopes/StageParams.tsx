import React from 'react'
import { Envelope } from '../../forces/envelope/types'
import './StageParams.scss'

interface Props {
    env: Envelope
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
const StageParams = ({ env }: Props) => {
    return <div className="stage-params">
        {env.stages.filter((stage) => stage.enabled).map((stage) => {
            return <div className="stage-params-item">
                {formatTime(stage.time)}
            </div>
        })}
    </div>
}

export default StageParams