import { ControllerConfig, FuncProps } from '../../types'

interface ControllersPerformance {
    props: FuncProps
    PITCH_BEND: ControllerConfig
    MOD_WHEEL: ControllerConfig
    RIBBON_POS: ControllerConfig
    RIBBON_PRESSURE: ControllerConfig
    KBD_PITCH: ControllerConfig
    KBD_VELOCITY: ControllerConfig
    KBD_AFTERTOUCH: ControllerConfig
}

export const controllersPerformance: ControllersPerformance = {
    props: { label: 'Play controls' },
    PITCH_BEND: {
        label: 'Pitch bend',
        type: 'pot',
        isSourceDigi: true,
    },
    MOD_WHEEL: {
        label: 'Mod wheel',
        type: 'pot',
        isSourceDigi: true,
    },
    RIBBON_POS: {
        label: 'Ribbon position',
        type: 'pot',
        isSourceDigi: true,
    },
    RIBBON_PRESSURE: {
        label: 'Ribbon pressure',
        type: 'pot',
        isSourceDigi: true,
    },
    KBD_PITCH: {
        label: 'Pitch',
        type: 'pot',
        isSourceDigi: true,
    },
    KBD_VELOCITY: {
        label: 'Velocity',
        type: 'pot',
        isSourceDigi: true,
    },
    KBD_AFTERTOUCH: {
        label: 'Aftertouch',
        type: 'pot',
        isSourceDigi: true,
    }
}