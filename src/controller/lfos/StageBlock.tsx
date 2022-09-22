import React, { useMemo } from 'react'
import AnimatedCurve from '../../components/curves/AnimatedCurve'
import { Stage } from '../../synthcore/modules/lfo/types'
import { Point } from '../../utils/types'
import classNames from 'classnames'
import './StageBlock.scss'

interface Props {
    x: number
    y: number
    height: number
    width: number
    stage: Stage
    points: Point[]
    yOffset?: number
}

const mapToSvg = (point: Point) => ({
    x: point.x,
    y: (1 - point.y) / 2
})

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const StageBlock = ({ x, y, width, height, stage, points }: Props) => {

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

    return <svg x={x} y={y} className={classNames('stage-block', {'stage-block-disabled': !stage.enabled})}>
        <AnimatedCurve
            x={0}
            y={0}
            width={width}
            height={height}
            points={svgPoints}
            className={'stage-block-line'}
        />
    </svg>
}

export default StageBlock