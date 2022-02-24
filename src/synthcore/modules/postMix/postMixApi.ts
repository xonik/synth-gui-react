import { createSetterFuncs } from '../common/utils'
import { selectController, selectUiController, setController, setUiController } from '../controllers/controllersReducer'
import postMixControllers from './postMixControllers'

const setterFuncs = createSetterFuncs(
    [
        postMixControllers.LPF,
        postMixControllers.SVF,
        postMixControllers.SINE1,
        postMixControllers.SINE2,
        postMixControllers.PAN,
        postMixControllers.AMOUNT,
        postMixControllers.FX1_SEND,
        postMixControllers.FX2_SEND,
    ],
    setController,
    selectController,
    setUiController,
    selectUiController,
)

const api = {
    ...setterFuncs,
}

export default api
