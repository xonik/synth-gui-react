export const WAVETABLE_COUNT = 128
export const BANK_COUNT = 128
export const WAVES_PER_BANK = 64
export const MAX_POSITION = 63

export const defaultWavetableNames: string[] = Array.from({ length: WAVETABLE_COUNT }, (_, i) => `Wavetable ${i + 1}`)

export const bankNames: string[] = Array.from({ length: BANK_COUNT }, (_, i) => `Bank ${i + 1}`)

export const waveNames: string[][] = Array.from({ length: BANK_COUNT }, () =>
    Array.from({ length: WAVES_PER_BANK }, (_, waveIndex) => `Wave ${waveIndex + 1}`)
)
