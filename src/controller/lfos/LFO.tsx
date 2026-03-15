import React from 'react'
import LfoControl from './LfoControl'
import LfoHeader from './LfoHeader'
import PotLabels from '../components/PotLabels'

const Lfo = () => {
    return <>
        <LfoHeader/>
        <LfoControl/>
        <PotLabels labels={['LFO', 'Freq/Level', 'Offset/Phase', 'Delay/Balance', 'Curve', 'Loops']}/>
    </>
}

export default Lfo