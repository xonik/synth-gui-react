import { FuncProps } from '../../types'

interface MidiControllersOut {
    props: FuncProps
}

const controllersPlay = {
    props: { label: 'Play controls' },
    PITCH_BEND: {
        label: 'Pitch bend',
        sourceDigit: true,
    },
    MOD_WHEEL: {
        label: 'Mod wheel',
        sourceDigit: true,
    },
    RIBBON_POS: {
        label: 'Ribbon position',
        sourceDigit: true,
    },
    RIBBON_PRESSURE: {
        label: 'Ribbon pressure',
        sourceDigit: true,
    },
    KBD_PITCH: {
        label: 'Pitch',
        sourceDigit: true,
    },
    KBD_VELOCITY: {
        label: 'Velocity',
        sourceDigit: true,
    },
    KBD_AFTERTOUCH: {
        label: 'Aftertouch',
        sourceDigit: true,
    }
}