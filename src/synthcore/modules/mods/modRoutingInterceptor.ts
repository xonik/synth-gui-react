import { useVoiceGroupStore, voiceGroupStores } from '@/store/patchStore'
import { useUiStore } from '@/store/uiStore'
import { digitalModSources, modDst } from './utils'

export const ROUTE_SOURCE_ACTIVE = 1
export const ROUTE_DST_ACTIVE = 2

export type FlashMode = 'candidate' | 'dimmed' | 'selected' | undefined

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

// ── Deselect guard ───────────────────────────────────────────────────────────
// Tracks when a destination was last selected. A second interaction on the same
// destination deselects it only after this delay has elapsed, preventing rapid
// pot turns from immediately toggling the selection back off.
const DESELECT_DELAY_MS = 600
let soloedDstSelectedAt = 0

const getSourceCtrlId = (sourceIndex: number): number => digitalModSources[sourceIndex].id

const getMods = (voiceGroupIndex: number) => voiceGroupStores[voiceGroupIndex].getState().mods

const getModAmount = (voiceGroupIndex: number, sourceCtrlId: number, ctrlId: number, ctrlIndex: number): number =>
    getMods(voiceGroupIndex)?.[sourceCtrlId]?.[ctrlId]?.[ctrlIndex] ?? 0

/**
 * When Route→Source is active, selects hwSourceId as the mod source and
 * automatically switches to dest mode.
 * Returns true if the interaction was consumed (caller should skip its normal action).
 */
export const trySelectSource = (hwSourceId: number): boolean => {
    if (useUiStore.getState().modRouteButton !== ROUTE_SOURCE_ACTIVE) return false
    const sourceIndex = sourceIndexLookup.get(hwSourceId)
    if (sourceIndex === undefined) return true  // consume but ignore unknown sources

    const uiStore = useUiStore.getState()
    uiStore.setModRouting({ sourceId: sourceIndex })
    uiStore.setRoutingSourceSelected(true)

    // Auto-jump to dest mode
    uiStore.setModRouteButton(ROUTE_DST_ACTIVE)

    // If this source has exactly one existing destination, auto-solo it
    const sourceCtrlId = getSourceCtrlId(sourceIndex)
    const voiceGroupIndex = uiStore.currentVoiceGroupIndex
    const srcMods = getMods(voiceGroupIndex)?.[sourceCtrlId] ?? {}
    const existingDsts = Object.entries(srcMods).flatMap(([dstId, ctrlIndexMap]) =>
        Object.entries(ctrlIndexMap)
            .filter(([, amount]) => amount !== 0)
            .map(([ctrlIndex]) => ({ ctrlId: Number(dstId), ctrlIndex: Number(ctrlIndex) }))
    )
    if (existingDsts.length === 1) {
        const autoDst = existingDsts[0]
        const autoLocation = dstLookup.get(`${autoDst.ctrlId}:${autoDst.ctrlIndex}`)
        if (autoLocation) uiStore.setModRouting(autoLocation)
        uiStore.setSoloedDst(autoDst)
        uiStore.setRoutingDstSelected(true)
        soloedDstSelectedAt = Date.now()
    }

    return true
}

/**
 * When Route→Dest is active, selects or deselects the controller as the mod destination.
 * - First interaction: solos the destination for amount editing.
 * - Second interaction on the same destination: deselects and zeroes the mod amount.
 *   - fromClick=true (explicit click): deselects immediately, no delay.
 *   - fromClick=false (pot turn): deselects only after DESELECT_DELAY_MS has elapsed,
 *     preventing rapid turn events from bouncing the selection back off.
 * Only consumes the interaction (returns true) if the controller has isDstDigi.
 */
export const trySelectDst = (ctrlId: number, ctrlIndex: number, fromClick = false): boolean => {
    if (useUiStore.getState().modRouteButton !== ROUTE_DST_ACTIVE) return false
    if (!dstLookup.has(`${ctrlId}:${ctrlIndex}`)) return false

    const uiStore = useUiStore.getState()
    const sourceIndex = uiStore.modRouting.sourceId
    if (sourceIndex === undefined) return true  // no source selected, consume but no-op

    const soloedDst = uiStore.soloedDst
    const isSameDst = soloedDst?.ctrlId === ctrlId && soloedDst?.ctrlIndex === ctrlIndex
    const now = Date.now()

    const location = dstLookup.get(`${ctrlId}:${ctrlIndex}`)!

    if (isSameDst) {
        if (!fromClick && now - soloedDstSelectedAt < DESELECT_DELAY_MS) {
            // Pot turn within the delay window — still interacting, ignore
            return true
        }
        // Deliberate deselect: remove the routing and clear the solo
        const sourceCtrlId = getSourceCtrlId(sourceIndex)
        const voiceGroupIndex = uiStore.currentVoiceGroupIndex
        voiceGroupStores[voiceGroupIndex].getState().set((state: any) => {
            if (state.mods?.[sourceCtrlId]?.[ctrlId]) {
                delete state.mods[sourceCtrlId][ctrlId][ctrlIndex]
            }
        })
        uiStore.setSoloedDst(undefined)
        uiStore.setRoutingDstSelected(false)
        return true
    }

    // New destination: update display routing and solo it for amount editing
    uiStore.setModRouting(location)
    uiStore.setSoloedDst({ ctrlId, ctrlIndex })
    uiStore.setRoutingDstSelected(true)
    soloedDstSelectedAt = now
    return true
}

/**
 * React hook that returns helpers for computing flash state.
 * Call once per component, then use getSourceFlash / getDstFlash per control.
 */
export const useModRoutingFlash = () => {
    const modRouteButton = useUiStore((s) => s.modRouteButton)
    const routingSourceSelected = useUiStore((s) => s.routingSourceSelected)
    const selectedSourceIndex = useUiStore((s) => s.modRouting.sourceId)
    const currentVoiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)
    const soloedDst = useUiStore((s) => s.soloedDst)

    // Subscribe to mods so that changes to routing amounts trigger re-renders
    const mods = useVoiceGroupStore(currentVoiceGroupIndex, (s) => s.mods)

    const getSourceFlash = (hwSourceId: number): FlashMode => {
        if (modRouteButton !== ROUTE_SOURCE_ACTIVE) return undefined
        const idx = sourceIndexLookup.get(hwSourceId)
        if (idx === undefined) return undefined
        if (!routingSourceSelected) return 'candidate'
        return idx === selectedSourceIndex ? 'selected' : undefined
    }

    const getDstFlash = (ctrlId: number, ctrlIndex: number): FlashMode => {
        if (modRouteButton !== ROUTE_DST_ACTIVE) return undefined
        if (!dstLookup.has(`${ctrlId}:${ctrlIndex}`)) return undefined
        if (selectedSourceIndex === undefined) return 'candidate'

        // Soloed destination flashes immediately, regardless of whether an amount is set yet
        if (soloedDst?.ctrlId === ctrlId && soloedDst?.ctrlIndex === ctrlIndex) return 'selected'

        const sourceCtrlId = getSourceCtrlId(selectedSourceIndex)
        const amount = mods?.[sourceCtrlId]?.[ctrlId]?.[ctrlIndex] ?? 0
        if (amount !== 0) return 'selected'

        // Dim non-selected destinations when something is already selected or soloed
        const srcMods = mods?.[sourceCtrlId] ?? {}
        const hasAnyActive = soloedDst !== undefined ||
            Object.values(srcMods).some((ctrlIndexMap) => Object.values(ctrlIndexMap).some((a) => a !== 0))
        return hasAnyActive ? 'dimmed' : 'candidate'
    }

    return { getSourceFlash, getDstFlash }
}
