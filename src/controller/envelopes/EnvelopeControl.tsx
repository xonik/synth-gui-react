import React from 'react'
import { Curve, LoopMode, ReleaseMode, Stage, StageId, Envelope } from './types'
import Stages from './Stages'

interface Props {
    x: number
    y: number
    width: number
    height: number
}


const getDefaultEnvelope = (): Envelope => {

    const stages: Stage[] = [];
    stages.push({
        id: StageId.DELAY,
        enabled: false,
        curve: Curve.LIN,
        level: 0,
        time: 0,
    })
    stages.push({
        id: StageId.ATTACK,
        enabled: true,
        curve: Curve.LOG1,
        level: 0,
        time: 0.001,
    })
    stages.push({
        id: StageId.DECAY1,
        enabled: true,
        curve: Curve.LOG1,
        level: 1,
        time: 0.002,
    })
    stages.push({
        id: StageId.DECAY2,
        enabled: false,
        curve: Curve.LIN,
        level: 0.5,
        time: 0.001,
    })
    stages.push({
        id: StageId.SUSTAIN,
        enabled: true,
        curve: Curve.LIN,
        level: 0.5,
        time: 0,
    })
    stages.push({
        id: StageId.RELEASE1,
        enabled: false,
        curve: Curve.LOG1,
        level: 0.5,
        time: 0.001,
    })
    stages.push({
        id: StageId.RELEASE2,
        enabled: true,
        curve: Curve.LOG1,
        level: 0.5,
        time: 0.003,
    })
    stages.push({
        id: StageId.STOPPED,
        enabled: true,
        curve: Curve.LIN,
        level: 0,
        time: 0,
    })

    return {
        resetOnTrigger: false,
        resetLevel: 0,
        releaseMode: ReleaseMode.NORMAL,
        loopMode: LoopMode.OFF,
        maxLoops: 0,
        invert:false,
        stages,
        bipolar: true
    }
}

const hPadding = 10;
const vPadding = 10;

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const EnvelopeControl = ({ x, y, width, height}: Props) => {

    const env = getDefaultEnvelope();

    return <Stages
        x={x+hPadding} y={y+vPadding}
        height={height - 2 * vPadding} width={width - 2 * vPadding}
        env={env}/>
}

export default EnvelopeControl;