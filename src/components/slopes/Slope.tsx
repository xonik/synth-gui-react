import React, { useMemo } from 'react'
import { exponentialFunc, getScaledPoints, logarithmicFunc } from './slopeCalculator'
import './Slope.scss'

interface Props {
    from: number[]
    to: number[]
    slopeFunc: (x: number) => number
}

const getPoints = (
    slopeFunc: (x: number) => number,
    reflectX?: boolean,
    reflectY?: boolean,
): string[] => {
    const keypoints = 64;
    return getScaledPoints(slopeFunc, 1, keypoints, false)
        .map((point, index) => ({x: index / keypoints, y: point}))
        .map((point) => reflectX ? ({x: 1 - point.x, y: point.y}) : point)
        .map((point) => reflectY ? ({x: point.x, y: 1    - point.y}) : point)
        .map((point) => `${point.x},${point.y}`)
}


// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const Slope = ({ from, to, slopeFunc }: Props) => {

    const fromX = from[0] < to[0] ? from[0] : to[0];
    const fromY = from[1] < to[1] ? from[1] : to[1];

    const width = Math.abs(to[0] - from[0]);
    const height = Math.abs(to[1] - from[1]);

    const reflectX = from[0] > to[0];
    const reflectY = from[1] > to[1];

    const points = useMemo(() => getPoints(slopeFunc, reflectX, reflectY), [
        slopeFunc, reflectX, reflectY
    ]);

    // We use a viewBox of 0,0, 1,1 to make the svg unit size. We can then use width and height to scale it
    // without having to recalculate points. NB:Does not work with negative values!
    return <svg x={fromX} y={fromY} viewBox="0, 0, 1 1" preserveAspectRatio="none" width={width} height={height} className="slope">
        <polyline id="shape" points={points.join(' ')} vectorEffect="non-scaling-stroke"/>
    </svg>;
};

export default Slope;