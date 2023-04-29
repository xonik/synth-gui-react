import { createGroupedHandlers } from '../common/utils'
import postMixControllers from './postMixControllers'

const handlers = createGroupedHandlers(
    [
        postMixControllers.LPF,
        postMixControllers.SVF,
        postMixControllers.SINE1,
        postMixControllers.SINE2,
        postMixControllers.PAN,
        postMixControllers.AMOUNT,
        postMixControllers.FX1_SEND,
        postMixControllers.FX2_SEND,
    ])

const api = {
    ...handlers,
}

export default api
