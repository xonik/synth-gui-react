import React from 'react'
import { useAppSelector } from '../../synthcore/hooks'
import { selectGuiTargetGroup } from '../../synthcore/modules/mods/modsReducer'
import { digitalModSources, modTarget } from '../../synthcore/modules/mods/utils'
import './ModControl.scss'

const ModControl = () => {

    const targetGroupId = useAppSelector(selectGuiTargetGroup)
    const targetGroup = modTarget.targets[targetGroupId]

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
            })
            }
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
    </div>
}

export default ModControl