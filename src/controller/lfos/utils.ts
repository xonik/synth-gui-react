import { getScaledPoints } from '../../components/curves/curveCalculator'
import { Point } from '../../utils/types'
import { Curve, LoopMode, StageId } from '../../synthcore/modules/lfo/types'

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
    [StageId.DECAY]: 'Decay',
    [StageId.STOPPED]: 'Stopped',
}

export const loopModeNames = {
    [LoopMode.COUNTED]: 'times',
    [LoopMode.INFINITE]: 'forever',
}

export const curveNames = {
    [Curve.COSINE]: 'Cosine',
    [Curve.EXP3]: 'Exp 3',
    [Curve.EXP2]: 'Exp 2',
    [Curve.EXP1]: 'Exp 1',
    [Curve.LIN]: 'Linear',
    [Curve.LOG1]: 'Log 1',
    [Curve.LOG2]: 'Log 2',
    [Curve.LOG3]: 'Log 3',
}