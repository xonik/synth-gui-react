import { useUiStore } from '../../store/uiStore'
import { modDst, shortLabel } from '../../synthcore/modules/mods/utils'
import { DraggableElementProps } from './types'
import classNames from 'classnames'
import { ControllerConfig } from '../../midi/types'

interface DstLabelProps {
    paramIndex: number,
    funcIndex: number,
    dst: ControllerConfig
}

const DstLabel = ({ funcIndex, paramIndex, dst }: DstLabelProps) => {
    const selectedDstFunc = useUiStore(s => s.modRouting.dstFuncId ?? 0)
    const selectedDstParam = useUiStore(s => s.modRouting.dstParamId ?? 0)

    const isSelected = funcIndex === selectedDstFunc && paramIndex === selectedDstParam

    return <div
        className={classNames('mod-ctrl__dst__label', { 'mod-ctrl__dst__label--selected': isSelected })}
        key={paramIndex}>
        {shortLabel(dst)}
    </div>
}

const DstLabels = ({ onMouseDown, onMouseMove }: DraggableElementProps) => {
    const dstGroupId = useUiStore(s => s.modRouting.dstGroupId ?? 0)
    const dstGroup = modDst.dsts[dstGroupId]

    return (
        <div className="mod-ctrl__dsts"
             onMouseDown={onMouseDown}
             onMouseMove={onMouseMove}>
            {dstGroup.map((func, funcIndex) => {
                return <div className="mod-ctrl__dst" key={funcIndex}>
                    {<div className="mod-ctrl__dst__func">
                        {shortLabel(modDst.funcProps[dstGroupId][funcIndex])}
                    </div>}
                    <div className="mod-ctrl__dst__props">
                        {func.map((controller, paramIndex) => <DstLabel
                            key={paramIndex}
                            dst={controller}
                            paramIndex={paramIndex}
                            funcIndex={funcIndex}
                        />)}
                    </div>
                </div>
            })}
        </div>
    )
}

export default DstLabels
