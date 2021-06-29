import React from 'react'
import { Envelope, StageId } from '../../forces/envelope/types'
import classNames from 'classnames'
import { stageNames } from './utils'
import './StageNames.scss'

interface Props {
    className?: string
    env: Envelope
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const StageNames = ({ env, className }: Props) => {
    return <div className={classNames('stage-names', className)}>
        {env.stages.filter((stage) => stage.enabled && stage.id !== StageId.STOPPED).map((stage) => {
            return <div key={stage.id} className="env-ctrl__heading">
                {stageNames[stage.id]}
            </div>
        })}
    </div>
}

export default StageNames
