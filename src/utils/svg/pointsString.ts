import { Point } from '../types'

export const getPointsString = (points: Point[]): string => {
    return points.map((point) => `${point.x},${point.y}`).join(' ');
}
