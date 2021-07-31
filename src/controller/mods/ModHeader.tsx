import React from 'react'
import { useAppSelector } from '../../synthcore/hooks'
import './ModHeader.scss'
import { selectGuiSource, selectGuiTargetFunc, selectGuiTargetGroup, selectGuiTargetParam, selectModValue } from '../../synthcore/modules/mods/modsReducer'
import { digitalModSources, modTarget } from '../../synthcore/modules/mods/utils'

const ModHeader = () => {

    const sourceIndex = useAppSelector(selectGuiSource)
    const targetGroupId = useAppSelector(selectGuiTargetGroup)
    const targetFuncId = useAppSelector(selectGuiTargetFunc)
    const targetParamId = useAppSelector(selectGuiTargetParam)

    const target = modTarget.targets[targetGroupId][targetFuncId][targetParamId]
    const source = digitalModSources[sourceIndex]

    const sourceId = source.id
    const targetId = target.id
    const targetValue = useAppSelector(selectModValue(sourceId, targetId))

    return <div className="mod-header">
        <div className="mod-header__item">Group: {modTarget.groupLabels[targetGroupId]}</div>
        <div className="mod-header__item">Func: {modTarget.funcProps[targetGroupId][targetFuncId].label}</div>
        <div className="mod-header__item">Param: {modTarget.targets[targetGroupId][targetFuncId][targetParamId].label}</div>
        <div className="mod-header__item">Source: {digitalModSources[sourceIndex].label}</div>
        <div className="mod-header__item">Amount: {Math.round(100 * targetValue)}%</div>
    </div>
}

export default ModHeader