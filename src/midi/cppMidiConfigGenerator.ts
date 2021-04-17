import midiControllers from './midiControllers'

const generateCppFiles = () => {
    const buttonEnum: string[] = []
    const buttonCC: number[] = []
    const buttonOffset: number[] = []
    const buttonValuesCount: number[] = []

    const potEnum: string[] = []
    const potCC: number[] = []

    Object.entries(midiControllers)
        .forEach(([controllerGroupKey, controllersList]) => {
            Object.entries(controllersList).forEach(([controllerKey, controller]) => {
                if(controller.type === 'button'){
                    buttonEnum.push(`BUTTON_${controllerGroupKey}_${controllerKey}`)
                    buttonCC.push(controller.cc)
                    buttonOffset.push(controller.values ? controller.values[0] : 0)
                    buttonValuesCount.push(controller.values?.length || 0)
                } else if(controller.type === 'pot'){
                    potEnum.push(`POT_${controllerGroupKey}_${controllerKey}`)
                    potCC.push(controller.cc)
                } else {
                    console.log('missing controller type', { controllerGroupKey, controllerKey, controller })
                }
            })
        })

    const buttonEnumFileContents = `enum Button: char {\n  ${buttonEnum.join(',\n  ')}\n};`;
    const buttonCCFileContents = `const char buttonCC[${buttonCC.length}] = {\n  ${buttonCC.join(',\n  ')}\n};`;
    const buttonOffsetFileContents = `const char buttonOffset[${buttonOffset.length}] = {\n  ${buttonOffset.join(',\n  ')}\n};`;
    const buttonValuesCountFileContents = `const char buttonValuesCount[${buttonOffset.length}] = {\n  ${buttonValuesCount.join(',\n  ')}\n};`;

    const potEnumFileContents = `enum Pot: char {\n  ${potEnum.join(',\n  ')}\n};`;
    const potCCFileContents = `const char potCC[${potCC.length}] = {\n  ${potCC.join(',\n  ')}\n};`;

    console.log('midiButtons.h', buttonEnumFileContents)
    console.log('midiButtonsCC.h', buttonCCFileContents)
    console.log('midiButtonsOffset.h', buttonOffsetFileContents)
    console.log('midiButtonsValuesCount.h', buttonValuesCountFileContents)
    console.log('midiPots.h', potEnumFileContents)
    console.log('midiPotsCC.h', potCCFileContents)
}

generateCppFiles()