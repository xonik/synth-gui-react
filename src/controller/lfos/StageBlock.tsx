import React, { useMemo } from 'react'
import AnimatedCurve from '../../components/curves/AnimatedCurve'
import { Stage } from '../../synthcore/modules/lfo/types'
import { getPoints, keypoints } from './utils'
import { curveFuncs } from '../../components/curves/curveCalculator'
import { Point } from '../../utils/types'
import classNames from 'classnames'
import './StageBlock.scss'

interface Props {
    x: number
    y: number
    height: number
    width: number
    stage: Stage
    startLev: number
    endLev: number
    startPhase: number
    endPhase: number
    isBipolar: boolean
    xOffset?: number
}

const mapToSvg = (point: Point, isBipolar: boolean) => ({
    x: point.x,
    y: (1 - point.y) / 2
})

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const StageBlock = ({ x, y, width, height, stage, startLev, endLev, startPhase, endPhase, isBipolar, xOffset = 0 }: Props) => {

    const startPoint = Math.floor(keypoints * startPhase)
    const endPoint = Math.floor(keypoints * endPhase) + 1

    const offset = startLev + xOffset;
    const scale = endLev - startLev

    const points = useMemo(
        () => getPoints(curveFuncs[stage.curve], startPoint, endPoint),
        [stage.curve, startPoint, endPoint]
    )

    const svgPoints = useMemo(
        () => points
            .map((point) => {
                let y = point.y * scale + offset;
                return { x: point.x, y }
            })
            .map((point) => mapToSvg(point, isBipolar))
            .map((point) => {
                // cut off top/bottom to stay within possible range
                let y = point.y
                if(y < 0) { y = 0 } else if(y > 1) { y = 1}
                return { x: point.x, y }
            }),
        [points, offset, scale, isBipolar]
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