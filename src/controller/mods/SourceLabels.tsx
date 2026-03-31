import classNames from 'classnames'
import type { ControllerConfig } from '../../midi/types'
import { useUiStore } from '../../store/uiStore'
import { digitalModSources, shortLabel } from '../../synthcore/modules/mods/utils'
import type { DraggableElementProps } from './types'

interface LabelProps {
    sourceIndex: number
    source: ControllerConfig
}

const SourceLabel = ({ sourceIndex, source }: LabelProps) => {
    const selectedSource = useUiStore((s) => s.modRouting.sourceId ?? 0)
    const isSelected = sourceIndex === selectedSource
    return (
        <div className={classNames('mod-ctrl__source', { 'mod-ctrl__source--selected': isSelected })} key={sourceIndex}>
            {shortLabel(source)}
        </div>
    )
}

const SourceLabels = ({ onMouseDown, onMouseMove }: DraggableElementProps) => {
    return (
        <div className="mod-ctrl__sources" onMouseDown={onMouseDown} onMouseMove={onMouseMove}>
            {digitalModSources.map((controller, sourceIndex) => (
                <SourceLabel key={sourceIndex} sourceIndex={sourceIndex} source={controller} />
            ))}
        </div>
    )
}

export default SourceLabels
