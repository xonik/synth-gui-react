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

const expo = exponentialFunc(2.2);
const log = logarithmicFunc(2.2);

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

//testInterpolation(log, 65535, 256,256, 256)

export default {
    logarithmicFunc,
    exponentialFunc,
    squared,
    getKeypoints,
}