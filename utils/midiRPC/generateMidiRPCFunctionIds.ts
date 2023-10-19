import { dataTypeMap, Func, Param } from './types'
import { generateFunctionNamesCpp } from './generateFunctionNames'
export function generateMidiRPCFunctionIds(functions: Func[]) {
    return `// GENERATED FILE, DO NOT EDIT
#include "midiRPCFunctionIds.h"
#include "midiRPC.h"

namespace midiRPC {
    
  ${generateFunctionNamesCpp(functions)}

  void parseAndCallFunction(uint8_t* data, uint16_t startPos) {
    uint16_t pos = startPos;
    uint16_t functionId = getFunctionId(data, pos+=2);

${functions.map(functionMapper)}

    return pos
  }
}`
}

function functionMapper(func: Func) {
    let paramsString = func.params.map(paramConverterMapper).join('\n')
    if(paramsString.length > 0) paramsString = `\n${paramsString}`
    return `
    if(functionId == ${func.name}) {${paramsString}        
      ${func.name}(${func.params.map((param) => param.name).join(', ')});
    }
`
}

function paramConverterMapper(param: Param) {
    const type = dataTypeMap[param.type]
    return `      ${type.cppType} ${param.name} = (data, pos+=${type.byteLength});`
}

