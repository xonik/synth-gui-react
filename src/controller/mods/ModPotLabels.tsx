import React from 'react'
import { useAppSelector } from '../../synthcore/hooks'
import {
    selectGuiSource,
    selectGuiDstFunc,
    selectGuiDstGroup,
    selectGuiDstParam,
    selectModValue
} from '../../synthcore/modules/mods/modsReducer'
import { digitalModSources, modDst } from '../../synthcore/modules/mods/utils'
import '../components/PotLabels.scss'

const ModPotLabels = () => {
    const sourceIndex = useAppSelector(selectGuiSource)
    const dstGroupId = useAppSelector(selectGuiDstGroup)
    const dstFuncId = useAppSelector(selectGuiDstFunc)
    const dstParamId = useAppSelector(selectGuiDstParam)

    const dst = modDst.dsts[dstGroupId][dstFuncId][dstParamId]
    const dstCtrlIndex = modDst.funcProps[dstGroupId][dstFuncId].ctrlIndex || 0
    const source = digitalModSources[sourceIndex]

    const sourceId = source.id
    const dstId = dst.id
    const dstValue = useAppSelector(selectModValue(sourceId, dstId, dstCtrlIndex))

    const values = [
        modDst.groupLabels[dstGroupId],
        digitalModSources[sourceIndex].label,
        modDst.funcProps[dstGroupId][dstFuncId].label,
        modDst.dsts[dstGroupId][dstFuncId][dstParamId].label,
        `${Math.round(100 * dstValue)}%`,
        '',
    ]
    const labels = ['Group', 'Source', 'Func', 'Param', 'Amount', '']

    return <div className="pot-labels pot-labels--two-rows">
        <div className="pot-labels__row">
            {values.map((value, index) => <div key={index} className="pot-labels__label">{value}</div>)}
        </div>
        <div className="pot-labels__row">
            {labels.map((label, index) => <div key={index} className="pot-labels__label">{label}</div>)}
        </div>
    </div>
}

export default ModPotLabels