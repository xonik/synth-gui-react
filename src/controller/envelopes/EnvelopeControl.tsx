import React from 'react'
import Stages from './Stages'
import { useAppSelector } from '../../forces/hooks'
import { selectEnvelope } from '../../forces/envelope/envelopesReducer'

interface Props {
    x: number
    y: number
    width: number
    height: number
}

const hPadding = 10;
const vPadding = 10;

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const EnvelopeControl = ({ x, y, width, height}: Props) => {

    const env = useAppSelector(selectEnvelope);

    return <Stages
        x={x+hPadding} y={y+vPadding}
        height={height - 2 * vPadding} width={width - 2 * vPadding}
        env={env}/>
}

export default EnvelopeControl;