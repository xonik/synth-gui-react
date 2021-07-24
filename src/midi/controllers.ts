// TODO: High value bits. Mod wheels, ribbon controller
import controllersOsc from './modules/osc/controllersOsc'
import controllersNoise from './modules/noise/controllersNoise'
import controllersRingMod from './modules/ringMod/controllersRingMod'
import controllersFx from './modules/fx/controllersFx'
import controllersLfo from './modules/lfo/controllersLfo'
import controllersSrcMix from './modules/srcMix/controllersSrcMix'
import controllersRoute from './modules/route/controllersRoute'
import controllersMasterClock from './modules/masterClock/controllersMasterClock'
import controllersArp from './modules/arp/controllersArp'
import controllersVoices from './modules/voices/controllersVoices'
import controllersMainDisplay from './modules/mainDisplay/controllersMainDisplay'
import controllersTranspose from './modules/transpose/controllersTranspose'
import controllersKbd from './modules/kbd/controllersKbd'
import controllersFilters from './modules/filters/controllersFilters'
import controllersPostMix from './modules/postMix/controllersPostMix'
import controllersVoiceOut from './modules/voiceOut/controllersVoiceOut'
import controllersEnv from './modules/env/controllersEnv'
import controllersCommonFx from './modules/commonFx/controllersCommonFx'
import controllersOut from './modules/out/controllersOut'
import { controllersPerformance } from './modules/performance/controllersPerformance'
import { ControllerConfig } from './types'

// controller functions grouped by type
const controllerGroups = {
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
        LFO1: controllersLfo,
        LFO2: controllersLfo,
        LFO3: controllersLfo,
        LFO4: controllersLfo,
    },
    SOURCE_MIX: {
        // TODO: This one is a bit weird
        label: 'Source mix',
        SOURCE_MIX: controllersSrcMix,
    },
    CLK_ARP_KBD: {
        label: 'Controls',
        MASTER_CLOCK: controllersMasterClock,
        ARPEGGIATOR: controllersArp,
        TRANSPOSE: controllersTranspose,
        KEYBOARD: controllersKbd,
    },
    MAIN_DISPLAY: {
        label: 'Main controls',
        VOICES: controllersVoices,
        MAIN_DISPLAY: controllersMainDisplay,
    },
    FILTER: {
        label: 'Filter',
        LPF: controllersFilters.LPF,
        FILTERS: controllersFilters.FILTERS,
        SVF: controllersFilters.SVF,
    },
    VOICE: {
        label: 'Voice out',
        POST_MIX: controllersPostMix,
        VOICE_OUT: controllersVoiceOut,

    },
    ENV: {
        label: 'Envelopes',
        ENV1: controllersEnv,
        ENV2: controllersEnv,
        ENV3: controllersEnv,
        ENV4: controllersEnv,
        ENV5: controllersEnv,
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

const getGroupsWithDigitalTargets = () => {
    const groups: {[key: string]: any} = {}
    Object.entries(controllerGroups).forEach(([groupKey, group]) => {
        const funcs: {[key: string]: any} = {}
        Object.entries(group).forEach(([funcKey, func]) => {
            const props: {[key: string]: any} = {}
            Object.entries(func).forEach(([propKey, prop]) => {
                const controller = prop as ControllerConfig
                if(controller.isTargetDigi){
                    props[propKey] = prop;
                }
            })
            if(Object.entries(props).length > 0){
                funcs[funcKey] = {props: func.props, ...props}
            }
        })
        if(Object.entries(funcs).length > 0){
            groups[groupKey] = {label: group.label, ...funcs}
        }
    })
    return groups
}

// For looping over, group and function names are not tab completable
export const digitalModTargets = getGroupsWithDigitalTargets()

const controllers = {
    DCO1: controllersOsc.DCO1,
    DCO2: controllersOsc.DCO2,
    VCO: controllersOsc.VCO,
    NOISE: controllersNoise,
    RING_MOD: controllersRingMod,
    DISTORTION: controllersFx.DISTORTION,
    BIT_CRUSHER: controllersFx.BIT_CRUSHER,
    LFOS: controllersLfo,
    SOURCE_MIX: controllersSrcMix,
    ROUTE: controllersRoute,
    MASTER_CLOCK: controllersMasterClock,
    ARPEGGIATOR: controllersArp,
    VOICES: controllersVoices,
    MAIN_DISPLAY: controllersMainDisplay,
    TRANSPOSE: controllersTranspose,
    KEYBOARD: controllersKbd,
    LPF: controllersFilters.LPF,
    FILTERS: controllersFilters.FILTERS,
    SVF: controllersFilters.SVF,
    POST_MIX: controllersPostMix,
    VOICE_OUT: controllersVoiceOut,
    ENV: controllersEnv,
    DSP1: controllersCommonFx.DSP1,
    DSP2: controllersCommonFx.DSP2,
    CHORUS: controllersCommonFx.CHORUS,
    FX_BIT_CRUSHER: controllersCommonFx.FX_BIT_CRUSHER,
    FX_MIX: controllersCommonFx.FX_MIX,
    OUTPUT: controllersOut,
    PERFORMANCE: controllersPerformance
}

export default controllers