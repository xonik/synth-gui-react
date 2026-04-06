import { useUiStore } from '@/store/uiStore'
import { digitalModSources, modDst } from './utils'

export const ROUTE_SOURCE_ACTIVE = 1
export const ROUTE_DST_ACTIVE = 2

export type FlashMode = 'candidate' | 'selected' | undefined

// ── Source lookup ────────────────────────────────────────────────────────────
// Maps hardware source controller id → index in digitalModSources.
const sourceIndexLookup = new Map<number, number>()
digitalModSources.forEach((src, idx) => {
    sourceIndexLookup.set(src.id, idx)
})

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
        useUiStore.getState().setRoutingSourceSelected(true)
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
    useUiStore.getState().setRoutingDstSelected(true)
    return true
}

/**
 * React hook that returns helpers for computing flash state.
 * Call once per component, then use getSourceFlash / getDstFlash per control.
 */
export const useModRoutingFlash = () => {
    const modRouteButton = useUiStore((s) => s.modRouteButton)
    const routingSourceSelected = useUiStore((s) => s.routingSourceSelected)
    const routingDstSelected = useUiStore((s) => s.routingDstSelected)
    const selectedSourceId = useUiStore((s) => s.modRouting.sourceId)
    const selectedDstGroupId = useUiStore((s) => s.modRouting.dstGroupId)
    const selectedDstFuncId = useUiStore((s) => s.modRouting.dstFuncId)
    const selectedDstParamId = useUiStore((s) => s.modRouting.dstParamId)

    const getSourceFlash = (hwSourceId: number): FlashMode => {
        if (modRouteButton !== ROUTE_SOURCE_ACTIVE) return undefined
        const idx = sourceIndexLookup.get(hwSourceId)
        if (idx === undefined) return undefined
        if (!routingSourceSelected) return 'candidate'
        return idx === selectedSourceId ? 'selected' : undefined
    }

    const getDstFlash = (ctrlId: number, ctrlIndex: number): FlashMode => {
        if (modRouteButton !== ROUTE_DST_ACTIVE) return undefined
        const key = `${ctrlId}:${ctrlIndex}`
        const location = dstLookup.get(key)
        if (!location) return undefined
        if (!routingDstSelected) return 'candidate'
        if (
            location.dstGroupId === selectedDstGroupId &&
            location.dstFuncId === selectedDstFuncId &&
            location.dstParamId === selectedDstParamId
        ) {
            return 'selected'
        }
        return undefined
    }

    return { getSourceFlash, getDstFlash }
}
