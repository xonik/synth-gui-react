import { useAppSelector } from '../../synthcore/hooks'
import { selectGuiTargetFunc, selectGuiTargetGroup, selectGuiTargetParam } from '../../synthcore/modules/mods/modsReducer'
import { modTarget } from '../../synthcore/modules/mods/utils'
import React from 'react'
import { DraggableElementProps } from './types'
import classNames from 'classnames'

interface TargetLabelProps {
    paramIndex: number,
    funcIndex: number,
    label: string
}

const TargetLabel = ({ funcIndex, paramIndex, label }: TargetLabelProps) => {
    const selectedTargetFunc = useAppSelector(selectGuiTargetFunc)
    const selectedTargetParam = useAppSelector(selectGuiTargetParam)

    const isSelected = funcIndex === selectedTargetFunc && paramIndex === selectedTargetParam

    return <div
        className={classNames('mod-ctrl__target__label', { 'mod-ctrl__target__label--selected': isSelected })}
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
                    {<div className="mod-ctrl__target__func">
                        {modTarget.funcProps[targetGroupId][funcIndex].label}
                    </div>}
                    <div className="mod-ctrl__target__props">
                        {func.map((controller, paramIndex) => <TargetLabel
                            key={paramIndex}
                            label={controller.label}
                            paramIndex={paramIndex}
                            funcIndex={funcIndex}
                        />)}
                    </div>
                </div>
            })}
        </div>
    )
}

export default TargetLabels