import React, { useCallback, useContext, useRef, useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './KeboardInput.scss'
import Button from '../../../controller/Button'
import { SimpleKeyboard } from 'react-simple-keyboard/build/interfaces'
import { KeyboardContext } from './KeyboardProvider'

// https://hodgef.com/simple-keyboard/documentation/options/
const KeyboardInputModal = (props: KeyboardInputProps) => {

    const {
        heading,
        keyboardVisible ,
        hideKeyboard,
        valueTarget} = useContext(KeyboardContext)
    const keyboard = useRef<SimpleKeyboard>()
    const [value, setValue] = useState('')
    const [layout, setLayout] = useState('default')
    const [capsLocked, setCapsLocked] = useState(false)

    // Handle changes coming from the keyboard
    const onKeyboardInputChange = useCallback((value: any) => {
        setValue(value)
    }, [])

    // Handle changes to the input field (i.e. when the user enters text using a normal keyboard)
    const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        if (!value.match(whitelistRegex)) {
            return
        }
        setValue(value)
        keyboard.current?.setInput(value);
    }, [])

    const onKeyPress = useCallback((key: string) => {
        if (key === '{shift}') {
            if (capsLocked) {
                setLayout('default')
            } else {
                setLayout('shift')
            }
        }
        if (key === '{lock}') {
            if (capsLocked) {
                setLayout('default')
                setCapsLocked(false)
            } else {
                setLayout('shift')
                setCapsLocked(true)
            }
        }
    }, [capsLocked])

    const onKeyRelease = useCallback((key: string) => {
        if (key === '{shift}') {
            if (capsLocked) {
                setLayout('shift')
            } else {
                setLayout('default')
            }
        }
    }, [capsLocked])

    const onOkClick = useCallback(() => {
        const currentValue = value
        setValue('')
        keyboard.current?.setInput('')
        if(valueTarget) valueTarget.value = currentValue

        hideKeyboard()
    }, [props, value, hideKeyboard])

    const onCancelClick = useCallback(() => {
        console.log('Cancel')
        hideKeyboard()
    }, [props, hideKeyboard])

    if (!keyboardVisible) {
        return null
    }
    return (
        <div className="keyboard-input">
            <div className="keyboard-input_main">
                <div className="keyboard-input_heading">{heading}</div>
                <input className="keyboard-input_text" type="text" value={value}
                       onChange={onInputChange}/>
                <div className="keyboard-input_actions">
                    <Button active={true} onClick={onOkClick}>OK</Button>
                    <Button active={true} onClick={onCancelClick}>Cancel</Button>
                </div>
            </div>
            <Keyboard
                keyboardRef={(ref) => keyboard.current = ref}
                onChange={onKeyboardInputChange}
                onKeyPress={onKeyPress}
                onKeyReleased={onKeyRelease}
                layoutName={layout}
                layout={kbdlayouts}
            />
        </div>
    );

}

const kbdlayouts = {
    default: [
        ' 1 2 3 4 5 6 7 8 9 0 - {bksp}',
        ' q w e r t y u i o p ',
        '{lock} a s d f g h j k l {enter}',
        '{shift} z x c v b n m {shift}',
        '{space}'
    ],
    shift: [
        ' 1 2 3 4 5 6 7 8 9 0 - {bksp}',
        ' Q W E R T Y U I O P ',
        '{lock} A S D F G H J K L {enter}',
        '{shift} Z X C V B N M {shift}',
        '{space}'
    ],
}

const whitelistRegex = /^[0-9a-zA-Z \\-]*$/

type KeyboardInputProps = {
}

export default KeyboardInputModal