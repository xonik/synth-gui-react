import React, { Component } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';



class KeyboardInput extends Component {

    state = {
        val: "",
        kbdlayout: "default",
        capslocked: false,
    }
    onChange = (input: any) => {
        this.setState({val: input})
        console.log("Input changed", input);
    }

    onKeyPress = (key: string) => {
        console.log(`PRessed ${key}`)
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
        console.log(`Released ${key}`)
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
            //https://hodgef.com/simple-keyboard/documentation/options/
            <>
                <input type="text" value={this.state.val} onChange={this.onChange}/>
                <Keyboard

                    onChange={this.onChange}
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