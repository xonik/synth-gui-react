import React, { InputHTMLAttributes, useCallback, useContext, useState } from 'react'
import { KeyboardContext } from './KeyboardProvider'
import './KeyboardInput.scss'

// This is global because using useState didn't work
// (the result got delayed). It doesn't really matter
// as it is checked within 50ms and noone manages to move to a
// different input field and make it change.
let lastSearch: number = 0

const KeyboardAwareInput = ({heading, ...inputElementProps}: KeyboardAwareInputProps) => {
    const { showKeyboard } = useContext(KeyboardContext);

    const onInputFieldClick = useCallback((event: React.MouseEvent<HTMLInputElement>) => {
        const inputTarget = event.currentTarget

        // We want to wait for any input-events to see if the user has
        // pressed the "reset"-X before we open the keyboard
        setTimeout(() => {
            if (Date.now() - lastSearch > 50) {
                showKeyboard(inputTarget, heading)
            }
        }, 5)

    }, [heading, showKeyboard])


    return (
        <input
            {...inputElementProps}
            onClick={onInputFieldClick}
            onInput={(event) => {
                // input events are received when the input changes but also
                // when the "reset"-X is pressed. In that case we want to block
                // the click event, but the click event fires before the input
                // event so we delay the click and check if the value has been
                // changed before triggering it.
                if(event.currentTarget.value === '') {
                    lastSearch = Date.now()
                }
                if(inputElementProps.onInput) inputElementProps.onInput(event)
            }}
        />
    )
}

interface KeyboardAwareInputProps extends InputHTMLAttributes<HTMLInputElement> {
    heading: string
}

export default KeyboardAwareInput