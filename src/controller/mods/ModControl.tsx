import React from 'react'
import { useAppSelector } from '../../synthcore/hooks'
import './ModControl.scss'

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const ModControl = () => {

    return <div className="mod-ctrl">
        {/*<EnvOptions env={env}/>
        <div className="env-ctrl-stages">
            <StageNames env={env}/>
            <div className="env-ctrl-graph">
                <svg viewBox={`0 0 1 1`} preserveAspectRatio="none" className="env-ctrl-graph-svg">
                    <Stages env={env}/>
                </svg>
            </div>
            <StageParams env={env}/>
        </div>
        <StageActivator env={env}/>*/
        }
    </div>
}

export default ModControl