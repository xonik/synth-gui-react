import * as React from 'react'
import { useCallback, useState } from 'react'

type KeyboardContextType = {
    keyboardVisible: boolean,
    heading: string,
    valueTarget: (EventTarget & HTMLInputElement) | undefined
    showKeyboard: (currentTarget: EventTarget & HTMLInputElement, heading: string) => void
    hideKeyboard: () => void
    initialKeyboardValue: string,
}
export const KeyboardContext = React.createContext<KeyboardContextType>({
    keyboardVisible: false,
    heading: '',
    valueTarget: undefined,
    showKeyboard: (currentTarget: EventTarget & HTMLInputElement, heading: string) => {},
    hideKeyboard: () => {},
    initialKeyboardValue: '',
})

// @ts-ignore
function KeyboardProvider({ children }) {
    const [keyboardVisible, setKeyboardVisible] = useState(false)
    const [heading, setHeading] = useState('')
    const [initialKeyboardValue, setInitialKeyboardValue] = useState('')
    const [
        valueTarget,
        setValueTarget
    ] = useState<(EventTarget & HTMLInputElement)>()

    const showKeyboard = useCallback((currentTarget: EventTarget & HTMLInputElement, heading: string) => {
        setHeading(heading)
        setKeyboardVisible(true)
        setValueTarget(currentTarget)
        setInitialKeyboardValue(currentTarget.value)
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
        valueTarget,
        initialKeyboardValue
    }}>
        {children}
    </KeyboardContext.Provider>
}

export { KeyboardProvider }