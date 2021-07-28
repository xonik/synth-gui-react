import React from 'react'
import { digitalModTargets } from '../../midi/controllers'
import ModHeader from './ModHeader'
import ModControl from './ModControl'
import ModPotLabels from './ModPotLabels'

const Mod = () => {

    const group = digitalModTargets['SOUND_SOURCES']

    return <>
        <ModHeader/>
        <ModControl/>
        <ModPotLabels/>
    </>
}

export default Mod