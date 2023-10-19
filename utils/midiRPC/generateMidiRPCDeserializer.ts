import { dataTypeMap, Func, Param } from './types'
import { generateFunctionNamesCpp } from './generateFunctionNames'
export function generateMidiRPCDeserializer(functions: Func[]) {
    return `// GENERATED FILE, DO NOT EDIT
#include "midiRPCFunctions.h"
#include "midiRPCDeserializer.h"
#include "midiRPCReceiver.h"

namespace midiRPC {
    
  ${generateFunctionNamesCpp(functions)}

  uint16_t deserializeAndCallFunction(uint8_t* data, uint16_t startPos) {
    uint16_t pos = startPos;
    uint16_t functionId = getFunctionId(data, pos+=2);

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
      ${func.name}(${func.params.map((param) => param.name).join(', ')});
    }
`
}

function paramConverterMapper(param: Param) {
    const type = dataTypeMap[param.type]
    return `      ${type.cppType} ${param.name} = ${type.deserializer}(data, pos+=${type.byteLength});`
}

