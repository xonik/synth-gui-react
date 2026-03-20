export function getBounded(value: number, min: number, max: number): number {
    if (value > max) return max
    if (value < min) return min
    return value
}

export function getQuantized(value: number, factor: number = 65535): number {
    return Math.round(value * factor) / factor
}
