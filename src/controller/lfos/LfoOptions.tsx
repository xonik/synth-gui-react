import React from 'react'
import { LoopMode, ReleaseMode, StageId } from '../../synthcore/modules/lfo/types'
import Button from '../Button'
import { useAppDispatch, useAppSelector } from '../../synthcore/hooks'
import {
    selectCurrGuiStageId,
} from '../../synthcore/modules/lfo/lfoReducer'
import { curveNames, loopModeNames, releaseModeNames } from './utils'
import './LfoOptions.scss'
import { click } from '../../synthcore/modules/ui/uiReducer'
import { ApiSource, ControllerGroupIds } from '../../synthcore/types'
import { lfoCtrls } from '../../synthcore/modules/lfo/lfoControllers'
import { selectController, selectEnvStageById } from '../../synthcore/modules/controllers/controllersReducer'

interface Props {
    lfoId: number
}

const getLoopLabel = (loopMode: LoopMode, loops: number) => `Loop ${loopMode === LoopMode.COUNTED ? loops + ' ' : ''} ${loopModeNames[loopMode]}`

const ctrlGroup = ControllerGroupIds.LFO

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const LfoOptions = ({ lfoId }: Props) => {

    const action = {
        ctrlGroup: ctrlGroup,
        ctrlIndex: lfoId,
        source: ApiSource.GUI,
        loop: true,
    }

    const dispatch = useAppDispatch()
    const releaseMode = useAppSelector(selectController(lfoCtrls.RELEASE_MODE, lfoId))
    const loopMode = useAppSelector(selectController(lfoCtrls.LOOP_MODE, lfoId))
    const loopEnabled = useAppSelector(selectController(lfoCtrls.LOOP, lfoId))
    const maxLoops = useAppSelector(selectController(lfoCtrls.MAX_LOOPS, lfoId))
    const invert = useAppSelector(selectController(lfoCtrls.INVERT, lfoId))
    const retrigger = useAppSelector(selectController(lfoCtrls.RESET_ON_TRIGGER, lfoId))
    const currStageId = useAppSelector(selectCurrGuiStageId)
    const curve = useAppSelector(selectEnvStageById(lfoId, currStageId)).curve


    const clickInvert = click({ ...action, ctrl: lfoCtrls.INVERT })
    const clickRetrigger = click({ ...action, ctrl: lfoCtrls.RESET_ON_TRIGGER })
    const clickReleaseMode = click({ ...action, ctrl: lfoCtrls.RELEASE_MODE })
    const clickLoopMode = click({ ...action, ctrl: lfoCtrls.LOOP_MODE })
    const clickLoopEnabled = click({ ...action, ctrl: lfoCtrls.LOOP })

    const hasCurve = currStageId === StageId.ATTACK || currStageId === StageId.DECAY
    const curveLabel = hasCurve ? curveNames[curve] : '-'
    return <div className="lfo-options">
        <div className="lfo-ctrl__heading">Lfoelope {lfoId + 1}</div>
        <div className="lfo-ctrl__heading">{curveLabel}</div>
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

export default LfoOptions