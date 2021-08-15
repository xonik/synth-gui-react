import { digitalModSources, modTarget } from '../../synthcore/modules/mods/utils'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { DraggableElementProps } from './types'
import { useAppDispatch, useAppSelector } from '../../synthcore/hooks'
import { setGuiMod, selectGuiSource, selectGuiTargetFunc, selectGuiTargetGroup, selectGuiTargetParam, selectModValue, selectGuiLastModSelectSource } from '../../synthcore/modules/mods/modsReducer'
import classNames from 'classnames'
import AmountBar from './AmountBar'
import { Point } from '../../utils/types'
import { ScrollingSyncNodeContext } from '../utils/scrollsync/ScrollSyncNode'
import { ApiSource } from '../../synthcore/types'

interface RowProps {
    targetId: number
    funcIndex: number
    paramIndex: number
}

interface CellProps {
    onSelected: (offsetLeft: number, offsetWidth: number) => void,
    sourceIndex: number
    funcIndex: number
    paramIndex: number
    sourceId: number
    targetId: number
}

const AmountCell = ({ sourceIndex, funcIndex, paramIndex, sourceId, targetId, onSelected }: CellProps) => {

    const dispatch = useAppDispatch()
    const modValue = useAppSelector(selectModValue(sourceId, targetId))
    const selectedSource = useAppSelector(selectGuiSource)
    const selectedTargetFunc = useAppSelector(selectGuiTargetFunc)
    const selectedTargetParam = useAppSelector(selectGuiTargetParam)
    const modSelectSource = useAppSelector(selectGuiLastModSelectSource)

    const isTarget = paramIndex === selectedTargetParam && funcIndex === selectedTargetFunc
    const isSource = sourceIndex === selectedSource

    const isSelectedRow = isTarget && !isSource
    const isSelectedCol = isSource && !isTarget
    const isSelectedCell = isSource && isTarget

    const amtPercentage = Math.round(modValue * 100)
    const amountText = isSelectedCell || modValue !== 0 ? `${amtPercentage}` : '\u00A0'

    const [clickPos, setClickPos] = useState<Point>({ x: 0, y: 0 })
    const onMouseDown = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setClickPos({
            x: event.clientX,
            y: event.clientY,
        })
    }, [])

    const onMouseUp = useCallback((event: React.MouseEvent<HTMLElement>) => {
        if (event.clientX === clickPos?.x && event.clientY === clickPos?.y) {
            dispatch(setGuiMod({
                guiSource: sourceIndex,
                guiTargetFunc: funcIndex,
                guiTargetParam: paramIndex,
            }))
        }
    }, [dispatch, sourceIndex, funcIndex, paramIndex, clickPos])

    const cellRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(isSelectedCell && cellRef.current && modSelectSource === ApiSource.UI){
            const {
                offsetWidth,
                offsetLeft,
            } = cellRef.current

            onSelected(
                offsetLeft,
                offsetWidth,
            )
        }
    }, [onSelected, isSelectedCell, modSelectSource])



    return <div ref={cellRef} className={classNames(
        'mod-ctrl__amount',
        {
            'mod-ctrl__amount--highlit-row': isSelectedRow,
            'mod-ctrl__amount--highlit-col': isSelectedCol,
            'mod-ctrl__amount--selected': isSelectedCell,
        }
    )}>
        <div className="mod-ctrl__amount__number" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>{amountText}</div>
        <AmountBar amtPercentage={amtPercentage}/>
    </div>
}


const AmountsRow = ({ targetId, funcIndex, paramIndex }: RowProps) => {

    const ref = useRef<HTMLDivElement>(null)
    const { onScrollToElement } = useContext(ScrollingSyncNodeContext)

    const onSelected = useCallback((offsetLeft: number, offsetWidth: number) => {
        if(ref.current){
            onScrollToElement(
                offsetLeft,
                ref.current.offsetTop,
                offsetWidth,
                ref.current.offsetHeight,
            )
        }
    }, [onScrollToElement])

    return (
        <div className="mod-ctrl__sources" ref={ref}>
            {digitalModSources
                .map((source, sourceIndex) => {

                    return <AmountCell key={sourceIndex}
                                       sourceIndex={sourceIndex}
                                       funcIndex={funcIndex}
                                       paramIndex={paramIndex}
                                       sourceId={source.id}
                                       targetId={targetId}
                                       onSelected={onSelected}
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

        return (
            <div className="mod-ctrl__amounts"
                 ref={tableRef}
                 onMouseDown={onMouseDown}
                 onMouseMove={onMouseMove}>
                {targetGroup.map((func, funcIndex) => {
                    return <div className="mod-ctrl__target" key={funcIndex}>
                        <div className="mod-ctrl__amount mod-ctrl__amount--header" style={{ width: '100%' }}>
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