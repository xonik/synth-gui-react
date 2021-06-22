import React, { useMemo } from 'react'
import AnimatedCurve from '../../components/curves/AnimatedCurve'
import { StageId, Stage } from '../../forces/envelope/types'
import { getPoints } from './utils'
import { curveFuncs } from '../../components/curves/curveCalculator'
import { Point } from '../../utils/types'
import { useSpring, animated } from 'react-spring'
import classNames from 'classnames'
import './StageBlock.scss'

interface Props {
    x: number
    y: number
    height: number
    width: number
    graphCenter: number
    stage: Stage
    nextStage: Stage
    isBipolar: boolean
}

const curveJointRadius = 0.6
const mapToSvg = (point: Point, isBipolar: boolean) => ({
    x: point.x,
    y: isBipolar ? (1 - point.y) / 2 : 1 - point.y
})

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const StageBlock = ({ x, y, width, graphCenter, height, stage, nextStage, isBipolar }: Props) => {

    const isLast = nextStage.id === StageId.STOPPED

    const startLev = stage.enabled ? stage.level : nextStage.level;

    const endLev = nextStage.level

    const startY = graphCenter - graphCenter * startLev
    const endY = graphCenter - graphCenter * endLev

    const offset = startLev
    const scale = endLev - startLev

    const points = useMemo(
        () => getPoints(curveFuncs[stage.curve], false, false),
        [stage.curve]
    )

    const svgPoints = useMemo(
        () => points
            .map((point) => ({ x: point.x, y: point.y * scale + offset }))
            .map((point) => mapToSvg(point, isBipolar)),
        [points, offset, scale, isBipolar]
    )

    const [{ animatedStartY }, setStartY] = useSpring(() => ({
        from: { animatedStartY: startY },
    }))

    const [{ animatedEndY }, setEndY] = useSpring(() => ({
        from: { animatedEndY: endY },
    }))

    setStartY({ animatedStartY: startY })
    setEndY({ animatedEndY: endY })

    return <svg x={x} y={y} className={classNames('stage-block', {'stage-block-disabled': !stage.enabled})}>
        <>
            <AnimatedCurve
                x={0}
                y={0}
                width={width}
                height={height}
                points={svgPoints}
                className={'stage-block-line'}
            />
            <animated.circle
                cx={0} cy={animatedStartY} r={curveJointRadius}
                className={'stage-block-joint'}/>
            {isLast && <animated.circle
              cx={width} cy={animatedEndY} r={curveJointRadius}
              className={'stage-block-joint'}/>
            }
        </>
    </svg>
}

export default StageBlock