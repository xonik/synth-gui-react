export enum ControllerGroupIds {
    ENV,
    MAIN_DISP
}

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
    ENV_SELECT,
    ENV_LOOP,
    ENV_TRIGGER,
}

export const envControllerIds = [
    EnvControllerId.ENV_DELAY,
    EnvControllerId.ENV_ATTACK,
    EnvControllerId.ENV_DECAY1,
    EnvControllerId.ENV_DECAY2,
    EnvControllerId.ENV_SUSTAIN,
    EnvControllerId.ENV_RELEASE1,
    EnvControllerId.ENV_RELEASE2,
    EnvControllerId.ENV_D2_LEVEL,
    EnvControllerId.ENV_R2_LEVEL,
    EnvControllerId.ENV_SELECT,
    EnvControllerId.ENV_LOOP,
    EnvControllerId.ENV_TRIGGER,
]

export enum MainDisplayControllerIds {
    POT1,
    POT2,
    POT3,
    POT4,
    POT5,
    POT6,
    MENU_LFO,
    MENU_OSC,
    MENU_FILTER,
    MENU_ENVELOPE,
    MENU_MOD,
    MENU_FX,
    FUNC_HOME,
    FUNC_SETTINGS,
    FUNC_SHIFT,
    FUNC_PERFORM,
    FUNC_LOAD,
    FUNC_SAVE,
    FUNC_COMPARE,
    FUNC_ROUTE,
}