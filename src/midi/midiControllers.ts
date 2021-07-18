// TODO: High value bits. Mod wheels, ribbon controller
import midiControllersOsc from './modules/osc/midiControllersOsc'
import midiControllersNoise from './modules/noise/midiControllersNoise'
import midiControllersRingMod from './modules/ringMod/midiControllersRingMod'
import midiControllersFx from './modules/fx/midiControllersFx'
import midiControllersLfo from './modules/lfo/midiControllersLfo'
import midiControllersSrcMix from './modules/srcMix/midiControllersSrcMix'
import midiControllersRoute from './modules/route/midiControllersRoute'
import midiControllersMasterClock from './modules/masterClock/midiControllersMasterClock'
import midiControllersArp from './modules/arp/midiControllersArp'
import midiControllersVoices from './modules/voices/midiControllersVoices'
import midiControllersMainDisplay from './modules/mainDisplay/midiControllersMainDisplay'
import midiControllersTranspose from './modules/transpose/midiControllersTranspose'
import midiControllersKbd from './modules/kbd/midiControllersKbd'
import midiControllersFilters from './modules/filters/midiControllersFilters'
import midiControllersPostMix from './modules/postMix/midiControllersPostMix'
import midiControllersVoiceOut from './modules/voiceOut/midiControllersVoiceOut'
import midiControllersEnv from './modules/env/midiControllersEnv'
import midiControllersCommonFx from './modules/commonFx/midiControllersCommonFx'
import midiControllersOut from './modules/out/midiControllersOut'

const midiControllers ={
    DCO1: midiControllersOsc.DCO1,
    DCO2: midiControllersOsc.DCO2,
    VCO: midiControllersOsc.VCO,
    NOISE: midiControllersNoise,
    RING_MOD: midiControllersRingMod,
    DISTORTION: midiControllersFx.DISTORTION,
    BIT_CRUSHER: midiControllersFx.BIT_CRUSHER,
    LFOS: midiControllersLfo,
    SOURCE_MIX: midiControllersSrcMix,
    ROUTE: midiControllersRoute,
    MASTER_CLOCK: midiControllersMasterClock,
    ARPEGGIATOR: midiControllersArp,
    VOICES: midiControllersVoices,
    MAIN_PANEL: midiControllersMainDisplay,
    TRANSPOSE: midiControllersTranspose,
    KEYBOARD: midiControllersKbd,
    LPF: midiControllersFilters.LPF,
    FILTERS: midiControllersFilters.FILTERS,
    SVF: midiControllersFilters.SVF,
    POST_MIX: midiControllersPostMix,
    VOICE_OUT: midiControllersVoiceOut,
    ENV: midiControllersEnv,
    DSP1: midiControllersCommonFx.DSP1,
    DSP2: midiControllersCommonFx.DSP2,
    CHORUS: midiControllersCommonFx.CHORUS,
    FX_BIT_CRUSHER: midiControllersCommonFx.FX_BIT_CRUSHER,
    FX_MIX: midiControllersCommonFx.FX_MIX,
    OUTPUT: midiControllersOut,
}

export default midiControllers