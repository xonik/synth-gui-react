import { dataTypeMap, Func, Param } from './types'
import { generateFunctionNamesCpp } from './generateFunctionNames'
export function generateMidiRPCDeserializer(functions: Func[]) {
    return `// GENERATED FILE, DO NOT EDIT
#include "midiRPCFunctions.h"
#include "midiRPCDeserializer.h"
#include "midiRPCReceiver.h"
#include "arduino-debug-utils.h"

namespace midiRPC {
    
  ${generateFunctionNamesCpp(functions)}

  uint16_t deserializeAndCallFunction(const uint8_t* data, uint16_t startPos) {
    uint16_t pos = startPos;
    uint16_t functionId = getFunctionId(data, pos);
    pos+=2;

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
        return `serialPrintln(String("Calling ${func.name} with params ") + ${func.params.map((param) => param.name).join(' + ", " + ')});`
    } else {
        return `serialPrintln("Calling ${func.name}");`
    }
}

function paramConverterMapper(param: Param) {
    const type = dataTypeMap[param.type]
    return `      ${type.cppType} ${param.name} = ${type.deserializer}(data, pos);pos+=${type.byteLength};`
}

