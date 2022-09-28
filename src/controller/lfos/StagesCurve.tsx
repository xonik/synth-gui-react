import React, { useMemo } from 'react'
import AnimatedCurve from '../../components/curves/AnimatedCurve'
import { Point } from '../../utils/types'
import './StagesCurve.scss'

interface Props {
    points: Point[]
    yOffset?: number
}

const mapToSvg = (point: Point) => ({
    x: point.x,
    y: (1 - point.y) / 2
})

// Draw points in a 1 x 1 square.
const StagesCurve = ({ points }: Props) => {

    const svgPoints = useMemo(
        () => points
            .map((point) => mapToSvg(point))
            .map((point) => {
                // cut off top/bottom to stay within possible range
                let y = point.y
                if(y < 0) { y = 0 } else if(y > 1) { y = 1}
                return { x: point.x, y }
            }),
        [points]
    )

    return <svg x={0} y={0} className="stages-curve">
        <AnimatedCurve
            x={0}
            y={0}
            width={1}
            height={1}
            points={svgPoints}
            className={'stage-block-line'}
        />
    </svg>
}

export default StagesCurve