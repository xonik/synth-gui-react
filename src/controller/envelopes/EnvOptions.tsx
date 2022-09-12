import React from 'react'
import { LoopMode, ReleaseMode, StageId } from '../../synthcore/modules/env/types'
import Button from '../Button'
import { useAppDispatch, useAppSelector } from '../../synthcore/hooks'
import {
    selectCurrStageId,
} from '../../synthcore/modules/env/envReducer'
import { curveNames, loopModeNames, releaseModeNames } from './utils'
import './EnvOptions.scss'
import { click } from '../../synthcore/modules/ui/uiReducer'
import { ApiSource, ControllerGroupIds } from '../../synthcore/types'
import { envCtrls } from '../../synthcore/modules/env/envControllers'
import { selectController, selectEnvStageById } from '../../synthcore/modules/controllers/controllersReducer'

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
    const releaseMode = useAppSelector(selectController(envCtrls.RELEASE_MODE, envId))
    const loopMode = useAppSelector(selectController(envCtrls.LOOP_MODE, envId))
    const loopEnabled = useAppSelector(selectController(envCtrls.LOOP, envId))
    const maxLoops = useAppSelector(selectController(envCtrls.MAX_LOOPS, envId))
    const invert = useAppSelector(selectController(envCtrls.INVERT, envId))
    const retrigger = useAppSelector(selectController(envCtrls.RESET_ON_TRIGGER, envId))
    const currStageId = useAppSelector(selectCurrStageId)
    const curve = useAppSelector(selectEnvStageById(envId, currStageId)).curve


    const clickInvert = click({ ...action, ctrl: envCtrls.INVERT })
    const clickRetrigger = click({ ...action, ctrl: envCtrls.RESET_ON_TRIGGER })
    const clickReleaseMode = click({ ...action, ctrl: envCtrls.RELEASE_MODE })
    const clickLoopMode = click({ ...action, ctrl: envCtrls.LOOP_MODE })
    const clickLoopEnabled = click({ ...action, ctrl: envCtrls.LOOP })

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