// All functions are rising between 0, 0 and 1, 1

export const exponentialFunc = (sharpness: number) => {
    const a = 1 / (Math.exp(sharpness) - 1)

    return (x: number) => {
        return a*Math.exp(sharpness*x) - a;
    }
}

export const logarithmicFunc = (sharpness: number) => {
    const a = 1 / (Math.pow(10,sharpness) - 1)

    return (x: number) => {
        return Math.log10(x+a) / sharpness -Math.log10(a) / sharpness
    }
}

export const squared = (x: number) => Math.pow(x, 2);

export const getKeypoints = (keypointCount: number) => {
    const points = [];
    for(let point=0; point<=1; point+= 1/keypointCount){
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
    for(let i = 0; i<yValues.length-1; i++){
        const diff = yValues[i+1] - yValues[i];
        derivated.push(Math.floor(diff * accuracy / intermediatesPerKeypoint));
    }
    return derivated
}

const expo1 = exponentialFunc(2);
const expo2 = exponentialFunc(4.2);
const expo3 = exponentialFunc(5.5);
const linear = (x:number) => x;
const log1 = logarithmicFunc(1.35);
const log2 = logarithmicFunc(1.6);
const log3 = logarithmicFunc(2);

export const curveFuncs = [
    expo3,
    expo2,
    expo1,
    linear,
    log1,
    log2,
    log3,
]

export const curveNamesForCpp = [
    'expo3',
    'expo2',
    'expo1',
    'linear',
    'log1',
    'log2',
    'log3',
]

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
    const valuesForAllFuncs = curveFuncs.map((curveFunc) => getScaledPoints(curveFunc, yScale, keypointCount))
    const slopesForAllFuncs = valuesForAllFuncs.map((scaledPoints) => getDerivated(scaledPoints, intermediatesPerKeypoint, accuracy))

    const valueStrings = valuesForAllFuncs.map((values, index) => {
        return `// ${curveNamesForCpp[index]}\n{\n${values.slice(0, values.length-1).join(',\n')}\n}`
    })

    const slopeStrings = slopesForAllFuncs.map((slopes, index) => {
        return `// ${curveNamesForCpp[index]}\n{\n${slopes.join(',\n')}\n}`
    })
    console.log(`const uint16_t values[CURVE_VARIATIONS][CURVE_SAMPLES] = {\n${valueStrings.join(',\n')}\n};`);
    console.log(`const uint16_t slopes[CURVE_VARIATIONS][CURVE_SAMPLES] = {\n${slopeStrings.join(',\n')}\n};`);
}

// Uncomment if you want to generate tables for teensy/c++ again
// generateAndPrintTables( 65536, 256,256, 256)

export default {
    logarithmicFunc,
    exponentialFunc,
    squared,
    getKeypoints,
}