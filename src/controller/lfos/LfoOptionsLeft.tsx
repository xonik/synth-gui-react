import React from 'react'
import Button from '../Button'
import { useAppDispatch, useAppSelector } from '../../synthcore/hooks'
import { click } from '../../synthcore/modules/ui/uiReducer'
import { ApiSource, ControllerGroupIds } from '../../synthcore/types'
import { lfoCtrls } from '../../synthcore/modules/lfo/lfoControllers'
import { selectController } from '../../synthcore/modules/controllers/controllersReducer'
import './LfoOptions.scss'

interface Props {
    lfoId: number
}

const ctrlGroup = ControllerGroupIds.LFO

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const LfoOptionsLeft = ({ lfoId }: Props) => {

    const action = {
        ctrlGroup: ctrlGroup,
        ctrlIndex: lfoId,
        source: ApiSource.GUI,
        loop: true,
    }

    const dispatch = useAppDispatch()
    const invert = useAppSelector(selectController(lfoCtrls.INVERT, lfoId))
    const resetOnTrigger = useAppSelector(selectController(lfoCtrls.RESET_ON_TRIGGER, lfoId))
    const randomPhase = useAppSelector(selectController(lfoCtrls.RANDOM_PHASE, lfoId))
    const resetOnStop = useAppSelector(selectController(lfoCtrls.RESET_ON_STOP, lfoId))
    const resetLevelOnClock = useAppSelector(selectController(lfoCtrls.RESET_LEVEL_ON_CLOCK, lfoId))
    const syncToClock = useAppSelector(selectController(lfoCtrls.SYNC_TO_CLOCK, lfoId))
    const bipolar = useAppSelector(selectController(lfoCtrls.BIPOLAR, lfoId))

    const clickInvert = click({ ...action, ctrl: lfoCtrls.INVERT })
    const clickResetOnTrigger = click({ ...action, ctrl: lfoCtrls.RESET_ON_TRIGGER })
    const clickRandomPhase = click({ ...action, ctrl: lfoCtrls.RANDOM_PHASE })
    const clickResetOnStop = click({ ...action, ctrl: lfoCtrls.RESET_ON_STOP })
    const clickResetLevelOnClock = click({ ...action, ctrl: lfoCtrls.RESET_LEVEL_ON_CLOCK })
    const clickSyncToClock = click({ ...action, ctrl: lfoCtrls.SYNC_TO_CLOCK })
    const clickBipolar = click({ ...action, ctrl: lfoCtrls.BIPOLAR })

    return <div className="lfo-options">
        <div className="lfo-ctrl__heading">Params</div>
        <Button active={!!invert} onClick={() => dispatch(clickInvert)}>Invert</Button>
        <Button active={!!bipolar} onClick={() => dispatch(clickBipolar)}>Bipolar</Button>
        <Button active={!!randomPhase} onClick={() => dispatch(clickRandomPhase)}>
            Random phase
        </Button>
        <Button active={!!resetOnTrigger} onClick={() => dispatch(clickResetOnTrigger)}>Retrigger</Button>
        <Button active={!!syncToClock} onClick={() => dispatch(clickSyncToClock)}>Sync to clock</Button>
        <Button active={!!resetLevelOnClock} onClick={() => dispatch(clickResetLevelOnClock)}>Reset on
            clock</Button>
        <Button active={!!resetOnStop} onClick={() => dispatch(clickResetOnStop)}>Reset on stop</Button>
    </div>
}

export default LfoOptionsLeft