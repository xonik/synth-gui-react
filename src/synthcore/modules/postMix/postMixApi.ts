import { createSetterFuncs } from '../common/utils'
import { selectController, setController } from '../controllers/controllersReducer'
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
)

const api = {
    ...setterFuncs,
}

export default api
