// New Zustand-based store infrastructure
//
// Usage:
//   import { usePot, useButton, usePatchValue, useUiStore } from '../store'
//
// Patch state (per voice group):
//   const { displayValue, increment } = usePot('envelopes.0.stages.attack.time', {
//       responseMapper: timeResponseMapper,
//   })
//
// UI state (transient, not saved):
//   const screen = useUiStore(s => s.currentScreen)
//   const setScreen = useUiStore(s => s.setScreen)
//
// Patch save/load:
//   import { createPatchFile, serializePatch, loadPatchFile, deserializePatch } from '../store'
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
