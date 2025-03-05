const maxOutput = 9.5
const desiredGain = 2
const clipperGain = 21
const diodeDrop = 0.65

// TODO: This is not correct as
// 1) the real result depends on the resistors chosen in the clipper stage
// 2) the max voltage drop is not 700mV, as some of the current flows in the
//    resistor
// It does however get us in the ballpark.

/*
Experimenting in LTSpice shows the differential voltage is never above 650mV so I think that's a better
number to use than 700mV, it's between the ideal 0.6 and diodeDropV

at 1k/10k and 12V in the drop is 600mV
at 10k/100k it is 540mV
at 1k/5k it is 580mV

 */

// when diode fully conducts, we have that x * opampGain = x + diodeDrop
// opampGain * x - x = diodeDrop
// x * (opampGain - 1) = diodeDrop
// x = diodeDrop / (opampGain - 1)
const clipperInput = diodeDrop / (clipperGain - 1)
const clipperOutput = diodeDrop + clipperInput

const outputGain = maxOutput / clipperOutput

// Similarly the diode starts conducting when y * opampGain = y + 0.5
// y = 0.5 / (opampGain - 1)
const clipperInputClippingStart = 0.5 / (clipperGain - 1)

const inputAttenuation = outputGain * clipperGain / desiredGain

const clippingStart = clipperInputClippingStart * inputAttenuation
const clippingEnd = clipperInput * inputAttenuation

console.log('----[ clipper params ]----')
console.log(` Requested max output: ${maxOutput}`)
console.log(` Requested total gain: ${desiredGain}`)
console.log('')
console.log(` clipper gain: ${clipperGain}`)
console.log(` output gain : ${outputGain.toFixed(2)}`)
console.log(` total gain  : ${(clipperGain * outputGain).toFixed(2)}`)
console.log('')
console.log(` max clipper output: ${clipperOutput.toFixed(3)}`)
console.log(` max clipper input: ${clipperInput.toFixed(3)}`)
console.log(` clipper start input: ${clipperInputClippingStart.toFixed(2)}`)
console.log('')
console.log(` input attenuation: ${inputAttenuation.toFixed(2)}`)
console.log('')
console.log(` input signal clipping start: ${clippingStart.toFixed(2)}`)
console.log(` input signal clipping end: ${clippingEnd.toFixed(2)}`)