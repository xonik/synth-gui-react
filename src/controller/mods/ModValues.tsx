import React from 'react'
import { useAppSelector } from '../../synthcore/hooks'
import { selectGuiSource, selectGuiTargetFunc, selectGuiTargetGroup, selectGuiTargetParam, selectModValue } from '../../synthcore/modules/mods/modsReducer'
import { digitalModSources, modTarget } from '../../synthcore/modules/mods/utils'
import './ModValues.scss'

const ModValues = () => {

    const sourceIndex = useAppSelector(selectGuiSource)
    const targetGroupId = useAppSelector(selectGuiTargetGroup)
    const targetFuncId = useAppSelector(selectGuiTargetFunc)
    const targetParamId = useAppSelector(selectGuiTargetParam)

    const target = modTarget.targets[targetGroupId][targetFuncId][targetParamId]
    const targetCtrlIndex = modTarget.funcProps[targetGroupId][targetFuncId].ctrlIndex || 0
    const source = digitalModSources[sourceIndex]

    const sourceId = source.id
    const targetId = target.id
    const targetValue = useAppSelector(selectModValue(sourceId, targetId, targetCtrlIndex))

    return <div className="mod-values">
        <div className="mod-values__item">{modTarget.groupLabels[targetGroupId]}</div>
        <div className="mod-values__item">{digitalModSources[sourceIndex].label}</div>
        <div className="mod-values__item">{modTarget.funcProps[targetGroupId][targetFuncId].label}</div>
        <div className="mod-values__item">{modTarget.targets[targetGroupId][targetFuncId][targetParamId].label}</div>
        <div className="mod-values__item">{Math.round(100 * targetValue)}%</div>
    </div>
}

export default ModValues