import React from 'react'
import { useAppSelector } from '../../synthcore/hooks'
import { selectGuiTargetGroup } from '../../synthcore/modules/mods/modsReducer'
import { digitalModSources, modTarget } from '../../synthcore/modules/mods/utils'
import './ModControl.scss'

const SourceLabels = () => {
    return (
        <div className="mod-ctrl__sources">
            {digitalModSources
                .map((controller, ctrlIndex) => {
                    return <div
                        className="mod-ctrl__source"
                        key={ctrlIndex}>
                        {controller.label}
                    </div>
                })}
        </div>
    )
}

const TargetLabels = () => {
    const targetGroupId = useAppSelector(selectGuiTargetGroup)
    const targetGroup = modTarget.targets[targetGroupId]

    return (
        <div className="mod-ctrl__targets">
            {targetGroup.map((func, funcIndex) => {
                return <div className="mod-ctrl__target" key={funcIndex}>
                    <div className="mod-ctrl__target__label">
                        {modTarget.funcProps[targetGroupId][funcIndex].label}
                    </div>
                    {func.map((controller, ctrlIndex) =>
                        <div
                            className="mod-ctrl__target__label mod-ctrl__target__label--param"
                            key={ctrlIndex}>
                            {controller.label}
                        </div>
                    )}
                </div>
            })}
        </div>
    )
}

const AmountsRow = () => {
    return (
        <div className="mod-ctrl__sources">
            {digitalModSources
                .map((controller, ctrlIndex) => {
                    return <div
                        className="mod-ctrl__amount"
                        key={ctrlIndex}>
                        {controller.label}
                    </div>
                })}
        </div>
    )
}

const AmountsTable = () => {
    const targetGroupId = useAppSelector(selectGuiTargetGroup)
    const targetGroup = modTarget.targets[targetGroupId]

    return (
        <div className="mod-ctrl__amounts--row">
            {targetGroup.map((func, funcIndex) => {
                return <div className="mod-ctrl__target" key={funcIndex}>
                    <div className="mod-ctrl__amount">
                    </div>
                    {func.map((controller, ctrlIndex) => <AmountsRow/>)}
                </div>
            })}
        </div>
    )
}

const ModControl = () => {

    return (
        <div className="mod-ctrl">
            <div className="mod-ctrl__header">
                <div className="mod-ctrl__header__corner">{'\u00A0'}sdf</div>
                <div className="mod-ctrl__header__sources-container">
                    <SourceLabels/>
                </div>
            </div>
            <div className="mod-ctrl__content">
                <div className="mod-ctrl__content__targets-container">
                    <TargetLabels/>
                </div>
                <div className="mod-ctrl__content__amounts-container">
                    <AmountsTable/>
                </div>
            </div>
        </div>
    )
}

export default ModControl