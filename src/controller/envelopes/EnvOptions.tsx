import React from 'react'
import { LoopMode, ReleaseMode, StageId } from '../../synthcore/modules/env/types'
import Button from '../Button'
import { useAppDispatch, useAppSelector } from '../../synthcore/hooks'
import {
    selectCurrStageId,
    selectEnvController,
    selectStageById,
} from '../../synthcore/modules/env/envReducer'
import { curveNames, loopModeNames, releaseModeNames } from './utils'
import './EnvOptions.scss'
import envControllers from '../../synthcore/modules/env/envControllers'
import { click } from '../../synthcore/modules/ui/uiReducer'
import { ApiSource, ControllerGroupIds } from '../../synthcore/types'

interface Props {
    envId: number
}

const getLoopLabel = (loopMode: LoopMode, loops: number) => `Loop ${loopMode === LoopMode.COUNTED ? loops + ' ' : ''} ${loopModeNames[loopMode]}`

const ctrlGroup = ControllerGroupIds.ENV

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const EnvOptions = ({ envId }: Props) => {

    const action = {
        ctrlGroup: ctrlGroup,
        ctrlIndex: envId,
        source: ApiSource.GUI,
        loop: true,
    }

    const dispatch = useAppDispatch()
    const releaseMode = useAppSelector(selectEnvController(envControllers(0).RELEASE_MODE, envId))
    const loopMode = useAppSelector(selectEnvController(envControllers(0).LOOP_MODE, envId))
    const loopEnabled = useAppSelector(selectEnvController(envControllers(0).LOOP, envId))
    const maxLoops = useAppSelector(selectEnvController(envControllers(0).MAX_LOOPS, envId))
    const invert = useAppSelector(selectEnvController(envControllers(0).INVERT, envId))
    const retrigger = useAppSelector(selectEnvController(envControllers(0).RESET_ON_TRIGGER, envId))
    const currStageId = useAppSelector(selectCurrStageId)
    const curve = useAppSelector(selectStageById(envId, currStageId)).curve


    const clickInvert = click({ ...action, ctrl: envControllers(0).INVERT })
    const clickRetrigger = click({ ...action, ctrl: envControllers(0).RESET_ON_TRIGGER })
    const clickReleaseMode = click({ ...action, ctrl: envControllers(0).RELEASE_MODE })
    const clickLoopMode = click({ ...action, ctrl: envControllers(0).LOOP_MODE })
    const clickLoopEnabled = click({ ...action, ctrl: envControllers(0).LOOP })

    const hasCurve = currStageId !== StageId.STOPPED && currStageId !== StageId.DELAY && currStageId !== StageId.SUSTAIN
    const curveLabel = hasCurve ? curveNames[curve] : '-'
    return <div className="env-options">
        <div className="env-ctrl__heading">Envelope {envId + 1}</div>
        <div className="env-ctrl__heading">{curveLabel}</div>
        <Button active={!!invert} onClick={() => dispatch(clickInvert)}>Invert</Button>
        <Button active={!!retrigger} onClick={() => dispatch(clickRetrigger)}>Retrigger</Button>
        <Button active={releaseMode !== ReleaseMode.NORMAL} onClick={() => dispatch(clickReleaseMode)}>
            {releaseModeNames[releaseMode]}
        </Button>
        <Button active={!!loopEnabled} onClick={() => dispatch(clickLoopMode)}>
            {getLoopLabel(loopMode, maxLoops)}
        </Button>
        <Button active={!!loopEnabled} onClick={() => dispatch(clickLoopEnabled)}>
            Loop
        </Button>

    </div>
}

export default EnvOptions