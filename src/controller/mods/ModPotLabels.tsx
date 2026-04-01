import { useUiStore, useVoiceGroupStore } from '@/store'
import { digitalModSources, modDst } from '@/synthcore/modules/mods/utils'
import '../components/PotLabels.scss'

const ModPotLabels = () => {
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)
    const routing = useUiStore((s) => s.modRouting)
    const sourceIndex = routing.sourceId ?? 0
    const dstGroupId = routing.dstGroupId ?? 0
    const dstFuncId = routing.dstFuncId ?? 0
    const dstParamId = routing.dstParamId ?? 0

    const dst = modDst.dsts[dstGroupId][dstFuncId][dstParamId]
    const dstCtrlIndex = modDst.funcProps[dstGroupId][dstFuncId].ctrlIndex || 0
    const source = digitalModSources[sourceIndex]

    const sourceId = source.id
    const dstId = dst.id
    const dstValue = useVoiceGroupStore(voiceGroupIndex, (s) => s.mods?.[sourceId]?.[dstId]?.[dstCtrlIndex] ?? 0)

    const values = [
        modDst.groupLabels[dstGroupId],
        digitalModSources[sourceIndex].label,
        modDst.funcProps[dstGroupId][dstFuncId].label,
        modDst.dsts[dstGroupId][dstFuncId][dstParamId].label,
        `${Math.round(100 * dstValue)}%`,
        '',
    ]
    const labels = ['Group', 'Source', 'Func', 'Param', 'Amount', '']

    return (
        <div className="pot-labels pot-labels--two-rows">
            <div className="pot-labels__row">
                {values.map((value, index) => (
                    <div key={labels[index]} className="pot-labels__label">
                        {value}
                    </div>
                ))}
            </div>
            <div className="pot-labels__row">
                {labels.map((label) => (
                    <div key={label} className="pot-labels__label">
                        {label}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ModPotLabels
