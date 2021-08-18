import React from 'react'
import { digitalModSources, shortLabel } from '../../synthcore/modules/mods/utils'
import { DraggableElementProps } from './types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectGuiSource } from '../../synthcore/modules/mods/modsReducer'
import classNames from 'classnames'
import { ControllerConfig } from '../../midi/types'

interface LabelProps {
    sourceIndex: number,
    source: ControllerConfig,
}

const SourceLabel = ({ sourceIndex, source }: LabelProps) => {
    const selectedSource = useAppSelector(selectGuiSource)
    const isSelected = sourceIndex === selectedSource
    return <div
        className={classNames('mod-ctrl__source', { 'mod-ctrl__source--selected': isSelected })}
        key={sourceIndex}>
        {shortLabel(source)}
    </div>
}

const SourceLabels = ({ onMouseDown, onMouseMove }: DraggableElementProps) => {


    return (
        <div className="mod-ctrl__sources"
             onMouseDown={onMouseDown}
             onMouseMove={onMouseMove}
        >
            {digitalModSources
                .map((controller, sourceIndex) => <SourceLabel
                    key={sourceIndex}
                    sourceIndex={sourceIndex}
                    source={controller}
                />)}
        </div>
    )
}

export default SourceLabels