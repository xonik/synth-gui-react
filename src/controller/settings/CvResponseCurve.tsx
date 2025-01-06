import React, { useMemo } from 'react'
import AnimatedCurve from '../../components/curves/AnimatedCurve'
import { Point } from '../../utils/types'
import { getPoints } from '../lfos/utils'
import { curveFuncs, reverse as reverseCurve } from '../../components/curves/curveCalculator'
import './CvRange.scss'
import { Curve } from '../../synthcore/generatedTypes'

interface Props {
    start: number
    end: number
    curve: Curve
    reverse: boolean
}

const mapToSvg = (point: Point) => ({
    x: point.x,
    y: (1 - point.y)
})

// Draw points in a 1 x 1 square.
const CvResponseCurve = ({ start, end, curve, reverse}: Props) => {

    const range = (end - start) / 65535
    const base = start / 65535
    const curveFunc = reverse ? reverseCurve(curveFuncs[curve]) : curveFuncs[curve]
    const points = getPoints(curveFunc).map(
        (y, index): Point => ({
            y: base + range * y,
            x: index / 64
        }))

    const svgPoints = useMemo(
        () => points
            .map((point) => mapToSvg(point)),
        [points]
    )
    return <AnimatedCurve
            x={0}
            y={0}
            width={1}
            height={1}
            points={svgPoints}
            className={'cv-range__graph'}
        />
}

export default CvResponseCurve