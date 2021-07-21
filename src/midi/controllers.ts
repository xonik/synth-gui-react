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

const controllers ={
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
    MAIN_PANEL: controllersMainDisplay,
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
}

export default controllers