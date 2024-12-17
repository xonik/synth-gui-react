
// This feels very weird, having this outside of the global state. But it works, toggling the
// used store/reducer when it changes, probably since it is set using an action and everything rerenders afterwards,
// fetching the values again.
import { ControllerConfig } from "../midi/types";

export let selectedVoiceGroup: number = 0
export const globalGroup: number = 8
export function setSelectedVoiceGroup(voiceGroup: number) {
    selectedVoiceGroup = voiceGroup
}

export function getVoiceGroupId(ctrl?: ControllerConfig): number {
    if(ctrl?.global){
        return globalGroup
    } else {
        return selectedVoiceGroup
    }
}