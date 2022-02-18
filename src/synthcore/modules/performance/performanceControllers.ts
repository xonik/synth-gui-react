import { ControllerConfig, FuncProps } from '../../../midi/types'
import { ControllerIdSrc } from '../../../midi/controllerIds'

interface PerformanceControllers {
    props: FuncProps
    PITCH_BEND: ControllerConfig
    MOD_WHEEL: ControllerConfig
    RIBBON_POS: ControllerConfig
    RIBBON_PRESSURE: ControllerConfig
    KBD_PITCH: ControllerConfig
    KBD_VELOCITY: ControllerConfig
    KBD_AFTERTOUCH: ControllerConfig
}

const performanceControllers: PerformanceControllers = {
    props: { label: 'Play controls' },
    PITCH_BEND: {
        id: ControllerIdSrc.PERF_PITCH_BEND,
        label: 'Pitch bend',
        type: 'pot',
        isSourceDigi: true,
    },
    MOD_WHEEL: {
        id: ControllerIdSrc.PERF_MOD_WHEEL,
        label: 'Mod wheel',
        type: 'pot',
        isSourceDigi: true,
    },
    RIBBON_POS: {
        id: ControllerIdSrc.PERF_RIBBON_POS,
        label: 'Ribbon position',
        type: 'pot',
        isSourceDigi: true,
    },
    RIBBON_PRESSURE: {
        id: ControllerIdSrc.PERF_RIBBON_PRESSURE,
        label: 'Ribbon pressure',
        type: 'pot',
        isSourceDigi: true,
    },
    KBD_PITCH: {
        id: ControllerIdSrc.PERF_KBD_PITCH,
        label: 'Pitch',
        type: 'pot',
        isSourceDigi: true,
    },
    KBD_VELOCITY: {
        id: ControllerIdSrc.PERF_KBD_VELOCITY,
        label: 'Velocity',
        type: 'pot',
        isSourceDigi: true,
    },
    KBD_AFTERTOUCH: {
        id: ControllerIdSrc.PERF_KBD_AFTERTOUCH,
        label: 'Aftertouch',
        type: 'pot',
        isSourceDigi: true,
    }
}

export default performanceControllers