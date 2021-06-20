import React from 'react'
import Stages from './Stages'
import { useAppSelector } from '../../forces/hooks'
import { selectEnvelope } from '../../forces/envelope/envelopesReducer'
import StageActivator from './StageActivator'

interface Props {
    x: number
    y: number
    width: number
    height: number
}

const hPadding = 5
const vPadding = 5

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const EnvelopeControl = ({ x, y, width, height }: Props) => {

    const env = useAppSelector(selectEnvelope).envs[0]
    const stageActivatorWidth = 25;
    const internalHPadding = hPadding;
    const stagesWidth = width - 2 * hPadding - stageActivatorWidth - internalHPadding;
    const stagesHeight = height - 2 * vPadding;
    const stagesX = hPadding + stageActivatorWidth + internalHPadding;

    return <svg x={x} y={y} width={`${width/10}cm`} height={`${height/10}cm`} viewBox={`0 0 ${width} ${height}`}>
        <StageActivator env={env} x={hPadding} y={vPadding} width={stageActivatorWidth} height={stagesHeight}/>
        <Stages
            x={stagesX} y={vPadding}
            height={stagesHeight} width={stagesWidth}
            env={env}/>
    </svg>
}

export default EnvelopeControl