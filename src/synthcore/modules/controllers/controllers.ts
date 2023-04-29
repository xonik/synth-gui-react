// TODO: High value bits. Mod wheels, ribbon controller
import oscControllers from '../osc/oscControllers'
import noiseControllers from '../noise/noiseControllers'
import ringModControllers from '../ringMod/ringModControllers'
import fxControllers from '../fx/fxControllers'
import lfoControllers from '../lfo/lfoControllers'
import srcMixControllers from '../srcMix/srcMixControllers'
import modsControllers from '../mods/modsControllers'
import masterClockControllers from '../masterClock/masterClockControllers'
import arpControllers from '../arp/arpControllers'
import voicesControllers from '../voices/voicesControllers'
import mainDisplayControllers from '../mainDisplay/mainDisplayControllers'
import kbdControllers from '../kbd/kbdControllers'
import filtersControllers from '../filters/filtersControllers'
import postMixControllers from '../postMix/postMixControllers'
import envControllers from '../env/envControllers'
import commonFxControllers from '../commonFx/commonFxControllers'
import outControllers from '../out/outControllers'
import performanceControllers from '../performance/performanceControllers'
import settingsControllers from "../settings/settingsControllers";

// controller functions grouped by type
export const controllerGroups = {
    SOUND_SOURCES: {
        label: 'Sound src',
        DCO1: oscControllers.DCO1,
        DCO2: oscControllers.DCO2,
        VCO: oscControllers.VCO,
        NOISE: noiseControllers,
    },
    PRE_FX: {
        label: 'Pre FX',
        RING_MOD: ringModControllers,
        DISTORTION: fxControllers.DISTORTION,
        BIT_CRUSHER: fxControllers.BIT_CRUSHER,
    },
    LFOS: {
        label: 'LFOs',
        LFO1: lfoControllers(0),
        LFO2: lfoControllers(1),
        LFO3: lfoControllers(2),
        LFO4: lfoControllers(3),
    },
    SOURCE_MIX: {
        // TODO: This one is a bit weird
        label: 'Source mix',
        SOURCE_MIX: srcMixControllers,
    },
    CLK_ARP_KBD: {
        label: 'Controls',
        MASTER_CLOCK: masterClockControllers,
        ARP: arpControllers,
        KBD: kbdControllers,
    },
    MAIN_DISPLAY: {
        label: 'Main controls',
        VOICES: voicesControllers,
        MAIN_DISPLAY: mainDisplayControllers,
    },
    FILTER: {
        label: 'Filter',
        LPF: filtersControllers.LPF,
        FILTERS: filtersControllers.FILTERS,
        SVF: filtersControllers.SVF,
    },
    VOICE: {
        label: 'Voice out',
        POST_MIX: postMixControllers,
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
        DSP1: commonFxControllers.DSP1,
        DSP2: commonFxControllers.DSP2,
        CHORUS: commonFxControllers.CHORUS,
        FX_BIT_CRUSHER: commonFxControllers.FX_BIT_CRUSHER,
        FX_MIX: commonFxControllers.FX_MIX,
    },
    OUT: {
        label: 'Output',
        OUTPUT: outControllers,
    },
    PERFORMANCE: {
        label: 'Performance controls',
        PERFORMANCE: performanceControllers
    }
}

const controllers = {
    DCO1: oscControllers.DCO1,
    DCO2: oscControllers.DCO2,
    VCO: oscControllers.VCO,
    NOISE: noiseControllers,
    RING_MOD: ringModControllers,
    DISTORTION: fxControllers.DISTORTION,
    BIT_CRUSHER: fxControllers.BIT_CRUSHER,
    LFO: lfoControllers(0), // most cc values are shared so the ones for 0 are used
    SOURCE_MIX: srcMixControllers,
    MODS: modsControllers,
    MASTER_CLOCK: masterClockControllers,
    ARP: arpControllers,
    VOICES: voicesControllers,
    MAIN_DISPLAY: mainDisplayControllers,
    KBD: kbdControllers,
    LPF: filtersControllers.LPF,
    FILTERS: filtersControllers.FILTERS,
    SVF: filtersControllers.SVF,
    POST_MIX: postMixControllers,
    ENV: envControllers(0), // most cc values are shared so the ones for 0 are used
    DSP1: commonFxControllers.DSP1,
    DSP2: commonFxControllers.DSP2,
    CHORUS: commonFxControllers.CHORUS,
    FX_BIT_CRUSHER: commonFxControllers.FX_BIT_CRUSHER,
    FX_MIX: commonFxControllers.FX_MIX,
    OUTPUT: outControllers,
    PERFORMANCE: performanceControllers,
    SETTINGS: settingsControllers,
}

export default controllers