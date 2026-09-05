import { generateFunctionNamesEnumCpp } from './generateFunctionNames'
import { dataTypeMap, type Func } from './types'

export function generateApiForCpp(funcs: Func[]) {
    const mainFuncs = funcs.filter((func) => func.targets.includes('main'))

    return `// GENERATED FILE, DO NOT EDIT
// cpp-to-midi RPC wrapper
#include "api.h"
#include "../midiSerializer.h"
#include "../../shared/midi/SysexCommands.h"

namespace midiRPC {

    NativeVoiceMidi* voiceMidi;
    
${mainFuncs.map(functionMapper).join('\n\n')}
}
`
}

function getDataToSendJoining(paramReserves: string[], paramCombines: string[]) {
    return `dataToSend.reserve(${paramReserves.join(' + ')});
        ${paramCombines.join('\n        ')}`
}

const functionMapper = (func: Func) => {
    const params = ['int8_t voice', ...func.params.map(({ name, type }) => `${dataTypeMap[type].cppType} ${name}`)]

    const paramWithFuncId    = [
        {
            name: 'functionId',
            type: 'uint8_t',
        },
        ...func.params,
    ]

    const paramConverts = func.params.map(({ name, type }) => {
        return `std::vector<uint8_t> ${name}Vec = ${dataTypeMap[type].cppSerializer}${name});`
    })

    const paramReserves = [
        ...paramWithFuncId.map(({ name }) => {
            return `${name}Vec.size()`
        }),
    ]

    const paramCombines = paramWithFuncId.map(({ name }) => {
        return `dataToSend.insert(dataToSend.end(), ${name}Vec.begin(), ${name}Vec.end());`
    })
    const functionHeader = `void ${func.name}(${params.join(', ')}) {`

    return `    ${functionHeader}
        std::vector<uint8_t> dataToSend;
        std::vector<uint8_t> functionIdVec = splitTo7(14, ${func.name}Id);${paramConverts.length > 0 ? `\n        ${paramConverts.join('\n        ')}` : ''}
        ${getDataToSendJoining(paramReserves, paramCombines)}
        voiceMidi->sendSysex(voice, SYSEX_CMD_RPC, &dataToSend);
    }`
}

export function generateApiHForCpp(funcs: Func[]) {
    const mainFuncs = funcs.map((func, index) => ({ ...func, index })).filter((func) => func.targets.includes('main'))

    return `// GENERATED FILE, DO NOT EDIT
#pragma once
#include <vector>
#include <stdint.h>
#include "../../midi/NativeVoiceMidi.h"

namespace midiRPC {

    extern NativeVoiceMidi* voiceMidi;

${generateFunctionNamesEnumCpp(mainFuncs)}

${mainFuncs.map(functionMapperH).join('\n')}
}
`
}

const functionMapperH = (func: Func) => {
    const params = ['int8_t voice', ...func.params.map(({ name, type }) => `${dataTypeMap[type].cppType} ${name}`)]
    return `    void ${func.name}(${params.join(', ')});`
}
