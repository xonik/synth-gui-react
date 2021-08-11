import { useAppSelector } from '../../synthcore/hooks'
import { selectGuiTargetGroup } from '../../synthcore/modules/mods/modsReducer'
import { modTarget } from '../../synthcore/modules/mods/utils'
import React, { useCallback } from 'react'
import { DraggableElementProps } from './types'

const TargetLabels = ({ onMouseDown, onMouseMove, offset }: DraggableElementProps) => {
    const targetGroupId = useAppSelector(selectGuiTargetGroup)
    const targetGroup = modTarget.targets[targetGroupId]

    const mouseDownHandler = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        onMouseDown(event.clientX, event.clientY, false, true)
        if (event.preventDefault) {
            event.preventDefault()
        }
    }, [onMouseDown])

    const mouseMoveHandler = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        onMouseMove(event.clientX, event.clientY)
        if (event.preventDefault) {
            event.preventDefault()
        }
    }, [onMouseMove])

    return (
        <div className="mod-ctrl__targets"
             style={{ top: offset?.y || 0 }}
             onMouseDown={mouseDownHandler}
             onMouseMove={mouseMoveHandler}>
            {targetGroup.map((func, funcIndex) => {
                return <div className="mod-ctrl__target" key={funcIndex}>
                    <div className="mod-ctrl__target__label mod-ctrl__target__label--group">
                        {modTarget.funcProps[targetGroupId][funcIndex].label}
                    </div>
                    {func.map((controller, ctrlIndex) =>
                        <div
                            className="mod-ctrl__target__label"
                            key={ctrlIndex}>
                            {controller.label}
                        </div>
                    )}
                </div>
            })}
        </div>
    )
}

export default TargetLabels