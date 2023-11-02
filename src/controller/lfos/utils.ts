import { getScaledPoints } from '../../components/curves/curveCalculator'
import { LoopMode, StageId } from '../../synthcore/modules/lfo/types'

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
