import React from 'react'
import Stages from './Stages'
import { useAppSelector } from '../../forces/hooks'
import { selectCurrEnvId, selectEnvelope, selectEnvelopes } from '../../forces/envelope/envelopesReducer'
import StageActivator from './StageActivator'
import EnvOptions from './EnvOptions'
import StageParams from './StageParams'
import StageNames from './StageNames'
import './EnvelopeControl.scss'

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const EnvelopeControl = () => {

    const envId = useAppSelector(selectCurrEnvId)
    const env = useAppSelector(selectEnvelope(envId))

    return <div className="env-ctrl">
        <EnvOptions env={env}/>
        <div className="env-ctrl-stages">
            <StageNames env={env}/>
            <div className="env-ctrl-graph">
                <svg viewBox={`0 0 1 1`} preserveAspectRatio="none" className="env-ctrl-graph-svg">
                    <Stages env={env}/>
                </svg>
            </div>
            <StageParams env={env}/>
        </div>
        <StageActivator env={env}/>

    </div>
}

export default EnvelopeControl