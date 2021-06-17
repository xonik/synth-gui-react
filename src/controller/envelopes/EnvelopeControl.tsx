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
        level: 0.25,
        time: 0.003,
    })
    stages.push({
        id: StageId.STOPPED,
        enabled: true,
        curve: Curve.LIN,
        level: 0,
        time: 0,
    })

    const env = {
        resetOnTrigger: false,
        resetLevel: 0,
        releaseMode: ReleaseMode.NORMAL,
        loopMode: LoopMode.OFF,
        maxLoops: 0,
        invert:false,
        stages,
        bipolar: true
    }

    setInvert(env, false);
    return env;
}

// TODO: Make env immutable
const updateReleaseLevels =  (env: Envelope) => {
    if(env.stages[StageId.RELEASE1].enabled) {
        env.stages[StageId.RELEASE1].level = env.stages[StageId.SUSTAIN].level;
    } else {
        env.stages[StageId.RELEASE2].level = env.stages[StageId.SUSTAIN].level;
    }
}

// TODO: Make env immutable
const setLevel = (env: Envelope, stage: StageId, value: number) => {
    if(
        stage === StageId.DECAY2 ||
        stage === StageId.SUSTAIN ||
        (stage === StageId.RELEASE2 && env.stages[StageId.RELEASE1].enabled)
    ){
        env.stages[stage].level = value;

        // sustain level is not used directly. Instead it replaces r1 or r2 level depending on if
        // r1 is enabled or not.
        if(stage === StageId.SUSTAIN) {
            updateReleaseLevels(env);
        }
    }
}

// TODO: Make env immutable
const enableDisableStage = (env: Envelope, stage: StageId, enabled: boolean) => {
    if(stage === StageId.ATTACK || stage === StageId.RELEASE2){
        return;
    }
    env.stages[stage].enabled = enabled;
    if(stage === StageId.RELEASE1){
        updateReleaseLevels(env);
    }
}

// TODO: Make env immutable
const setInvert = (env: Envelope, invert: boolean) => {
    env.invert = invert;
    const resetLevel = invert ? 1 : 0;

    env.stages[StageId.DELAY].level = resetLevel;
    env.stages[StageId.ATTACK].level = resetLevel;
    env.stages[StageId.DECAY1].level = invert ? 0 : 1;
    env.stages[StageId.STOPPED].level = resetLevel;
}

const setTime = (env: Envelope, stage: StageId, value: number) =>{
    env.stages[stage].time = value;
}

const setCurve = (env: Envelope, stage: StageId, curve: Curve) => {
    env.stages[stage].curve = curve;
}

const setReleaseMode = (env: Envelope, releaseMode: ReleaseMode) => {
    env.releaseMode = releaseMode;
}

const setResetToZeroOnTrigger = (env: Envelope, resetToZero: boolean) => {
    env.resetOnTrigger = resetToZero;
}

const setLoopMode = (env: Envelope, loopMode: LoopMode) => {
    env.loopMode = loopMode;
}

const setMaxLoops = (env: Envelope, loops: number) => {
    env.maxLoops = loops;
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