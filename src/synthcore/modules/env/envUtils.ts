import { Curve, Envelope, Stage, StageId } from './types'

export const getDefaultEnvelope = (id: number): Envelope => {

    const stages: Stage[] = [];
    stages.push({
        id: StageId.DELAY,
        enabled: 0,
        curve: Curve.LIN,
        level: 0,
        time: 0,
    })
    stages.push({
        id: StageId.ATTACK,
        enabled: 1,
        curve: Curve.LOG1,
        level: 0,
        time: 0.001,
    })
    stages.push({
        id: StageId.DECAY1,
        enabled: 1,
        curve: Curve.LOG1,
        level: 1,
        time: 0.5,
    })
    stages.push({
        id: StageId.DECAY2,
        enabled: 0,
        curve: Curve.LIN,
        level: 0.5,
        time: 0.001,
    })
    stages.push({
        id: StageId.SUSTAIN,
        enabled: 1,
        curve: Curve.LIN,
        level: 0.5,
        time: 0,
    })
    stages.push({
        id: StageId.RELEASE1,
        enabled: 0,
        curve: Curve.LOG1,
        level: 0.5,
        time: 0.001,
    })
    stages.push({
        id: StageId.RELEASE2,
        enabled: 1,
        curve: Curve.LOG1,
        level: 0.25,
        time: 0.003,
    })
    stages.push({
        id: StageId.STOPPED,
        enabled: 1,
        curve: Curve.LIN,
        level: 0,
        time: 0,
    })

    const env = {
        id,
        controllers: {},
        /*
        resetOnTrigger: false,
        resetLevel: 0,
        releaseMode: ReleaseMode.NORMAL,
        loopMode: LoopMode.GATED,
        loopEnabled: false,
        maxLoops: 2,
        invert:false,*/
        stages,
        // VCA and VCF envs are hardcoded to unipolar for now. VCF should probably be bipolar
        bipolar: id !== 0 && id !== 1,
    }

    updateReleaseLevels(env);
    return env;
}

// TODO: Duplicated in reducer, fix!
const updateReleaseLevels =  (env: Envelope) => {
    if(env.stages[StageId.RELEASE1].enabled) {
        env.stages[StageId.RELEASE1].level = env.stages[StageId.SUSTAIN].level;
    } else {
        env.stages[StageId.RELEASE2].level = env.stages[StageId.SUSTAIN].level;
    }
}

// TODO: Duplicated in reducer, fix!
/*
const setInvert = (env: Envelope, invert: boolean) => {
    env.invert = invert;
    const resetLevel = invert ? 1 : 0;

    env.stages[StageId.DELAY].level = resetLevel;
    env.stages[StageId.ATTACK].level = resetLevel;
    env.stages[StageId.DECAY1].level = invert ? 0 : 1;
    env.stages[StageId.STOPPED].level = resetLevel;
}*/

