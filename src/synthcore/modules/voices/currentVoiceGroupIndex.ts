
let currentVoiceGroupIndex = 0;

export function getVoiceGroupIndex(): number {
    return currentVoiceGroupIndex
}

export function setVoiceGroupIndex(voiceGroupIndex: number) {
    currentVoiceGroupIndex = voiceGroupIndex
}
