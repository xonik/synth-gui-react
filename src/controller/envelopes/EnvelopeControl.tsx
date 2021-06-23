import React from 'react'
import Stages from './Stages'
import { useAppSelector } from '../../forces/hooks'
import { selectEnvelope } from '../../forces/envelope/envelopesReducer'
import StageActivator from './StageActivator'
import EnvOptions from './EnvOptions'
import './EnvelopeControl.scss'

interface Props {
    x: number
    y: number
    width: number
    height: number
}

const vPadding = 5

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const EnvelopeControl = ({ x, y, width, height }: Props) => {

    const env = useAppSelector(selectEnvelope).envs[0]
    const stagesWidth = 110;
    const stagesHeight = height - 2 * vPadding;

    return <div className="env-ctrl">
        <StageActivator env={env}/>
        <svg x={x} y={y} width={`${stagesWidth/10}cm`} height={`${stagesHeight/10}cm`} viewBox={`0 0 ${stagesWidth} ${stagesHeight}`} className="env-ctrl-stages">
            <Stages
                x={0} y={0}
                height={stagesHeight} width={stagesWidth}
                env={env}/>
        </svg>
        <EnvOptions env={env}/>
    </div>
}

export default EnvelopeControl