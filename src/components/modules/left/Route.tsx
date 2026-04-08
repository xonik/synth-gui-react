import { useCallback } from 'react'
import { BUTTON_DISTANCE_S, POT_DISTANCE_L, POT_DISTANCE_M, POT_OFFSET_Y } from '@/constants'
import { useUiStore } from '@/store'
import { useVoiceGroupStore, voiceGroupStores } from '@/store/patchStore'
import { getBounded } from '@/store/utils'
import { digitalModSources } from '@/synthcore/modules/mods/utils'
import RoundLedPushButton8 from '../../buttons/RoundLedPushButton8'
import { ModuleBorder } from '../../misc/ModuleBorder'
import SubHeader from '../../misc/SubHeader'
import RotaryPot12 from '../../pots/RotaryPot12'
import type { ModuleProps } from '../types'

const Route = ({ x, y, height, width }: ModuleProps) => {
    const routeButton = useUiStore((s) => s.modRouteButton)
    const setRouteButton = useUiStore((s) => s.setModRouteButton)
    const sourceIndex = useUiStore((s) => s.modRouting.sourceId)
    const soloedDst = useUiStore((s) => s.soloedDst)
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)

    const sourceCtrlId = sourceIndex !== undefined ? digitalModSources[sourceIndex].id : undefined

    // Read the actual mod amount from patch state for the soloed destination
    const modAmount = useVoiceGroupStore(voiceGroupIndex, (s) => {
        if (sourceCtrlId === undefined || soloedDst === undefined) return 0
        return s.mods?.[sourceCtrlId]?.[soloedDst.ctrlId]?.[soloedDst.ctrlIndex] ?? 0
    })

    const onSourceClick = useCallback(() => {
        setRouteButton(routeButton === 1 ? 0 : 1)
    }, [routeButton, setRouteButton])

    const onDestClick = useCallback(() => {
        // Don't allow entering dest mode without a source selected
        if (sourceIndex === undefined) return
        setRouteButton(routeButton === 2 ? 0 : 2)
    }, [routeButton, setRouteButton, sourceIndex])

    const onAmountIncrement = useCallback(
        (delta: number) => {
            if (sourceCtrlId === undefined || soloedDst === undefined) return
            const current = voiceGroupStores[voiceGroupIndex].getState().mods?.[sourceCtrlId]?.[soloedDst.ctrlId]?.[soloedDst.ctrlIndex] ?? 0
            const next = getBounded(current + delta, -1, 1)
            voiceGroupStores[voiceGroupIndex].getState().set((state: any) => {
                if (!state.mods[sourceCtrlId]) state.mods[sourceCtrlId] = {}
                if (!state.mods[sourceCtrlId][soloedDst.ctrlId]) state.mods[sourceCtrlId][soloedDst.ctrlId] = {}
                state.mods[sourceCtrlId][soloedDst.ctrlId][soloedDst.ctrlIndex] = next
            })
        },
        [sourceCtrlId, soloedDst, voiceGroupIndex]
    )

    const col1 = x + POT_DISTANCE_M / 2
    const col2 = col1 + BUTTON_DISTANCE_S
    const col3 = col1 + POT_DISTANCE_L

    return (
        <>
            <ModuleBorder x={x} y={y} height={height} width={width} />
            <SubHeader label="Route" x={x} y={y} width={width} labelPosition="center" labelWidth={15} />

            <RoundLedPushButton8
                labelPosition="bottom-pot"
                x={col1}
                y={y + POT_OFFSET_Y}
                label="Source"
                value={routeButton === 1 ? 1 : 0}
                onButtonClick={onSourceClick}
            />

            <RoundLedPushButton8
                labelPosition="bottom-pot"
                x={col2}
                y={y + POT_OFFSET_Y}
                label="Dest"
                value={routeButton === 2 ? 1 : 0}
                onButtonClick={onDestClick}
            />

            <RotaryPot12
                ledMode="single"
                potMode="pan"
                label="Amount"
                x={col3}
                y={y + POT_OFFSET_Y}
                value={modAmount}
                disabled={soloedDst === undefined}
                onValueIncrement={onAmountIncrement}
            />
        </>
    )
}

export default Route
