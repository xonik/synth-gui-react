import PotLabels from '../components/PotLabels'
import LfoControl from './LfoControl'
import LfoHeader from './LfoHeader'

const Lfo = () => {
    return (
        <>
            <LfoHeader />
            <LfoControl />
            <PotLabels labels={['LFO', 'Freq/Level', 'Offset/Phase', 'Delay/Balance', 'Curve', 'Loops']} />
        </>
    )
}

export default Lfo
