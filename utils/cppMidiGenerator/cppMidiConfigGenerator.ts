import { buttonMidiValues } from '../../src/midi/buttonMidiValues'
import { isNotNumber } from '../../src/utils/number'
import {
    ControllerIdDst,
    ControllerIdEnvDst,
    ControllerIdEnvNonMod,
    ControllerIdEnvStageNonMod,
    ControllerIdIntermediate,
    ControllerIdLfoDst,
    ControllerIdLfoNonMod,
    ControllerIdLfoStageNonMod,
    ControllerIdNonMod,
    ControllerIdNonModPots,
    ControllerIdSrc,
    DST_COUNT,
    DST_ENV_COUNT,
    DST_LFO_COUNT,
    ENV_NON_MOD_COUNT,
    ENV_STAGE_NON_MOD_COUNT,
    FIRST_DST,
    FIRST_ENV_DST,
    FIRST_INTERMEDIATE,
    FIRST_LFO_DST,
    FIRST_NON_MOD,
    FIRST_NON_MOD_POTS,
    INT_COUNT,
    LFO_NON_MOD_COUNT,
    LFO_STAGE_NON_MOD_COUNT,
    NON_MOD_COUNT,
    NON_MOD_POTS_COUNT,
    SRC_COUNT,
} from '../../src/synthcore/modules/controllers/controllerIds'
import controllers from '../../src/synthcore/modules/controllers/controllers'
import { generateSharedConfig } from './sharedConfigGenerator'
import { writeToFile } from './utils'

const _outputRoot = '/Users/joakim/git/xonik/xm8-voice-controller/xm8-voice-controller'
const outputRootMain = '/Users/joakim/git/xonik/xm8-main-controller'
const outputRootMidiMain = `${outputRootMain}/src/shared/generated/midi`

