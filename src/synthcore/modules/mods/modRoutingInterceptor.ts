import { useUiStore } from '@/store/uiStore'
import { digitalModSources, modDst } from './utils'

export const ROUTE_SOURCE_ACTIVE = 1
export const ROUTE_DST_ACTIVE = 2

// ── Source lookup ────────────────────────────────────────────────────────────
// Maps hardware source controller id → index in digitalModSources.
const sourceIndexLookup = new Map<number, number>()
digitalModSources.forEach((src, idx) => sourceIndexLookup.set(src.id, idx))

// ── Destination lookup ───────────────────────────────────────────────────────
// Maps "ctrlId:ctrlIndex" → location in modDst hierarchy.
// ctrlIndex distinguishes instances (e.g. LFO 1 vs LFO 2) for shared ctrl ids.
// Modules without multiple instances use ctrlIndex 0.
type DstLocation = { dstGroupId: number; dstFuncId: number; dstParamId: number }
const dstLookup = new Map<string, DstLocation>()

modDst.dsts.forEach((group, gIdx) => {
    group.forEach((func, fIdx) => {
        const ctrlIndex = modDst.funcProps[gIdx][fIdx].ctrlIndex ?? 0
        func.forEach((param, pIdx) => {
            dstLookup.set(`${param.id}:${ctrlIndex}`, {
                dstGroupId: gIdx,
                dstFuncId: fIdx,
                dstParamId: pIdx,
            })
        })
    })
})

/**
 * When Route→Source is active, selects hwSourceId as the mod source.
 * Returns true if the interaction was consumed (caller should skip its normal action).
 */
export const trySelectSource = (hwSourceId: number): boolean => {
    if (useUiStore.getState().modRouteButton !== ROUTE_SOURCE_ACTIVE) return false
    const idx = sourceIndexLookup.get(hwSourceId)
    if (idx !== undefined) {
        useUiStore.getState().setModRouting({ sourceId: idx })
    }
    return true
}

/**
 * When Route→Dest is active, selects the controller as the mod destination.
 * Only consumes the interaction (returns true) if the controller has isDstDigi,
 * so non-modulatable controls still work normally while dest routing is active.
 */
export const trySelectDst = (ctrlId: number, ctrlIndex: number): boolean => {
    if (useUiStore.getState().modRouteButton !== ROUTE_DST_ACTIVE) return false
    const location = dstLookup.get(`${ctrlId}:${ctrlIndex}`)
    if (!location) return false
    useUiStore.getState().setModRouting(location)
    return true
}
