// TODO: High value bits. Mod wheels, ribbon controller
import controllersOsc from './modules/osc/controllersOsc'
import controllersNoise from './modules/noise/controllersNoise'
import controllersRingMod from './modules/ringMod/controllersRingMod'
import controllersFx from './modules/fx/controllersFx'
import controllersLfo from '../synthcore/modules/lfo/lfoControllers'
import controllersSrcMix from './modules/srcMix/controllersSrcMix'
import modsControllers from '../synthcore/modules/mods/modsControllers'
import controllersMasterClock from './modules/masterClock/controllersMasterClock'
import controllersArp from './modules/arp/controllersArp'
import controllersVoices from './modules/voices/controllersVoices'
import mainDisplayControllers from '../synthcore/modules/mainDisplay/mainDisplayControllers'
import controllersTranspose from './modules/transpose/controllersTranspose'
import controllersKbd from './modules/kbd/controllersKbd'
import controllersFilters from './modules/filters/controllersFilters'
import controllersVoiceMix from './modules/postMix/controllersVoiceMix'
import controllersVoiceOut from './modules/postMix/controllersVoiceOut'
import envControllers from '../synthcore/modules/env/envControllers'
import controllersCommonFx from './modules/commonFx/controllersCommonFx'
import controllersOut from './modules/out/controllersOut'
import { controllersPerformance } from './modules/performance/controllersPerformance'

// controller functions grouped by type
export const controllerGroups = {
    SOUND_SOURCES: {
        label: 'Sound src',
        DCO1: controllersOsc.DCO1,
        DCO2: controllersOsc.DCO2,
        VCO: controllersOsc.VCO,
        NOISE: controllersNoise,
    },
    PRE_FX: {
        label: 'Pre FX',
        RING_MOD: controllersRingMod,
        DISTORTION: controllersFx.DISTORTION,
        BIT_CRUSHER: controllersFx.BIT_CRUSHER,
    },
    LFOS: {
        label: 'LFOs',
        LFO1: controllersLfo(0),
        LFO2: controllersLfo(1),
        LFO3: controllersLfo(2),
        LFO4: controllersLfo(3),
    },
    SOURCE_MIX: {
        // TODO: This one is a bit weird
        label: 'Source mix',
        SOURCE_MIX: controllersSrcMix,
    },
    CLK_ARP_KBD: {
        label: 'Controls',
        MASTER_CLOCK: controllersMasterClock,
        ARP: controllersArp,
        TRANSPOSE: controllersTranspose,
        KBD: controllersKbd,
    },
    MAIN_DISPLAY: {
        label: 'Main controls',
        VOICES: controllersVoices,
        MAIN_DISPLAY: mainDisplayControllers,
    },
    FILTER: {
        label: 'Filter',
        LPF: controllersFilters.LPF,
        FILTERS: controllersFilters.FILTERS,
        SVF: controllersFilters.SVF,
    },
    VOICE: {
        label: 'Voice out',
        VOICE_MIX: controllersVoiceMix,
        VOICE_OUT: controllersVoiceOut,
    },
    ENV: {
        label: 'Envelopes',
        ENV1: envControllers(0),
        ENV2: envControllers(1),
        ENV3: envControllers(2),
        ENV4: envControllers(3),
        ENV5: envControllers(4),
    },
    FX: {
        label: 'Effects',
        DSP1: controllersCommonFx.DSP1,
        DSP2: controllersCommonFx.DSP2,
        CHORUS: controllersCommonFx.CHORUS,
        FX_BIT_CRUSHER: controllersCommonFx.FX_BIT_CRUSHER,
        FX_MIX: controllersCommonFx.FX_MIX,
    },
    OUT: {
        label: 'Output',
        OUTPUT: controllersOut,
    },
    PERFORMANCE: {
        label: 'Performance controls',
        PERFORMANCE: controllersPerformance
    }
}

const controllers = {
    DCO1: controllersOsc.DCO1,
    DCO2: controllersOsc.DCO2,
    VCO: controllersOsc.VCO,
    NOISE: controllersNoise,
    RING_MOD: controllersRingMod,
    DISTORTION: controllersFx.DISTORTION,
    BIT_CRUSHER: controllersFx.BIT_CRUSHER,
    LFO: controllersLfo(0), // most cc values are shared so the ones for 0 are used
    SOURCE_MIX: controllersSrcMix,
    MODS: modsControllers,
    MASTER_CLOCK: controllersMasterClock,
    ARP: controllersArp,
    VOICES: controllersVoices,
    MAIN_DISPLAY: mainDisplayControllers,
    TRANSPOSE: controllersTranspose,
    KBD: controllersKbd,
    LPF: controllersFilters.LPF,
    FILTERS: controllersFilters.FILTERS,
    SVF: controllersFilters.SVF,
    VOICE_MIX: controllersVoiceMix,
    VOICE_OUT: controllersVoiceOut,
    ENV: envControllers(0), // most cc values are shared so the ones for 0 are used
    DSP1: controllersCommonFx.DSP1,
    DSP2: controllersCommonFx.DSP2,
    CHORUS: controllersCommonFx.CHORUS,
    FX_BIT_CRUSHER: controllersCommonFx.FX_BIT_CRUSHER,
    FX_MIX: controllersCommonFx.FX_MIX,
    OUTPUT: controllersOut,
    PERFORMANCE: controllersPerformance
}

export default controllers