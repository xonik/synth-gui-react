export enum StageId {
    DELAY,
    ATTACK,
    DECAY,
    STOPPED,
}

export enum Curve {
    EXP1,
    EXP2,
    EXP3,
    LIN,
    LOG1,
    LOG2,
    LOG3,
}

export type Stage = {
    id: StageId;
    enabled: boolean;
    curve: Curve;
    level: number; //-1 to 1
    time: number; // 0 to 1
};

export type Lfo = {
    id: number;
    rate: number;
    depth: number;
    shape: number
    sync: number;
    once: number;
    resetOnTrigger: number;
    stages: Stage[];

    /*
    resetLevel: number;
    releaseMode: ReleaseMode;
    loopMode: LoopMode;
    loopEnabled: boolean;
    maxLoops: number;
    invert: boolean;
    bipolar: boolean;
     */
}


export const MIN_LEVEL = 100;
export const MAX_LEVEL = 100;
export const MIN_TIME = 1; //ms
export const MAX_TIME = 65536; // approx 1 minute.

export enum LfoControllerId {
    LFO_ID,
    RATE,
    DEPTH,
    DELAY,
    SHAPE,
    SYNC,
    RESET,
    ONCE,
    OUTPUT,
}
