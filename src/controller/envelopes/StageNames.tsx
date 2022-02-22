import React from 'react'
import { Envelope, StageId } from '../../synthcore/modules/env/types'
import classNames from 'classnames'
import { stageNames } from './utils'
import './StageNames.scss'
import { useAppSelector } from '../../synthcore/hooks'
import { selectStages } from '../../synthcore/modules/env/envReducer'

interface Props {
    className?: string
    envId: number
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const StageNames = ({ envId, className }: Props) => {
    const stages = useAppSelector(selectStages(envId))
    return <div className={classNames('stage-names', className)}>
        {stages.filter((stage) => stage.enabled && stage.id !== StageId.STOPPED).map((stage) => {
            return <div key={stage.id} className="env-ctrl__heading">
                {stageNames[stage.id]}
            </div>
        })}
    </div>
}

export default StageNames
