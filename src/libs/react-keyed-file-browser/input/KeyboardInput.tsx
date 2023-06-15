import React, { Component } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

// https://hodgef.com/simple-keyboard/documentation/options/
class KeyboardInput extends Component {

    private keyboard: any

    state = {
        value: "",
        kbdlayout: "default",
        capslocked: false,
    }

    // Handle changes coming from the keyboard
    onKeyboardInputChange = (value: any) => {
        this.setState({value})
    }

    // Handle changes to the input field (i.e. when the user enters text using a normal keyboard)
    onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        this.setState(
            {
                value
            },
            () => {
                this.keyboard.setInput(value);
            }
        );
    };

    onKeyPress = (key: string) => {
        if(key === '{shift}'){
            if(this.state.capslocked){
                this.setState({kbdlayout: 'default'})
            } else {
                this.setState({kbdlayout: 'shift'})
            }
        }
        if(key === '{lock}'){
            if(this.state.capslocked){
                this.setState({
                    capslocked: false,
                    kbdlayout: 'default'
                })
            } else {
                this.setState({
                    capslocked: true,
                    kbdlayout: 'shift'
                })
            }
        }
    }

    onKeyRelease = (key: string) => {
        if(key === '{shift}'){
            if(this.state.capslocked){
                this.setState({kbdlayout: 'shift'})
            } else {
                this.setState({kbdlayout: 'default'})
            }
        }
    }

    render() {
        return (
            <>
                <input type="text" value={this.state.value} onChange={this.onInputChange}/>
                <Keyboard
                    keyboardRef={(ref) => (this.keyboard = ref)}
                    onChange={this.onKeyboardInputChange}
                    onKeyPress={this.onKeyPress}
                    onKeyReleased={this.onKeyRelease}
                    layoutName={this.state.kbdlayout}
                    layout={kbdlayouts}
                />
            </>
        );
    }
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

export default KeyboardInput