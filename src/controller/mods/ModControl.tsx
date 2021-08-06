import React from 'react'
import { useAppSelector } from '../../synthcore/hooks'
import { selectGuiTargetGroup } from '../../synthcore/modules/mods/modsReducer'
import { digitalModSources, modTarget } from '../../synthcore/modules/mods/utils'
import './ModControl.scss'

const SourceLabels = () => {
    return (
        <div>
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
        <div>
            {targetGroup.map((func, funcIndex) => {
                return <div className="mod-ctrl__target" key={funcIndex}>
                    <div className="mod-ctrl__target--heading">
                        {modTarget.funcProps[targetGroupId][funcIndex].label}
                    </div>
                    {func.map((controller, ctrlIndex) => <div
                            className="mod-ctrl__target--controller"
                            key={ctrlIndex}>
                            {controller.label}
                        </div>
                    )}
                </div>
            })}
        </div>
    )
}

const ModControl = () => {

    return (
        <div className="mod-ctrl">
            <div className="mod-ctrl__header-row">
                <div className="mod-ctrl__header-col__targets">{'\u00A0'}sdf</div>
                <div className="mod-ctrl__header-col__sources">
                    <SourceLabels/>
                </div>

            </div>
            <div className="mod-ctrl__content-row">
                <div className="mod-ctrl__content-col__targets">
                    <TargetLabels/>
                </div>
                <div className="mod-ctrl__content-col__amounts">
                    {/* modulation amounts */}
                </div>
            </div>
        </div>
    )
    /*
        return <div className="mod-ctrl">
            <div className="mod-ctrl__targets">
                <div className="mod-ctrl__target">{'\u00A0'}</div>
                {targetGroup.map((func, funcIndex) => {
                    return <div className="mod-ctrl__target" key={funcIndex}>
                        <div className="mod-ctrl__target--heading">
                            {modTarget.funcProps[targetGroupId][funcIndex].label}
                        </div>
                        {func.map((controller, ctrlIndex) => <div
                                className="mod-ctrl__target--controller"
                                key={ctrlIndex}>
                                {controller.label}
                            </div>
                        )}
                    </div>
                })}
            </div>
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
            {
                targetGroup.map((func, funcIndex) => {
                    return <div className="mod-ctrl__target" key={funcIndex}>
                        <div className="mod-ctrl__target--heading">
                            Hello
                        </div>
                        {func.map((controller, ctrlIndex) => <div
                                className="mod-ctrl__target--controller"
                                key={ctrlIndex}>
                                World
                            </div>
                        )}
                    </div>
                })
            }
        </div>
     */
}

export default ModControl