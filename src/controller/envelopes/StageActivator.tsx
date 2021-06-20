import React from 'react'
import { Envelope, StageId } from '../../forces/envelope/types'
import Button from '../Button'
import './StageParams.scss'
import { stageNames } from './utils'

interface Props {
    env: Envelope
    x: number
    y: number
    width: number
    height: number
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const StageActivator = ({ x, y, width, height, env }: Props) => {
    return <svg x={x} y={y} className="stage-params">
        {env.stages.map((stage, index) => {
            if(stage.id === StageId.STOPPED) return null;
            return <Button
                x={0} y={(height / 8) * index}
                width={width} height={height / 8 -2}
                label={stageNames[stage.id]}
                active={stage.enabled}
                onClick={() => {}}
            />
        })}
    </svg>
}

export default StageActivator