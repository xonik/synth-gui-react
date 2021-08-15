import { useAppSelector } from '../../synthcore/hooks'
import { selectGuiTargetGroup } from '../../synthcore/modules/mods/modsReducer'
import { modTarget } from '../../synthcore/modules/mods/utils'
import React from 'react'
import { DraggableElementProps } from './types'

interface TargetLabelProps {
    paramIndex: number,
    label: string
}

const TargetLabel = ({ paramIndex, label }: TargetLabelProps) => {
    return <div
        className="mod-ctrl__target__label"
        key={paramIndex}>
        {label}
    </div>
}

const TargetLabels = ({ onMouseDown, onMouseMove }: DraggableElementProps) => {
    const targetGroupId = useAppSelector(selectGuiTargetGroup)
    const targetGroup = modTarget.targets[targetGroupId]

    return (
        <div className="mod-ctrl__targets"
             onMouseDown={onMouseDown}
             onMouseMove={onMouseMove}>
            {targetGroup.map((func, funcIndex) => {
                return <div className="mod-ctrl__target" key={funcIndex}>
                    <div className="mod-ctrl__target__label mod-ctrl__target__label--group">
                        {modTarget.funcProps[targetGroupId][funcIndex].label}
                    </div>
                    {func.map((controller, paramIndex) => <TargetLabel
                        label={controller.label}
                        paramIndex={paramIndex}
                    />)}
                </div>
            })}
        </div>
    )
}

export default TargetLabels