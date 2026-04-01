import { VOICE_GROUPS } from '@/utils/constants'

interface MidiSettings {
    globalMidiChannel: number
    voiceGroupMidiChannels: number[]
}

const settings: MidiSettings = {
    globalMidiChannel: 0,
    voiceGroupMidiChannels: Array.from({ length: VOICE_GROUPS }, (_, i) => i),
}

export const getGlobalMidiChannel = () => settings.globalMidiChannel
export const getVoiceGroupMidiChannel = (voiceGroupIndex: number) => settings.voiceGroupMidiChannels[voiceGroupIndex]
export const getVoiceGroupIdFromMidiChannel = (channel: number) => {
    return settings.voiceGroupMidiChannels.indexOf(channel)
}

export const setGlobalMidiChannel = (channel: number) => {
    settings.globalMidiChannel = channel
}
export const setVoiceGroupMidiChannel = (voiceGroupId: number, channel: number) => {
    settings.voiceGroupMidiChannels[voiceGroupId] = channel
}
