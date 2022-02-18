import CC from '../../../midi/mapCC'
import { FuncProps, ControllerConfigCC } from '../../../midi/types'
import { ControllerIdDst } from '../../../midi/controllerIds'


interface VoiceMixControllers {
    props: FuncProps
    LPF: ControllerConfigCC,
    SVF: ControllerConfigCC,
    SINE1: ControllerConfigCC,
    SINE2: ControllerConfigCC,
}

const voiceMixControllers: VoiceMixControllers = {
    props: { label: 'Mix' },
    LPF: {
        id: ControllerIdDst.VOICE_MIX_LPF,
        label: 'LPF',
        isDstDigi: true,
        type: 'pot',
        cc: CC.VOICE_MIX_LPF
    },
    SVF: {
        id: ControllerIdDst.VOICE_MIX_SVF,
        label: 'SVF',
        isDstDigi: true,
        type: 'pot',
        cc: CC.VOICE_MIX_SVF
    },
    SINE1: {
        id: ControllerIdDst.VOICE_MIX_SINE1,
        label: 'Sine 1',
        isDstDigi: true,
        type: 'pot',
        cc: CC.VOICE_MIX_SINE1
    },
    SINE2: {
        id: ControllerIdDst.VOICE_MIX_SINE2,
        label: 'Sine 2',
        isDstDigi: true,
        type: 'pot',
        cc: CC.VOICE_MIX_SINE2
    },
}

export default voiceMixControllers