import { Func, Param } from './types'
import { DataType } from '../../src/midi/rpc/dataTypes'
export function generateMidiRPCFunctionIds(functions: Func[]) {
    return `// GENERATED FILE, DO NOT EDIT
#include "midiRPCFunctionIds.h"
#include "midiRPC.h"

namespace midiRPC {
    void parseAndCallFunction(uint8_t* data, uint16_t startPos) {
        uint16_t startPos = 0;
        uint16_t functionId = getFunctionId(data, pos+=2);

${functions.map(generateFunction)}

        return pos
    }
}`
}

function generateFunction(func: Func) {
    let paramsString = func.params.map(generateParamParse).join('\n')
    if(paramsString.length > 0) paramsString = `\n${paramsString}`
    return `
        if(functionId == ${func.name}) {${paramsString}        
            ${func.name}(${func.params.map((param) => param.name).join(', ')});
        }
`
}

function generateParamParse(param: Param) {
    const type = dataTypeMap[param.type]
    return `            ${type.realType} ${param.name} = (data, pos+=${type.length});`
}

const dataTypeMap:Record<DataType, {
    realType: string,
    deserializer: string,
    length: number,
}> = {
    'void': {
        realType: 'void',
        deserializer: '',
        length: 0,
    },
    'uint7_t': {
        realType: 'uint8_t',
        deserializer: 'getUint7',
        length: 1,
    },
    'uint8_t': {
        realType: 'uint8_t',
        deserializer: 'getUint8',
        length: 2,
    },
    'uint14_t': {
        realType: 'uint16_t',
        deserializer: 'getUint14',
        length: 2,
    },
    'uint16_t': {
        realType: 'uint16_t',
        deserializer: 'getUint16',
        length: 3,
    },
    'uint21_t': {
        realType: 'uint32_t',
        deserializer: 'getUint21',
        length: 3,
    },
    'uint32_t': {
        realType: 'uint32_t',
        deserializer: 'getUint32',
        length: 5,
    },
}