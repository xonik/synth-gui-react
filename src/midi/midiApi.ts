import midiApiEnv from './midiApiEnv'

const initReceive = () => {
    midiApiEnv.initReceive()
}

export default {
    initReceive,
    env: midiApiEnv,
}