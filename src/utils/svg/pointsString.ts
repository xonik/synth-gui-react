import type { Point } from '../types'

export const getPointsString = (points: Point[]): string => {
    return points.map((point) => `${point.x.toFixed(6)},${point.y.toFixed(6)}`).join(' ')
}
