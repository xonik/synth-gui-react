
let currentVoiceGroupIndex = 0;

export function getVoiceGroupIndex(): number {
    console.log('Got group', currentVoiceGroupIndex)
    return currentVoiceGroupIndex
}

export function setVoiceGroupIndex(voiceGroupIndex: number) {
    console.log('Set group', voiceGroupIndex)
    currentVoiceGroupIndex = voiceGroupIndex
}
