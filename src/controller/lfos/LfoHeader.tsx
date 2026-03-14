import React from 'react'

interface Props {
    lfoId: number
}

const LfoHeader = ({ lfoId }: Props) => {
    return <div className="ctrl-header">
        <div className="ctrl-header__label ctrl-header__label--left">Params</div>
        <div className="ctrl-header__label ctrl-header__label--center">LFO {lfoId + 1}</div>
        <div className="ctrl-header__label ctrl-header__label--right">Active</div>
    </div>
}

export default LfoHeader

