import { Curve, Lfo, Stage, StageId } from './types'

export const getDefaultLfo = (id: number): Lfo => {

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
        id: StageId.DECAY,
        enabled: true,
        curve: Curve.LOG1,
        level: 1,
        time: 0.5,
    })
    stages.push({
        id: StageId.STOPPED,
        enabled: true,
        curve: Curve.LIN,
        level: 0,
        time: 0,
    })

    return {
        id,
        rate: 0,
        depth: 0,
        shape: 0,
        sync: 0,
        once: 0,
        resetOnTrigger: 0,
        stages,
    }
}
