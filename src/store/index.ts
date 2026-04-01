// Zustand-based store infrastructure
//
// Patch state (per voice group) — uses immer for direct mutation:
//   const { displayValue, increment } = usePot(
//       s => s.envelopes[0].stages.attack.time,
//       (s, v) => { s.envelopes[0].stages.attack.time = v },
//       { responseMapper: timeResponseMapper }
//   )
//
// Outside React (e.g., MIDI callbacks):
//   voiceGroupStores[0].getState().set(s => { s.envelopes[0].stages.attack.time = 0.5 })
//
// UI state (transient, not saved):
//   const screen = useUiStore(s => s.currentScreen)
//
// Patch save/load:
//   const json = serializePatch(createPatchFile('My Patch'))
//   loadPatchFile(deserializePatch(json))

export type { GlobalPatchState } from './globalStore'
export { globalStore, useGlobalStore } from './globalStore'
export { useButton, usePatchValue, usePot } from './hooks'
export {
    createPatchFile,
    deserializePatch,
    loadPatchFile,
    loadPatchToVoiceGroup,
    resetAllStores,
    resetCurrentVoiceGroup,
    serializePatch,
} from './patchSerializer'
export type { EnvelopeState, LfoStages, LfoState, OscillatorState, PatchStore, VoiceGroupPatch } from './patchStore'
export { defaultVoiceGroupPatch, useVoiceGroupStore, voiceGroupStores } from './patchStore'
export type { ParamConfig, ResponseMapper } from './types'
export { ScreenId, useUiStore } from './uiStore'
