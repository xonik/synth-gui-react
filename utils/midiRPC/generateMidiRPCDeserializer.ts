import { dataTypeMap, Func, Param } from './types'
import { generateFunctionNamesEnumCpp } from './generateFunctionNames'
export function generateMidiRPCDeserializer(functions: Func[]) {
    return `// GENERATED FILE, DO NOT EDIT
#include "../midiRPCFunctions.h"
#include "../../shared/midiRPC/midiRPCDeserializer.h"
#include "../../shared/midiRPC/midiRPCReceiver.h"

namespace midiRPC {
    
  ${generateFunctionNamesEnumCpp(functions.map((func, index) => ({...func, index})))}

  uint16_t deserializeAndCallFunction(const uint8_t* data, uint16_t startPos) {
    uint16_t pos = startPos;
    int8_t voice = getVoice(data, pos); // used during routing, not passed to functions
    uint16_t functionId = getFunctionId(data, pos);

${functions.map(functionMapper).join('')}

    return pos;
  }
}`
}

function functionMapper(func: Func) {
    let paramsString = func.params.map(paramConverterMapper).join('\n')
    if(paramsString.length > 0) paramsString = `\n${paramsString}`

    return `
    if(functionId == ${func.name}Id) {${paramsString}
      ${getSerialPrintln(func)}        
      ${func.name}(${func.params.map((param) => param.name).join(', ')});
    }
`
}

function getSerialPrintln(func: Func) {
    if(func.params.length > 0){
        const paramString = func.params.map((param) => {
            if(dataTypeMap[param.type].printValue){
                return param.name
            } else {
                return '"<unprintable>"'
            }
        }).join(' + ", " + ')

        return `serialPrintln(String("Calling ${func.name} with params ") + ${paramString});`
    } else {
        return `serialPrintln("Calling ${func.name}");`
    }
}

function paramConverterMapper(param: Param) {
    const type = dataTypeMap[param.type]
    return `      ${type.cppType} ${param.name} = ${type.deserializer}(data, pos);`
}

