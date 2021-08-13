import React, { forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { ScrollingSyncerContext } from './ScrollSync'
import { getMovingAxis, toArray } from './utils'
import { Point } from '../../utils/types'

/**
 * ScrollSyncNode Component
 *
 * Wrap your content in it to keep its scroll position in sync with other panes
 */
export type ScrollConfig = 'synced-only' | 'syncer-only' | 'two-way';
export type LockAxis = 'X' | 'Y' | 'XY' | null;

interface ScrollSyncNodeProps {
    /**
     * Children
     */
    children: React.ReactElement;
    /**
     * Groups to make the children attached to
     */
    group?: string | string[];
    /**
     * If the scrolling is enabled or not
     */
    scroll?: ScrollConfig;
    /**
     * Prevent scroll on current node if axis is locked
     */
    selfLockAxis?: LockAxis;
    /**
     * Callback for scroll handling
     */
    onScroll?: (e: React.UIEvent<HTMLElement>) => void;
}

const getBounded = (value: number, max: number) => {
    if (value < 0) {
        return 0
    }
    if (value < max) {
        return value
    }
    return max
}

const ScrollSyncNode: React.ForwardRefExoticComponent<ScrollSyncNodeProps &
    React.RefAttributes<EventTarget & HTMLElement>> = forwardRef<EventTarget & HTMLElement, ScrollSyncNodeProps>(
    (props, forwardedRef) => {
        const {
            children,
            group = 'default',
            scroll = 'two-way',
            selfLockAxis = null,
            onScroll: onNodeScroll = () => undefined,
        } = props

        const { registerNode, unregisterNode, onScroll, onDrag } = useContext(ScrollingSyncerContext)

        const ref = useRef<EventTarget & HTMLElement>(null)

        useEffect(() => {
            if (typeof forwardedRef === 'function') {
                forwardedRef(ref.current)
            }
        }, [forwardedRef])

        const applySelfLockAxis = (event: WheelEvent) => {
            const movingAxis = getMovingAxis(event)
            if (selfLockAxis === 'X' && movingAxis === 'X') {
                event.preventDefault()
            } else if (selfLockAxis === 'Y' && movingAxis === 'Y') {
                event.preventDefault()
            } else if (selfLockAxis === 'XY' && (movingAxis === 'XY' || movingAxis === 'X' || movingAxis === 'Y')) {
                event.preventDefault()
            }
        }

        useEffect(() => {
            const syncableElement = { node: ref.current, scroll }
            if (syncableElement) {
                registerNode(syncableElement, toArray(group))
            }

            ref.current?.addEventListener('wheel', applySelfLockAxis, { passive: false })

            return () => {
                unregisterNode(syncableElement, toArray(group))
                ref.current?.removeEventListener('wheel', applySelfLockAxis)
            }
        }, [applySelfLockAxis, group, registerNode, unregisterNode, scroll])

        useEffect(() => {
            const syncableElement = { node: ref.current, scroll }

            unregisterNode(syncableElement, toArray(group))
            registerNode(syncableElement, toArray(group))
            return () => unregisterNode(syncableElement, toArray(group))
        }, [registerNode, unregisterNode, scroll, group])

        const isSyncer = scroll === 'syncer-only'
        const isEnabled = scroll === 'two-way'

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

                console.log({
                    clientHeight,
                    clientWidth,
                    scrollHeight,
                    scrollWidth,
                })

                setMaxScroll({
                    y: scrollHeight - clientHeight,
                    x: scrollWidth - clientWidth
                })
            }
        }, [])

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

        return React.cloneElement(children, {
            ref,
            onScroll: (e: React.UIEvent<HTMLElement>) => {
                e.persist()
                if (isSyncer || isEnabled) {
                    onScroll(e, toArray(group))
                    onNodeScroll(e)
                }
            },
            onWheel: (e: React.UIEvent<HTMLElement>) => {
                e.persist()
                if (isSyncer || isEnabled) {
                    onScroll(e, toArray(group))
                    onDrag(e.currentTarget.id)
                    onNodeScroll(e)
                }
            },
            onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => {
                if (event.preventDefault) {
                    event.preventDefault()
                }
                if (!maxScroll) {
                    calcMaxScroll()
                }
                setStartScroll({
                    x: ref.current?.scrollLeft || 0,
                    y: ref.current?.scrollTop || 0,
                })
                setDragStart({ x: event.clientX, y: event.clientY })
                setIsDragging(true)
            },
            onMouseMove: (event: React.MouseEvent<HTMLDivElement>) => {
                if (event.preventDefault) {
                    event.preventDefault()
                }
                if (!isDragging || !maxScroll) {
                    return
                }
                onDrag(event.currentTarget.id)

                const x = event.clientX
                const y = event.clientY

                const newScroll = {
                    x: startScroll.x,
                    y: startScroll.y,
                }

                if (true /*canDrag.x*/) {
                    newScroll.x = getBounded(startScroll.x + dragStart.x - x, maxScroll.x)
                }
                if (true /*canDrag.y*/) {
                    newScroll.y = getBounded(dragStart.y - y + startScroll.y, maxScroll.y)
                }

                if(ref.current) {
                    ref.current.scrollLeft = newScroll.x
                    ref.current.scrollTop = newScroll.y
                }
            }
        })
    },
)

ScrollSyncNode.displayName = 'ScrollSyncNode'

export default ScrollSyncNode;