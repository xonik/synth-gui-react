import midiControllers from './midiControllers'

const generateCppFiles = () => {
    const buttonEnum: string[] = []
    const buttonCC: number[] = []
    const buttonFirstValue: number[] = []
    const buttonNumberOfValues: number[] = []

    const potEnum: string[] = []
    const potCC: string[] = []

    Object.entries(midiControllers)
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

    const buttonEnumFileContents = `enum Button: char {\n  ${buttonEnum.join(',\n  ')}\n};`;
    const buttonCCFileContents = `const char buttonCC[${buttonCC.length}] = {\n  ${buttonCC.join(',\n  ')}\n};`;
    const buttonFirstValueFileContents = `// First value in the button values array.\n// Values are sequential\nconst char buttonFirstValue[${buttonFirstValue.length}] = {\n  ${buttonFirstValue.join(',\n  ')}\n};`;
    const buttonNumberOfValuesFileContents = `// Number of values for button\nconst char buttonNumberOfValues[${buttonNumberOfValues.length}] = {\n  ${buttonNumberOfValues.join(',\n  ')}\n};`;

    const potEnumFileContents = `enum Pot: char {\n  ${potEnum.join(',\n  ')}\n};`;
    const potCCFileContents = `const char potCC[${potCC.length}] = {\n  ${potCC.join(',\n  ')}\n};`;

    console.log('midiButtons.h', buttonEnumFileContents)
    console.log('midiButtonsCC.h', buttonCCFileContents)
    console.log('midiButtonsFirstValue.h', buttonFirstValueFileContents)
    console.log('midiButtonsNumberOfValues.h', buttonNumberOfValuesFileContents)
    console.log('midiPots.h', potEnumFileContents)
    console.log('midiPotsCC.h', potCCFileContents)
}

generateCppFiles()