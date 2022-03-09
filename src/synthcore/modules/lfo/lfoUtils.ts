import { Curve, Lfo, Stage, StageId } from './types'
import { Controllers } from '../controllers/types'
import { mergeControllers } from '../controllers/controllersUtils'

const getStageState = (envId: number, stage: Stage): Controllers => {
    // const { id: stageId, enabled, curve, level, time } = stage

    const controllers: Controllers = {}
    controllers[envId] = {
        /*
        [lfoCtrls.TOGGLE_STAGE.id]: {
            [stageId]: enabled
        },
        [lfoCtrls.CURVE.id]: {
            [stageId]: curve
        },
        [lfoCtrls.LEVEL.id]: {
            [stageId]: level
        },
        [lfoCtrls.TIME.id]: {
            [stageId]: time
        },        
         */
    }
    return controllers
}

const getUiStageState = (envId: number, stage: Stage): Controllers => {
    // const { id: stageId, level, time } = stage

    const controllers: Controllers = {}
    controllers[envId] = {
        /*
        [lfoCtrls.LEVEL.id]: {
            [stageId]: levelResponseMapper.input(level)
        },
        [lfoCtrls.TIME.id]: {
            [stageId]: timeResponseMapper.input(time)
        },
         */
    }
    return controllers
}

const getLfoState = (lfo: Lfo) => {
    const {
        /*
        resetOnTrigger,
        releaseMode,
        loopMode,
        loopEnabled,
        maxLoops,
        invert,
        bipolar,*/
    } = lfo
    const lfoControllers: Controllers = {}
    lfoControllers[lfo.id] = {
        /*
        [lfoCtrls.RESET_ON_TRIGGER.id]: resetOnTrigger ? 1 : 0,
        [lfoCtrls.RELEASE_MODE.id]: releaseMode,
        [lfoCtrls.LOOP_MODE.id]: loopMode,
        [lfoCtrls.LOOP.id]: loopEnabled ? 1 : 0,
        [lfoCtrls.MAX_LOOPS.id]: maxLoops,
        [lfoCtrls.INVERT.id]: invert ? 1 : 0,
        [lfoCtrls.BIPOLAR.id]: bipolar ? 1 : 0,
         */
    }
    return lfoControllers
}

export const getDefaultLfo = (lfoId: number): Controllers => {

    return getLfoState({
        id: lfoId,
        /*
        resetOnTrigger: false,
        releaseMode: ReleaseMode.NORMAL,
        loopMode: LoopMode.GATED,
        loopEnabled: false,
        maxLoops: 2,
        invert: false,
        // VCA and VCF envs are hardcoded to unipolar for now. VCF should probably be bipolar
        bipolar: lfoId !== 0 && lfoId !== 1,*/
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
        id: StageId.DECAY,
        enabled: 1,
        curve: Curve.LOG1,
        level: 1,
        time: 0.5,
    },
    {
        id: StageId.STOPPED,
        enabled: 1,
        curve: Curve.LIN,
        level: 0,
        time: 0,
    }
]

export const getDefaultLfoStages = (lfoId: number): Controllers => {
    const stages: Controllers[] = defaultStageConfigs.map(conf => getStageState(lfoId, conf))
    return mergeControllers(stages)
}

export const getDefaultUiLfoStages = (lfoId: number): Controllers => {
    const stages: Controllers[] = defaultStageConfigs.map(conf => getUiStageState(lfoId, conf))
    return mergeControllers(stages)
}
