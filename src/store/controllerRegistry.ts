import arpControllers from '@/synthcore/modules/arp/arpControllers'
import commonFxControllers from '@/synthcore/modules/commonFx/commonFxControllers'
import envControllers from '@/synthcore/modules/env/envControllers'
import filtersControllers from '@/synthcore/modules/filters/filtersControllers'
import fxControllers from '@/synthcore/modules/fx/fxControllers'
import lfoControllers from '@/synthcore/modules/lfo/lfoControllers'
import masterClockControllers from '@/synthcore/modules/masterClock/masterClockControllers'
import modsControllers from '@/synthcore/modules/mods/modsControllers'
import noiseControllers from '@/synthcore/modules/noise/noiseControllers'
import oscControllers from '@/synthcore/modules/osc/oscControllers'
import outControllers from '@/synthcore/modules/out/outControllers'
import postMixControllers from '@/synthcore/modules/postMix/postMixControllers'
import ringModControllers from '@/synthcore/modules/ringMod/ringModControllers'
import srcMixControllers from '@/synthcore/modules/srcMix/srcMixControllers'
import { ScreenId } from './uiStore'

export type PopupInfo = {
    paramLabel: string
    moduleName: string
    screen?: ScreenId
    valueLabels?: readonly string[]
}

const registry = new Map<number, PopupInfo>()

function registerGroup(group: Record<string, unknown>, screen?: ScreenId): void {
    const props = group['props'] as { label: string } | undefined
    if (!props) return
    const moduleName = props.label

    for (const key of Object.keys(group)) {
        if (key === 'props') continue
        const ctrl = group[key]
        if (
            ctrl !== null &&
            typeof ctrl === 'object' &&
            typeof (ctrl as Record<string, unknown>)['id'] === 'number' &&
            typeof (ctrl as Record<string, unknown>)['label'] === 'string'
        ) {
            const id = (ctrl as Record<string, unknown>)['id'] as number
            const label = (ctrl as Record<string, unknown>)['label'] as string
            const valueLabels = (ctrl as Record<string, unknown>)['valueLabels'] as readonly string[] | undefined
            registry.set(id, { paramLabel: label, moduleName, screen, valueLabels })
        }
    }
}

// OSC
registerGroup(oscControllers.DCO1 as unknown as Record<string, unknown>, ScreenId.OSC)
registerGroup(oscControllers.DCO2 as unknown as Record<string, unknown>, ScreenId.OSC)
registerGroup(oscControllers.VCO as unknown as Record<string, unknown>, ScreenId.OSC)

// LFO
for (let i = 0; i < 4; i++) {
    registerGroup(lfoControllers(i) as unknown as Record<string, unknown>, ScreenId.LFO)
}

// ENV
for (let i = 0; i < 5; i++) {
    registerGroup(envControllers(i) as unknown as Record<string, unknown>, ScreenId.ENV)
}

// Filters
registerGroup(filtersControllers.LPF as unknown as Record<string, unknown>, ScreenId.FILTER)
registerGroup(filtersControllers.FILTERS as unknown as Record<string, unknown>, ScreenId.FILTER)
registerGroup(filtersControllers.SVF as unknown as Record<string, unknown>, ScreenId.FILTER)

// FX
registerGroup(fxControllers.DISTORTION as unknown as Record<string, unknown>, ScreenId.FX)
registerGroup(fxControllers.BIT_CRUSHER as unknown as Record<string, unknown>, ScreenId.FX)

// Common FX
registerGroup(commonFxControllers.DSP1 as unknown as Record<string, unknown>, ScreenId.FX)
registerGroup(commonFxControllers.DSP2 as unknown as Record<string, unknown>, ScreenId.FX)
registerGroup(commonFxControllers.CHORUS as unknown as Record<string, unknown>, ScreenId.FX)
registerGroup(commonFxControllers.FX_BIT_CRUSHER as unknown as Record<string, unknown>, ScreenId.FX)
registerGroup(commonFxControllers.FX_MIX as unknown as Record<string, unknown>, ScreenId.FX)

// ARP
registerGroup(arpControllers as unknown as Record<string, unknown>, ScreenId.ARP)

// Master clock
registerGroup(masterClockControllers as unknown as Record<string, unknown>, ScreenId.ARP)

// Source mix
registerGroup(srcMixControllers as unknown as Record<string, unknown>, ScreenId.OSC)

// Noise
registerGroup(noiseControllers as unknown as Record<string, unknown>, ScreenId.OSC)

// Ring mod
registerGroup(ringModControllers as unknown as Record<string, unknown>, ScreenId.OSC)

// Post mix (no screen)
registerGroup(postMixControllers as unknown as Record<string, unknown>, undefined)

// Out (no screen)
registerGroup(outControllers as unknown as Record<string, unknown>, undefined)

// Mods
registerGroup(modsControllers as unknown as Record<string, unknown>, ScreenId.MOD)

export function getPopupInfo(ctrlId: number): PopupInfo | undefined {
    return registry.get(ctrlId)
}
