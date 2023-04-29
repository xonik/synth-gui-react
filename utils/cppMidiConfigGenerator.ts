import controllers from '../src/synthcore/modules/controllers/controllers'
import { buttonLeftMidiValues } from '../src/midi/buttonLeftMidiValues'
import { buttonCenterMidiValues } from '../src/midi/buttonCenterMidiValues'
import { buttonRightMidiValues } from '../src/midi/buttonRightMidiValues'
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
    ControllerIdSrc, DST_COUNT, DST_ENV_COUNT,
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
    SRC_COUNT
} from '../src/synthcore/modules/controllers/controllerIds'

const fs = require('fs')

const outputRoot = '/Users/joakim/git/xonik/xm8-voice-controller/xm8-voice-controller/'

const generateParamIO = (): string => {

    if (FIRST_INTERMEDIATE !== ControllerIdIntermediate.LPF_FM_AMT.valueOf()) {
        throw new Error(`paramIO: First intermediate ${FIRST_INTERMEDIATE} does not match src ctrl last ${ControllerIdIntermediate.LPF_FM_AMT.valueOf()}, did you forget to change it after adding something?`)
    }

    if (FIRST_DST !== ControllerIdDst.DCO1_PITCH.valueOf()) {
        throw new Error(`paramIO: First dest ${FIRST_DST} does not match intermediate last ${ControllerIdDst.DCO1_PITCH.valueOf()}, did you forget to change it after adding something?`)
    }

    if (FIRST_ENV_DST !== ControllerIdEnvDst.DELAY_TIME.valueOf()) {
        throw new Error(`paramIO: First env dest ${FIRST_ENV_DST} does not match last dst ${ControllerIdEnvDst.DELAY_TIME.valueOf()}, did you forget to change it after adding something?`)
    }

    if (FIRST_LFO_DST !== ControllerIdLfoDst.RATE.valueOf()) {
        throw new Error(`paramIO: First lfo dest ${FIRST_LFO_DST} does not match last env dst ${ControllerIdLfoDst.RATE.valueOf()}, did you forget to change it after adding something?`)
    }

    if (FIRST_NON_MOD_POTS !== ControllerIdNonModPots.MOD_AMOUNT.valueOf()) {
        throw new Error(`paramIO: First non mod pots ${FIRST_NON_MOD_POTS} does not match last env dst ${ControllerIdNonModPots.MOD_AMOUNT.valueOf()}, did you forget to change it after adding something?`)
    }

    if (FIRST_NON_MOD !== ControllerIdNonMod.DCO1_RANGE.valueOf()) {
        throw new Error(`paramIO: First non mod ${FIRST_NON_MOD} does not match last env dst ${ControllerIdNonMod.DCO1_SYNC.valueOf()}, did you forget to change it after adding something?`)
    }

    const paramIOContents =
        `
#ifndef paramIO_H_
#define paramIO_H_

#include "envelopes.h"
#include "lfos.h"

namespace paramIO {
  const unsigned short SRC_COUNT = ${SRC_COUNT};
  
  const unsigned short FIRST_INTERMEDIATE = ${FIRST_INTERMEDIATE};
  const unsigned short INT_COUNT = ${INT_COUNT};
  const unsigned short LAST_INTERMEDIATE = ${FIRST_INTERMEDIATE + INT_COUNT - 1}; 
  
  const unsigned short FIRST_DST = ${FIRST_DST};
  const unsigned short DST_COUNT = ${DST_COUNT};
  const unsigned short LAST_DST = ${FIRST_DST + DST_COUNT - 1};  
      
  const unsigned short FIRST_ENV_DST = ${FIRST_ENV_DST};
  const unsigned short DST_ENV_COUNT = ${DST_ENV_COUNT};
  const unsigned short LAST_ENV_DST = ${FIRST_ENV_DST + DST_ENV_COUNT - 1};
  
  const unsigned short FIRST_LFO_DST = ${FIRST_LFO_DST};
  const unsigned short DST_LFO_COUNT = ${DST_LFO_COUNT};
  const unsigned short LAST_LFO_DST = ${FIRST_LFO_DST + DST_LFO_COUNT - 1};   
  
  const unsigned short FIRST_NON_MOD_POTS = ${FIRST_NON_MOD_POTS};
  const unsigned short NON_MOD_POTS_COUNT = ${NON_MOD_POTS_COUNT};
  const unsigned short LAST_NON_MOD_POTS = ${FIRST_NON_MOD_POTS + NON_MOD_POTS_COUNT - 1};     
  
  const unsigned short FIRST_NON_MOD = ${FIRST_NON_MOD};
  const unsigned short NON_MOD_COUNT = ${NON_MOD_COUNT};
  const unsigned short LAST_NON_MOD = ${FIRST_NON_MOD + NON_MOD_COUNT - 1};     
  
  const unsigned short ENV_NON_MOD_COUNT = ${ENV_NON_MOD_COUNT};
  const unsigned short ENV_STAGE_NON_MOD_COUNT = ${ENV_STAGE_NON_MOD_COUNT};

  const unsigned short LFO_NON_MOD_COUNT = ${LFO_NON_MOD_COUNT};
  const unsigned short LFO_STAGE_NON_MOD_COUNT = ${LFO_STAGE_NON_MOD_COUNT};
  
  const unsigned short SRC_INT_COUNT = ${SRC_COUNT + INT_COUNT};
  const unsigned short SRC_INT_DST_COUNT = ${SRC_COUNT + INT_COUNT + DST_COUNT};
  const unsigned short INT_DST_COUNT = ${INT_COUNT + DST_COUNT};  
  
  enum SrcCtrlPos {
    ${Object.keys(ControllerIdSrc).filter(o => isNaN(o as any)).map((key) => `SRC_${key}`).join(',\n    ')}
    
    // TODO: Note and pitch should perhaps be part of this? But
    // Note needs to be quantized    
  };
   
  enum IntermediateCtrlPos {
    ${Object.keys(ControllerIdIntermediate)
            .filter(o => isNaN(o as any))
            .map((key, index) => `INT_SRC_${key}${index === 0 ? ' = ' + FIRST_INTERMEDIATE : ''}`)
            .join(',\n    ')}
  };
  
  enum DstCtrlPos {
    ${Object.keys(ControllerIdDst)
            .filter(o => isNaN(o as any))
            .map((key, index) => `DST_${key}${index === 0 ? ' = ' + FIRST_DST : ''}`)
            .join(',\n    ')}
  };  
  
  enum EnvDestinations {
    ${Object.keys(ControllerIdEnvDst)
            .filter(o => isNaN(o as any))
            .map((key, index) => `DST_ENV_${key}${index === 0 ? ' = ' + FIRST_ENV_DST : ''}`)
            .join(',\n    ')}
  };  
  
  enum LfoDestinations {
    ${Object.keys(ControllerIdLfoDst)
            .filter(o => isNaN(o as any))
            .map((key, index) => `DST_LFO_${key}${index === 0 ? ' = ' + FIRST_LFO_DST : ''}`)
            .join(',\n    ')}
  };    
  
  enum NonModPotDestinations {
    ${Object.keys(ControllerIdNonModPots)
            .filter(o => isNaN(o as any))
            .map((key, index) => `DST_NMP_${key}${index === 0 ? ' = ' + FIRST_NON_MOD_POTS : ''}`)
            .join(',\n    ')}
  };    
  
  enum NonModDestinations {
    ${Object.keys(ControllerIdNonMod)
            .filter(o => isNaN(o as any))
            .map((key, index) => `DST_NM_${key}${index === 0 ? ' = ' + FIRST_NON_MOD : ''}`)
            .join(',\n    ')}
  };  

  // For NonModEnvDestinations the enum value is different between the ts and c++ code - for
  // ts we need to have an unique ID so we use an offset, but for c++ it only needs to be the correct 
  // index in a 0-indexed array. 
  enum NonModEnvDestinations {
    ${Object.keys(ControllerIdEnvNonMod)
            .filter(o => isNaN(o as any))
            .map((key, index) => `DST_ENV_NM_${key}`)
            .join(',\n    ')}
  };  

  // For NonModEnvStageDestinations the enum value is different between the ts and c++ code - for
  // ts we need to have an unique ID so we use an offset, but for c++ it only needs to be the correct 
  // index in a 0-indexed array. 
  enum NonModEnvStageDestinations {
    ${Object.keys(ControllerIdEnvStageNonMod)
            .filter(o => isNaN(o as any))
            .map((key, index) => `DST_ENV_STG_NM_${key}`)
            .join(',\n    ')}
  };  
  
  // For NonModLfoDestinations the enum value is different between the ts and c++ code - for
  // ts we need to have an unique ID so we use an offset, but for c++ it only needs to be the correct 
  // index in a 0-indexed array.   
  enum NonModLfoDestinations {
    ${Object.keys(ControllerIdLfoNonMod)
            .filter(o => isNaN(o as any))
            .map((key, index) => `DST_LFO_NM_${key}`)
            .join(',\n    ')}
  };  

  // For NonModLfoStageDestinations the enum value is different between the ts and c++ code - for
  // ts we need to have an unique ID so we use an offset, but for c++ it only needs to be the correct 
  // index in a 0-indexed array. 
  enum NonModLfoStageDestinations {
    ${Object.keys(ControllerIdLfoStageNonMod)
            .filter(o => isNaN(o as any))
            .map((key, index) => `DST_LFO_STG_NM_${key}`)
            .join(',\n    ')}
  };  
}
#endif
`
    return paramIOContents
}

