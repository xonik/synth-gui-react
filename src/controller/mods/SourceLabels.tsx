import React from 'react'
import { digitalModSources } from '../../synthcore/modules/mods/utils'
import { DraggableElementProps } from './types'

const SourceLabels = ({ onMouseDown, onMouseMove }: DraggableElementProps) => {
    return (
        <div className="mod-ctrl__sources"
             onMouseDown={onMouseDown}
             onMouseMove={onMouseMove}
        >
            {digitalModSources
                .map((controller, ctrlIndex) => {
                    return <div
                        className="mod-ctrl__source"
                        key={ctrlIndex}>
                        {controller.label}
                    </div>
                })}
        </div>
    )
}

export default SourceLabels