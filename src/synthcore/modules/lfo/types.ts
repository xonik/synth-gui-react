import { Curve } from './generatedTypes'

export { Curve } from './generatedTypes'


export enum StageId {
    DELAY,
    ATTACK,
    DECAY,
    STOPPED,
}

export const NUMBER_OF_LFOS = 4
export const NUMBER_OF_LFO_STAGES = Object.keys(StageId).length / 2

export enum LoopMode {
    COUNTED,
    INFINITE,
}

export type Stage = {
    id: StageId;
    enabled: number;
    curve: Curve;
    time?: number; // 0 to 1
};

export type Lfo = {
    id: number;
    loopMode: LoopMode;
    loopEnabled: boolean;
    maxLoops: number;
    invert: boolean;
    bipolar: boolean;

    time: number;
    depth: number;
    balance: number;
    offset: number;
    phaseOffset: number;
    randomPhase: boolean;
    resetOnTrigger: boolean;
    resetOnStop: boolean;
    resetLevelOnClock: boolean;
    syncToClock: boolean;

    // convenience stuff
    timeOffset: number;
    timeOffsetStage: number;
}