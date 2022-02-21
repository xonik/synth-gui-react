import CC from '../../../midi/mapCC'
import { FuncProps, ControllerConfigCC } from '../../../midi/types'
import { ControllerIdDst } from '../../../midi/controllerIds'


interface PostMixControllers {
    props: FuncProps
    LPF: ControllerConfigCC,
    SVF: ControllerConfigCC,
    SINE1: ControllerConfigCC,
    SINE2: ControllerConfigCC,

    PAN: ControllerConfigCC
    AMOUNT: ControllerConfigCC
    FX1_SEND: ControllerConfigCC
    FX2_SEND: ControllerConfigCC
}

const postMixControllers: PostMixControllers = {
    props: { label: 'Post filter mix' },
    LPF: {
        id: ControllerIdDst.POST_MIX_LPF,
        label: 'LPF',
        isDstDigi: true,
        type: 'pot',
        cc: CC.POST_MIX_LPF
    },
    SVF: {
        id: ControllerIdDst.POST_MIX_SVF,
        label: 'SVF',
        isDstDigi: true,
        type: 'pot',
        cc: CC.POST_MIX_SVF
    },
    SINE1: {
        id: ControllerIdDst.POST_MIX_SINE1,
        label: 'Sine 1',
        isDstDigi: true,
        type: 'pot',
        cc: CC.POST_MIX_SINE1
    },
    SINE2: {
        id: ControllerIdDst.POST_MIX_SINE2,
        label: 'Sine 2',
        isDstDigi: true,
        type: 'pot',
        cc: CC.POST_MIX_SINE2
    },
    PAN: {
        id: ControllerIdDst.POST_MIX_PAN,
        label: 'Pan',
        isDstDigi: true,
        type: 'pot',
        bipolar: true,
        cc: CC.POST_MIX_PAN
    },
    AMOUNT: {
        id: ControllerIdDst.POST_MIX_AMOUNT,
        label: 'Level',
        isDstDigi: true,
        type: 'pot',
        cc: CC.POST_MIX_AMOUNT
    },
    FX1_SEND: {
        id: ControllerIdDst.POST_MIX_FX1_SEND,
        label: 'FX1',
        isDstDigi: true,
        type: 'pot',
        cc: CC.POST_MIX_FX1_SEND
    },
    FX2_SEND: {
        id: ControllerIdDst.POST_MIX_FX2_SEND,
        label: 'FX2',
        isDstDigi: true,
        type: 'pot',
        cc: CC.POST_MIX_FX2_SEND
    },
}

export default postMixControllers