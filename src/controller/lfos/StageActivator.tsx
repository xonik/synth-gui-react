import React from 'react'
import { StageId } from '../../synthcore/modules/lfo/types'
import Button from '../Button'
import { stageNames } from './utils'
import { useAppDispatch, useAppSelector } from '../../synthcore/hooks'
import './StageActivator.scss'
import { click } from '../../synthcore/modules/ui/uiReducer'
import { lfoCtrls } from '../../synthcore/modules/lfo/lfoControllers'
import { ApiSource, ControllerGroupIds } from '../../synthcore/types'
import { selectLfoStages } from '../../synthcore/modules/controllers/controllersReducer'

interface Props {
    lfoId: number
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const StageActivator = ({ lfoId }: Props) => {

    const dispatch = useAppDispatch()
    const stages = useAppSelector(selectLfoStages(lfoId))

    return <div className="stage-activator">
        <div className ="lfo-ctrl__heading">Active</div>
        {stages.map((stage, index) => {
            if (stage.id === StageId.STOPPED) {
                return null
            }
            return <Button
                key={stage.id}
                active={stage.enabled === 1}
                onClick={() => dispatch(click({
                    ctrl: lfoCtrls.TOGGLE_STAGE,
                    ctrlGroup: ControllerGroupIds.LFO,
                    ctrlIndex: lfoId,
                    valueIndex: stage.id,
                    source: ApiSource.GUI
                }))}
            >{stageNames[stage.id]}</Button>
        })}
    </div>
}

export default StageActivator