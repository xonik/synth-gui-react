import React from 'react'
import { Envelope } from '../../forces/envelope/types'
import Button from '../Button'
import { useAppDispatch } from '../../forces/hooks'
import { toggleStageEnabled } from '../../forces/envelope/envelopesReducer'
import './EnvOptions.scss'

interface Props {
    env: Envelope
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const EnvOptions = ({ env }: Props) => {

    const dispatch = useAppDispatch()

    return <div className="env-options">
        <Button active={true} onClick={() => {}}>Invert</Button>
        <Button active={true} onClick={() => {}}>Retrigger</Button>
        <Button active={true} onClick={() => {}}><div>Release</div><div>mode</div></Button>
        <Button active={true} onClick={() => {}}><div>Loop</div><div>mode</div></Button>
    </div>
}

export default EnvOptions