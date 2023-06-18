import React, { useCallback, useContext } from 'react'
import { KeyboardContext } from './KeyboardProvider'

const KeyboardAwareInput = ({heading}: KeyboardAwareInputProps) => {
    const { showKeyboard } = useContext(KeyboardContext);

    const onInputFieldClick = useCallback((event: React.MouseEvent<HTMLInputElement>) => {
        console.log("Field clicked")
        showKeyboard(event.currentTarget, heading)
    }, [showKeyboard])

    return (
        <input
            type="search"
            placeholder="Filter files"
            onClick={onInputFieldClick}
        />
    )
}

type KeyboardAwareInputProps = {
    heading: string
}

export default KeyboardAwareInput