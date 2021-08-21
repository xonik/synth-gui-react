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

interface CellProps {
    onSelected: (offsetLeft: number, offsetWidth: number) => void,

    // the index in the array of sources (e.g. source controllers)
    sourceIndex: number

    // the index in the array of functions
    funcIndex: number

    // the controller index, e.g. the index uniquely identifying THIS func when there are several of the
    // same type such as LFOs and envs.
    funcCtrlIndex: number

    // the index in the array of params for the function (e.g. controllers)
    paramIndex: number

    // unique IDs for source and target params, but must be combined with funcCtrlIndex for params that
    // occur on multiple functions such as LFOs and envs.
    sourceId: number
    targetId: number
}

const AmountCell = ({ sourceIndex, funcIndex, funcCtrlIndex, paramIndex, sourceId, targetId, onSelected }: CellProps) => {

    const dispatch = useAppDispatch()
    const modValue = useAppSelector(selectModValue(sourceId, targetId, funcCtrlIndex))
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
        if (isSelectedCell && cellRef.current && modSelectSource === ApiSource.UI) {
            const {
                offsetWidth,
                offsetLeft,
            } = cellRef.current

            onSelected(
                offsetLeft,
                offsetWidth,
            )
        }
    }, [isSelectedCell, modSelectSource])
    // onSelected is missing here on purpose. If it is included we get constant updates.
    // I can't seem to make onSelected stay the same, it goes all the way up to ScrollSync.

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

interface RowProps {
    sourceId: number
    sourceIndex: number
}

const AmountsRow = ({ sourceId, sourceIndex }: RowProps) => {

    const targetGroupId = useAppSelector(selectGuiTargetGroup)
    const targetGroup = modTarget.targets[targetGroupId]

    const ref = useRef<HTMLDivElement>(null)
    const { onScrollToElement } = useContext(ScrollingSyncNodeContext)

    const onSelected = useCallback((offsetLeft: number, offsetWidth: number) => {
        if (ref.current) {
            onScrollToElement(
                offsetLeft,
                ref.current.offsetTop,
                offsetWidth,
                ref.current.offsetHeight,
            )
        }
    }, [onScrollToElement])

    return (
        <div className="mod-ctrl__targets" ref={ref}>
            {targetGroup.map((func, funcIndex) => <React.Fragment key={funcIndex}>
                    {func.map((targetParam, paramIndex) => <AmountCell
                                    key={paramIndex}
                                    sourceIndex={sourceIndex}
                                    funcIndex={funcIndex}
                                    funcCtrlIndex={modTarget.funcProps[targetGroupId][funcIndex].ctrlIndex || 0}
                                    paramIndex={paramIndex}
                                    sourceId={sourceId}
                                    targetId={targetParam.id}
                                    onSelected={onSelected}
                        />
                    )}
                </React.Fragment>
            )}
        </div>
    )
}

const AmountsTable = React.forwardRef<HTMLDivElement, DraggableElementProps>(
    ({ onMouseDown, onMouseMove },
     tableRef
    ) => {

        return (
            <div className="mod-ctrl__amounts"
                 ref={tableRef}
                 onMouseDown={onMouseDown}
                 onMouseMove={onMouseMove}>
                {digitalModSources
                    .map((source, sourceIndex) => <AmountsRow
                        key={sourceIndex}
                        sourceIndex={sourceIndex}
                        sourceId={source.id}/>
                    )}
            </div>
        )
    }
)

export default AmountsTable