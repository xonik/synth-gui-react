import React from 'react'
import LfoControl from './LfoControl'
import LfoPotLabels from './LfoPotLabels'
import LfoHeader from './LfoHeader'
import { useAppSelector } from '../../synthcore/hooks'
import { selectCurrGuiLfoId } from '../../synthcore/modules/lfo/lfoReducer'

const Lfo = () => {
    const lfoId = useAppSelector(selectCurrGuiLfoId)
    return <>
        <LfoHeader lfoId={lfoId}/>
        <LfoControl/>
        <LfoPotLabels/>
    </>
}

export default Lfo