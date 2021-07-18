import { ApiSource } from '../synthcore/types'

export const shouldSend = (source: ApiSource) => {
    // TODO: Make this configurable
    return source !== ApiSource.MIDI
}

