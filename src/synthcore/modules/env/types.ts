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

export type Envelope = {
    id: number;
    controllers: {[key: number]: number}
    /*
    resetOnTrigger: boolean;
    resetLevel: number;
    releaseMode: ReleaseMode;
    loopMode: LoopMode;
    loopEnabled: boolean;
    maxLoops: number;
    invert: boolean;
    */
    bipolar: boolean;
    stages: Stage[];
}


export const MIN_LEVEL = 100;
export const MAX_LEVEL = 100;
export const MIN_TIME = 1; //ms
export const MAX_TIME = 65536; // approx 1 minute.