const generateParamIO = (): string => {
    if (FIRST_INTERMEDIATE !== ControllerIdIntermediate.LPF_FM_AMT.valueOf()) {
        throw new Error(
            `paramIO: First intermediate ${FIRST_INTERMEDIATE} does not match src ctrl last ${ControllerIdIntermediate.LPF_FM_AMT.valueOf()}, did you forget to change it after adding something?`
        )
    }

    if (FIRST_DST !== ControllerIdDst.DCO1_PITCH.valueOf()) {
        throw new Error(
            `paramIO: First dest ${FIRST_DST} does not match intermediate last ${ControllerIdDst.DCO1_PITCH.valueOf()}, did you forget to change it after adding something?`
        )
    }

    if (FIRST_ENV_DST !== ControllerIdEnvDst.DELAY_TIME.valueOf()) {
        throw new Error(
            `paramIO: First env dest ${FIRST_ENV_DST} does not match last dst ${ControllerIdEnvDst.DELAY_TIME.valueOf()}, did you forget to change it after adding something?`
        )
    }

    if (FIRST_LFO_DST !== ControllerIdLfoDst.RATE.valueOf()) {
        throw new Error(
            `paramIO: First lfo dest ${FIRST_LFO_DST} does not match last env dst ${ControllerIdLfoDst.RATE.valueOf()}, did you forget to change it after adding something?`
        )
    }

    if (FIRST_NON_MOD_POTS !== ControllerIdNonModPots.MOD_AMOUNT.valueOf()) {
        throw new Error(
            `paramIO: First non mod pots ${FIRST_NON_MOD_POTS} does not match last env dst ${ControllerIdNonModPots.MOD_AMOUNT.valueOf()}, did you forget to change it after adding something?`
        )
    }

    if (FIRST_NON_MOD !== ControllerIdNonMod.DCO1_RANGE.valueOf()) {
        throw new Error(
            `paramIO: First non mod ${FIRST_NON_MOD} does not match last env dst ${ControllerIdNonMod.DCO1_SYNC.valueOf()}, did you forget to change it after adding something?`
        )
    }

    const paramIOContents = `
#ifndef paramIO_H_
#define paramIO_H_

namespace paramIO {  
  // Start of IntermediateCtrlPos
  const unsigned short FIRST_INTERMEDIATE = ${FIRST_INTERMEDIATE}; 
  const unsigned short INT_COUNT = ${INT_COUNT};
  const unsigned short LAST_INTERMEDIATE = ${FIRST_INTERMEDIATE + INT_COUNT - 1}; 
  
  // Start of DstCtrlPos
  const unsigned short FIRST_DST = ${FIRST_DST}; 
  const unsigned short DST_COUNT = ${DST_COUNT};
  const unsigned short LAST_DST = ${FIRST_DST + DST_COUNT - 1};  
      
  // Start of EnvDestinations      
  const unsigned short FIRST_ENV_DST = ${FIRST_ENV_DST}; 
  const unsigned short DST_ENV_COUNT = ${DST_ENV_COUNT};
  const unsigned short LAST_ENV_DST = ${FIRST_ENV_DST + DST_ENV_COUNT - 1};
  
  // Start of LfoDestinations
  const unsigned short FIRST_LFO_DST = ${FIRST_LFO_DST}; 
  const unsigned short DST_LFO_COUNT = ${DST_LFO_COUNT};
  const unsigned short LAST_LFO_DST = ${FIRST_LFO_DST + DST_LFO_COUNT - 1};   
  
  // Start of NonModPotDestinations
  const unsigned short FIRST_NON_MOD_POTS = ${FIRST_NON_MOD_POTS}; 
  const unsigned short NON_MOD_POTS_COUNT = ${NON_MOD_POTS_COUNT};
  const unsigned short LAST_NON_MOD_POTS = ${FIRST_NON_MOD_POTS + NON_MOD_POTS_COUNT - 1};     
  
  // Start of NonModDestinations
  const unsigned short FIRST_NON_MOD = ${FIRST_NON_MOD}; 
  const unsigned short NON_MOD_COUNT = ${NON_MOD_COUNT};
  const unsigned short LAST_NON_MOD = ${FIRST_NON_MOD + NON_MOD_COUNT - 1};     
  
  // Number of entries in NonModEnvDestinations
  const unsigned short ENV_NON_MOD_COUNT = ${ENV_NON_MOD_COUNT};
  
  // Number of entries in NonModEnvStageDestinations
  const unsigned short ENV_STAGE_NON_MOD_COUNT = ${ENV_STAGE_NON_MOD_COUNT}; 

  // Number of entries in NonModLfoDestinations
  const unsigned short LFO_NON_MOD_COUNT = ${LFO_NON_MOD_COUNT}; 

  // Number of entries in NonModLfoStageDestinations
  const unsigned short LFO_STAGE_NON_MOD_COUNT = ${LFO_STAGE_NON_MOD_COUNT};
  
  // Number of entries in SrcCtrlPos
  const unsigned short SRC_COUNT = ${SRC_COUNT};
  
  // Number of entries in SrcCtrlPos and IntermediateCtrlPos
  const unsigned short SRC_INT_COUNT = ${SRC_COUNT + INT_COUNT};
  
  // Number of entries in SrcCtrlPos, IntermediateCtrlPos and DstCtrlPos
  const unsigned short SRC_INT_DST_COUNT = ${SRC_COUNT + INT_COUNT + DST_COUNT};

  // Number of entries in IntermediateCtrlPos and DstCtrlPos
  const unsigned short INT_DST_COUNT = ${INT_COUNT + DST_COUNT};  
  
  // These hold the result of functions like arpeggiator, LFO and envelopes, and realtime controllers like pitch bend,
  // keyboard etc. They are calculated on the fly and should not be stored as part of a patch.  
  enum SrcCtrlPos {
    ${Object.keys(ControllerIdSrc)
        .filter((o) => isNotNumber(o))
        .map((key) => `SRC_${key}`)
        .join(',\n    ')}
    
    // TODO: Note and pitch should perhaps be part of this? But
    // Note needs to be quantized    
  };
   
  // These solve a specific use case where a pot controls the amount of modulation from a source to a destination.
  // E.g. The 'Filter Envelope Amount' pot controls how much Envelope 2 affects the LPF cutoff.
  // The value comes from pots, and they should be stored as part of a patch.
  // I think this concept of a multiplier for a modulation amount should be generalized for every source/destination pair
  // later.   
  enum IntermediateCtrlPos {
    ${Object.keys(ControllerIdIntermediate)
        .filter((o) => isNotNumber(o))
        .map((key, index) => `INT_SRC_${key}${index === 0 ? ` = ${FIRST_INTERMEDIATE}` : ''}`)
        .join(',\n    ')}
  };
  
  // Things that can be modulated. These are also pots on the front panel, so modulation is the sum of the pot and
  // any modulation from the matrix.  
  enum DstCtrlPos {
    ${Object.keys(ControllerIdDst)
        .filter((o) => isNotNumber(o))
        .map((key, index) => `DST_${key}${index === 0 ? ` = ${FIRST_DST}` : ''}`)
        .join(',\n    ')}
  };  
  
  enum EnvDestinations {
    ${Object.keys(ControllerIdEnvDst)
        .filter((o) => isNotNumber(o))
        .map((key, index) => `DST_ENV_${key}${index === 0 ? ` = ${FIRST_ENV_DST}` : ''}`)
        .join(',\n    ')}
  };  
  
  enum LfoDestinations {
    ${Object.keys(ControllerIdLfoDst)
        .filter((o) => isNotNumber(o))
        .map((key, index) => `DST_LFO_${key}${index === 0 ? ` = ${FIRST_LFO_DST}` : ''}`)
        .join(',\n    ')}
  };    
  
  // Multi function pots that are used to control various other things. These should end up on the main controller,
  // not the voice cards, and most of them should not be stored in ctrl (except volume/spread/headphones etc that
  // affect actual modules).  
  enum NonModPotDestinations {
    ${Object.keys(ControllerIdNonModPots)
        .filter((o) => isNotNumber(o))
        .map((key, index) => `DST_NMP_${key}${index === 0 ? ` = ${FIRST_NON_MOD_POTS}` : ''}`)
        .join(',\n    ')}
  };    
  
  // Parameters controlled by switches/buttons. These are not targets for modulation
  enum NonModDestinations {
    ${Object.keys(ControllerIdNonMod)
        .filter((o) => isNotNumber(o))
        .map((key, index) => `DST_NM_${key}${index === 0 ? ` = ${FIRST_NON_MOD}` : ''}`)
        .join(',\n    ')}
  };  

  // For NonModEnvDestinations the enum value is different between the ts and c++ code - for
  // ts we need to have an unique ID so we use an offset, but for c++ it only needs to be the correct 
  // index in a 0-indexed array. 
  enum NonModEnvDestinations {
    ${Object.keys(ControllerIdEnvNonMod)
        .filter((o) => isNotNumber(o))
        .map((key, _index) => `DST_ENV_NM_${key}`)
        .join(',\n    ')}
  };  

  // For NonModEnvStageDestinations the enum value is different between the ts and c++ code - for
  // ts we need to have an unique ID so we use an offset, but for c++ it only needs to be the correct 
  // index in a 0-indexed array. 
  enum NonModEnvStageDestinations {
    ${Object.keys(ControllerIdEnvStageNonMod)
        .filter((o) => isNotNumber(o))
        .map((key, _index) => `DST_ENV_STG_NM_${key}`)
        .join(',\n    ')}
  };  
  
  // For NonModLfoDestinations the enum value is different between the ts and c++ code - for
  // ts we need to have an unique ID so we use an offset, but for c++ it only needs to be the correct 
  // index in a 0-indexed array.   
  enum NonModLfoDestinations {
    ${Object.keys(ControllerIdLfoNonMod)
        .filter((o) => isNotNumber(o))
        .map((key, _index) => `DST_LFO_NM_${key}`)
        .join(',\n    ')}
  };  

  // For NonModLfoStageDestinations the enum value is different between the ts and c++ code - for
  // ts we need to have an unique ID so we use an offset, but for c++ it only needs to be the correct 
  // index in a 0-indexed array. 
  enum NonModLfoStageDestinations {
    ${Object.keys(ControllerIdLfoStageNonMod)
        .filter((o) => isNotNumber(o))
        .map((key, _index) => `DST_LFO_STG_NM_${key}`)
        .join(',\n    ')}
  };  
}
#endif
`
    return paramIOContents
}

