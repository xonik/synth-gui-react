import logger from '../../../utils/logger'

let currentVoiceGroupIndex = 0

export function getVoiceGroupIndex(): number {
    return currentVoiceGroupIndex
}

export function setVoiceGroupIndex(voiceGroupIndex: number) {
    currentVoiceGroupIndex = voiceGroupIndex
    logger.midi(`Voice group index set to ${voiceGroupIndex}`)
}
