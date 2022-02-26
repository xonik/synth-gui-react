import controllers from '../src/midi/controllers'
import { buttonLeftMidiValues } from '../src/midi/buttonLeftMidiValues'
import { buttonCenterMidiValues } from '../src/midi/buttonCenterMidiValues'
import { buttonRightMidiValues } from '../src/midi/buttonRightMidiValues'
import {
    ControllerIdDst,
    ControllerIdEnvDst,
    ControllerIdIntermediate,
    ControllerIdLfoDst, ControllerIdNonMod, ControllerIdNonModPots,
    ControllerIdSrc, DST_COUNT, DST_ENV_COUNT,
    DST_LFO_COUNT,
    FIRST_DST,
    FIRST_ENV_DST,
    FIRST_INTERMEDIATE,
    FIRST_LFO_DST, FIRST_NON_MOD, FIRST_NON_MOD_POTS, INT_COUNT, NON_MOD_POTS_COUNT, SRC_COUNT
} from '../src/midi/controllerIds'

const fs = require('fs')

const outputRoot = '/Users/joakim/git/xonik/xm8-voice-controller/xm8-voice-controller/'

const generateParamIO = (): string => {

    if (FIRST_INTERMEDIATE !== ControllerIdIntermediate.LPF_FM_AMT.valueOf()) {
        throw new Error('paramIO: First intermediate does not match src ctrl last, did you forget to change it after adding something?')
    }

    if (FIRST_DST !== ControllerIdDst.DCO1_PITCH.valueOf()) {
        throw new Error('paramIO: First dest does not match intermediate last, did you forget to change it after adding something?')
    }

    if (FIRST_ENV_DST !== ControllerIdEnvDst.DELAY_TIME.valueOf()) {
        throw new Error('paramIO: First env dest does not match last dst, did you forget to change it after adding something?')
    }

    if (FIRST_LFO_DST !== ControllerIdLfoDst.RATE.valueOf()) {
        throw new Error('paramIO: First lfo dest does not match last env dst, did you forget to change it after adding something?')
    }

    if (FIRST_NON_MOD_POTS !== ControllerIdNonModPots.MOD_AMOUNT.valueOf()) {
        throw new Error('paramIO: First non mod pots does not match last env dst, did you forget to change it after adding something?')
    }

    if (FIRST_NON_MOD !== ControllerIdNonMod.DCO1_SYNC.valueOf()) {
        throw new Error('paramIO: First non mod does not match last env dst, did you forget to change it after adding something?')
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
            .map((key, index) => `NMP_DST_${key}${index === 0 ? ' = ' + FIRST_NON_MOD_POTS : ''}`)
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

    fs.writeFileSync(`${outputRoot}paramIO.h`, generateParamIO())
    fs.writeFileSync(`${outputRoot}midiButtons.h`, buttonEnumFileContents)
    fs.writeFileSync(`${outputRoot}midiButtonsCC.h`, buttonCCFileContents)
    fs.writeFileSync(`${outputRoot}midiButtonsFirstValue.h`, buttonFirstValueFileContents)
    fs.writeFileSync(`${outputRoot}midiButtonsNumberOfValues.h`, buttonNumberOfValuesFileContents)
    fs.writeFileSync(`${outputRoot}midiPots.h`, potEnumFileContents)
    fs.writeFileSync(`${outputRoot}midiPotsCC.h`, potCCFileContents)
    fs.writeFileSync(`${outputRoot}midiCom.h`, comEnumFileContents)
    fs.writeFileSync(`${outputRoot}midiComCC.h`, comCCFileContents)
    fs.writeFileSync(`${outputRoot}midiPotsNrpnEnum.h`, potEnumNrpnFileContents)
    fs.writeFileSync(`${outputRoot}midiPotsNrpn.h`, potNrpnFileContents)
    fs.writeFileSync(`${outputRoot}midiButtonLeftValues.h`, midiButtonLeftValues)
    fs.writeFileSync(`${outputRoot}midiButtonCenterValues.h`, midiButtonCenterValues)
    fs.writeFileSync(`${outputRoot}midiButtonRightValues.h`, midiButtonRightValues)
}

generateCppFiles()