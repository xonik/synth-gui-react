import React from 'react'
import { useAppSelector } from '../../synthcore/hooks'
import { selectGuiSource, selectGuiTargetFunc, selectGuiTargetGroup, selectGuiTargetParam, selectModValue } from '../../synthcore/modules/mods/modsReducer'
import { digitalModSources, modTarget } from '../../synthcore/modules/mods/utils'
import './ModHeader.scss'

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
        <div className="mod-header__item-label">Group</div>
        <div className="mod-header__item">{modTarget.groupLabels[targetGroupId]}</div>
        <div className="mod-header__item-label">Func</div>
        <div className="mod-header__item">{modTarget.funcProps[targetGroupId][targetFuncId].label}</div>
        <div className="mod-header__item-label">Param</div>
        <div className="mod-header__item">{modTarget.targets[targetGroupId][targetFuncId][targetParamId].label}</div>
        <div className="mod-header__item-label">Src</div>
        <div className="mod-header__item">{digitalModSources[sourceIndex].label}</div>
        <div className="mod-header__item-label">Amt</div>
        <div className="mod-header__item">{Math.round(100 * targetValue)}%</div>
    </div>
}

export default ModHeader