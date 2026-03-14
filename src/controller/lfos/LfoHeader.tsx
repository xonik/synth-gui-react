import React from 'react'
import './LfoHeader.scss'

interface Props {
    lfoId: number
}

const LfoHeader = ({ lfoId }: Props) => {
    return <div className="lfo-header">
        <div className="lfo-header__label lfo-header__label--left">Params</div>
        <div className="lfo-header__label lfo-header__label--center">LFO {lfoId + 1}</div>
        <div className="lfo-header__label lfo-header__label--right">Active</div>
    </div>
}

export default LfoHeader

