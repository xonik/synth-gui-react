import { createSetterFuncs } from '../common/utils'
import commonFxControllers from './commonFxControllers'
import { selectController, setController } from '../controllers/controllersReducer'

const { set, toggle, increment } = createSetterFuncs(
    [
        commonFxControllers.DSP1.PARAM1,
        commonFxControllers.DSP1.PARAM2,
        commonFxControllers.DSP1.PARAM3,
        commonFxControllers.DSP1.EFFECT,

        commonFxControllers.DSP2.PARAM1,
        commonFxControllers.DSP2.PARAM2,
        commonFxControllers.DSP2.PARAM3,
        commonFxControllers.DSP2.EFFECT,

        commonFxControllers.CHORUS.RATE,
        commonFxControllers.CHORUS.DEPTH,

        commonFxControllers.FX_BIT_CRUSHER.BITS,
        commonFxControllers.FX_BIT_CRUSHER.RATE,

        commonFxControllers.FX_MIX.LEVEL_DSP1,
        commonFxControllers.FX_MIX.LEVEL_DSP2,
        commonFxControllers.FX_MIX.LEVEL_CHORUS,
        commonFxControllers.FX_MIX.LEVEL_BIT_CRUSHER,

        commonFxControllers.DSP1.SOURCE,
        commonFxControllers.DSP2.SOURCE,
        commonFxControllers.DSP2.CHAIN,
        commonFxControllers.CHORUS.SOURCE,
        commonFxControllers.CHORUS.MODE,
        commonFxControllers.FX_BIT_CRUSHER.SOURCE,
    ],
    setController,
    selectController,
)

const api = {
    set,
    increment,
    toggle,
}

export default api