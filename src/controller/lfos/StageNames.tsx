import React from 'react'
import { StageId } from '../../synthcore/modules/lfo/types'
import classNames from 'classnames'
import { stageNames } from './utils'
import { useAppSelector } from '../../synthcore/hooks'
import { selectLfoStages } from '../../synthcore/modules/controllers/controllersReducer'
import './StageNames.scss'

interface Props {
    className?: string
    lfoId: number
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const StageNames = ({ lfoId, className }: Props) => {
    const stages = useAppSelector(selectLfoStages(lfoId))
    return <div className={classNames('stage-names', className)}>
        {stages.filter((stage) => stage.enabled && stage.id !== StageId.STOPPED).map((stage) => {
            return <div key={stage.id} className="lfo-ctrl__heading">
                {stageNames[stage.id]}
            </div>
        })}
    </div>
}

export default StageNames
