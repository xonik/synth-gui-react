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

export { usePot, useButton, usePatchValue } from './hooks'
export { useUiStore, ScreenId } from './uiStore'
export { useGlobalStore, globalStore } from './globalStore'
export { voiceGroupStores, useVoiceGroupStore, defaultVoiceGroupPatch } from './patchStore'
export { createPatchFile, serializePatch, deserializePatch, loadPatchFile, loadPatchToVoiceGroup, resetCurrentVoiceGroup, resetAllStores } from './patchSerializer'
export type { VoiceGroupPatch, EnvelopeState, LfoState, PatchStore } from './patchStore'
export type { GlobalPatchState } from './globalStore'
export type { ResponseMapper, ParamConfig } from './types'
