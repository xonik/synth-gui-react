import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Point } from '../../utils/types'
import { useDimensions } from '../../hooks'
import SourceLabels from './SourceLabels'
import TargetLabels from './TargetLabels'
import AmountsTable from './AmountsTable'
import './ModControl.scss'

const getBounded = (value: number, max: number) => {
    if (value < 0) {
        return 0
    }
    if (value < max) {
        return value
    }
    return max
}

const ModControl = () => {

    const [currentScroll, setCurrentScroll] = useState<Point>({ x: 0, y: 0 })
    const [maxScroll, setMaxScroll] = useState<Point>()

    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState<Point>({ x: 0, y: 0 })

    const [canDrag, setCanDrag] = useState<{ x: boolean, y: boolean }>({ x: false, y: false })
    const [amountsTableSize, updateAmountsTableSize] = useDimensions()
    const [containerSize, updateContainerSize] = useDimensions()
    const [cornerSize, updateCornerSize] = useDimensions()

    const sourcesRef = useRef<HTMLDivElement>(null)
    const targetsRef = useRef<HTMLDivElement>(null)
    const amountsRef = useRef<HTMLDivElement>(null)

    const calcMaxScroll = useCallback(() => {
        if (containerSize && cornerSize && amountsTableSize) {
            const amountsContainerHeight = containerSize.h - cornerSize.h
            const amountsContainerWidth = containerSize.w - cornerSize.w

            setMaxScroll({
                y: amountsTableSize.h - amountsContainerHeight,
                x: amountsTableSize.w - amountsContainerWidth
            })

        }
    }, [containerSize, cornerSize, amountsTableSize])

    const onMouseDown = useCallback((x: number, y: number, dragX: boolean, dragY: boolean) => {
        if (!maxScroll) {
            if (containerSize && cornerSize && amountsTableSize) {
                calcMaxScroll()
            } else {
                return
            }
        }
        if(amountsRef.current){
            setCurrentScroll({ x: amountsRef.current.scrollLeft, y: amountsRef.current.scrollTop })
        }
        setDragStart({ x, y })
        setCanDrag({ x: dragX, y: dragY })
        setIsDragging(true)

    }, [amountsTableSize, cornerSize, containerSize, maxScroll, calcMaxScroll])

    const onMouseUp = useCallback(() => {
        if (isDragging) {
            setIsDragging(false)
        }
    }, [isDragging, setIsDragging])

    // captures mouse up even if mouse is no longer on top of display
    useEffect(() => {
        window.addEventListener('mouseup', onMouseUp)
        return () => {
            window.removeEventListener('mouseup', onMouseUp)
        }
    }, [onMouseUp])

    const onDrag = useCallback((x: number, y: number) => {
        if (!isDragging || !maxScroll) {
            return
        }

        if (canDrag.x) {
            const scrollX = getBounded(currentScroll.x + dragStart.x - x, maxScroll.x)

            if (amountsRef.current) {
                amountsRef.current.scrollLeft = scrollX
            }
            if (sourcesRef.current) {
                sourcesRef.current.scrollLeft = scrollX
            }

        }
        if (canDrag.y) {
            const scrollY = getBounded(dragStart.y - y + currentScroll.y, maxScroll.y)

            if (amountsRef.current) {
                amountsRef.current.scrollTop = scrollY
            }
            if (targetsRef.current) {
                targetsRef.current.scrollTop = scrollY
            }
        }
    }, [isDragging, canDrag, dragStart, currentScroll, maxScroll])

    return (
        <div className="mod-ctrl" ref={updateContainerSize}>
            <div className="mod-ctrl__header">
                <div className="mod-ctrl__header__corner" ref={updateCornerSize}/>
                <div className="mod-ctrl__header__sources-container" ref={sourcesRef}>
                    <SourceLabels
                        onMouseMove={onDrag}
                        onMouseDown={onMouseDown}
                    />
                </div>
            </div>
            <div className="mod-ctrl__content">
                <div className="mod-ctrl__content__targets-container" ref={targetsRef}>
                    <TargetLabels
                        onMouseMove={onDrag}
                        onMouseDown={onMouseDown}
                    />
                </div>
                <div className="mod-ctrl__content__amounts-container" ref={amountsRef}>
                    <AmountsTable
                        ref={updateAmountsTableSize}
                        onMouseMove={onDrag}
                        onMouseDown={onMouseDown}
                    />
                </div>
            </div>
        </div>
    )
}

export default ModControl