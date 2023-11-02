import { Envelope, LoopMode, ReleaseMode, Stage, StageId } from './types'
import { envCtrls } from './envControllers'
import { Controllers } from '../controllers/types'
import { mergeControllers } from '../controllers/controllersUtils'
import { dbLevelResponseMapper, timeResponseMapper } from '../common/responseMappers'
import { Curve } from '../../generatedTypes'


const getStageState = (envId: number, stage: Stage): Controllers => {
    const { id: stageId, enabled, curve, level, time } = stage

    const controllers: Controllers = {}
    controllers[envId] = {
        [envCtrls.TOGGLE_STAGE.id]: {
            [stageId]: enabled
        },
        [envCtrls.CURVE.id]: {
            [stageId]: curve
        },
        [envCtrls.LEVEL.id]: {
            [stageId]: level
        },
        [envCtrls.TIME.id]: {
            [stageId]: time
        },
    }
    return controllers
}

const getUiStageState = (envId: number, stage: Stage): Controllers => {
    const { id: stageId, level, time } = stage

    const controllers: Controllers = {}
    controllers[envId] = {
        [envCtrls.LEVEL.id]: {
            [stageId]: dbLevelResponseMapper.input(level)
        },
        [envCtrls.TIME.id]: {
            [stageId]: timeResponseMapper.input(time)
        },
    }
    return controllers
}

const getEnvState = (env: Envelope): Controllers => {
    const {
        resetOnTrigger,
        releaseMode,
        loopMode,
        loopEnabled,
        maxLoops,
        invert,
        bipolar,
        offset,
    } = env
    const envControllers: Controllers = {}
    envControllers[env.id] = {
        [envCtrls.RESET_ON_TRIGGER.id]: [resetOnTrigger ? 1 : 0],
        [envCtrls.RELEASE_MODE.id]: [releaseMode],
        [envCtrls.LOOP_MODE.id]: [loopMode],
        [envCtrls.LOOP.id]: [loopEnabled ? 1 : 0],
        [envCtrls.MAX_LOOPS.id]: [maxLoops],
        [envCtrls.INVERT.id]: [invert ? 1 : 0],
        [envCtrls.BIPOLAR.id]: [bipolar ? 1 : 0],
        [envCtrls.OFFSET.id]: [offset],
    }
    return envControllers
}

export const getDefaultEnv = (envId: number): Controllers => {

    return getEnvState({
        id: envId,
        resetOnTrigger: false,
        releaseMode: ReleaseMode.NORMAL,
        loopMode: LoopMode.GATED,
        loopEnabled: false,
        maxLoops: 2,
        invert: false,
        // VCA and VCF envs are hardcoded to unipolar for now. VCF should probably be bipolar
        bipolar: envId !== 0 && envId !== 1,
        offset: 0,
    })
}

const defaultStageConfigs: Stage[] = [
    {
        id: StageId.DELAY,
        enabled: 0,
        curve: Curve.LIN,
        level: 0,
        time: 0,
    },
    {
        id: StageId.ATTACK,
        enabled: 1,
        curve: Curve.LOG_1,
        level: 0,
        time: 0.001,
    },
    {
        id: StageId.DECAY1,
        enabled: 1,
        curve: Curve.LOG_1,
        level: 1,
        time: 0.5,
    },
    {
        id: StageId.DECAY2,
        enabled: 0,
        curve: Curve.LIN,
        level: 0.5,
        time: 0.001,
    },
    {
        id: StageId.SUSTAIN,
        enabled: 1,
        curve: Curve.LIN,
        level: 0.5,
        time: 0,
    },
    {
        id: StageId.RELEASE1,
        enabled: 0,
        curve: Curve.LOG_1,
        level: 0.5,
        time: 0.001,
    },
    {
        id: StageId.RELEASE2,
        enabled: 1,
        curve: Curve.LOG_1,
        level: 0.25,
        time: 0.003,
    },
    {
        id: StageId.STOPPED,
        enabled: 1,
        curve: Curve.LIN,
        level: 0,
        time: 0,
    }
]

export const getDefaultEnvStages = (envId: number): Controllers => {
    const stages: Controllers[] = defaultStageConfigs.map(conf => getStageState(envId, conf))
    const controllers = mergeControllers(stages)

    // TODO: Duplicated in reducer, fix!
    // Update release levels
    if (defaultStageConfigs[StageId.RELEASE1].enabled) {
        controllers[envId][envCtrls.LEVEL.id][StageId.RELEASE1] = controllers[envId][envCtrls.LEVEL.id][StageId.SUSTAIN]
    } else {
        controllers[envId][envCtrls.LEVEL.id][StageId.RELEASE2] = controllers[envId][envCtrls.LEVEL.id][StageId.SUSTAIN]
    }

    return controllers
}

export const getDefaultEnvUiStages = (envId: number): Controllers => {
    const stages: Controllers[] = defaultStageConfigs.map(conf => getUiStageState(envId, conf))
    const controllers = mergeControllers(stages)

    // TODO: Duplicated in reducer, fix!
    // Update release levels
    if (defaultStageConfigs[StageId.RELEASE1].enabled) {
        controllers[envId][envCtrls.LEVEL.id][StageId.RELEASE1] = controllers[envId][envCtrls.LEVEL.id][StageId.SUSTAIN]
    } else {
        controllers[envId][envCtrls.LEVEL.id][StageId.RELEASE2] = controllers[envId][envCtrls.LEVEL.id][StageId.SUSTAIN]
    }

    return controllers
}