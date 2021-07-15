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
    OFF,
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
    resetOnTrigger: boolean;
    resetLevel: number;
    releaseMode: ReleaseMode;
    stages: Stage[];
    loopMode: LoopMode;
    loopEnabled: boolean;
    maxLoops: number;
    invert: boolean;
    bipolar: boolean;
}


export const MIN_LEVEL = 100;
export const MAX_LEVEL = 100;
export const MIN_TIME = 1; //ms
export const MAX_TIME = 65536; // approx 1 minute.

export enum EnvControllerId {
    ENV_DELAY,
    ENV_ATTACK,
    ENV_DECAY1,
    ENV_DECAY2,
    ENV_SUSTAIN,
    ENV_RELEASE1,
    ENV_RELEASE2,
    ENV_D2_LEVEL,
    ENV_R2_LEVEL,
    ENV_SELECT_ENV3ID,
    ENV_LOOP,
    ENV_TRIGGER,
    ENV_INVERT,
}
