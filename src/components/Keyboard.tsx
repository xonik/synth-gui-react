import React from 'react';
import Route from './modules/Route';
import KeyboardControls from './modules/KeyboardControls';
import './Keyboard.scss';

export default () => {

    const panelHeight = 200;
    const panelWidth = 1050;

    const keyboardWidth = 849;
    const keyboardHeight = 140;

    const keyWidth = keyboardWidth / 36;

    const rightEndcapThickness = 15;
    const bottomThickness = 10;

    const kbdX = panelWidth - keyboardWidth - rightEndcapThickness;
    const kbdY = panelHeight - keyboardHeight - bottomThickness;

    const ctrlRow = 27;
    const keyCtrlCol = 40;
    // TODO:
    //  Patch select
    //  LFO 2
    //  Display ++

    /*
    // Move these to keyboard part.
    <KeyboardControls x={arpCol} y={keyboardRow}/>
    <Arpeggiator x={arpCol} y={arpRow}/>
    */
    return (
        <svg width="105cm" height="20cm" viewBox="0 0 1050 200" className="panel">
            <rect
                x={kbdX}
                y={kbdY}
                height={keyboardHeight}
                width={keyboardWidth}
                className="keys"
            />
            <line x1={kbdX + keyWidth * 7} y1={kbdY} x2={kbdX + keyWidth * 7} y2={kbdY + keyboardHeight} className="keys-octave-divider"/>
            <line x1={kbdX + keyWidth * 14} y1={kbdY} x2={kbdX + keyWidth * 14} y2={kbdY + keyboardHeight} className="keys-octave-divider"/>
            <line x1={kbdX + keyWidth * 21} y1={kbdY} x2={kbdX + keyWidth * 21} y2={kbdY + keyboardHeight} className="keys-octave-divider"/>
            <line x1={kbdX + keyWidth * 28} y1={kbdY} x2={kbdX + keyWidth * 28} y2={kbdY + keyboardHeight} className="keys-octave-divider"/>

            <Route x={20} y={ctrlRow}/>
            <KeyboardControls x={keyCtrlCol} y={ctrlRow-22}/>
            <Route x={panelWidth-20} y={ctrlRow}/>
        </svg>
    );
}