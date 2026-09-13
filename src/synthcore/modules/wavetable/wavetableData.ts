export const WAVETABLE_COUNT = 128
export const WAVETABLE_BANK_COUNT = 3
export const BANK_COUNT = 128
export const WAVES_PER_BANK = 64
export const MAX_POSITION = 63

export const defaultWavetableNames: string[] = Array.from({ length: WAVETABLE_COUNT }, (_, i) => `Wavetable ${i + 1}`)

export const bankNames: string[] = Array.from({ length: BANK_COUNT }, (_, i) => `Bank ${i + 1}`)

export const wavetableBankNames = ['PPG', 'Prophet VS', 'User'] as const

export const PROPHET_VS_WAVETABLES: string[] = []
export const USER_WAVETABLES: string[] = Array.from({ length: WAVETABLE_COUNT }, (_, i) => `User ${i + 1}`)

export const waveNames: string[][] = Array.from({ length: BANK_COUNT }, () =>
    Array.from({ length: WAVES_PER_BANK }, (_, waveIndex) => `Wave ${waveIndex + 1}`)
)
