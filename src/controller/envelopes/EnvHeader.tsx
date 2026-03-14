import React from 'react'
import { StageId } from '../../synthcore/modules/env/types'
import { stageNames } from './utils'
import { useAppSelector } from '../../synthcore/hooks'
import { selectEnvStages } from '../../synthcore/modules/controllers/controllersReducer'

interface Props {
    envId: number
}

const EnvHeader = ({ envId }: Props) => {
    const stages = useAppSelector(selectEnvStages(envId))
    return <div className="ctrl-header">
        <div className="ctrl-header__label ctrl-header__label--left">Envelope {envId + 1}</div>
        <div className="ctrl-header__stages">
            {stages.filter((stage) => stage.enabled && stage.id !== StageId.STOPPED).map((stage) => {
                return <div key={stage.id} className="ctrl-header__stages__label">
                    {stageNames[stage.id]}
                </div>
            })}
        </div>
        <div className="ctrl-header__label ctrl-header__label--right">Active</div>
    </div>
}

export default EnvHeader

