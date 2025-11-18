import { dataTypeMap, Func } from './types'
import { generateFunctionNamesEnumCpp } from "./generateFunctionNames";
import { DataType } from "./dataTypes";

export function generateApiForCpp(funcs: Func[]) {

    const mainFuncs = funcs.filter(func => func.targets.includes('main'));

    return `// GENERATED FILE, DO NOT EDIT
// cpp-to-midi RPC wrapper
#include "api.h"
#include "../midiSerializer.h"
#include "../../midi/nativeVoiceMidi.h"
#include "../../midi/MainMidi.h"
#include "../../shared/midi/SysexCommands.h"

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
        'int8_t voice',
        ...func.params.map(({ name, type }) => `${dataTypeMap[type].cppType} ${name}`)
    ]

    const paramWithFuncId = [
        {
            name: 'functionId',
            type: 'uint8_t',
        },
        ...func.params
    ]

    const paramConverts = func.params.map(
        ({ name, type }, index) => {
            return `std::vector<uint8_t> ${name}Vec = ${dataTypeMap[type].cppSerializer}${name});`
        }
    )

    const paramReserves = [
        ...paramWithFuncId.map(
            ({ name, type }, index) => {
                return `${name}Vec.size()`
            }
        )]

    const paramCombines = paramWithFuncId.map(
        ({name}, index) => {
            return `result.insert(result.end(), ${name}Vec.begin(), ${name}Vec.end());`
        }
    )
    const functionHeader = `void ${func.name}(${params.join(', ')}) {`

    return `    ${functionHeader}
        std::vector<uint8_t> result = splitInt8To7(voice);
        std::vector<uint8_t> functionIdVec = splitTo7(${func.name}Id, 14);${paramConverts.length > 0 ? '\n        ' + paramConverts.join('\n        '): ''}
        ${func.params.length === 0 ? '' : getResultJoining(paramReserves, paramCombines)}
        nvmidi::sendSysex(voice, SYSEX_CMD_RPC, &result);
    }`
}

export function generateApiHForCpp(funcs: Func[]) {
    const mainFuncs = funcs
        .map((func, index) => ({...func, index}))
        .filter(func => func.targets.includes('main'));

    return `// GENERATED FILE, DO NOT EDIT
#pragma once
#include <vector>
#include "stdint.h"

namespace midiRPC {

${generateFunctionNamesEnumCpp(mainFuncs)}

${mainFuncs.map(functionMapperH).join('\n')}
}
`
}

const functionMapperH = (func: Func) => {
    const params = [
        'int8_t voice',
        ...func.params.map(({ name, type }) => `${dataTypeMap[type].cppType} ${name}`)
    ]
    return `    void ${func.name}(${params.join(', ')});`
}