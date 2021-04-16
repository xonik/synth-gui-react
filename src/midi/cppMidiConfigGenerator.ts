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
                    buttonEnum.push(`${controllerGroupKey}_${controllerKey}`)
                    buttonCC.push(controller.cc)
                    buttonOffset.push(controller.values ? controller.values[0] : 0)
                    buttonValuesCount.push(controller.values?.length || 0)
                } else if(controller.type === 'pot'){
                    potEnum.push(`${controllerGroupKey}_${controllerKey}`)
                    potCC.push(controller.cc)
                } else {
                    console.log('missing controller type', { controllerGroupKey, controllerKey, controller })
                }
            })
        })

    console.log(buttonEnum)
    console.log(buttonCC)
    console.log(buttonOffset)
    console.log(buttonValuesCount)
    console.log(potEnum)
    console.log(potCC)
}

generateCppFiles()