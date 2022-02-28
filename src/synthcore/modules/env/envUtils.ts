import { Curve, Envelope, LoopMode, ReleaseMode, Stage, StageId } from './types'
import { envCtrls } from './envControllers'
import { Controllers, ValueIndexedControllers } from '../controllers/types'
import { mergeValueIndexedControllers } from '../controllers/controllersUtils'
import { ControllerConfig } from '../../../midi/types'
import { timeResponseMapper } from './envResponseMappers'
import { levelResponseMapper } from '../common/responseMappers'



const getStageState = (envId: number, stage: Stage): ValueIndexedControllers => {
    const { id: stageId, enabled, curve, level, time } = stage

    const controllers: ValueIndexedControllers = {}
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

const getUiStageState = (envId: number, stage: Stage): ValueIndexedControllers => {
    const { id: stageId, level, time } = stage

    const controllers: ValueIndexedControllers = {}
    controllers[envId] = {
        [envCtrls.LEVEL.id]: {
            [stageId]: levelResponseMapper.input(level)
        },
        [envCtrls.TIME.id]: {
            [stageId]: timeResponseMapper.input(time)
        },
    }
    return controllers
}

export const getDefaultController = (ctrl: ControllerConfig, value: number): Controllers => {
    return {
        0: {
            [ctrl.id]: value
        }
    }
}

const getEnvState = (env: Envelope) => {
    const {
        resetOnTrigger,
        releaseMode,
        loopMode,
        loopEnabled,
        maxLoops,
        invert,
        bipolar,
    } = env
    const envControllers: Controllers = {}
    envControllers[env.id] = {
        [envCtrls.RESET_ON_TRIGGER.id]: resetOnTrigger ? 1 : 0,
        [envCtrls.RELEASE_MODE.id]: releaseMode,
        [envCtrls.LOOP_MODE.id]: loopMode,
        [envCtrls.LOOP.id]: loopEnabled ? 1 : 0,
        [envCtrls.MAX_LOOPS.id]: maxLoops,
        [envCtrls.INVERT.id]: invert ? 1 : 0,
        [envCtrls.BIPOLAR.id]: bipolar ? 1 : 0,
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
        curve: Curve.LOG1,
        level: 0,
        time: 0.001,
    },
    {
        id: StageId.DECAY1,
        enabled: 1,
        curve: Curve.LOG1,
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
        curve: Curve.LOG1,
        level: 0.5,
        time: 0.001,
    },
    {
        id: StageId.RELEASE2,
        enabled: 1,
        curve: Curve.LOG1,
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

export const getDefaultEnvStages = (envId: number): ValueIndexedControllers => {
    const stages: ValueIndexedControllers[] = defaultStageConfigs.map(conf => getStageState(envId, conf))
    const controllers = mergeValueIndexedControllers(stages)

    // TODO: Duplicated in reducer, fix!
    // Update release levels
    if (defaultStageConfigs[StageId.RELEASE1].enabled) {
        controllers[envId][envCtrls.LEVEL.id][StageId.RELEASE1] = controllers[envId][envCtrls.LEVEL.id][StageId.SUSTAIN]
    } else {
        controllers[envId][envCtrls.LEVEL.id][StageId.RELEASE2] = controllers[envId][envCtrls.LEVEL.id][StageId.SUSTAIN]
    }

    return controllers
}

export const getDefaultEnvUiStages = (envId: number): ValueIndexedControllers => {
    const stages: ValueIndexedControllers[] = defaultStageConfigs.map(conf => getUiStageState(envId, conf))
    const controllers = mergeValueIndexedControllers(stages)

    // TODO: Duplicated in reducer, fix!
    // Update release levels
    if (defaultStageConfigs[StageId.RELEASE1].enabled) {
        controllers[envId][envCtrls.LEVEL.id][StageId.RELEASE1] = controllers[envId][envCtrls.LEVEL.id][StageId.SUSTAIN]
    } else {
        controllers[envId][envCtrls.LEVEL.id][StageId.RELEASE2] = controllers[envId][envCtrls.LEVEL.id][StageId.SUSTAIN]
    }

    return controllers
}