import midiApiEnv from './modules/env/midiApiEnv'
import midiApiRoute from './modules/route/midiApiRoute'

const initReceive = () => {
    midiApiEnv.initReceive()
}

export default {
    initReceive,
    env: midiApiEnv,
    route: midiApiRoute,
}