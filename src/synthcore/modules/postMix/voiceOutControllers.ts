import CC from '../../../midi/mapCC'
import { FuncProps, ControllerConfigCC } from '../../../midi/types'
import { ControllerIdDst } from '../../../midi/controllerIds'


interface VoiceOutControllers {
    props: FuncProps
    PAN: ControllerConfigCC
    AMOUNT: ControllerConfigCC
    FX1_SEND: ControllerConfigCC
    FX2_SEND: ControllerConfigCC
}

const voiceOutControllers: VoiceOutControllers = {
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

export default voiceOutControllers