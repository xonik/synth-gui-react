import classNames from 'classnames'
import { forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useUiStore, useVoiceGroupStore } from '@/store'
import { digitalModSources, modDst } from '@/synthcore/modules/mods/utils'
import type { Point } from '@/utils/types'
import { ScrollingSyncNodeContext } from '../utils/scrollsync/ScrollSyncNode'
import AmountBar from './AmountBar'
import type { DraggableElementProps } from './types'

interface CellProps {
    onSelected: (offsetLeft: number, offsetWidth: number) => void
    sourceIndex: number
    funcIndex: number
    funcCtrlIndex: number
    paramIndex: number
    sourceId: number
    dstId: number
}

const AmountCell = ({ sourceIndex, funcIndex, funcCtrlIndex, paramIndex, sourceId, dstId, onSelected }: CellProps) => {
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)
    const modValue = useVoiceGroupStore(voiceGroupIndex, (s) => s.mods?.[sourceId]?.[dstId]?.[funcCtrlIndex] ?? 0)
    const selectedSource = useUiStore((s) => s.modRouting.sourceId ?? 0)
    const selectedDstFunc = useUiStore((s) => s.modRouting.dstFuncId ?? 0)
    const selectedDstParam = useUiStore((s) => s.modRouting.dstParamId ?? 0)

    const isDst = paramIndex === selectedDstParam && funcIndex === selectedDstFunc
    const isSource = sourceIndex === selectedSource

    const isSelectedRow = isDst && !isSource
    const isSelectedCol = isSource && !isDst
    const isSelectedCell = isSource && isDst

    const amtPercentage = Math.round(modValue * 100)
    const amountText = isSelectedCell || modValue !== 0 ? `${amtPercentage}` : '\u00A0'

    const [clickPos, setClickPos] = useState<Point>({ x: 0, y: 0 })
    const onMouseDown = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setClickPos({
            x: event.clientX,
            y: event.clientY,
        })
    }, [])

    const onMouseUp = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            if (event.clientX === clickPos?.x && event.clientY === clickPos?.y) {
                // Dual-write selection to uiStore and Redux
                useUiStore.getState().setModRouting({
                    sourceId: sourceIndex,
                    dstFuncId: funcIndex,
                    dstParamId: paramIndex,
                })
            }
        },
        [sourceIndex, funcIndex, paramIndex, clickPos]
    )

    const cellRef = useRef<HTMLDivElement>(null)

    // TODO: Claude fix - is it a problem to add onSelected here?
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (isSelectedCell && cellRef.current) {
            const { offsetWidth, offsetLeft } = cellRef.current

            onSelected(offsetLeft, offsetWidth)
        }
    }, [isSelectedCell])

    return (
        <div
            ref={cellRef}
            className={classNames('mod-ctrl__amount', {
                'mod-ctrl__amount--highlit-row': isSelectedRow,
                'mod-ctrl__amount--highlit-col': isSelectedCol,
                'mod-ctrl__amount--selected': isSelectedCell,
            })}
        >
            <div className="mod-ctrl__amount__number" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
                {amountText}
            </div>
            <AmountBar amtPercentage={amtPercentage} />
        </div>
    )
}

interface RowProps {
    sourceId: number
    sourceIndex: number
}

const AmountsRow = ({ sourceId, sourceIndex }: RowProps) => {
    const dstGroupId = useUiStore((s) => s.modRouting.dstGroupId ?? 0)
    const dstGroup = modDst.dsts[dstGroupId]

    const ref = useRef<HTMLDivElement>(null)
    const { onScrollToElement } = useContext(ScrollingSyncNodeContext)

    const onSelected = useCallback(
        (offsetLeft: number, offsetWidth: number) => {
            if (ref.current) {
                onScrollToElement(offsetLeft, ref.current.offsetTop, offsetWidth, ref.current.offsetHeight)
            }
        },
        [onScrollToElement]
    )

    return (
        <div className="mod-ctrl__dsts" ref={ref}>
            {dstGroup.map((func, funcIndex) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: group ordering won't change and we currently don't have an id anyway
                <div className="mod-ctrl__amount-group" key={funcIndex}>
                    {func.map((dstParam, paramIndex) => (
                        <AmountCell
                            key={dstParam.id}
                            sourceIndex={sourceIndex}
                            funcIndex={funcIndex}
                            funcCtrlIndex={modDst.funcProps[dstGroupId][funcIndex].ctrlIndex || 0}
                            paramIndex={paramIndex}
                            sourceId={sourceId}
                            dstId={dstParam.id}
                            onSelected={onSelected}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

const AmountsTable = forwardRef<HTMLDivElement, DraggableElementProps>(({ onMouseDown, onMouseMove }, tableRef) => {
    return (
        <div className="mod-ctrl__amounts" ref={tableRef} onMouseDown={onMouseDown} onMouseMove={onMouseMove}>
            {digitalModSources.map((source, sourceIndex) => (
                <AmountsRow key={source.id} sourceIndex={sourceIndex} sourceId={source.id} />
            ))}
        </div>
    )
})

export default AmountsTable
