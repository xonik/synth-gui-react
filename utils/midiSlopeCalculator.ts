
const desiredOffnessDB = -60
const inputMax = 127
const outputMax = 32767

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
const convertLinearToDB = (inputMax: number, outputMax: number, db: number, rising: boolean = true, stretchY = false) => {

    const outputFunc = (input: number) => {
        const index = rising ? inputMax - input : input
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

const convFunc = convertLinearToDB(127, 32767, 36, false, false);

for(let i=0; i<128; i++){
    console.log(i, Math.floor(convFunc((i))))
}