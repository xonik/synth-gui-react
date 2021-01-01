import React from 'react';
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
        </svg>
    );
}