import React from 'react'
import { useAppSelector } from '../../synthcore/hooks'
import { selectGuiSource, selectGuiDstFunc, selectGuiDstGroup, selectGuiDstParam, selectModValue } from '../../synthcore/modules/mods/modsReducer'
import { digitalModSources, modDst } from '../../synthcore/modules/mods/utils'
import './ModValues.scss'

const ModValues = () => {

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

    return <div className="mod-values">
        <div className="mod-values__item">{modDst.groupLabels[dstGroupId]}</div>
        <div className="mod-values__item">{digitalModSources[sourceIndex].label}</div>
        <div className="mod-values__item">{modDst.funcProps[dstGroupId][dstFuncId].label}</div>
        <div className="mod-values__item">{modDst.dsts[dstGroupId][dstFuncId][dstParamId].label}</div>
        <div className="mod-values__item">{Math.round(100 * dstValue)}%</div>
        <div className="mod-values__item"></div>
    </div>
}

export default ModValues