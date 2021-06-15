import React, { useMemo } from 'react'
import { useSpring, animated } from 'react-spring'
import { exponentialFunc, getScaledPoints, logarithmicFunc } from './slopeCalculator'
import './Slope.scss'

interface Props {
    from: number[]
    to: number[]
    selectedSlope: number
}

const getPointsString = (
    slopeFunc: (x: number) => number,
    reflectX?: boolean,
    reflectY?: boolean,
): string => {
    const keypoints = 64;
    return getScaledPoints(slopeFunc, 1, keypoints, false)
        .map((point, index) => ({x: index / keypoints, y: point}))
        .map((point) => reflectX ? ({x: 1 - point.x, y: point.y}) : point)
        .map((point) => reflectY ? ({x: point.x, y: 1    - point.y}) : point)
        .map((point) => `${point.x},${point.y}`)
        .join(' ');
}

const expo1 = exponentialFunc(2.2);
const expo2 = exponentialFunc(4.4);
const expo3 = exponentialFunc(5.5);
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
    const l1 = getPointsString(log1, reflectX, reflectY)
    const l2 = getPointsString(log2, reflectX, reflectY)
    const l3 = getPointsString(log3, reflectX, reflectY)

    return [e1,e2,e3,l1,l2,l3];
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const AnimatedSlopes = ({ from, to, selectedSlope }: Props) => {

    const fromX = from[0] < to[0] ? from[0] : to[0];
    const fromY = from[1] < to[1] ? from[1] : to[1];

    const width = Math.abs(to[0] - from[0]);
    const height = Math.abs(to[1] - from[1]);

    const reflectX = from[0] > to[0];
    const reflectY = from[1] > to[1];

    const points = useMemo(() => getPoints(reflectX, reflectY), [
        reflectX, reflectY
    ]);

    const [{ x }, setSlope] = useSpring(() => ({
        from: {x: points[0]},
    }));

    setSlope({x: points[selectedSlope]})

    // We use a viewBox of 0,0, 1,1 to make the svg unit size. We can then use width and height to scale it
    // without having to recalculate points. NB:Does not work with negative values!
    return <svg x={fromX} y={fromY} viewBox="0, 0, 1 1" preserveAspectRatio="none" width={width} height={height}>
        <animated.polyline
            className="slope"
            points={x}
        />
    </svg>;
};

export default AnimatedSlopes;