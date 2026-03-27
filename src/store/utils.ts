export function getBounded(value: number, min: number = 0, max: number = 1): number {
    if (value > max) return max
    if (value < min) return min
    return value
}

export function getQuantized(value: number, factor: number = 65535): number {
    return Math.round(value * factor) / factor
}

export function step(value: number): number {
    return Math.sign(value)
}
