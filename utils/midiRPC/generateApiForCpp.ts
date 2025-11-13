import { dataTypeMap, Func } from './types'
import { generateFunctionNamesCpp } from "./generateFunctionNames";

export function generateApiForCpp(funcs: Func[]) {

    const mainFuncs = funcs.filter(func => func.targets.includes('main'));

    return `// GENERATED FILE, DO NOT EDIT
// cpp-to-midi RPC wrapper
#include "api.h"
#include "../midiSerializer.h"
#include "../../midi/nativeMidi.h"
#include "../../midi/midi.h"

namespace midiRPC {
${mainFuncs.map(functionMapper).join('\n\n')}
}
`
}

function getResultJoining(paramReserves: string[], paramCombines: string[]) {
    return `result.reserve(result.size() + ${paramReserves.join(' + ')});
        ${paramCombines.join('\n        ')}`
}

const functionMapper = (func: Func) => {
    const params = [
        'uint8_t voice',
        ...func.params.map(({ name, type }) => `${dataTypeMap[type].cppType} ${name}`)
    ]
    const paramReserves = func.params.map(
        ({ name, type }, index) => {
            return `param${index}.size()`
        }
    )
    const paramConverts = func.params.map(
        ({ name, type }, index) => {
            return `std::vector<uint8_t> param${index} = ${dataTypeMap[type].cppSerializer}${name});`
        }
    )
    const paramCombines = func.params.map(
        (_, index) => {
            return `result.insert(result.end(), param${index}.begin(), param${index}.end());`
        }
    )
    const functionHeader = `void ${func.name}(${params.join(', ')}) {`

    return `    ${functionHeader}
        std::vector<uint8_t> result = splitTo7(${func.name}Id, 14);${paramConverts.length > 0 ? '\n        ' + paramConverts.join('\n        '): ''}
        ${func.params.length === 0 ? '' : getResultJoining(paramReserves, paramCombines)}
        nmidi::sendSysex(voice, xmidi::SYSEX_CMD_RPC, &result);
    }`
}

export function generateApiHForCpp(funcs: Func[]) {
    const mainFuncs = funcs.filter(func => func.targets.includes('main'));

    return `// GENERATED FILE, DO NOT EDIT
#pragma once
#include <vector>
#include "stdint.h"

namespace midiRPC {

${generateFunctionNamesCpp(mainFuncs)}

${mainFuncs.map(functionMapperH).join('\n')}
}
`
}

const functionMapperH = (func: Func) => {
    const params = [
        'uint8_t voice',
        ...func.params.map(({ name, type }) => `${dataTypeMap[type].cppType} ${name}`)
    ]
    return `    void ${func.name}(${params.join(', ')});`
}