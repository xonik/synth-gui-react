import React from 'react'
import { StageId } from '../../synthcore/modules/env/types'
import Button from '../components/Button'
import { stageNames } from './utils'
import { useAppDispatch, useAppSelector } from '../../synthcore/hooks'
import { click } from '../../synthcore/modules/ui/uiReducer'
import { envCtrls } from '../../synthcore/modules/env/envControllers'
import { ApiSource, ControllerGroupIds } from '../../synthcore/types'
import { selectEnvStages } from '../../synthcore/modules/controllers/controllersReducer'
import { CtrlOptions } from "@/controller/components/CtrlOptions";

interface Props {
    envId: number
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const StageActivator = ({ envId }: Props) => {

    const dispatch = useAppDispatch()
    const stages = useAppSelector(selectEnvStages(envId))

    return <CtrlOptions>
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
    </CtrlOptions>
}

export default StageActivator