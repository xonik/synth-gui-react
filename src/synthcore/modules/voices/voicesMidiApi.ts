import { ApiSource } from '../../types'

// If imported directly we get a cyclic dependency. Not sure why it works now.
import { voicesApi } from '../../synthcoreApi'
import { shouldSend } from '../../../midi/utils'
import logger from '../../../utils/logger'
import { button } from '../../../midi/midibus'
import voicesControllers from './voicesControllers'

const voiceState = (() => {
    const voiceCfgs = [
        voicesControllers.VOICE1,
        voicesControllers.VOICE2,
        voicesControllers.VOICE3,
        voicesControllers.VOICE4,
        voicesControllers.VOICE5,
        voicesControllers.VOICE6,
        voicesControllers.VOICE7,
        voicesControllers.VOICE8,
    ]

    return {
        send: (
            source: ApiSource,
            id: number,
            value: number,
        ) => {
            if (!shouldSend(source) || id > 7) {
                return
            }

            const cfg = voiceCfgs[id]

            logger.midi(`Setting value for ${cfg.label} to ${value}`)
            button.send(-1, cfg, cfg.values[value])
        },
        receive: () => {
            voiceCfgs.forEach((cfg, index) => {
                button.subscribe((voiceGroupIndex, midiValue: number) => {
                    const value = cfg.values.indexOf(midiValue) || 0
                    voicesApi.setVoiceState(index, value, ApiSource.MIDI)
                }, cfg)
            })
        }
    }
})()

const initReceive = () => {
    voiceState.receive()
}

const voicesMidiApi = {
    setVoiceState: voiceState.send,

    initReceive,
}

export default voicesMidiApi
