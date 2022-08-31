import { getLinearToDBMapper, getLinearToExpMapper, getMapperWithFade, inverse } from '../../../midi/slopeCalculator'

export const dbLevelResponseMapper = (() => {
    // Env level in range 0 to 1.
    const unscaledOutput = getMapperWithFade(
        getLinearToDBMapper(1, 1, 23, true, false),
        1,
        true,
        10 / 65534, // When converting to midi, the 10 first (of 65534) entries will be a fade
    )

    // input is 0 to 1, or -1 to 1 for bipolar
    const output = (x: number, bipolar: boolean = false) => {
        if (bipolar) {
            const out = unscaledOutput(0.5 * x + 0.5)
            return 2 * (out - 0.5)
        } else {
            return unscaledOutput(x)
        }
    }
    const input = (x: number, bipolar: boolean = false) => {
        if (bipolar) {
            const adjIn = x * 0.5 + 0.5
            const out = inverse(unscaledOutput, 65534)(adjIn)
            return 2 * (out - 0.5)
        } else {
            return inverse(unscaledOutput, 65534)(x)
        }
    }

    return { input, output }
})()

// mapper for controllers that may be switched between uni and bipolar but where the output is always
// bipolar (so negative part is not used if unipolar)
export const uniBipolarLevelResponseMapper = (() => {

    const output = (x: number, bipolar: boolean = false) => {
        if (bipolar) {
            // x input as -1 to 1, output should be 0 to 1
            return 0.5 * x + 0.5;
        } else {
            // x input as 0 to 1, output should be 0.5 to 1
            return 0.5 + x / 2;
        }
    }
    const input = (x: number, bipolar: boolean = false) => {
        if (bipolar) {
            // x input as 0 to 1, output should be -1 to 1
            return 2 * (x - 0.5);
        } else {
            //x input as 0.5 to 1, output should be 0 to 1;
            return 2 * (x - 0.5);
        }
    }

    return { input, output }
})()

export const timeResponseMapper = (() => {
    const output = getLinearToExpMapper(1, 1, 3.5)
    const input = inverse(output, 65534)
    return { input, output }
})()