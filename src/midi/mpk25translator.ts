import mapCC from './mapCC'
import { cc, nrpn } from './midibus'
import mapNRPN from './mapNRPN'
import { StageId } from '../synthcore/modules/env/types'
import { envCtrls } from '../synthcore/modules/env/envControllers'
import { ControllerConfig } from './types'
import srcMixControllers from '../synthcore/modules/srcMix/srcMixControllers'

const getNprnStageTime = (stageId: number, midiTime: number) => {
    const mappedMidiTime = envCtrls.TIME.uiResponse?.output(midiTime/127) || 0
    return (stageId << 16) + Math.round(mappedMidiTime * 65535);
}

const getNprnStageLevel = (stageId: number, midiLevel: number) => {
    const mappedMidiLevel = envCtrls.LEVEL.uiResponse?.output(midiLevel/127) || 0
    return (stageId << 16) + 32767 + Math.round(mappedMidiLevel * 32767)
}

const getFromUi = (ctrl: ControllerConfig, midiValue: number) => {
    if(ctrl.uiResponse) {
        return 127 * Math.round(ctrl.uiResponse.output(midiValue / 127))
    }
    return midiValue
}

export const handleMpk25 = (ccNum: number, midiValue: number): boolean => {
    /**
     * A:
     * 22,23,24,25
     * 26,27,28,29
     * 12,13,14,15
     *
     * B:
     * 30,31,32,22
     * 34,35,36,37
     * 16,17,18,19
     */

    // VCA ENV
    if(ccNum === 22) {
        // attack
        cc.publish(mapCC.ENV_SELECT_ENV, 0)
        nrpn.publish(mapNRPN.ENV_TIME, getNprnStageTime(StageId.ATTACK, midiValue))
    } else if(ccNum === 23) {
        // decay
        cc.publish(mapCC.ENV_SELECT_ENV, 0)
        nrpn.publish(mapNRPN.ENV_TIME, getNprnStageTime(StageId.DECAY1, midiValue))
    } else if(ccNum === 24) {
        // sustain
        cc.publish(mapCC.ENV_SELECT_ENV, 0)

        // TODO: This is a hack to make pot use full range for VCA env
        nrpn.publish(mapNRPN.ENV_LEVEL, getNprnStageLevel(StageId.SUSTAIN, (midiValue / 2) + 64))

    } else if(ccNum === 25) {
        // release
        cc.publish(mapCC.ENV_SELECT_ENV, 0)
        nrpn.publish(mapNRPN.ENV_TIME, getNprnStageTime(StageId.RELEASE2, midiValue))
    }


    // DCO 1
    else if(ccNum === 26) {
        cc.publish(mapCC.DCO1_WAVEFORM, midiValue)
    } else if(ccNum === 27) {
        cc.publish(mapCC.DCO1_PW, midiValue)
    } else if(ccNum === 28) {
        cc.publish(mapCC.DCO1_SUB1, midiValue)
    } else if(ccNum === 29) {
        cc.publish(mapCC.DCO1_SUB2, midiValue)
    }

    // DCO 2
    else if(ccNum === 12) {
        cc.publish(mapCC.DCO2_DETUNE, midiValue)
    } else if(ccNum === 13) {
        cc.publish(mapCC.DCO2_NOTE, midiValue)
    } else if(ccNum === 14) {
        cc.publish(mapCC.DCO2_SUB1, midiValue)
    } else if(ccNum === 15) {
        cc.publish(mapCC.DCO2_SUB2, midiValue)
    }

    // FILTER ENV     
    else if(ccNum === 30) {
        // attack
        cc.publish(mapCC.ENV_SELECT_ENV, 1)
        nrpn.publish(mapNRPN.ENV_TIME, getNprnStageTime(StageId.ATTACK, midiValue))
    } else if(ccNum === 31) {
        // decay
        cc.publish(mapCC.ENV_SELECT_ENV, 1)
        nrpn.publish(mapNRPN.ENV_TIME, getNprnStageTime(StageId.DECAY1, midiValue))
    } else if(ccNum === 32) {
        // sustain
        cc.publish(mapCC.ENV_SELECT_ENV, 1)
        // TODO: This is a hack to make pot use full range for VCA env
        nrpn.publish(mapNRPN.ENV_LEVEL, getNprnStageLevel(StageId.SUSTAIN, midiValue))
    } else if(ccNum === 33) {
        // release
        cc.publish(mapCC.ENV_SELECT_ENV, 1)
        nrpn.publish(mapNRPN.ENV_TIME, getNprnStageTime(StageId.RELEASE2, midiValue))
    }
    // FILTER / NOISE
    else if(ccNum === 34) {
        cc.publish(mapCC.LPF_CUTOFF, midiValue)
    } else if(ccNum === 35) {
        cc.publish(mapCC.LPF_RESONANCE, midiValue)
    } else if(ccNum === 36) {
        cc.publish(mapCC.LPF_KBD_AMT, midiValue)
    } else if(ccNum === 37) {
        cc.publish(mapCC.LPF_ENV_AMT, midiValue)
    } else if(ccNum === 16) {
        //cc.publish(mapCC.LEVEL_OSC1, getFromUi(srcMixControllers.LEVEL_OSC1, midiValue))
        cc.publish(mapCC.LEVEL_OSC1, midiValue)
    } else if(ccNum === 17) {
        //cc.publish(mapCC.LEVEL_OSC2, getFromUi(srcMixControllers.LEVEL_OSC1, midiValue))
        cc.publish(mapCC.LEVEL_OSC2, midiValue)
    } else if(ccNum === 18) {
        //cc.publish(mapCC.LEVEL_NOISE, getFromUi(srcMixControllers.LEVEL_OSC1, midiValue))
        cc.publish(mapCC.LEVEL_NOISE, midiValue)
    } else if(ccNum === 19) {
        //cc.publish(mapCC.LEVEL_RING_MOD, getFromUi(srcMixControllers.LEVEL_OSC1, midiValue))
        cc.publish(mapCC.LEVEL_RING_MOD, midiValue)
    } else {
        return false;
    }
    return true;
}