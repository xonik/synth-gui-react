import { ControllerConfig, FuncProps } from '../../types'
import { ControllerId } from '../../controllerIds'

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
        id: ControllerId.PERF_PITCH_BEND,
        label: 'Pitch bend',
        type: 'pot',
        isSourceDigi: true,
    },
    MOD_WHEEL: {
        id: ControllerId.PERF_MOD_WHEEL,
        label: 'Mod wheel',
        type: 'pot',
        isSourceDigi: true,
    },
    RIBBON_POS: {
        id: ControllerId.PERF_RIBBON_POS,
        label: 'Ribbon position',
        type: 'pot',
        isSourceDigi: true,
    },
    RIBBON_PRESSURE: {
        id: ControllerId.PERF_RIBBON_PRESSURE,
        label: 'Ribbon pressure',
        type: 'pot',
        isSourceDigi: true,
    },
    KBD_PITCH: {
        id: ControllerId.PERF_KBD_PITCH,
        label: 'Pitch',
        type: 'pot',
        isSourceDigi: true,
    },
    KBD_VELOCITY: {
        id: ControllerId.PERF_KBD_VELOCITY,
        label: 'Velocity',
        type: 'pot',
        isSourceDigi: true,
    },
    KBD_AFTERTOUCH: {
        id: ControllerId.PERF_KBD_AFTERTOUCH,
        label: 'Aftertouch',
        type: 'pot',
        isSourceDigi: true,
    }
}