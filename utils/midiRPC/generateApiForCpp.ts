import { dataTypeMap, Func } from './types'

export function generateApiForCpp(funcs: Func[]) {
    return `// GENERATED FILE, DO NOT EDIT
//cpp-to-midi RPC wrapper
#include "api.h"
#include "midiSerializer.h"
#include "functionNames.h"
#include "../midi/nativeMidi.h"
#include "../midi/midi.h"

namespace midiRPC {
${funcs.map(functionMapper).join('\n\n')}
}
`
}

const functionMapper = (func: Func) => {
    const params = func.params.map(({ name, type }) => `${dataTypeMap[type].cppType} ${name}`)
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

    return `${functionHeader}
        std::vector<uint8_t> result = splitTo7(${func.name}Func, 14);
        ${paramConverts.join('\n        ')}

        result.reserve(result.size() + param1.size() + param2.size() + param3.size());
        ${paramConverts.join('\n        ')}

        nmidi::sendSysex(voice, xmidi::SYSEX_CMD_RPC, &result);
}`
}

export function generateApiHForCpp(funcs: Func[]) {
    return `// GENERATED FILE, DO NOT EDIT
#pragma once
#include <vector>
#include "stdint.h"

namespace midiRPC {
${funcs.map(functionMapperH).join('\n')}
}
`
}

const functionMapperH = (func: Func) => {
    const params = func.params.map(({ name, type }) => `${dataTypeMap[type].cppType} ${name}`)
    return `    void ${func.name}(${params.join(', ')});`
}