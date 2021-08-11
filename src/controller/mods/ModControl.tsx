import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Point } from '../../utils/types'
import { useDimensions } from '../../hooks'
import SourceLabels from './SourceLabels'
import TargetLabels from './TargetLabels'
import AmountsTable from './AmountsTable'
import './ModControl.scss'

const ModControl = () => {

    const [offset, setOffset] = useState<Point>({ x: 0, y: 0 })
    const [prevOffset, setPrevOffset] = useState<Point>({ x: 0, y: 0 })

    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState<Point>({ x: 0, y: 0 })
    const [canDrag, setCanDrag] = useState<{ x: boolean, y: boolean }>({ x: false, y: false })

    const [maxOffset, setMaxOffset] = useState<Point>()
    const [amountsTableSize, updateAmountsTableSize] = useDimensions()
    const [containerSize, updateContainerSize] = useDimensions()
    const [cornerSize, updateCornerSize] = useDimensions()

    const calcMaxOffset = useCallback(() => {
        if (containerSize && cornerSize && amountsTableSize) {
            const amountsContainerHeight = containerSize.h - cornerSize.h
            const amountsContainerWidth = containerSize.w - cornerSize.w

            setMaxOffset({
                y: amountsTableSize.h - amountsContainerHeight,
                x: amountsTableSize.w - amountsContainerWidth
            })

        }
    }, [containerSize, cornerSize, amountsTableSize])

    const onMouseDown = useCallback((x: number, y: number, dragX: boolean, dragY: boolean) => {
        if (!maxOffset) {
            if (containerSize && cornerSize && amountsTableSize) {
                calcMaxOffset()
            } else {
                return
            }
        }
        setDragStart({ x, y })
        setCanDrag({ x: dragX, y: dragY })
        setIsDragging(true)

    }, [amountsTableSize, cornerSize, containerSize, maxOffset, calcMaxOffset])

    const onMouseUp = useCallback(() => {
        if (isDragging) {
            setIsDragging(false)
            setPrevOffset({ x: offset.x, y: offset.y })
        }
    }, [isDragging, setIsDragging, offset])

    useEffect(() => {
        window.addEventListener('mouseup', onMouseUp)
        return () => {
            window.removeEventListener('mouseup', onMouseUp)
        }
    }, [onMouseUp])

    const tableRef = useRef<HTMLDivElement>(null)

    const onDrag = useCallback((x: number, y: number) => {
        if (!isDragging || !maxOffset) {
            return
        }

        let offsetX = prevOffset.x
        let offsetY = prevOffset.y

        if (canDrag.x) {
            const newOffsetX = prevOffset.x + dragStart.x - x
            if (newOffsetX < 0) {
                offsetX = 0
            } else {
                //if (newOffsetX < maxOffset.x) {
                    offsetX = newOffsetX
                //} else {
                //    offsetX = maxOffset.x
                //}
            }

            if (tableRef.current) {
                tableRef.current.scrollLeft = offsetX
            }
        }
        if (canDrag.y) {
            const newOffsetY = dragStart.y - y + prevOffset.y

            if (newOffsetY < 0) {
                offsetY = 0
            } else {
                offsetY = newOffsetY
                if (newOffsetY < maxOffset.y) {
                    offsetY = newOffsetY
                } else {
                    offsetY = maxOffset.y
                }
            }

            if (tableRef.current) {
                tableRef.current.scrollTop = offsetY
            }
        }
        setOffset({ x: offsetX, y: offsetY })
    }, [isDragging, canDrag, dragStart, prevOffset, maxOffset])

    return (
        <div className="mod-ctrl" ref={updateContainerSize}>
            <div className="mod-ctrl__header">
                <div className="mod-ctrl__header__corner" ref={updateCornerSize}/>
                <div className="mod-ctrl__header__sources-container">
                    <SourceLabels
                        //offset={offset}
                        onMouseMove={onDrag}
                        onMouseDown={onMouseDown}
                    />
                </div>
            </div>
            <div className="mod-ctrl__content">
                <div className="mod-ctrl__content__targets-container">
                    <TargetLabels
                        // offset={offset}
                        onMouseMove={onDrag}
                        onMouseDown={onMouseDown}
                    />
                </div>
                <div className="mod-ctrl__content__amounts-container" ref={tableRef}>
                    <AmountsTable
                        ref={updateAmountsTableSize}
                        offset={offset}
                        onMouseMove={onDrag}
                        onMouseDown={onMouseDown}
                    />
                </div>
            </div>
        </div>
    )
}

export default ModControl