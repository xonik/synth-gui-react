import { Curve, Lfo, LoopMode, Stage, StageId } from './types'
import { Controllers } from '../controllers/types'
import { mergeControllers } from '../controllers/controllersUtils'
import { lfoCtrls } from './lfoControllers'
import { timeResponseMapper } from '../common/responseMappers'

const getStageState = (envId: number, stage: Stage): Controllers => {
    const { id: stageId, enabled, curve, level, time } = stage

    const controllers: Controllers = {}
    controllers[envId] = {
        [lfoCtrls.TOGGLE_STAGE.id]: {
            [stageId]: enabled
        },
        [lfoCtrls.CURVE.id]: {
            [stageId]: curve
        },
        /*
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
    const { id: stageId, level, time } = stage

    const controllers: Controllers = {}
    controllers[envId] = {
        [lfoCtrls.RATE.id]: {
            [stageId]: level
        },
        [lfoCtrls.DEPTH.id]: {
            [stageId]: timeResponseMapper.input(time)
        },
    }
    return controllers
}

const getLfoState = (lfo: Lfo) => {
    const {
        id,
        resetOnTrigger,
        resetOnStop,
        resetLevelOnClock,
        syncToClock,
        loopMode,
        loopEnabled,
        maxLoops,
        invert,
        bipolar,
        time,
        balance,
        offset,
        phaseOffset,
        randomPhase,
        depth,
    } = lfo
    const lfoControllers: Controllers = {}
    lfoControllers[id] = {
        [lfoCtrls.RESET_ON_TRIGGER.id]: [resetOnTrigger ? 1 : 0],
        [lfoCtrls.RESET_ON_STOP.id]: [resetOnStop ? 1 : 0],
        [lfoCtrls.RESET_LEVEL_ON_CLOCK.id]: [resetLevelOnClock ? 1 : 0],
        [lfoCtrls.SYNC_TO_CLOCK.id]: [syncToClock ? 1 : 0],
        [lfoCtrls.LOOP_MODE.id]: [loopMode],
        [lfoCtrls.LOOP.id]: [loopEnabled ? 1 : 0],
        [lfoCtrls.MAX_LOOPS.id]: [maxLoops],
        [lfoCtrls.INVERT.id]: [invert ? 1 : 0],
        [lfoCtrls.BIPOLAR.id]: [bipolar ? 1 : 0],
        [lfoCtrls.RATE.id]: [time],
        [lfoCtrls.DEPTH.id]: [depth],
        [lfoCtrls.BALANCE.id]: [balance],
        [lfoCtrls.LEVEL_OFFSET.id]: [offset],
        [lfoCtrls.PHASE_OFFSET.id]: [phaseOffset],
        [lfoCtrls.RANDOM_PHASE.id]: [randomPhase ? 1 : 0],
    }
    return lfoControllers
}

export const getDefaultLfo = (lfoId: number): Controllers => {

    return getLfoState({
        id: lfoId,
        resetOnTrigger: false,
        resetOnStop: false,
        resetLevelOnClock: false,
        syncToClock: false,
        loopMode: LoopMode.INFINITE,
        loopEnabled: false,
        maxLoops: 2,
        invert: false,
        bipolar: true,
        time: 1,
        balance: 0.5,
        depth: 1,
        offset: 0,
        phaseOffset: 0.85,
        randomPhase: false,

        timeOffset: 0,
        timeOffsetStage: StageId.ATTACK,
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
        curve: Curve.LIN,
        level: 0,
        time: 0.001,
    },
    {
        id: StageId.DECAY,
        enabled: 1,
        curve: Curve.LIN,
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
