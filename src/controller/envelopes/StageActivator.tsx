import React from 'react'
import { Envelope, StageId } from '../../forces/envelope/types'
import Button from '../Button'
import { stageNames } from './utils'
import { useAppDispatch } from '../../forces/hooks'
import { toggleStageEnabled } from '../../forces/envelope/envelopesReducer'
import './StageActivator.scss'

interface Props {
    env: Envelope
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const StageActivator = ({ env }: Props) => {

    const dispatch = useAppDispatch()

    return <div className="stage-activator">
        {env.stages.map((stage, index) => {
            if (stage.id === StageId.STOPPED) {
                return null
            }
            return <Button
                active={stage.enabled}
                onClick={() => dispatch(toggleStageEnabled({ env: env.id, stage: stage.id }))}
            >{stageNames[stage.id]}</Button>
        })}
    </div>
}

export default StageActivator