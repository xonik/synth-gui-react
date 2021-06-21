import React, { useMemo } from 'react'
import AnimatedCurve from '../../components/curves/AnimatedCurve'
import { StageId, Stage } from '../../forces/envelope/types'
import { getPoints } from './utils'
import { curveFuncs } from '../../components/curves/curveCalculator'
import { Point } from '../../utils/types'
import { useSpring, animated } from 'react-spring'
import './StageBlock.scss'

interface Props {
    x: number
    y: number
    width: number
    height: number
    vCenter: number
    vHeight: number
    stage: Stage
    nextStage: Stage
}

const curveJointRadius = 0.6
const mapToSvg = (point: Point) => ({ x: point.x, y: 1 - point.y })

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const StageBlock = ({ x, y, width, height, vCenter, vHeight, stage, nextStage }: Props) => {

    const isLast = nextStage.id === StageId.STOPPED

    const startLev = stage.level
    const endLev = nextStage.level
    const startX = 0
    const endX = width

    const startY = vCenter - vHeight * startLev
    const endY = vCenter - vHeight * endLev

    const offset = startLev
    const scale = endLev - startLev

    const points = useMemo(
        () => getPoints(curveFuncs[stage.curve], false, false),
        [stage.curve]
    )

    const svgPoints = useMemo(
        () => points
            .map((point, index) => ({ x: point.x, y: point.y * scale + offset }))
            .map(mapToSvg),
        [points, offset, scale]
    )

    const [{ animatedStartY }, setStartY] = useSpring(() => ({
        from: {animatedStartY: startY},
    }));

    setStartY({animatedStartY: startY})

    return <svg x={x} y={y}>
        return <>
        <line
            x1={0} y1={0}
            x2={0} y2={height}
            className={'stage-block-divider'}
        />
        {isLast && <line
          x1={endX} y1={0}
          x2={endX} y2={height}
          className={'stage-block-divider'}
        />
        }
        <AnimatedCurve
            x={0}
            y={0}
            width={width}
            height={vHeight}
            points={svgPoints}
            className={'stage-block-line'}
        />
        <animated.circle
            cx={startX} cy={animatedStartY} r={curveJointRadius}
            className={'stage-block-joint'}/>
        {isLast && <circle
          cx={endX} cy={endY} r={curveJointRadius}
          className={'stage-block-joint'}/>
        }
    </>
    </svg>
}

export default StageBlock