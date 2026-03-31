import type { ApiSource } from '@/synthcore/types'

export const shouldSend = (_source: ApiSource) => {
    // TODO: Make this configurable
    // return source !== ApiSource.MIDI
    return true
}
