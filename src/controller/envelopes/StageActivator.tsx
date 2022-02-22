import React from 'react'
import { StageId } from '../../synthcore/modules/env/types'
import Button from '../Button'
import { stageNames } from './utils'
import { useAppDispatch, useAppSelector } from '../../synthcore/hooks'
import { selectStages } from '../../synthcore/modules/env/envReducer'
import './StageActivator.scss'
import { click } from '../../synthcore/modules/ui/uiReducer'
import { envCtrls } from '../../synthcore/modules/env/envControllers'
import { ApiSource, ControllerGroupIds } from '../../synthcore/types'

interface Props {
    envId: number
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const StageActivator = ({ envId }: Props) => {

    const dispatch = useAppDispatch()
    const stages = useAppSelector(selectStages(envId))

    return <div className="stage-activator">
        <div className ="env-ctrl__heading">Active</div>
        {stages.map((stage, index) => {
            if (stage.id === StageId.STOPPED) {
                return null
            }
            return <Button
                key={stage.id}
                active={stage.enabled === 1}
                onClick={() => dispatch(click({
                    ctrl: envCtrls.TOGGLE_STAGE,
                    ctrlGroup: ControllerGroupIds.ENV,
                    ctrlIndex: envId,
                    valueIndex: stage.id,
                    source: ApiSource.GUI
                }))}
            >{stageNames[stage.id]}</Button>
        })}
    </div>
}

export default StageActivator