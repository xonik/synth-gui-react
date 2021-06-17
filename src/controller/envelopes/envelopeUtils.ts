import { getScaledPoints } from '../../components/curves/curveCalculator'
import { Point } from './types'

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

export const getPointsString = (points: Point[]): string => {
    return points.map((point) => `${point.x},${point.y}`).join(' ');
}
