import React from 'react'

interface Props {
    lfoId: number
}

const LfoHeader = ({ lfoId }: Props) => {
    return <div className="ctrl-header">
        <div className="ctrl-header__label ctrl-header__label--left">LFO {lfoId + 1}</div>
        <div className="ctrl-header__label ctrl-header__label--center"></div>
        <div className="ctrl-header__label ctrl-header__label--right">Stages</div>
    </div>
}

export default LfoHeader

