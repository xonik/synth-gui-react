
/*
Converts a linear input in the range 0-inputMax to an exponential curve with the requested dB range.
The curve will always end at outputMax, but depending on the range it will end above 0 (the increase
from the lowest to the highest value will be the exact number of dB requested).

If stretchY is true, the resulting curve will be scaled to fit 0 to outputMax. That way the CURVE
will resemble a dB curve, but the actual range and change will not. Instead, varying dB will
change the steepness of the curve. This may give a better effect when doing selectable reponse, and
has the added benefit of always starting at 0. For a 60dB curve the error is extremely small (around 1/1000).

if rising is false, the curve will start at outputMax and drop to min instead of start at min.

See https://atosynth.blogspot.com/2021/01/trying-to-create-cv-curve-to-convert.html for more about dB and curves
 */
export const getLinearToDBMapper = (
    inputMax: number,
    outputMax: number,
    db: number,
    rising: boolean = true,
    stretchY = false,
) => {

    const outputFunc = (input: number) => {
        const index = rising ? inputMax - input : input

        // NB: Describes a falling curve, input 0 gives outputMax.
        return outputMax * Math.pow(10, (-db) * ((index)/inputMax) / 20)
    }

    if(stretchY) {
        const minValueIndex = rising ? 0 : inputMax
        const outputMin = outputFunc(minValueIndex)

        return (input: number) => outputMax * (outputFunc(input) - outputMin) / (outputMax - outputMin)
    } else {
        return outputFunc;
    }
}

export const getMapperWithFade = (
    convertFunc: (input: number) => number,
    inputMax: number,
    rising: boolean = true,
    fadeLength = 0,
) => (input: number) => {
    if (rising && input < fadeLength) {
        const fadeEnd = convertFunc(fadeLength)
        return (input * fadeEnd) / fadeLength;
    } else if(!rising && input > inputMax - fadeLength){
        const fadeEnd = convertFunc(inputMax - fadeLength)
        return ((inputMax - input) * fadeEnd) / fadeLength;
    } else {
        return convertFunc(input)
    }
}

// float 0 is hard.
const epsilon: number = 0.001;
export const isZero = (A: number) => {
    return (Math.abs(A) < epsilon);
}

/**
 * create an exponential transfer function, mapping 0 to mapLength-1 into 0 to outputMax. How steep
 * the curve should be is controlled by steepness.
 *
 * steepnesses in the range -4 to 4 work best.
 * PS: steepness may be negative to get a fast rise at the start!
 *
 * NB: Input is 0 to maxInput!
 */
export const getLinearToExpMapper = (maxInput: number, outputRange: number, steepness: number) => {

    const a = 1.0 / ( Math.pow(10.0, steepness) -1.0 );

    return (input: number) => {
        // special case, linear result
        if(isZero(steepness)){
            return input * outputRange / maxInput;
        }

        return outputRange * (a * Math.pow(10.0, steepness * (input / maxInput)) - a);
    }
}

/**
 * bipolar version of the curve above, use with min -32767 and range 65534 for a -32767 to 32767 output.
 *
 * NB: Input is 0 to maxInput!
 */
export const getLinearToExpBipolarMapper = (maxInput: number, outputMin: number, outputRange: number, steepness: number) => {

    // Slight protection against overflowing ranges since the output has to fit an int16_t
    const adjustedRange = outputRange + outputRange > 32767 ? 32767 - outputMin  : outputRange;

    const a = 1.0 / ( Math.pow(10.0, steepness) -1.0 ); //NB! use decimal numbers to force float math

    return (input: number) => {
        // special case, linear result
        if(isZero(steepness)){
            return outputMin + input * adjustedRange / maxInput;
        }

        return outputMin + adjustedRange * (a * Math.pow(10.0, steepness * (input / maxInput)) - a);
    }
}

// A binary search way of finding the inverse of a function. We expect input to be a float between
// 0 and 1. Since binary search is discrete but the mapper function is continuous, we need a resolution,
// e.g. how many steps to try during searching.
export const inverse = (mapper: (input: number) => number, resolution: number) => (x: number) => {

    // x is a number between 0 and resolution
    const search = (start: number, end: number): number => {

        // Base Condition
        if (start > end) return end / resolution

        let mid = Math.floor((start + end) / 2)

        // The mapper function takes an input in the range 0-1 so we need to scale
        // our value before mapping.
        const midIndex = mid / resolution
        const valueForMidIndex = mapper(midIndex)

        // Compare mid with given key x
        if (valueForMidIndex === x) return midIndex

        if (valueForMidIndex > x) {
            // search in the left half of mid
            return search(start, mid - 1)
        } else {
            // search in the right half of mid
            return search(mid + 1, end)
        }
    }

    return search(0, resolution)
}
