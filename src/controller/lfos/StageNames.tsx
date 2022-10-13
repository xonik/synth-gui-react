import React from 'react'
import classNames from 'classnames'
import './StageNames.scss'

interface Props {
    className?: string
    lfoId: number
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const StageNames = ({ lfoId, className }: Props) => {
    return <div className={classNames('stage-names', className)}>
        <div className="lfo-ctrl__heading">LFO {lfoId + 1}</div>
    </div>
}

export default StageNames
