import { useUiStore } from '@/store/uiStore'
import { useVoiceGroupStore } from '@/store/patchStore'
import { digitalModSources, modDst, shortLabel } from '@/synthcore/modules/mods/utils'
import './RoutingPopup.scss'

const RoutingPopup = () => {
    const modRouteButton = useUiStore((s) => s.modRouteButton)
    const sourceId = useUiStore((s) => s.modRouting.sourceId)
    const dstGroupId = useUiStore((s) => s.modRouting.dstGroupId)
    const dstFuncId = useUiStore((s) => s.modRouting.dstFuncId)
    const dstParamId = useUiStore((s) => s.modRouting.dstParamId)
    const soloedDst = useUiStore((s) => s.soloedDst)
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)

    const sourceCtrlId = sourceId !== undefined ? digitalModSources[sourceId].id : undefined

    const rawAmount = useVoiceGroupStore(voiceGroupIndex, (s) => {
        if (sourceCtrlId === undefined || soloedDst === undefined) return null
        const val = s.mods?.[sourceCtrlId]?.[soloedDst.ctrlId]?.[soloedDst.ctrlIndex]
        return val ?? null
    })

    if (modRouteButton === 0) return null

    const sourceName = sourceId !== undefined ? shortLabel(digitalModSources[sourceId]) : '—'

    let dstName = '—'
    if (soloedDst !== undefined && dstGroupId !== undefined && dstFuncId !== undefined && dstParamId !== undefined) {
        const funcLabel = shortLabel(modDst.funcProps[dstGroupId][dstFuncId])
        const paramLabel = shortLabel(modDst.dsts[dstGroupId][dstFuncId][dstParamId])
        dstName = `${funcLabel}: ${paramLabel}`
    }

    let amountStr = '—'
    if (soloedDst !== undefined && rawAmount !== null) {
        const pct = Math.round(rawAmount * 100)
        amountStr = pct >= 0 ? `+${pct}%` : `${pct}%`
    }

    return (
        <div className="routing-popup">
            <div className="routing-popup__box">
                <div className="routing-popup__row">
                    <span className="routing-popup__label">Source</span>
                    <span className="routing-popup__value">{sourceName}</span>
                </div>
                <div className="routing-popup__row">
                    <span className="routing-popup__label">Destination</span>
                    <span className="routing-popup__value">{dstName}</span>
                </div>
                <div className="routing-popup__row">
                    <span className="routing-popup__label">Amount</span>
                    <span className="routing-popup__value">{amountStr}</span>
                </div>
            </div>
        </div>
    )
}

export default RoutingPopup
