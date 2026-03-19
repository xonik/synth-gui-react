/**
 * Per-voice-group patch store using Zustand with immer.
 *
 * Each voice group gets its own store instance. The store holds the
 * actual synth parameter values in a human-readable structure that
 * can be directly serialized to JSON for patch save/load.
 *
 * Uses immer for state updates — mutate the draft directly in set():
 *   store.getState().set(state => { state.envelopes[0].stages.attack.time = 0.5 })
 */

import { createStore, StoreApi } from 'zustand/vanilla'
import { useStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { VOICE_GROUPS } from '../utils/constants'

export interface EnvelopeStageState {
    time: number
    level: number
    curve: number
    enabled: number
}

export interface EnvelopeState {
    stages: {
        delay: EnvelopeStageState
        attack: EnvelopeStageState
        decay1: EnvelopeStageState
        decay2: EnvelopeStageState
        sustain: EnvelopeStageState
        release1: EnvelopeStageState
        release2: EnvelopeStageState
    }
    invert: number
    bipolar: number
    loop: number
    loopMode: number
    maxLoops: number
    velocity: number
    resetOnTrigger: number
    releaseMode: number
    offset: number
}

export interface LfoStageState {
    curve: number
    enabled: number
}

export interface LfoState {
    rate: number
    depth: number
    delay: number
    shape: number
    sync: number
    stages: {
        [stageId: number]: LfoStageState
    }
}

export interface OscillatorState {
    range: number
    pitch: number
    note: number
    detune: number
    waveform: number
    sub1: number
    sub2: number
    pw: number
    sync: number
    mode: number
    subWave: number
    wheel: number
    lfo: number
    kbd: number
    sawInv: number
    preFilterSine: number
}

export interface FilterState {
    input: number
    resonance: number
    cutoff: number
    fmAmt: number
    wheelAmt: number
    envAmt: number
    lfoAmt: number
    kbdAmt: number
    extCv: number
    slope: number
    fmMode: number
    filterType: number
    fmSrc: number
}

export interface SrcMixState {
    levelOsc1: number
    levelOsc2: number
    levelOsc3: number
    levelNoise: number
    levelRingMod: number
    levelExtAudio: number
}

export interface FxState {
    distortion: {
        drive: number
        level: number
        in: number
        out: number
    }
    bitCrusher: {
        bits: number
        rate: number
        recon: number
        in: number
        out: number
    }
}

export interface OutputState {
    volume: number
    spread: number
    headphones: number
}

export interface PostMixState {
    lpf: number
    svf: number
    sine1: number
    sine2: number
    pan: number
    amount: number
    fx1Send: number
    fx2Send: number
}

export type ModulationState = {
    [sourceId: number]: {
        [dstId: number]: {
            [dstCtrlIndex: number]: number
        }
    }
}

export interface NoiseState {
    colour: number
}

export interface RingModState {
    source: number
}

export interface KbdState {
    portamento: number
    unisonDetune: number
    hold: number
    chord: number
    mode: number
    transpose: number
    voiceStealing: number
}

export interface DspState {
    param1: number
    param2: number
    param3: number
    effect: number
    source: number
}

export interface CommonFxState {
    dsp1: DspState
    dsp2: DspState
    chorus: {
        rate: number
        depth: number
        mode: number
    }
}

export interface VoiceGroupPatch {
    envelopes: EnvelopeState[]
    lfos: LfoState[]
    oscillators: OscillatorState[]
    filters: FilterState[]
    srcMix: SrcMixState
    fx: FxState
    output: OutputState
    postMix: PostMixState
    mods: ModulationState
    noise: NoiseState
    ringMod: RingModState
    kbd: KbdState
    commonFx: CommonFxState
}

export interface PatchStoreActions {
    /**
     * Update state using immer — mutate the draft directly:
     *   store.getState().set(state => { state.envelopes[0].stages.attack.time = 0.5 })
     */
    set: (mutator: (state: VoiceGroupPatch) => void) => void

    loadPatch: (patch: VoiceGroupPatch) => void
    getPatch: () => VoiceGroupPatch
}

export type PatchStore = VoiceGroupPatch & PatchStoreActions

const defaultEnvelope = (): EnvelopeState => ({
    stages: {
        delay: {
            time: 0,
            level: 0,
            curve: 4,
            enabled: 0,
        },
        attack: {
            time: 0.001,
            level: 0,
            curve: 5,
            enabled: 1,
        },
        decay1: {
            time: 0.5,
            level: 1,
            curve: 5,
            enabled: 1,
        },
        decay2: {
            time: 0.001,
            level: 0.5,
            curve: 4,
            enabled: 0,
        },
        sustain: {
            time: 0,
            level: 0.5,
            curve: 4,
            enabled: 1,
        },
        release1: {
            time: 0.001,
            level: 0.5,
            curve: 5,
            enabled: 0,
        },
        release2: {
            time: 0.003,
            level: 0.5,
            curve: 5,
            enabled: 1,
        },
    },
    invert: 0,
    bipolar: 0,
    loop: 0,
    loopMode: 0,
    maxLoops: 2,
    velocity: 0,
    resetOnTrigger: 0,
    releaseMode: 0,
    offset: 0,
})

const defaultLfo = (): LfoState => ({
    rate: 0.5,
    depth: 1,
    delay: 0,
    shape: 0,
    sync: 0,
    stages: {},
})

const defaultOscillator = (): OscillatorState => ({
    range: 0,
    pitch: 0,
    note: 0,
    detune: 0,
    waveform: 0,
    sub1: 0,
    sub2: 0,
    pw: 0.5,
    sync: 0,
    mode: 0,
    subWave: 0,
    wheel: 0,
    lfo: 0,
    kbd: 0,
    sawInv: 0,
    preFilterSine: 0,
})

const defaultFilter = (): FilterState => ({
    input: 0,
    resonance: 0,
    cutoff: 1,
    fmAmt: 0,
    wheelAmt: 0,
    envAmt: 0,
    lfoAmt: 0,
    kbdAmt: 0,
    extCv: 0,
    slope: 0,
    fmMode: 0,
    filterType: 0,
    fmSrc: 0,
})

export const defaultVoiceGroupPatch = (): VoiceGroupPatch => ({
    envelopes: Array.from({ length: 5 }, defaultEnvelope),
    lfos: Array.from({ length: 4 }, defaultLfo),
    oscillators: Array.from({ length: 3 }, defaultOscillator),
    filters: Array.from({ length: 2 }, defaultFilter),
    srcMix: {
        levelOsc1: 1,
        levelOsc2: 0,
        levelOsc3: 0,
        levelNoise: 0,
        levelRingMod: 0,
        levelExtAudio: 0,
    },
    fx: {
        distortion: {
            drive: 0,
            level: 0,
            in: 0,
            out: 0,
        },
        bitCrusher: {
            bits: 1,
            rate: 1,
            recon: 0,
            in: 0,
            out: 0,
        },
    },
    output: {
        volume: 0.75,
        spread: 0.5,
        headphones: 0.75,
    },
    postMix: {
        lpf: 1,
        svf: 0,
        sine1: 0,
        sine2: 0,
        pan: 0.5,
        amount: 1,
        fx1Send: 0,
        fx2Send: 0,
    },
    mods: {},
    noise: {
        colour: 0.5,
    },
    ringMod: {
        source: 0,
    },
    kbd: {
        portamento: 0,
        unisonDetune: 0,
        hold: 0,
        chord: 0,
        mode: 0,
        transpose: 0,
        voiceStealing: 0,
    },
    commonFx: {
        dsp1: {
            param1: 0,
            param2: 0,
            param3: 0,
            effect: 0,
            source: 0,
        },
        dsp2: {
            param1: 0,
            param2: 0,
            param3: 0,
            effect: 0,
            source: 0,
        },
        chorus: {
            rate: 0,
            depth: 0,
            mode: 0,
        },
    },
})

export function createPatchStore(): StoreApi<PatchStore> {
    return createStore<PatchStore>()(
        immer((set, get) => ({
            ...defaultVoiceGroupPatch(),

            set: (mutator: (state: VoiceGroupPatch) => void) => {
                set(mutator)
            },

            loadPatch: (patch: VoiceGroupPatch) => {
                set(() => ({ ...patch }))
            },

            getPatch: (): VoiceGroupPatch => {
                const { set: _set, loadPatch, getPatch, ...patch } = get()
                return patch
            },
        }))
    )
}

export const voiceGroupStores: StoreApi<PatchStore>[] = Array.from(
    { length: VOICE_GROUPS },
    () => createPatchStore()
)

export function useVoiceGroupStore<T>(
    voiceGroupIndex: number,
    selector: (state: PatchStore) => T,
): T {
    return useStore(voiceGroupStores[voiceGroupIndex], selector)
}
