// All functions are rising between 0, 0 and 1, 1

import { ControllerConfig } from '../../midi/types'
import { Curve } from '../../synthcore/generatedTypes'
import { curveNames } from './shortCurveNames'

export const exponentialFunc = (sharpness: number) => {
    const a = 1 / (Math.exp(sharpness) - 1)

    return (x: number) => {
        return a * Math.exp(sharpness * x) - a;
    }
}

export const logarithmicFunc = (sharpness: number) => {
    const a = 1 / (Math.pow(10, sharpness) - 1)

    return (x: number) => {
        return Math.log10(x + a) / sharpness - Math.log10(a) / sharpness
    }
}

// LFO funcs, half period.
// Not really a sine but a cos, to make it start at 0 and go to 1 AND be reflective.
export const cosineFunc = (x: number) => {
    return 0.5 - Math.cos(x * Math.PI) / 2; // gives first half of sine
}

export const squared = (x: number) => Math.pow(x, 2);

export const getKeypoints = (keypointCount: number) => {
    const points = [];
    for (let point = 0; point <= 1; point += 1 / keypointCount) {
        points.push(point);
    }
    return points;
}

export const getScaledPoints = (func: (x: number) => number, yScale: number, keypointCount: number, round: boolean = true) => {
    const keypoints = getKeypoints(keypointCount);
    const scaled = keypoints
        .map(func)
        .map((point) => round ? Math.round(yScale * point) : yScale * point);
    return scaled;
}

export const getDerivated = (yValues: number[], intermediatesPerKeypoint: number, accuracy: number) => {
    const derivated = [];
    for (let i = 0; i < yValues.length - 1; i++) {
        const diff = yValues[i + 1] - yValues[i];
        derivated.push(Math.floor(diff * accuracy / intermediatesPerKeypoint));
    }
    return derivated
}

const expo1 = exponentialFunc(2);
const expo2 = exponentialFunc(4.2);
const expo3 = exponentialFunc(5.5);
const linear = (x: number) => x;
const log1 = logarithmicFunc(1.35);
const log2 = logarithmicFunc(1.6);
const log3 = logarithmicFunc(2);
const cosine = cosineFunc;
const square = (x: number) => 0;
const random = (x: number) => 0.75;


export const getCurveFunc = (ctrl: ControllerConfig, curveIndex: number) => {
    const curve: Curve = ctrl.values?.[curveIndex] || 0
    return curveFuncs[curve]
}

export const curveFuncs = {
    [Curve.COSINE]: cosine,
    [Curve.EXP_3]: expo3,
    [Curve.EXP_2]: expo2,
    [Curve.EXP_1]: expo1,
    [Curve.LIN]: linear,
    [Curve.LOG_1]: log1,
    [Curve.LOG_2]: log2,
    [Curve.LOG_3]: log3,
    [Curve.LFO_SQUARE]: square,
    [Curve.LFO_RANDOM]: random
}

/*
const testInterpolation = (
    func: (x: number) => number,
    yScale: number,
    keypointCount: number,
    intermediatesPerKeypoint: number,
    accuracy: number
) => {
    const scaledPoints = getScaledPoints(func, yScale, keypointCount);
    const derivated = getDerivated(scaledPoints, intermediatesPerKeypoint, accuracy);

    for(let i=0; i<scaledPoints.length-1; i++){
        for(let j=0; j<intermediatesPerKeypoint; j++){
            console.log(scaledPoints[i] + Math.floor(derivated[i] * j / accuracy))
        }
    }
}

testInterpolation(log, 65535, 256,256, 256)
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateAndPrintTables = (
    yScale: number,
    keypointCount: number,
    intermediatesPerKeypoint: number,
    accuracy: number
) => {
    let valueStrings: string[] = []
    let slopeStrings: string [] = []
    Object
        .values(Curve)
        .forEach((curve) => {
            if (!(typeof curve === "string")) {
                const name = curveNames[curve]
                console.log(curve)
                const values = getScaledPoints(curveFuncs[curve], yScale, keypointCount)
                const slopes = getDerivated(values, intermediatesPerKeypoint, accuracy)
                valueStrings.push(`// ${name}\n{\n${values.slice(0, values.length - 1).join(',\n')}\n}`)
                slopeStrings.push(`// ${name}\n{\n${slopes.join(',\n')}\n}`)
            }
        })

    console.log(`const uint16_t values[CURVE_VARIATIONS][CURVE_SAMPLES] = {\n${valueStrings.join(',\n')}\n};`);
    console.log(`const uint16_t slopes[CURVE_VARIATIONS][CURVE_SAMPLES] = {\n${slopeStrings.join(',\n')}\n};`);
}

// Uncomment if you want to generate tables for teensy/c++ again
generateAndPrintTables( 65536, 256,256, 256)

const curveCalculator = {
    logarithmicFunc,
    exponentialFunc,
    squared,
    getKeypoints,
}

export default curveCalculator