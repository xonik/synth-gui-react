import { useAppSelector } from '../../synthcore/hooks'
import { selectGuiTargetFunc, selectGuiTargetGroup, selectGuiTargetParam } from '../../synthcore/modules/mods/modsReducer'
import { modTarget, shortLabel } from '../../synthcore/modules/mods/utils'
import React from 'react'
import { DraggableElementProps } from './types'
import classNames from 'classnames'
import { ControllerConfig } from '../../midi/types'

interface TargetLabelProps {
    paramIndex: number,
    funcIndex: number,
    target: ControllerConfig
}

const TargetLabel = ({ funcIndex, paramIndex, target }: TargetLabelProps) => {
    const selectedTargetFunc = useAppSelector(selectGuiTargetFunc)
    const selectedTargetParam = useAppSelector(selectGuiTargetParam)

    const isSelected = funcIndex === selectedTargetFunc && paramIndex === selectedTargetParam

    return <div
        className={classNames('mod-ctrl__target__label', { 'mod-ctrl__target__label--selected': isSelected })}
        key={paramIndex}>
        {shortLabel(target)}
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
                        {shortLabel(modTarget.funcProps[targetGroupId][funcIndex])}
                    </div>}
                    <div className="mod-ctrl__target__props">
                        {func.map((controller, paramIndex) => <TargetLabel
                            key={paramIndex}
                            target={controller}
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