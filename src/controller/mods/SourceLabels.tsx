import React, { useCallback } from 'react'
import { digitalModSources } from '../../synthcore/modules/mods/utils'
import { DraggableElementProps } from './types'

const SourceLabels = ({ onMouseDown, onMouseMove }: DraggableElementProps) => {

    const mouseDownHandler = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        onMouseDown(event.clientX, event.clientY, true, false)
        if (event.preventDefault) {
            event.preventDefault()
        }
    }, [onMouseDown])

    const mouseMoveHandler = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        onMouseMove(event.clientX, event.clientY)
        if (event.preventDefault) {
            event.preventDefault()
        }
    }, [onMouseMove])

    return (
        <div className="mod-ctrl__sources"
             onMouseDown={mouseDownHandler}
             onMouseMove={mouseMoveHandler}
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