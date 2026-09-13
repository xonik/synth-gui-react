import classNames from 'classnames'
import { useMemo } from 'react'
import { getPointsString } from '@/utils/svg/pointsString'
import type { Point } from '@/utils/types'
import './StaticCurve.scss'

interface Props {
    x: number
    y: number
    width: number
    height: number
    points: Point[]
    className?: string
}

const StaticCurve = ({ x, y, width, height, points, className }: Props) => {
    const pointsString = useMemo(() => getPointsString(points), [points])

    return (
        <svg
            x={x}
            y={y}
            viewBox="0 0 1 1"
            className={className}
            preserveAspectRatio="none"
            width={width}
            height={height}
        >
            <polyline className={classNames('static-curve')} points={pointsString} />
        </svg>
    )
}

export default StaticCurve
