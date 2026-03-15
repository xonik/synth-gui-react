import React from 'react'
import { LoopMode, } from '../../synthcore/modules/lfo/types'
import Button from '../components/Button'
import { useAppDispatch, useAppSelector } from '../../synthcore/hooks'
import { loopModeNames } from './utils'
import { click } from '../../synthcore/modules/ui/uiReducer'
import { ApiSource, ControllerGroupIds } from '../../synthcore/types'
import { lfoCtrls } from '../../synthcore/modules/lfo/lfoControllers'
import { selectController } from '../../synthcore/modules/controllers/controllersReducer'
import { CtrlOptions } from '../components/CtrlOptions'

interface Props {
    lfoId: number
}

const getLoopLabel = (loopMode: LoopMode, loops: number) => `Loop ${loopMode === LoopMode.COUNTED ? loops + ' ' : ''} ${loopModeNames[loopMode]}`

const ctrlGroup = ControllerGroupIds.LFO

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const LfoOptionsRight = ({ lfoId }: Props) => {

    const action = {
        ctrlGroup: ctrlGroup,
        ctrlIndex: lfoId,
        source: ApiSource.GUI,
        loop: true,
    }

    const dispatch = useAppDispatch()
    const loopMode = useAppSelector(selectController(lfoCtrls.LOOP_MODE, lfoId))
    const loopEnabled = useAppSelector(selectController(lfoCtrls.LOOP, lfoId))
    const maxLoops = useAppSelector(selectController(lfoCtrls.MAX_LOOPS, lfoId))

    const clickLoopMode = click({ ...action, ctrl: lfoCtrls.LOOP_MODE })
    const clickLoopEnabled = click({ ...action, ctrl: lfoCtrls.LOOP })

    return <CtrlOptions heading={"Looping"} separator>
        <Button active={!!loopEnabled} onClick={() => dispatch(clickLoopEnabled)}>
            Loop
        </Button>
        <Button active={!!loopEnabled} onClick={() => dispatch(clickLoopMode)}>
            {getLoopLabel(loopMode, maxLoops)}
        </Button>
    </CtrlOptions>
}

export default LfoOptionsRight