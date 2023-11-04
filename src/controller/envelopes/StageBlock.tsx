import React, { useMemo } from 'react'
import AnimatedCurve from '../../components/curves/AnimatedCurve'
import { Stage } from '../../synthcore/modules/env/types'
import { getPoints } from './utils'
import { getCurveFunc } from '../../components/curves/curveCalculator'
import { Point } from '../../utils/types'
import classNames from 'classnames'
import { envCtrls } from '../../synthcore/modules/env/envControllers'
import './StageBlock.scss'

interface Props {
    x: number
    y: number
    height: number
    width: number
    stage: Stage
    nextStage: Stage
    isBipolar: boolean
    offset: number
}

const mapToSvg = (point: Point, isBipolar: boolean) => ({
    x: point.x,
    y: isBipolar ? (1 - point.y) / 2 : 1 - point.y
})

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const StageBlock = ({ x, y, width, height, stage, nextStage, isBipolar, offset }: Props) => {

    const startLev = stage.enabled ? stage.level : nextStage.level;

    const endLev = nextStage.level

    const summedOffset = startLev + offset
    const scale = endLev - startLev

    const curveFunc = getCurveFunc(envCtrls.CURVE, stage.curve)

    const points = useMemo(
        () => {
            return getPoints(curveFunc, false, false)
        },
        [stage.curve]
    )

    const svgPoints = useMemo(
        () => points
            .map((point) => {
                const minY = isBipolar ? -1 : 0
                // cut off top/bottom to stay within possible range
                let y = point.y * scale + summedOffset
                if(y < minY) { y = minY } else if(y > 1) { y = 1}
                return { x: point.x, y }
            })
            .map((point) => mapToSvg(point, isBipolar)),
        [points, summedOffset, scale, isBipolar]
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