const generateCppFiles = () => {
    const buttonEnum: string[] = []
    const buttonCC: number[] = []
    const buttonFirstValue: number[] = []
    const buttonNumberOfValues: number[] = []

    const potEnum: string[] = []
    const potCC: string[] = []

    const comEnum: string[] = []
    const comCC: string[] = []

    const potNrpnEnum: string[] = []
    const potNrpn: string[] = []

    Object.entries(controllers)
        .forEach(([controllerGroupKey, controllersList]) => {
            Object.entries(controllersList)
                .filter(([controllerKey, controller]) => controller.cc !== undefined)
                .forEach(([controllerKey, controller]) => {
                    if (controller.type === 'button') {
                        buttonEnum.push(`BUTTON_${controllerGroupKey}_${controllerKey}`)
                        buttonCC.push(controller.cc)
                        buttonFirstValue.push(controller.values ? controller.values[0] : 0)
                        buttonNumberOfValues.push(controller.values?.length || 0)
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

    Object.entries(controllers)
        .forEach(([controllerGroupKey, controllersList]) => {
            Object.entries(controllersList)
                .filter(([controllerKey, controller]) => controller.addr !== undefined)
                .forEach(([controllerKey, controller]) => {
                    if (controller.type === 'pot') {
                        potNrpnEnum.push(`POT_${controllerGroupKey}_${controllerKey}`)
                        potNrpn.push(`${controller.addr} /* ${controllerGroupKey}_${controllerKey} */`)
                    } else {
                        console.log('missing controller type', { controllerGroupKey, controllerKey, controller })
                    }
                })
        })

    const buttonEnumFileContents = `enum Button: char {\n  ${buttonEnum.join(',\n  ')}\n};`
    const buttonCCFileContents = `const char buttonCC[${buttonCC.length}] = {\n  ${buttonCC.join(',\n  ')}\n};`
    const buttonFirstValueFileContents = `// First value in the button values array.\n// Values are sequential\nconst char buttonFirstValue[${buttonFirstValue.length}] = {\n  ${buttonFirstValue.join(',\n  ')}\n};`
    const buttonNumberOfValuesFileContents = `// Number of values for button\nconst char buttonNumberOfValues[${buttonNumberOfValues.length}] = {\n  ${buttonNumberOfValues.join(',\n  ')}\n};`

    const comEnumFileContents = `enum Com: char {\n  ${comEnum.join(',\n  ')}\n};`
    const comCCFileContents = `const char comCC[${comCC.length}] = {\n  ${comCC.join(',\n  ')}\n};`

    const potEnumFileContents = `enum Pot: char {\n  ${potEnum.join(',\n  ')}\n};`
    const potCCFileContents = `const char potCC[${potCC.length}] = {\n  ${potCC.join(',\n  ')}\n};`

    const potEnumNrpnFileContents = `enum PotNrpn: char {\n  ${potNrpnEnum.join(',\n  ')}\n};`
    const potNrpnFileContents = `const char potNrpn[${potCC.length}] = {\n  ${potNrpn.join(',\n  ')}\n};`

    const buttonLeftMidiKeys = Object.keys(buttonLeftMidiValues)
        .filter(o => isNaN(o as any))
        .map(key => `BL_${key}`)
    const buttonCenterMidiKeys = Object.keys(buttonCenterMidiValues)
        .filter(o => isNaN(o as any))
        .map(key => `BC_${key}`)
    const buttonRightMidiKeys = Object.keys(buttonRightMidiValues)
        .filter(o => isNaN(o as any))
        .map(key => `BR_${key}`)

    const midiButtonLeftValues = `enum ButtonLeftMidiValues {\n  ${buttonLeftMidiKeys.join(',\n  ')}\n};`
    const midiButtonCenterValues = `enum ButtonCenterMidiValues {\n  ${buttonCenterMidiKeys.join(',\n  ')}\n};`
    const midiButtonRightValues = `enum ButtonRightMidiValues {\n  ${buttonRightMidiKeys.join(',\n  ')}\n};`

    writeToFile(`${outputRoot}paramIO.h`, generateParamIO())
    writeToFile(`${outputRoot}midiButtons.h`, buttonEnumFileContents)
    writeToFile(`${outputRoot}midiButtonsCC.h`, buttonCCFileContents)
    writeToFile(`${outputRoot}midiButtonsFirstValue.h`, buttonFirstValueFileContents)
    writeToFile(`${outputRoot}midiButtonsNumberOfValues.h`, buttonNumberOfValuesFileContents)
    writeToFile(`${outputRoot}midiPots.h`, potEnumFileContents)
    writeToFile(`${outputRoot}midiPotsCC.h`, potCCFileContents)
    writeToFile(`${outputRoot}midiCom.h`, comEnumFileContents)
    writeToFile(`${outputRoot}midiComCC.h`, comCCFileContents)
    writeToFile(`${outputRoot}midiPotsNrpnEnum.h`, potEnumNrpnFileContents)
    writeToFile(`${outputRoot}midiPotsNrpn.h`, potNrpnFileContents)
    writeToFile(`${outputRoot}midiButtonLeftValues.h`, midiButtonLeftValues)
    writeToFile(`${outputRoot}midiButtonCenterValues.h`, midiButtonCenterValues)
    writeToFile(`${outputRoot}midiButtonRightValues.h`, midiButtonRightValues)
}

const writeToFile = (path: string, contents: string) => {
    console.log(`writing ${contents.length} bytes to ${path}`)
    fs.writeFileSync(path, contents)
}

generateCppFiles()