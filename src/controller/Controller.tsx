import EnvelopeControl from './envelopes/EnvelopeControl'
import React from 'react'

interface Props {
    height: number;
    width: number;
}

const Controller = ({height, width}: Props) => {
    // 1 inch in svg is 96 pixels, so 1mm = 96px / 25.4
    const heightMm = (height * 25.4) / 96;
    const widthMm = (width * 25.4) / 96;

    return <EnvelopeControl x={0} y={0} width={widthMm} height={heightMm}/>
}

export default Controller