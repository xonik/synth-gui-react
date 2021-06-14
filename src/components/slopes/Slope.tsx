import React from 'react';
import { exponentialFunc, getScaledPoints, logarithmicFunc } from './slopeCalculator'
import './Slope.scss'

interface Props {
    x: number
    y: number
    width: number
    height: number
    slopeFunc: (x: number) => number
    reflectX?: boolean
    reflectY?: boolean
}

const Slope = ({ x, y, width, height, slopeFunc, reflectX = false, reflectY = false }: Props) => {

    const points = getScaledPoints(slopeFunc, height, 256, false)
        .map((point, index) => ({x: index * width / 256, y: height-point}))
        .map((point) => reflectX ? ({x: width - point.x, y: point.y}) : point)
        .map((point) => reflectY ? ({x: point.x, y: height - point.y}) : point)
        .map((point) => `${point.x},${point.y}`)

    console.log(points)

    return <svg x={x} y={y} className="slope">
        <polyline points={points.join(' ')} />
    </svg>;
};

export default Slope;