export function isNumeric(number?: any): number is number {
    if (number === undefined || number === null || number === '') return false
    return !Number.isNaN(Number(number))
}
