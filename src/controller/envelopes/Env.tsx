import React from 'react'
import EnvelopeControl from './EnvelopeControl'
import EnvPotLabels from './EnvPotLabels'
import EnvHeader from './EnvHeader'
import { useAppSelector } from '../../synthcore/hooks'
import { selectCurrEnvId } from '../../synthcore/modules/env/envReducer'

const Mod = () => {
    const envId = useAppSelector(selectCurrEnvId)
    return <>
        <EnvHeader envId={envId}/>
        <EnvelopeControl/>
        <EnvPotLabels/>
    </>
}

export default Mod