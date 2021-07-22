import CC from '../../mapCC'
import { FuncProps, ControllerConfigCC } from '../../types'
import { ControllerId } from '../../controllerIds'


interface ControllersPostMix {
    props: FuncProps
    LPF: ControllerConfigCC,
    SVF: ControllerConfigCC,
    SINE1: ControllerConfigCC,
    SINE2: ControllerConfigCC,
}

const controllersPostMix: ControllersPostMix = {
    props: { label: 'Mix' },
    LPF: {
        id: ControllerId.VOICE_MIX_LPF,
        label: 'LPF',
        isTargetDigi: true,
        type: 'pot',
        cc: CC.POST_MIX_LPF
    },
    SVF: {
        id: ControllerId.VOICE_MIX_SVF,
        label: 'SVF',
        isTargetDigi: true,
        type: 'pot',
        cc: CC.POST_MIX_SVF
    },
    SINE1: {
        id: ControllerId.VOICE_MIX_SINE1,
        label: 'Sine 1',
        isTargetDigi: true,
        type: 'pot',
        cc: CC.POST_MIX_SINE1
    },
    SINE2: {
        id: ControllerId.VOICE_MIX_SINE2,
        label: 'Sine 2',
        isTargetDigi: true,
        type: 'pot',
        cc: CC.POST_MIX_SINE2
    },
}

export default controllersPostMix