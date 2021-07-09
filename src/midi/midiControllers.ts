// TODO: High value bits. Mod wheels, ribbon controller
import midiControllersEnv from './controllers/midiControllersEnv'
import midiControllersCommonFx from './controllers/midiControllersCommonFx'
import midiControllersFilters from './controllers/midiControllersFilters'
import midiControllersFx from './controllers/midiControllersFx'
import midiControllersKbd from './controllers/midiControllersKbd'
import midiControllersLfo from './controllers/midiControllersLfo'
import midiControllersMainPanel from './controllers/midiControllersMainPanel'
import midiControllersMasterClock from './controllers/midiControllersMasterClock'
import midiControllersNoise from './controllers/midiControllersNoise'
import midiControllersOsc from './controllers/midiControllersOsc'
import midiControllersOut from './controllers/midiControllersOut'
import midiControllersPostMix from './controllers/midiControllersPostMix'
import midiControllersRingMod from './controllers/midiControllersRingMod'
import midiControllersRoute from './controllers/midiControllersRoute'
import midiControllersSrcMix from './controllers/midiControllersSrcMix'
import midiControllersTranspose from './controllers/midiControllersTranspose'
import midiControllersVoiceOut from './controllers/midiControllersVoiceOut'
import midiControllersVoices from './controllers/midiControllersVoices'
import midiControllersArp from './controllers/midiControllersArp'

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
    MAIN_PANEL: midiControllersMainPanel,
    TRANSPOSE: midiControllersTranspose,
    KEYBOARD: midiControllersKbd,
    LPF: midiControllersFilters.LPF,
    FILTERS: midiControllersFilters.FILTERS,
    SVF: midiControllersFilters.SVF,
    POST_MIX: midiControllersPostMix,
    VOICE_OUT: midiControllersVoiceOut,
    ENV1: midiControllersEnv,
    DSP1: midiControllersCommonFx.DSP1,
    DSP2: midiControllersCommonFx.DSP2,
    CHORUS: midiControllersCommonFx.CHORUS,
    FX_BIT_CRUSHER: midiControllersCommonFx.FX_BIT_CRUSHER,
    FX_MIX: midiControllersCommonFx.FX_MIX,
    OUTPUT: midiControllersOut,
}

export default midiControllers