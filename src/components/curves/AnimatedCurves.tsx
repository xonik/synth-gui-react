import React, { useMemo } from 'react'
import { useSpring, animated } from 'react-spring'
import { exponentialFunc, getScaledPoints, logarithmicFunc } from './curveCalculator'
import classNames from 'classnames'
import './Curve.scss'

interface Props {
    from: number[]
    to: number[]
    selectedCurve: number
    className?: string
}

const getPointsString = (
    curveFunc: (x: number) => number,
    reflectX?: boolean,
    reflectY?: boolean,
): string => {
    const keypoints = 64;
    return getScaledPoints(curveFunc, 1, keypoints, false)
        .map((point, index) => ({x: index / keypoints, y: point}))
        .map((point) => reflectX ? ({x: 1 - point.x, y: point.y}) : point)
        .map((point) => reflectY ? ({x: point.x, y: 1    - point.y}) : point)
        .map((point) => `${point.x},${point.y}`)
        .join(' ');
}

const expo1 = exponentialFunc(2.2);
const expo2 = exponentialFunc(4.4);
const expo3 = exponentialFunc(5.5);
const linear = (x:number) => x;
const log1 = logarithmicFunc(1.3);
const log2 = logarithmicFunc(1.7);
const log3 = logarithmicFunc(2.2);

const getPoints = (
    reflectX?: boolean,
    reflectY?: boolean,
) => {
    const e1 = getPointsString(expo1, reflectX, reflectY)
    const e2 = getPointsString(expo2, reflectX, reflectY)
    const e3 = getPointsString(expo3, reflectX, reflectY)
    const lin = getPointsString(linear, reflectX, reflectY)
    const l1 = getPointsString(log1, reflectX, reflectY)
    const l2 = getPointsString(log2, reflectX, reflectY)
    const l3 = getPointsString(log3, reflectX, reflectY)

    return [e1,e2,e3,lin,l1,l2,l3];
}

// Draw the desired curve between from and to. NB: SVG has 0,0 in upper left corner.
const AnimatedCurves = ({ from, to, selectedCurve, className }: Props) => {


    const fromX = from[0] < to[0] ? from[0] : to[0];
    const fromY = from[1] < to[1] ? from[1] : to[1];

    const width = Math.abs(to[0] - from[0]);
    const height = Math.abs(to[1] - from[1]);

    const reflectX = from[0] > to[0];
    const reflectY = from[1] > to[1];

    const points = useMemo(() => getPoints(reflectX, reflectY), [
        reflectX, reflectY
    ]);

    const [{ animatedPoints }, setCurve] = useSpring(() => ({
        from: {animatedPoints: points[selectedCurve]},
    }));

    setCurve({animatedPoints: points[selectedCurve]})
console.log(selectedCurve, points)
    if(from[1] === to[1]){
        return <line
            x1={from[0]} y1={from[1]}
            x2={to[0]} y2={to[1]}
            className={classNames('curve', className)}
        />
    }

    // We use a viewBox of 0,0, 1,1 to make the svg unit size. We can then use width and height to scale it
    // without having to recalculate points.
    return <svg x={fromX} y={fromY} viewBox="0, 0, 1 1" preserveAspectRatio="none" width={width} height={height}>
        <animated.polyline
            className={classNames('curve', className)}
            points={animatedPoints}
        />
    </svg>;
};

export default AnimatedCurves;