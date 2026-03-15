import React from 'react'
import { StageId } from '../../synthcore/modules/lfo/types'
import Button from '../components/Button'
import { stageNames } from './utils'
import { useAppDispatch, useAppSelector } from '../../synthcore/hooks'
import { click } from '../../synthcore/modules/ui/uiReducer'
import { lfoCtrls } from '../../synthcore/modules/lfo/lfoControllers'
import { ApiSource, ControllerGroupIds } from '../../synthcore/types'
import { selectLfoStages } from '../../synthcore/modules/controllers/controllersReducer'
import { CtrlOptions } from "@/controller/components/CtrlOptions";

interface Props {
    lfoId: number
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const StageActivator = ({ lfoId }: Props) => {

    const dispatch = useAppDispatch()
    const stages = useAppSelector(selectLfoStages(lfoId))

    return <CtrlOptions>
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
    </CtrlOptions>
}

export default StageActivator