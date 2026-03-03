import { useEffect, useRef } from 'react'

/**
 * Custom hook to add an event listener to an element (defaults to window).
 * Replacement for the deprecated @use-it/event-listener package,
 * which doesn't work in Vite/ESM because it references `global`.
 */
export default function useEventListener<K extends keyof WindowEventMap>(
    eventName: K,
    handler: (event: WindowEventMap[K]) => void,
    element: EventTarget = window,
    options?: boolean | AddEventListenerOptions
): void {
    const savedHandler = useRef<(event: WindowEventMap[K]) => void>(handler)

    useEffect(() => {
        savedHandler.current = handler
    }, [handler])

    useEffect(() => {
        if (!element || !element.addEventListener) return

        const eventListener = (event: Event) => savedHandler.current(event as WindowEventMap[K])

        element.addEventListener(eventName, eventListener, options)
        return () => {
            element.removeEventListener(eventName, eventListener, options)
        }
    }, [eventName, element, options])
}

