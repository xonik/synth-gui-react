import EnvelopeControl from './envelopes/EnvelopeControl'
import React from 'react'

// PS: 1 inch in svg is 96pixels, so 1cm = 96px / 2.54
// approx. 9"
const displayWidth = 180;
const displayHeight = 9 * displayWidth / 16;

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const Controller = () => {
    return <EnvelopeControl x={0} y={0} width={displayWidth} height={displayHeight}/>
}

export default Controller