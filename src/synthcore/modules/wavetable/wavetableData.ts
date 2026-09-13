import { ppgWaves } from './ppg'
import { prophetVsWaves } from './prophetVs'

export const WAVETABLE_COUNT = 128
export const MAX_POSITION = 63

export const defaultWavetableNames: string[] = Array.from({ length: WAVETABLE_COUNT }, (_, i) => `Wavetable ${i + 1}`)

export const waveBanks = [
    { name: 'PPG', waves: ppgWaves },
    { name: 'Prophet VS', waves: prophetVsWaves },
] as const

export const bankNames = waveBanks.map((bank) => bank.name)

export const wavetableBankNames = ['PPG', 'Prophet VS', 'User'] as const

export const PROPHET_VS_WAVETABLES: string[] = []
export const USER_WAVETABLES: string[] = Array.from({ length: WAVETABLE_COUNT }, (_, i) => `User ${i + 1}`)
