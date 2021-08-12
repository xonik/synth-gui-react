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

    const [scrollSource, setScrollSource] = useState<string>('')
    const [startScroll, setStartScroll] = useState<Point>({ x: 0, y: 0 })
    const [isScrolling, setIsScrolling] = useState<boolean>(false)
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
        setStartScroll(currentScroll)
        setDragStart({ x, y })
        setCanDrag({ x: dragX, y: dragY })
        setIsDragging(true)

    }, [amountsTableSize, currentScroll, cornerSize, containerSize, maxScroll, calcMaxScroll])

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
        setScrollSource('drag')
        const newScroll = {
            x: startScroll.x,
            y: startScroll.y,
        }

        if (canDrag.x) {
            newScroll.x = getBounded(startScroll.x + dragStart.x - x, maxScroll.x)

        }
        if (canDrag.y) {
            newScroll.y = getBounded(dragStart.y - y + startScroll.y, maxScroll.y)
        }
        setCurrentScroll(newScroll)

    }, [isDragging, canDrag, dragStart, startScroll, maxScroll])

    useEffect(() => {
        if (scrollSource !== 'amounts' && amountsRef.current) {
            amountsRef.current.scrollLeft = currentScroll.x
            amountsRef.current.scrollTop = currentScroll.y
        }
        if (scrollSource !== 'sources' && sourcesRef.current) {
            sourcesRef.current.scrollLeft = currentScroll.x
        }
        if (scrollSource !== 'targets' && targetsRef.current) {
            targetsRef.current.scrollTop = currentScroll.y
        }
        setIsScrolling(false)
    }, [currentScroll, scrollSource])

    const updateScrollFromSources = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        if (!isDragging && !isScrolling) {
            setIsScrolling(true)
            setScrollSource('sources')
            setCurrentScroll({
                x: e.currentTarget.scrollLeft,
                y: currentScroll.y
            })
        }
    }, [isDragging, isScrolling, currentScroll.y])

    const updateScrollFromTargets = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        if (!isDragging && !isScrolling) {
            setIsScrolling(true)
            setScrollSource('targets')
            setCurrentScroll({
                x: currentScroll.x,
                y: e.currentTarget.scrollTop,
            })
        }
    }, [isDragging, isScrolling, currentScroll.x])

    const updateScrollFromAmounts = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        if (!isDragging && !isScrolling) {
            setIsScrolling(true)
            setScrollSource('amounts')
            setCurrentScroll({
                x: e.currentTarget.scrollLeft,
                y: e.currentTarget.scrollTop,
            })
        }
    }, [isDragging, isScrolling])

    return (
        <div className="mod-ctrl" ref={updateContainerSize}>
            <div className="mod-ctrl__header">
                <div className="mod-ctrl__header__corner" ref={updateCornerSize}/>
                <div className="mod-ctrl__header__sources-container"
                     ref={sourcesRef}
                     onScroll={updateScrollFromSources}>
                    <SourceLabels
                        onMouseMove={onDrag}
                        onMouseDown={onMouseDown}
                    />
                </div>
            </div>
            <div className="mod-ctrl__content">
                <div className="mod-ctrl__content__targets-container"
                     ref={targetsRef}
                     onScroll={updateScrollFromTargets}>
                    <TargetLabels
                        onMouseMove={onDrag}
                        onMouseDown={onMouseDown}
                    />
                </div>
                <div className="mod-ctrl__content__amounts-container"
                     ref={amountsRef}
                     onScroll={updateScrollFromAmounts}>
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