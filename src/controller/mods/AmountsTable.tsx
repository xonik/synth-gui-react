import { digitalModSources, modTarget } from '../../synthcore/modules/mods/utils'
import React, { useCallback } from 'react'
import { DraggableElementProps } from './types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectGuiTargetGroup } from '../../synthcore/modules/mods/modsReducer'

const AmountsRow = () => {
    return (
        <div className="mod-ctrl__sources">
            {digitalModSources
                .map((source, sourceIndex) => {
                    return <div
                        className="mod-ctrl__amount"
                        key={sourceIndex}>
                        {source.label}
                    </div>
                })}
        </div>
    )
}

const AmountsTable = React.forwardRef<HTMLDivElement, DraggableElementProps>(
    ({ onMouseDown, onMouseMove, offset },
     tableRef
    ) => {
        const targetGroupId = useAppSelector(selectGuiTargetGroup)
        const targetGroup = modTarget.targets[targetGroupId]

        const mouseDownHandler = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
            onMouseDown(event.clientX, event.clientY, true, true)
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
            <div className="mod-ctrl__amounts-table"
                 ref={tableRef}
                 style={{
                     left: offset.x,
                     top: offset.y,
                 }}
                 onMouseDown={mouseDownHandler}
                 onMouseMove={mouseMoveHandler}>
                {targetGroup.map((func, funcIndex) => {
                    return <div className="mod-ctrl__target" key={funcIndex}>
                        <div className="mod-ctrl__amount">
                        </div>
                        {func.map((controller, ctrlIndex) => <AmountsRow key={ctrlIndex}/>)}
                    </div>
                })}
            </div>
        )
    }
)

export default AmountsTable