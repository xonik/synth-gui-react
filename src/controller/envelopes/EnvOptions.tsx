import React from 'react'
import { Envelope, LoopMode, ReleaseMode } from '../../forces/envelope/types'
import Button from '../Button'
import { useAppDispatch, useAppSelector } from '../../forces/hooks'
import {
    selectCurrStageId,
    selectInvert,
    selectLoopMode,
    selectReleaseMode,
    selectRetrigger,
    toggleInvert,
    toggleLoopMode,
    toggleReleaseMode,
    toggleRetrigger
} from '../../forces/envelope/envelopesReducer'
import { curveNames, loopModeNames, releaseModeNames } from './utils'
import './EnvOptions.scss'

interface Props {
    env: Envelope
}

const getLoopLabel = (loopMode: LoopMode, loops: number) => `Loop ${loopMode === LoopMode.COUNTED ? loops + ' ': '' } ${loopModeNames[loopMode]}`

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const EnvOptions = ({ env }: Props) => {

    const dispatch = useAppDispatch()
    const releaseMode = useAppSelector(selectReleaseMode(env.id))
    const loopMode = useAppSelector(selectLoopMode(env.id))
    const currStageId = useAppSelector(selectCurrStageId)

    return <div className="env-options">
        <div className ="env-ctrl__heading">Envelope {env.id + 1}</div>
        <div className ="env-ctrl__heading">{curveNames[env.stages[currStageId].curve]}</div>
        <Button active={useAppSelector(selectInvert(env.id))} onClick={() => dispatch(toggleInvert({ env: env.id }))}>Invert</Button>
        <Button active={useAppSelector(selectRetrigger(env.id))} onClick={() => dispatch(toggleRetrigger({ env: env.id }))}>Retrigger</Button>
        <Button active={releaseMode !== ReleaseMode.NORMAL} onClick={() => dispatch(toggleReleaseMode({ env: env.id }))}>
            {releaseModeNames[releaseMode]}
        </Button>
        <Button active={loopMode !== LoopMode.OFF} onClick={() => dispatch(toggleLoopMode({ env: env.id }))}>
            {getLoopLabel(loopMode, env.maxLoops)}
        </Button>

    </div>
}

export default EnvOptions