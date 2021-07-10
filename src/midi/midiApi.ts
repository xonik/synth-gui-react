import midiApiEnv from './modules/env/midiApiEnv'

const initReceive = () => {
    midiApiEnv.initReceive()
}

export default {
    initReceive,
    env: midiApiEnv,
}