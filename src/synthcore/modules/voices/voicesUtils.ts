import { Voice } from './types'

export const getDefaultVoice = (id: number): Voice => ({
    id,
    state: id === 0 ? 1 : 0
})