const generateCppFiles = () => {
    const potEnum: string[] = []
    const potCC: string[] = []

    const comEnum: string[] = []
    const comCC: string[] = []

    const potNrpnEnum: string[] = []
    const potNrpn: string[] = []

    Object.entries(controllers).forEach(([controllerGroupKey, controllersList]) => {
        Object.entries(controllersList)
            .filter(([_controllerKey, controller]) => controller.cc !== undefined)
            .forEach(([controllerKey, controller]) => {
                if (controller.type === 'button') {
                    // do nothing
                } else if (controller.type === 'pot') {
                    potEnum.push(`POT_${controllerGroupKey}_${controllerKey}`)
                    potCC.push(`${controller.cc} /* ${controllerGroupKey}_${controllerKey} */`)
                } else if (controller.type === 'com') {
                    comEnum.push(`COM_${controllerGroupKey}_${controllerKey}`)
                    comCC.push(`${controller.cc} /* ${controllerGroupKey}_${controllerKey} */`)
                } else {
                    console.log('missing controller type', { controllerGroupKey, controllerKey, controller })
                }
            })
    })

    Object.entries(controllers).forEach(([controllerGroupKey, controllersList]) => {
        Object.entries(controllersList)
            .filter(([_controllerKey, controller]) => controller.addr !== undefined)
            .forEach(([controllerKey, controller]) => {
                if (controller.type === 'pot') {
                    potNrpnEnum.push(`POT_${controllerGroupKey}_${controllerKey}`)
                    potNrpn.push(`${controller.addr} /* ${controllerGroupKey}_${controllerKey} */`)
                } else {
                    console.log('missing controller type', { controllerGroupKey, controllerKey, controller })
                }
            })
    })

    const comEnumFileContents = `enum Com: char {\n  ${comEnum.join(',\n  ')}\n};`
    const comCCFileContents = `const char comCC[${comCC.length}] = {\n  ${comCC.join(',\n  ')}\n};`

    const potEnumFileContents = `enum Pot: char {\n  ${potEnum.join(',\n  ')}\n};`
    const potCCFileContents = `const char potCC[${potCC.length}] = {\n  ${potCC.join(',\n  ')}\n};`

    const potEnumNrpnFileContents = `enum PotNrpn: char {\n  ${potNrpnEnum.join(',\n  ')}\n};`
    const potNrpnFileContents = `const char potNrpn[${potCC.length}] = {\n  ${potNrpn.join(',\n  ')}\n};`

    const buttonMidiKeys = Object.keys(buttonMidiValues)
        .filter((o) => isNotNumber(o))
        .map((key, index) => `BT_${key} /* ${index} */`)
    const buttonEnumFileContents = `enum ButtonMidiValues {\n  ${buttonMidiKeys.join(',\n  ')}\n};`

    // main controller
    writeToFile(`${outputRootMain}/src/shared/generated/paramIO.h`, generateParamIO())
    writeToFile(`${outputRootMain}/src/shared/generated/system/config.h`, generateSharedConfig())
    writeToFile(`${outputRootMidiMain}/midiButtonValues.h`, buttonEnumFileContents)
    writeToFile(`${outputRootMidiMain}/midiPots.h`, potEnumFileContents)
    writeToFile(`${outputRootMidiMain}/midiPotsCC.h`, potCCFileContents)
    writeToFile(`${outputRootMidiMain}/midiCom.h`, comEnumFileContents)
    writeToFile(`${outputRootMidiMain}/midiComCC.h`, comCCFileContents)
    writeToFile(`${outputRootMidiMain}/midiPotsNrpnEnum.h`, potEnumNrpnFileContents)
    writeToFile(`${outputRootMidiMain}/midiPotsNrpn.h`, potNrpnFileContents)
}

generateCppFiles()
