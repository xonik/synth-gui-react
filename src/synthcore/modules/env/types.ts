import { Curve } from './generatedTypes'
export { Curve } from './generatedTypes'

export enum StageId {
    DELAY,
    ATTACK,
    DECAY1,
    DECAY2,
    SUSTAIN,
    RELEASE1,
    RELEASE2,
    STOPPED,
}

export const NUMBER_OF_ENVELOPES = 5
export const NUMBER_OF_ENVELOPE_STAGES = Object.keys(StageId).length / 2

export enum ReleaseMode {
    NORMAL,
    SKIP_R1,
    FREE_RUN,
}

export enum LoopMode {
    GATED,
    COUNTED,
    INFINITE,
}

export type Stage = {
    id: StageId;
    enabled: number;
    curve: Curve;
    level: number; //-1 to 1
    time: number; // 0 to 1
};

export type Envelope = {
    id: number;
    resetOnTrigger: boolean;
    releaseMode: ReleaseMode;
    loopMode: LoopMode;
    loopEnabled: boolean;
    maxLoops: number;
    invert: boolean;
    bipolar: boolean;
    offset: number;
}