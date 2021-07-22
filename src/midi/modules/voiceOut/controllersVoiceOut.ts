import CC from '../../mapCC'
import { FuncProps, ControllerConfigCC } from '../../types'


interface ControllersVoiceOut {
    props: FuncProps
    PAN: ControllerConfigCC
    AMOUNT: ControllerConfigCC
    FX1_SEND: ControllerConfigCC
    FX2_SEND: ControllerConfigCC
}

const controllersVoiceOut: ControllersVoiceOut = {
    props: { label: 'Voice out' },
    PAN: {
        label: 'Pan',
        isTargetDigi: true,
        type: 'pot',
        cc: CC.VOICE_OUT_PAN
    },
    AMOUNT: {
        label: 'Level',
        isTargetDigi: true,
        type: 'pot',
        cc: CC.VOICE_OUT_AMOUNT
    },
    FX1_SEND: {
        label: 'FX1',
        isTargetDigi: true,
        type: 'pot',
        cc: CC.VOICE_OUT_FX1_SEND
    },
    FX2_SEND: {
        label: 'FX2',
        isTargetDigi: true,
        type: 'pot',
        cc: CC.VOICE_OUT_FX2_SEND
    },
}

export default controllersVoiceOut