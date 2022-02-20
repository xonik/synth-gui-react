import { getScaledPoints } from '../../components/curves/curveCalculator'
import { Point } from '../../utils/types'
import { Curve, LoopMode, ReleaseMode, StageId } from '../../synthcore/modules/env/types'

export const getPoints = (
    curveFunc: (x: number) => number,
    reflectX?: boolean,
    reflectY?: boolean,
): Point[] => {
    const keypoints = 64;
    return getScaledPoints(curveFunc, 1, keypoints, false)
        .map((point, index) => ({x: index / keypoints, y: point}))
        .map((point) => reflectX ? ({x: 1 - point.x, y: point.y}) : point)
        .map((point) => reflectY ? ({x: point.x, y: 1 - point.y}) : point);
}


export const stageNames = {
    [StageId.DELAY]: 'Delay',
    [StageId.ATTACK]: 'Attack',
    [StageId.DECAY1]: 'Dec 1',
    [StageId.DECAY2]: 'Dec 2',
    [StageId.SUSTAIN]: 'Sustain',
    [StageId.RELEASE1]: 'Rel 1',
    [StageId.RELEASE2]: 'Rel 2',
    [StageId.STOPPED]: 'Stopped',
}

export const loopModeNames = {
    [LoopMode.GATED]: 'gated',
    [LoopMode.COUNTED]: 'times',
    [LoopMode.INFINITE]: 'forever',
}

export const releaseModeNames = {
    [ReleaseMode.NORMAL.valueOf()]: 'Normal release',
    [ReleaseMode.FREE_RUN.valueOf()]: 'Free running',
    [ReleaseMode.SKIP_R1.valueOf()]: 'Skip R1',
}

export const curveNames = {
    [Curve.EXP3]: 'Exp 3',
    [Curve.EXP2]: 'Exp 2',
    [Curve.EXP1]: 'Exp 1',
    [Curve.LIN]: 'Linear',
    [Curve.LOG1]: 'Log 1',
    [Curve.LOG2]: 'Log 2',
    [Curve.LOG3]: 'Log 3',
}