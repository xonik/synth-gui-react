import { sharedConfig } from '../../src/sharedConfig'

export function generateSharedConfig() {
    const lines = Object.entries(sharedConfig).map(([key, value]) => {
        if (value.type === 'define') {
            return `#define ${key} ${value.value}`
        } else if (value.type.endsWith('[]') && Array.isArray(value.value)) {
            return `const ${value.type.split('[')[0]} ${key}[] = {${value.value.join(',')}};`
        } else {
            return `constexpr ${value.type} ${key} = ${value.value};`
        }
    })

    return `#pragma once
#include "../../common.h"
    
${lines.join('\n')}`
}
