import type { Route } from '@/midi/midibus'

export const VOICE_ALL = -1

export const routeForVoice = (voice: number): Route =>
    voice === VOICE_ALL ? { type: 'all' } : { type: 'voice', index: voice }
