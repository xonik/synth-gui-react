import React, { useCallback, useEffect, useState } from 'react'
import { Dimension } from './types'
import { Point } from './utils/types'
import { LockAxis } from './controller/utils/ScrollSyncNode'
import { Node } from './controller/utils/ScrollSync'

const getBounded = (value: number, max: number) => {
    if (value < 0) {
        return 0
    }
    if (value < max) {
        return value
    }
    return max
}

// https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
export const useDimensions = (): [Dimension | undefined, (div: HTMLDivElement) => void] => {
    const [dimensions, setDimensions] = useState<Dimension>()
    const captureDimensions = useCallback((div: HTMLDivElement) => {
        if (div) {
            setDimensions({ h: div.clientHeight, w: div.clientWidth })
        }
    }, [])
    return [dimensions, captureDimensions]
}

export const useDrag = (
    lockAxis: LockAxis,
    ref: React.RefObject<HTMLElement>,
    onDrag: (dragNode: Node) => void
) => {
    const [startScroll, setStartScroll] = useState<Point>({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState<Point>({ x: 0, y: 0 })
    const [maxScroll, setMaxScroll] = useState<Point>()

    const calcMaxScroll = useCallback(() => {
        if (ref.current) {
            const {
                clientHeight,
                clientWidth,
                scrollHeight,
                scrollWidth,
            } = ref.current

            setMaxScroll({
                y: scrollHeight - clientHeight,
                x: scrollWidth - clientWidth
            })
        }
    }, [ref])

    const onMouseUp = useCallback(() => {
        if (isDragging) {
            setIsDragging(false)
        }
    }, [isDragging, setIsDragging])

    const onMouseDown = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            if (event.preventDefault) {
                event.preventDefault()
            }
            if (!maxScroll) {
                calcMaxScroll()
            }
            setStartScroll({
                x: event.currentTarget.scrollLeft || 0,
                y: event.currentTarget.scrollTop || 0,
            })
            setDragStart({ x: event.clientX, y: event.clientY })
            setIsDragging(true)
        }, [maxScroll, calcMaxScroll])

    const onMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
        if (event.preventDefault) {
            event.preventDefault()
        }
        if (!isDragging || !maxScroll) {
            return
        }
        onDrag(event.currentTarget)

        const x = event.clientX
        const y = event.clientY

        const newScroll = {
            x: startScroll.x,
            y: startScroll.y,
        }

        if (!lockAxis?.includes('X')) {
            newScroll.x = getBounded(startScroll.x + dragStart.x - x, maxScroll.x)
        }
        if (!lockAxis?.includes('Y')) {
            newScroll.y = getBounded(dragStart.y - y + startScroll.y, maxScroll.y)
        }

        event.currentTarget.scrollLeft = newScroll.x
        event.currentTarget.scrollTop = newScroll.y
    }, [dragStart.x, dragStart.y, isDragging, lockAxis, maxScroll, onDrag, startScroll.x, startScroll.y])

    // captures mouse up even if mouse is no longer on top of display
    useEffect(() => {
        window.addEventListener('mouseup', onMouseUp)
        return () => {
            window.removeEventListener('mouseup', onMouseUp)
        }
    }, [onMouseUp])

    return {onMouseDown,onMouseMove}
}