import { getScaledPoints } from '../../components/curves/curveCalculator'
import { Curve, LoopMode, StageId } from '../../synthcore/modules/lfo/types'

export const keypoints = 64;

// If start and end is not 0 and max, curve is stretched in the x direction to
// fit a 0-1 interval. We still keep the same number of points to be able to
// warp between graphs, but the points before start and after end are all at the same location
export const getPoints = (
    curveFunc: (x: number) => number,
): number[] => getScaledPoints(curveFunc, 1, keypoints, false)


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
    [Curve.COSINE]: 'Cos',
    [Curve.EXP_3]: 'Exp 3',
    [Curve.EXP_2]: 'Exp 2',
    [Curve.EXP_1]: 'Exp 1',
    [Curve.LIN]: 'Lin',
    [Curve.LOG_1]: 'Log 1',
    [Curve.LOG_2]: 'Log 2',
    [Curve.LOG_3]: 'Log 3',
    [Curve.LFO_SQUARE]: 'Sqr',
    [Curve.LFO_RANDOM]: 'Ran',
}