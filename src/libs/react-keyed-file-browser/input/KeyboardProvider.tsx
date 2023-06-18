import * as React from 'react'
import { useCallback, useState } from 'react'

type KeyboardContextType = {
    keyboardVisible: boolean,
    heading: string,
    valueTarget: (EventTarget & HTMLInputElement) | undefined
    showKeyboard: (currentTarget: EventTarget & HTMLInputElement, heading: string) => void
    hideKeyboard: () => void
}
export const KeyboardContext = React.createContext<KeyboardContextType>({
    keyboardVisible: false,
    heading: '',
    valueTarget: undefined,
    showKeyboard: (currentTarget: EventTarget & HTMLInputElement, heading: string) => {},
    hideKeyboard: () => {},
})

// @ts-ignore
function KeyboardProvider({ children }) {
    const [keyboardVisible, setKeyboardVisible] = useState(false)
    const [heading, setHeading] = useState('')
    const [
        valueTarget,
        setValueTarget
    ] = useState<(EventTarget & HTMLInputElement)>()

    const showKeyboard = useCallback((currentTarget: EventTarget & HTMLInputElement, heading: string) => {
        setHeading(heading)
        setKeyboardVisible(true)
        setValueTarget(currentTarget)
    }, [setKeyboardVisible])

    const hideKeyboard = useCallback(() => {
        setKeyboardVisible(false)
        setValueTarget(undefined)
    }, [setKeyboardVisible])

    return <KeyboardContext.Provider value={{
        keyboardVisible,
        showKeyboard,
        hideKeyboard,
        heading,
        valueTarget }}>
        {children}
    </KeyboardContext.Provider>
}

export { KeyboardProvider }