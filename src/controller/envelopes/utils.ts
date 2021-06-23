import { getScaledPoints } from '../../components/curves/curveCalculator'
import { Point } from '../../utils/types'
import { StageId } from '../../forces/envelope/types'

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
    [StageId.DECAY1]: 'Decay 1',
    [StageId.DECAY2]: 'Decay 2',
    [StageId.SUSTAIN]: 'Sustain',
    [StageId.RELEASE1]: 'Release 1',
    [StageId.RELEASE2]: 'Release 2',
    [StageId.STOPPED]: 'Stopped',
}