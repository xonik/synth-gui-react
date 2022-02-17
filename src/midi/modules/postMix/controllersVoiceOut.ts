import CC from '../../mapCC'
import { FuncProps, ControllerConfigCC } from '../../types'
import { ControllerIdDst } from '../../controllerIds'


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
        id: ControllerIdDst.VOICE_OUT_PAN,
        label: 'Pan',
        isDstDigi: true,
        type: 'pot',
        cc: CC.VOICE_OUT_PAN
    },
    AMOUNT: {
        id: ControllerIdDst.VOICE_OUT_AMOUNT,
        label: 'Level',
        isDstDigi: true,
        type: 'pot',
        cc: CC.VOICE_OUT_AMOUNT
    },
    FX1_SEND: {
        id: ControllerIdDst.VOICE_OUT_FX1_SEND,
        label: 'FX1',
        isDstDigi: true,
        type: 'pot',
        cc: CC.VOICE_OUT_FX1_SEND
    },
    FX2_SEND: {
        id: ControllerIdDst.VOICE_OUT_FX2_SEND,
        label: 'FX2',
        isDstDigi: true,
        type: 'pot',
        cc: CC.VOICE_OUT_FX2_SEND
    },
}

export default controllersVoiceOut