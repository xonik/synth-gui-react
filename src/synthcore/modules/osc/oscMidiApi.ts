import controllers from '../../../midi/controllers'
import { ApiSource } from '../../types'
import { shouldSend } from '../../../midi/utils'
import logger from '../../../utils/logger'
import { cc } from '../../../midi/midibus'

// If imported directly we get a cyclic dependency. Not sure why it works now.
import { oscApi } from '../../synthcoreApi'

// DCO 1
const dco1Note = (() => {
    const cfg = controllers.DCO1.NOTE

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }
            logger.midi(`Setting dco1 note to ${value}`)
            cc.send(cfg, Math.floor(127 * value))
        },
        receive: () => {
            cc.subscribe((value: number) => {
                oscApi.setDco1Note(value / 127, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const dco1Waveform = (() => {
    const cfg = controllers.DCO1.WAVEFORM

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }
            logger.midi(`Setting dco1 waveform to ${value}`)
            cc.send(cfg, Math.floor(127 * value))
        },
        receive: () => {
            cc.subscribe((value: number) => {
                oscApi.setDco1Waveform(value / 127, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const dco1Sub1Level = (() => {
    const cfg = controllers.DCO1.SUB1

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }
            logger.midi(`Setting dco1 sub 1 level to ${value}`)
            cc.send(cfg, Math.floor(127 * value))
        },
        receive: () => {
            cc.subscribe((value: number) => {
                oscApi.setDco1Sub1Level(value / 127, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const dco1Sub2Level = (() => {
    const cfg = controllers.DCO1.SUB2

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }
            logger.midi(`Setting dco1 sub 1 level to ${value}`)
            cc.send(cfg, Math.floor(127 * value))
        },
        receive: () => {
            cc.subscribe((value: number) => {
                oscApi.setDco1Sub2Level(value / 127, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const dco1Pw = (() => {
    const cfg = controllers.DCO1.PW

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }
            logger.midi(`Setting dco1 pw to ${value}`)
            cc.send(cfg, Math.floor(127 * value))
        },
        receive: () => {
            cc.subscribe((value: number) => {
                oscApi.setDco1Pw(value / 127, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

// DCO 2
const dco2Note = (() => {
    const cfg = controllers.DCO2.NOTE

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }
            logger.midi(`Setting dco2 note to ${value}`)
            cc.send(cfg, Math.floor(127 * value))
        },
        receive: () => {
            cc.subscribe((value: number) => {
                oscApi.setDco2Note(value / 127, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const dco2Detune = (() => {
    const cfg = controllers.DCO2.DETUNE

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }
            logger.midi(`Setting dco2 detune to ${value}`)
            cc.send(cfg, Math.floor(127 * value))
        },
        receive: () => {
            cc.subscribe((value: number) => {
                oscApi.setDco2Detune(value / 127, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const dco2Waveform = (() => {
    const cfg = controllers.DCO2.WAVEFORM

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }
            logger.midi(`Setting dco2 waveform to ${value}`)
            cc.send(cfg, Math.floor(127 * value))
        },
        receive: () => {
            cc.subscribe((value: number) => {
                oscApi.setDco2Waveform(value / 127, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const dco2Sub1Level = (() => {
    const cfg = controllers.DCO2.SUB1

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }
            logger.midi(`Setting dco2 sub 1 level to ${value}`)
            cc.send(cfg, Math.floor(127 * value))
        },
        receive: () => {
            cc.subscribe((value: number) => {
                oscApi.setDco2Sub1Level(value / 127, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const dco2Sub2Level = (() => {
    const cfg = controllers.DCO2.SUB2

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }
            logger.midi(`Setting dco2 sub 1 level to ${value}`)
            cc.send(cfg, Math.floor(127 * value))
        },
        receive: () => {
            cc.subscribe((value: number) => {
                oscApi.setDco2Sub2Level(value / 127, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const dco2Pw = (() => {
    const cfg = controllers.DCO2.PW

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }
            logger.midi(`Setting dco2 pw to ${value}`)
            cc.send(cfg, Math.floor(127 * value))
        },
        receive: () => {
            cc.subscribe((value: number) => {
                oscApi.setDco2Pw(value / 127, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

// VCO
const vcoNote = (() => {
    const cfg = controllers.VCO.NOTE

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }
            logger.midi(`Setting vco note to ${value}`)
            cc.send(cfg, Math.floor(127 * value))
        },
        receive: () => {
            cc.subscribe((value: number) => {
                oscApi.setVcoNote(value / 127, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const vcoDetune = (() => {
    const cfg = controllers.VCO.DETUNE

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }
            logger.midi(`Setting vco detune to ${value}`)
            cc.send(cfg, Math.floor(127 * value))
        },
        receive: () => {
            cc.subscribe((value: number) => {
                oscApi.setVcoDetune(value / 127, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const vcoWaveform = (() => {
    const cfg = controllers.VCO.WAVEFORM

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }
            logger.midi(`Setting vco waveform to ${value}`)
            cc.send(cfg, Math.floor(127 * value))
        },
        receive: () => {
            cc.subscribe((value: number) => {
                oscApi.setVcoWaveform(value / 127, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const vcoCrossMod = (() => {
    const cfg = controllers.VCO.CROSS_MOD

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }
            logger.midi(`Setting vco cross mod to ${value}`)
            cc.send(cfg, Math.floor(127 * value))
        },
        receive: () => {
            cc.subscribe((value: number) => {
                oscApi.setVcoCrossMod(value / 127, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const vcoPw = (() => {
    const cfg = controllers.VCO.PW

    return {
        send: (source: ApiSource, value: number) => {
            if (!shouldSend(source)) {
                return
            }
            logger.midi(`Setting vco pw to ${value}`)
            cc.send(cfg, Math.floor(127 * value))
        },
        receive: () => {
            cc.subscribe((value: number) => {
                oscApi.setVcoPw(value, ApiSource.MIDI)
            }, cfg)
        }
    }
})()

const initReceive = () => {
    dco1Note.receive()
    dco1Waveform.receive()
    dco1Sub1Level.receive()
    dco1Sub2Level.receive()
    dco1Pw.receive()
    dco2Note.receive()
    dco2Detune.receive()
    dco2Waveform.receive()
    dco2Sub1Level.receive()
    dco2Sub2Level.receive()
    dco2Pw.receive()
    vcoNote.receive()
    vcoDetune.receive()
    vcoWaveform.receive()
    vcoCrossMod.receive()
    vcoPw.receive()
}

const oscMidiApi = {
    setDco1Note: dco1Note.send,
    setDco1Waveform: dco1Waveform.send,
    setDco1Sub1Level: dco1Sub1Level.send,
    setDco1Sub2Level: dco1Sub2Level.send,
    setDco1Pw: dco1Pw.send,
    setDco2Note: dco2Note.send,
    setDco2Detune: dco2Detune.send,
    setDco2Waveform: dco2Waveform.send,
    setDco2Sub1Level: dco2Sub1Level.send,
    setDco2Sub2Level: dco2Sub2Level.send,
    setDco2Pw: dco2Pw.send,
    setVcoNote: vcoNote.send,
    setVcoDetune: vcoDetune.send,
    setVcoWaveform: vcoWaveform.send,
    setVcoCrossMod: vcoCrossMod.send,
    setVcoPw: vcoPw.send,
    initReceive,
}

export default oscMidiApi
