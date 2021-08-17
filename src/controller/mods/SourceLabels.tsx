import React from 'react'
import { digitalModSources } from '../../synthcore/modules/mods/utils'
import { DraggableElementProps } from './types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectGuiSource } from '../../synthcore/modules/mods/modsReducer'
import classNames from 'classnames'

interface LabelProps {
    sourceIndex: number,
    label: string,
}

const SourceLabel = ({ sourceIndex, label }: LabelProps) => {
    const selectedSource = useAppSelector(selectGuiSource)
    const isSelected = sourceIndex === selectedSource
    return <div
        className={classNames('mod-ctrl__source', { 'mod-ctrl__source--selected': isSelected })}
        key={sourceIndex}>
        {label}
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
                    label={controller.label}
                />)}
        </div>
    )
}

export default SourceLabels