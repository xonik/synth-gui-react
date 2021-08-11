import { digitalModSources, modTarget } from '../../synthcore/modules/mods/utils'
import React, { useCallback, useEffect } from 'react'
import { DraggableElementProps } from './types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectGuiSource, selectGuiTargetFunc, selectGuiTargetGroup, selectGuiTargetParam, selectModValue } from '../../synthcore/modules/mods/modsReducer'
import classNames from 'classnames'

interface RowProps {
    targetId: number
    funcIndex: number
    paramIndex: number
}

interface CellProps {
    sourceIndex: number
    funcIndex: number
    paramIndex: number
    sourceId: number
    targetId: number
}

const AmountCell = ({ sourceIndex, funcIndex, paramIndex, sourceId, targetId }: CellProps) => {
    const modValue = useAppSelector(selectModValue(sourceId, targetId))
    const selectedSource = useAppSelector(selectGuiSource)
    const selectedTargetFunc = useAppSelector(selectGuiTargetFunc)
    const selectedTargetParam = useAppSelector(selectGuiTargetParam)

    const isTarget = paramIndex === selectedTargetParam && funcIndex === selectedTargetFunc
    const isSource = sourceIndex === selectedSource

    const isSelectedRow = isTarget && !isSource
    const isSelectedCol = isSource && !isTarget
    const isSelectedCell = isSource && isTarget

    return <div className={classNames(
        'mod-ctrl__amount',
        {
            'mod-ctrl__amount--highlit-row': isSelectedRow,
            'mod-ctrl__amount--highlit-col': isSelectedCol,
            'mod-ctrl__amount--selected': isSelectedCell,
        }
    )}>{Math.round(modValue * 100)}%</div>
}


const AmountsRow = ({ targetId, funcIndex, paramIndex }: RowProps) => {

    return (
        <div className="mod-ctrl__sources">
            {digitalModSources
                .map((source, sourceIndex) => {

                    return <AmountCell sourceIndex={sourceIndex}
                                       funcIndex={funcIndex}
                                       paramIndex={paramIndex}
                                       sourceId={source.id}
                                       targetId={targetId}
                    />
                })}
        </div>
    )
}

const AmountsTable = React.forwardRef<HTMLDivElement, DraggableElementProps>(
    ({ onMouseDown, onMouseMove },
     tableRef
    ) => {
        const targetGroupId = useAppSelector(selectGuiTargetGroup)
        const targetGroup = modTarget.targets[targetGroupId]

        const selectedSource = useAppSelector(selectGuiSource)
        const selectedTargetFunc = useAppSelector(selectGuiTargetFunc)
        const selectedTargetParam = useAppSelector(selectGuiTargetParam)

        useEffect(() => {
            console.log('func change', {
                selectedSource, selectedTargetFunc, selectedTargetParam
            })
        }, [selectedSource, selectedTargetFunc, selectedTargetParam])

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
                 onMouseDown={mouseDownHandler}
                 onMouseMove={mouseMoveHandler}>
                {targetGroup.map((func, funcIndex) => {
                    return <div className="mod-ctrl__target" key={funcIndex}>
                        <div className="mod-ctrl__amount" style={{ width: '100%' }}>
                        </div>
                        {func.map((target, paramIndex) => {
                            return <AmountsRow
                                key={paramIndex}
                                funcIndex={funcIndex}
                                paramIndex={paramIndex}
                                targetId={target.id}/>

                        })}
                    </div>
                })}
            </div>
        )
    }
)

export default AmountsTable