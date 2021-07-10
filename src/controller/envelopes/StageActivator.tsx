import React from 'react'
import { Envelope, StageId } from '../../synthcore/modules/env/types'
import Button from '../Button'
import { stageNames } from './utils'
import { useAppDispatch } from '../../synthcore/hooks'
import { toggleStageEnabled } from '../../synthcore/modules/env/envelopesReducer'
import './StageActivator.scss'

interface Props {
    env: Envelope
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const StageActivator = ({ env }: Props) => {

    const dispatch = useAppDispatch()

    return <div className="stage-activator">
        <div className ="env-ctrl__heading">Active</div>
        {env.stages.map((stage, index) => {
            if (stage.id === StageId.STOPPED) {
                return null
            }
            return <Button
                key={stage.id}
                active={stage.enabled}
                onClick={() => dispatch(toggleStageEnabled({ env: env.id, stage: stage.id }))}
            >{stageNames[stage.id]}</Button>
        })}
    </div>
}

export default StageActivator