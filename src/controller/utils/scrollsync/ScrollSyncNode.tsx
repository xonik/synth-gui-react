import React, { forwardRef, useCallback, useContext, useEffect, useRef } from 'react'
import { ScrollingSyncerContext } from './ScrollSync'
import { getMovingAxis, toArray } from './utils'
import { useDrag } from '../../../hooks'

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
    lockAxis?: LockAxis;
    /**
     * Callback for scroll handling
     */
    onScroll?: (e: React.UIEvent<HTMLElement>) => void;
}

interface ScrollingSyncNodeContextValues {
    onScrollToElement: (
        offsetLeft: number,
        offsetTop: number,
        offsetWidth: number,
        offsetHeight: number
    ) => void,
}

export const ScrollingSyncNodeContext: React.Context<ScrollingSyncNodeContextValues> = React.createContext({
    onScrollToElement: (
        offsetLeft: number,
        offsetTop: number,
        offsetWidth: number,
        offsetHeight: number
    ) => {},
})

const ScrollSyncNode: React.ForwardRefExoticComponent<ScrollSyncNodeProps &
    React.RefAttributes<EventTarget & HTMLElement>> = forwardRef<EventTarget & HTMLElement, ScrollSyncNodeProps>(
    (props, forwardedRef) => {
        const {
            children,
            group = 'default',
            scroll = 'two-way',
            lockAxis = null,
            onScroll: onNodeScroll = () => undefined,
        } = props

        const { registerNode, unregisterNode, onScroll, onDrag } = useContext(ScrollingSyncerContext)

        const ref = useRef<EventTarget & HTMLElement>(null)

        useEffect(() => {
            if (typeof forwardedRef === 'function') {
                forwardedRef(ref.current)
            }
        }, [forwardedRef])


        useEffect(() => {
            const applyLockAxis = (event: WheelEvent) => {
                const movingAxis = getMovingAxis(event)
                if (lockAxis === 'X' && movingAxis === 'X') {
                    event.preventDefault()
                } else if (lockAxis === 'Y' && movingAxis === 'Y') {
                    event.preventDefault()
                } else if (lockAxis === 'XY' && movingAxis !== null) {
                    event.preventDefault()
                }
            }

            const node = ref.current
            const syncableElement = { node, scroll, lockAxis }

            if (syncableElement) {
                registerNode(syncableElement, toArray(group))
            }

            node?.addEventListener('wheel', applyLockAxis, { passive: false })

            return () => {
                unregisterNode(syncableElement, toArray(group))
                node?.removeEventListener('wheel', applyLockAxis)
            }
        }, [lockAxis, group, registerNode, unregisterNode, scroll])

        useEffect(() => {
            const syncableElement = { node: ref.current, scroll }

            unregisterNode(syncableElement, toArray(group))
            registerNode(syncableElement, toArray(group))
            return () => unregisterNode(syncableElement, toArray(group))
        }, [registerNode, unregisterNode, scroll, group])

        const isSyncer = scroll === 'syncer-only'
        const isEnabled = scroll === 'two-way'

        const { onMouseDown, onMouseMove } = useDrag(lockAxis?.includes('X') || false, lockAxis?.includes('Y') || false, ref, onDrag)

        const onScrollToElement = useCallback((
            offsetLeft: number,
            offsetTop: number,
            offsetWidth: number,
            offsetHeight: number
        ) => {
            if(ref.current){
                ref.current.scrollTop = offsetTop
                ref.current.scrollLeft = offsetLeft
            }
        }, [])

        return (
            <ScrollingSyncNodeContext.Provider
                value={{
                    onScrollToElement
                }}>
                {React.cloneElement(children, {
                    ref,
                    onScroll: (e: React.UIEvent<HTMLElement>) => {
                        e.persist()
                        if (isSyncer || isEnabled) {
                            onScroll(e, toArray(group), lockAxis)
                            onNodeScroll(e)
                        }
                    },
                    onWheel: (e: React.UIEvent<HTMLElement>) => {
                        e.persist()
                        if (isSyncer || isEnabled) {
                            onScroll(e, toArray(group), lockAxis)
                            onDrag(e.currentTarget)
                            onNodeScroll(e)
                        }
                    },
                    onMouseDown: onMouseDown,
                    onMouseMove: onMouseMove,
                })}
            </ScrollingSyncNodeContext.Provider>
        )
    },
)

ScrollSyncNode.displayName = 'ScrollSyncNode'

export default ScrollSyncNode