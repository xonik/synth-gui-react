import midiApiEnv from './modules/env/midiApiEnv'
import midiApiRoute from './modules/route/midiApiRoute'

const initReceive = () => {
    midiApiEnv.initReceive()
}

const midiApi = {
    initReceive,
    env: midiApiEnv,
    route: midiApiRoute,
}

export default midiApi