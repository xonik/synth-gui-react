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

const reduceFuncs = () => {
    return Object.entries(controllerGroups)
        .reduce(
            (digitalTargetGroup, groupEntry) => {
                const groupKey: string = groupEntry[0]
                const group = groupEntry[1]
                const targetFuncs = Object.entries(group)
                    .reduce(
                        (digitalTargetFuncs, funcEntry) => {
                            const funcKey: string = funcEntry[0]
                            const func = funcEntry[1]

                            const targetParams = Object.entries(func)
                                .reduce(
                                    (digitalTargetParams, paramEntry) => {
                                        // todo: check that not FuncProps
                                        const paramKey: string = paramEntry[0]
                                        const param = paramEntry[1] as ControllerConfig
                                        if (param.isTargetDigi) {
                                            return {
                                                ...digitalTargetParams,
                                                [paramKey]: param
                                            }
                                        }
                                        return digitalTargetParams
                                    },
                                    {} as { [key: string]: any }
                                )
                            let targetFunc = null;
                            if (Object.entries(targetParams).length > 0) {
                                targetFunc = {
                                    props: func.props,
                                    ...targetParams,
                                }
                            }

                            if (targetFunc !== null) {
                                return {
                                    ...digitalTargetFuncs,
                                    [funcKey]: targetFunc
                                }
                            }
                            return digitalTargetFuncs
                        },
                        {}
                    )
                let targetGroup = null;
                if (Object.entries(targetFuncs).length > 0) {
                    targetGroup = {
                        label: group.label,
                        ...targetFuncs,
                    }
                }

                if (targetGroup !== null) {
                    return {
                        ...digitalTargetGroup,
                        [groupKey]: targetGroup
                    }
                }
                return digitalTargetGroup
            }, {})
}

export const modTargetsDigi = reduceFuncs()
console.log('modTargetsDigi', modTargetsDigi)

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