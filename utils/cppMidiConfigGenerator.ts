import controllers from '../src/midi/controllers'
import { buttonLeftMidiValues } from '../src/midi/buttonLeftMidiValues'
import { buttonCenterMidiValues } from '../src/midi/buttonCenterMidiValues'
import { buttonRightMidiValues } from '../src/midi/buttonRightMidiValues'
import {
    ControllerIdDst,
    ControllerIdEnvDst,
    ControllerIdIntermediate,
    ControllerIdLfoDst, ControllerIdNonMod,
    ControllerIdSrc,
    FIRST_DST,
    FIRST_ENV_DST,
    FIRST_INTERMEDIATE,
    FIRST_LFO_DST, FIRST_NON_MOD
} from '../src/midi/controllerIds'

const fs = require('fs')

const outputRoot = '/Users/joakimtysseng/Documents/Arduino/xm8-voice-controller/xm8-voice-controller/'

const generateParamIO = (): string => {

    if (FIRST_INTERMEDIATE !== ControllerIdSrc.LAST || ControllerIdIntermediate.LPF_FM_AMT.valueOf() !== ControllerIdSrc.LAST.valueOf()) {
        throw new Error('paramIO: First intermediate does not match src ctrl last, did you forget to change it after adding something?')
    }

    if (FIRST_DST !== ControllerIdIntermediate.LAST || ControllerIdDst.DCO1_PITCH.valueOf() !== ControllerIdIntermediate.LAST.valueOf()) {
        throw new Error('paramIO: First dest does not match intermediate last, did you forget to change it after adding something?')
    }

    if (FIRST_ENV_DST !== ControllerIdDst.LAST || ControllerIdEnvDst.DELAY_TIME.valueOf() !== ControllerIdDst.LAST.valueOf()) {
        throw new Error('paramIO: First env dest does not match last dst, did you forget to change it after adding something?')
    }

    if (FIRST_LFO_DST !== ControllerIdEnvDst.LAST || ControllerIdLfoDst.RATE.valueOf() !== ControllerIdEnvDst.LAST.valueOf()) {
        throw new Error('paramIO: First lfo dest does not match last env dst, did you forget to change it after adding something?')
    }

    if (FIRST_NON_MOD !== ControllerIdLfoDst.DST_LAST || ControllerIdNonMod.DCO1_SYNC.valueOf() !== ControllerIdLfoDst.DST_LAST.valueOf()) {
        throw new Error('paramIO: First non mod does not match last env dst, did you forget to change it after adding something?')
    }

    const paramIOContents =
        `
#ifndef paramIO_H_
#define paramIO_H_

#include "envelopes.h"
#include "lfos.h"

namespace paramIO {
  enum SrcCtrlPos {
    ${Object.keys(ControllerIdSrc).filter(o => isNaN(o as any)).map((key) => `SRC_${key}`).join(',\n    ')}
    
    // TODO: Note and pitch should perhaps be part of this? But
    // Note needs to be quantized    
  }
   
  const unsigned short FIRST_ENV = ${ControllerIdSrc.ENVELOPE1};
  const unsigned short FIRST_LFO = ${ControllerIdSrc.LFO1};
  const unsigned short FIRST_INTERMEDIATE = ${FIRST_INTERMEDIATE};
  
  enum IntermediateCtrlPos {
    ${Object.keys(ControllerIdIntermediate).filter(o => isNaN(o as any)).map((key) => `INT_SRC_${key}`).join(',\n    ')}
  }
  
  enum DstCtrlPos {
    ${Object.keys(ControllerIdDst).filter(o => isNaN(o as any)).map((key) => `DST_${key}`).join(',\n    ')}
  }
  
  const unsigned short FIRST_ENV_DEST_ID = ${FIRST_ENV_DST};
  
  enum EnvDestinations {
    ${Object.keys(ControllerIdEnvDst).filter(o => isNaN(o as any)).map((key) => `DST_ENV_${key}`).join(',\n    ')}
  }  
  
  enum LfoDestinations {
    ${Object.keys(ControllerIdLfoDst).filter(o => isNaN(o as any)).map((key) => `DST_LFO_${key}`).join(',\n    ')}
  }  
  
  const unsigned short FIRST_LFO_DEST_ID = ${FIRST_LFO_DST};
  const unsigned short LAST_LFO_DEST_ID = ${ControllerIdLfoDst.DST_LAST - 1};  
  
  enum DirectDestinatons {
    DDST_ROUTE_AMOUNT,
    DDST_MAIN_PANEL_POT1,
    DDST_MAIN_PANEL_POT2,
    DDST_MAIN_PANEL_POT3,
    DDST_MAIN_PANEL_POT4,
    DDST_MAIN_PANEL_POT5,
    DDST_MAIN_PANEL_POT6,
    DDST_DSP1_EFFECT,
    DDST_DSP2_EFFECT,
    DDST_OUTPUT_VOLUME,
    DDST_OUTPUT_SPREAD,
    DDST_OUTPUT_HEADPHONES,
    DDST_COUNT // Used for array indexing;
  };  
  
  const unsigned short DESTINATIONS = ${FIRST_ENV_DST - FIRST_INTERMEDIATE};
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
    fs.writeFileSync(`${outputRoot}midiPotsNrpnEnum.h`, potEnumNrpnFileContents)
    fs.writeFileSync(`${outputRoot}midiPotsNrpn.h`, potNrpnFileContents)
    fs.writeFileSync(`${outputRoot}midiButtonLeftValues.h`, midiButtonLeftValues)
    fs.writeFileSync(`${outputRoot}midiButtonCenterValues.h`, midiButtonCenterValues)
    fs.writeFileSync(`${outputRoot}midiButtonRightValues.h`, midiButtonRightValues)
}

generateCppFiles()