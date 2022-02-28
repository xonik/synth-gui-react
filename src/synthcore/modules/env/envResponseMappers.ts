import { getLinearToExpMapper, inverse } from '../../../midi/slopeCalculator'


export const timeResponseMapper = (() => {
    const output = getLinearToExpMapper(1, 1, 3.5)
    const input = inverse(output, 65534)
    return { input, output }
})()