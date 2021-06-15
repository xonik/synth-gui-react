import React, { useMemo } from 'react'
import { useSpring, animated } from 'react-spring'
import { exponentialFunc, getScaledPoints, logarithmicFunc } from './slopeCalculator'
import './Slope.scss'

interface Props {
    from: number[]
    to: number[]
    selectedSlope: number
    slopeFunc: (x: number) => number
    slopeFunc2  : (x: number) => number
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

const expo1 = exponentialFunc(2.2);
const log1 = logarithmicFunc(4.4);
const expo2 = exponentialFunc(4.4);
const log2 = logarithmicFunc(2.2);
const expo3 = exponentialFunc(5.5);

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const Slope = ({ from, to, selectedSlope }: Props) => {

    const fromX = from[0] < to[0] ? from[0] : to[0];
    const fromY = from[1] < to[1] ? from[1] : to[1];

    const width = Math.abs(to[0] - from[0]);
    const height = Math.abs(to[1] - from[1]);

    const reflectX = from[0] > to[0];
    const reflectY = from[1] > to[1];

    const points = useMemo(() => getPoints(expo1, reflectX, reflectY), [
        reflectX, reflectY
    ]);
    const points2 = useMemo(() => getPoints(log1, reflectX, reflectY), [
        reflectX, reflectY
    ]);
    const points3 = useMemo(() => getPoints(expo2, reflectX, reflectY), [
        reflectX, reflectY
    ]);
    const points4 = useMemo(() => getPoints(log2, reflectX, reflectY), [
        reflectX, reflectY
    ]);

    const points5 = useMemo(() => getPoints(expo3, reflectX, reflectY), [
        reflectX, reflectY
    ]);

    const [{ x }, setSlope] = useSpring(() => ({
        x: selectedSlope,
    }));

    setSlope({x: selectedSlope})

    console.log({
        selectedSlope,
        x
    })

    // We use a viewBox of 0,0, 1,1 to make the svg unit size. We can then use width and height to scale it
    // without having to recalculate points. NB:Does not work with negative values!
    return <svg x={fromX} y={fromY} viewBox="0, 0, 1 1" preserveAspectRatio="none" width={width} height={height}>
        <animated.polyline
            className="slope"
            points={x.to({
                range: [0, 1, 2, 3, 4],
                output: [
                    points.join(' '),
                    points2.join(' '),
                    points3.join(' '),
                    points4.join(' '),
                    points5.join(' ')
                ],
            })}
        />
    </svg>;
};

export default Slope;