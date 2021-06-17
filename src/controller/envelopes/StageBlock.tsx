import React, { useMemo } from 'react'
import AnimatedCurve from '../../components/curves/AnimatedCurve'
import { StageId, Stage } from './types'
import { getPoints } from './envelopeUtils'
import { curveFuncs } from '../../components/curves/curveCalculator'
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

const curveJointRadius = 0.6;

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const StageBlock = ({ x, y, width, height, vCenter, vHeight, stage, nextStage}: Props) => {

    const isLast = nextStage.id === StageId.STOPPED;

    const startLev = stage.level;
    const endLev = nextStage.level;
    const startX = 0;
    const endX = width;

    const startY = vCenter - vHeight * startLev;
    const endY = vCenter - vHeight * endLev;
    const stageHeight = Math.abs(endY - startY);

    const fromY = startY < endY ? startY : endY;

    const reflectY = startY > endY;
    const points = useMemo(
        () => getPoints(curveFuncs[stage.curve], false, reflectY),
        [stage.curve, reflectY]
    );

    return <svg x={x} y={y}>
        return <>
            <line
                x1={0} y1={0}
                x2={0} y2={height}
                className={'stage-divider'}
            />
            {isLast && <line
                        x1={endX} y1={0}
                        x2={endX} y2={height}
                        className={'stage-divider'}
                    />
            }
            <AnimatedCurve
                x={0}
                y={fromY}
                width={width}
                height={stageHeight}
                points={points}
                className={'stage-line'}
            />
            <circle
                cx={startX} cy={startY} r={curveJointRadius}
                className={'stage-joint'}/>
            {isLast && <circle
                        cx={endX} cy={endY} r={curveJointRadius}
                        className={'stage-joint'}/>
            }
        </>
    </svg>;
}

export default StageBlock;