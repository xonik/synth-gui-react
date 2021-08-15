import React, { FC, useRef, useState } from 'react'
import { LockAxis, ScrollConfig } from './ScrollSyncNode'

/**
 * ScrollSync and ScrollSyncNode are copied and modified from
 * https://github.com/AhmadMHawwash/scroll-sync-react
 */

export interface ScrollSyncProps {
    children: React.ReactNode;
    /**syncing enable control */
    disabled?: boolean;
    /** In case we want scroll to be proportionally applied regardless of the width and/or height*/
    proportional?: boolean;
}

interface RecordMap<T> {
    [key: string]: T;
}

/**
 * node should be scrollable
 */
export type Node = (EventTarget & HTMLElement) | null;

/**
 * node should be scrollable
 */
interface SyncableElement {
    node: Node;
    scroll: ScrollConfig;
}

interface ScrollingSyncerContextValues {
    /**
     * register node to be synced with other scrolled nodes
     */
    registerNode: (node: SyncableElement, groups: string[]) => void;
    /**
     * unregister node to stop syncing with other scrolled nodes
     */
    unregisterNode: (node: SyncableElement, group: string[]) => void;
    /**
     * scroll handler for each node.onScroll
     */
    onScroll: (e: React.UIEvent<HTMLElement>, groups: string[], lockAxis: LockAxis) => void;

    setScrollSource: (dragNode: HTMLElement) => void;
}

/**
 * ScrollingSyncerContext is the context to be handling scrolled nodes
 */
export const ScrollingSyncerContext: React.Context<ScrollingSyncerContextValues> = React.createContext({
    registerNode: (_node: SyncableElement, _group: string[]) => {
    },
    unregisterNode: (_node: SyncableElement, _group: string[]) => {
    },
    onScroll: (_e, _groups: string[], _lockAxis: LockAxis) => {
    },
    setScrollSource: (dragNode: HTMLElement) => {
    },
})

/**
 * ScrollSync component is a context based component,
 * that wrappes children to be .Provided with context utils and eventsHandlers
 * @param props ScrollSyncProps
 */
export const ScrollSync: FC<ScrollSyncProps> = props => {
    /**
     * a map of group: and it's nodes
     * {
     *  groupA: [node1, node2, node3],
     *  groupB: [node4, node5],
     *  groupC: [node1, node4],
     * }
     */
    const nodesRef = useRef<RecordMap<(SyncableElement)[]>>({})
    const elements = nodesRef.current

    const findGroup = (group: string): boolean => {
        return !!elements[group]
    }

    const doesNodeExists = (node: Node, group: string): boolean => {
        const groupExists = findGroup(group)
        if (!groupExists) {
            return false
        }

        const foundNode = elements[group].find(element => element.node === node)
        if (!foundNode) {
            return false
        }

        return !!foundNode
    }

    /**
     * this function will register your node (that uses ScrollSyncNode)
     * to be scroll-synced with it's other registered nodes
     *
     * @param element to be registred
     * @param groups to which groups the node should be registered
     */
    const registerNode = (element: SyncableElement, groups: string[]) => {
        groups.forEach(group => {
            const groupExists = findGroup(group)
            if (!groupExists) {
                elements[group] = []
            }

            elements[group].push({ ...element })
        })
    }

    /**
     * this function will UNregister your node (that uses ScrollSyncNode)
     * to stop it's scroll-sync with other registered nodes
     *
     * used now when unmounting nodes
     *
     * @param element to be registred
     * @param groups to wich groups the node should be registered
     */
    const unregisterNode = (element: SyncableElement, groups: string[]) => {
        groups.forEach(group => {
            const doesNodeExist = doesNodeExists(element.node, group)
            if (doesNodeExist) {
                elements[group].splice(
                    elements[group].findIndex(e => element.node === e.node),
                    1,
                )
            }
        })
    }

    /**
     * calculate scrolling percentage of the scrolledNode to be synced with other nodes
     * @param scrolledNode !!
     * @param node other node to be scroll-synced
     */
    const syncScrollPosition = (scrolledNode: Node, node: Node, lockAxis: LockAxis) => {
        if (!scrolledNode || !node) {
            return
        }

        const { scrollTop, scrollLeft } = scrolledNode
        if (!lockAxis?.includes('X')) {
            node.scrollLeft = scrollLeft
        }
        if (!lockAxis?.includes('Y')) {
            node.scrollTop = scrollTop
        }

    }

    // Set to prevent circular updates of positions
    const [scrollSource, setScrollSource] = useState<Node>(null)

    /**
     * We sync all other nodes in the registered groups
     * @param scrolledNode !!
     * @param groups groups to be scroll-synced
     * @param lockAxis axis that should not be synced
     */
    const syncScrollPositions = (scrolledNode: Node, groups: string[], lockAxis: LockAxis) => {
        if (scrolledNode !== scrollSource) {
            return
        }
        groups.forEach(group => {
            elements[group].forEach(element => {
                /* For all nodes other than the currently scrolled one */
                if (scrolledNode !== element.node) {
                    const isEnabled = element.scroll === 'two-way'
                    const isSynced = element.scroll === 'synced-only';
                    (isEnabled || isSynced) && syncScrollPosition(scrolledNode, element.node, lockAxis)
                }
            })
        })
    }

    /**
     * check if previous frame was painted and we should paint next
     * if we should, then we call `requestAnimationFrame` again
     * and then clear the shouldPaintFrame flag till next animation frame
     *
     * @param node node to be scrolled
     * @param groups groups to be scroll-synced
     * @param lockAxis axis that should not be synced
     */
    const handleNodeScroll = (node: Node, groups: string[], lockAxis: LockAxis) => {
        // This used to have requestAnimationFrame, but that made us lose the
        // last position if moving too fast. Calling sync every time instead
        // works fine it seems.
        syncScrollPositions(node, groups, lockAxis)
    }

    return (
        <ScrollingSyncerContext.Provider
            value={{
                registerNode,
                unregisterNode,
                onScroll: (e, groups, lockAxis: LockAxis) => !props.disabled && handleNodeScroll(e.currentTarget, groups, lockAxis),
                setScrollSource: (scrollSource: HTMLElement) => setScrollSource(scrollSource)
            }}>
            {React.Children.only(props.children)}
        </ScrollingSyncerContext.Provider>
    )
}

ScrollSync.defaultProps = {
    disabled: false,
    proportional: true,
}

export default ScrollSync