import React from 'react'
import { Envelope, LoopMode, ReleaseMode } from '../../forces/envelope/types'
import Button from '../Button'
import { useAppDispatch, useAppSelector } from '../../forces/hooks'
import { selectInvert, selectLoopMode, selectReleaseMode, selectRetrigger, toggleInvert, toggleLoopMode, toggleReleaseMode, toggleRetrigger } from '../../forces/envelope/envelopesReducer'
import { loopModeNames, releaseModeNames } from './utils'
import './EnvOptions.scss'

interface Props {
    env: Envelope
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const EnvOptions = ({ env }: Props) => {

    const dispatch = useAppDispatch()
    const releaseMode = useAppSelector(selectReleaseMode(env.id))
    const loopMode = useAppSelector(selectLoopMode(env.id))

    return <div className="env-options">
        <div className ="env-ctrl__heading">Envelope {env.id + 1}</div>
        <Button active={useAppSelector(selectInvert(env.id))} onClick={() => dispatch(toggleInvert({ env: env.id }))}>Invert</Button>
        <Button active={useAppSelector(selectRetrigger(env.id))} onClick={() => dispatch(toggleRetrigger({ env: env.id }))}>Retrigger</Button>
        <Button active={releaseMode !== ReleaseMode.NORMAL} onClick={() => dispatch(toggleReleaseMode({ env: env.id }))}>
            {releaseModeNames[releaseMode]}
        </Button>
        <Button active={loopMode !== LoopMode.OFF} onClick={() => dispatch(toggleLoopMode({ env: env.id }))}>
            <div>Loop</div>
            <div>{loopModeNames[loopMode]}</div>
        </Button>

    </div>
}

export default EnvOptions