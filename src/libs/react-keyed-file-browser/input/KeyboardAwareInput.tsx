import React, { InputHTMLAttributes, useCallback, useContext } from 'react'
import { KeyboardContext } from './KeyboardProvider'

const KeyboardAwareInput = ({heading, ...inputElementProps}: KeyboardAwareInputProps) => {
    const { showKeyboard } = useContext(KeyboardContext);

    const onInputFieldClick = useCallback((event: React.MouseEvent<HTMLInputElement>) => {
        showKeyboard(event.currentTarget, heading)
    }, [heading, showKeyboard])

    return (
        <input
            onClick={onInputFieldClick}
            {...inputElementProps}
        />
    )
}

interface KeyboardAwareInputProps extends InputHTMLAttributes<HTMLInputElement> {
    heading: string
}

export default KeyboardAwareInput