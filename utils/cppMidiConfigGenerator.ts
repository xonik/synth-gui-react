import controllers from '../src/midi/controllers'
import { buttonLeftMidiValues } from '../src/midi/buttonLeftMidiValues'
import { buttonCenterMidiValues } from '../src/midi/buttonCenterMidiValues'
import { buttonRightMidiValues } from '../src/midi/buttonRightMidiValues'

const fs = require('fs');

const outputRoot = '/Users/joakimtysseng/Documents/Arduino/xm8-voice-controller/xm8-voice-controller/'

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
                if(controller.type === 'button'){
                    buttonEnum.push(`BUTTON_${controllerGroupKey}_${controllerKey}`)
                    buttonCC.push(controller.cc)
                    buttonFirstValue.push(controller.values ? controller.values[0] : 0)
                    buttonNumberOfValues.push(controller.values?.length || 0)
                } else if(controller.type === 'pot'){
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
                if(controller.type === 'pot'){
                    potNrpnEnum.push(`POT_${controllerGroupKey}_${controllerKey}`)
                    potNrpn.push(`${controller.addr} /* ${controllerGroupKey}_${controllerKey} */`)
                } else {
                    console.log('missing controller type', { controllerGroupKey, controllerKey, controller })
                }
            })
        })

    const buttonEnumFileContents = `enum Button: char {\n  ${buttonEnum.join(',\n  ')}\n};`;
    const buttonCCFileContents = `const char buttonCC[${buttonCC.length}] = {\n  ${buttonCC.join(',\n  ')}\n};`;
    const buttonFirstValueFileContents = `// First value in the button values array.\n// Values are sequential\nconst char buttonFirstValue[${buttonFirstValue.length}] = {\n  ${buttonFirstValue.join(',\n  ')}\n};`;
    const buttonNumberOfValuesFileContents = `// Number of values for button\nconst char buttonNumberOfValues[${buttonNumberOfValues.length}] = {\n  ${buttonNumberOfValues.join(',\n  ')}\n};`;

    const potEnumFileContents = `enum Pot: char {\n  ${potEnum.join(',\n  ')}\n};`;
    const potCCFileContents = `const char potCC[${potCC.length}] = {\n  ${potCC.join(',\n  ')}\n};`;

    const potEnumNrpnFileContents = `enum PotNrpn: char {\n  ${potNrpnEnum.join(',\n  ')}\n};`;
    const potNrpnFileContents = `const char potNrpn[${potCC.length}] = {\n  ${potNrpn.join(',\n  ')}\n};`;

    const buttonLeftMidiKeys = Object.keys(buttonLeftMidiValues)
        .filter(o => isNaN(o as any))
        .map(key => `BL_${key}`)
    const buttonCenterMidiKeys = Object.keys(buttonCenterMidiValues)
        .filter(o => isNaN(o as any))
        .map(key => `BC_${key}`)
    const buttonRightMidiKeys = Object.keys(buttonRightMidiValues)
        .filter(o => isNaN(o as any))
        .map(key => `BR_${key}`)

    const midiButtonLeftValues = `enum ButtonLeftMidiValues {\n  ${buttonLeftMidiKeys.join(',\n  ')}\n};`;
    const midiButtonCenterValues = `enum ButtonCenterMidiValues {\n  ${buttonCenterMidiKeys.join(',\n  ')}\n};`;
    const midiButtonRightValues = `enum ButtonRightMidiValues {\n  ${buttonRightMidiKeys.join(',\n  ')}\n};`;

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