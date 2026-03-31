import PotLabels from '../components/PotLabels'
import EnvelopeControl from './EnvelopeControl'
import EnvHeader from './EnvHeader'

const Env = () => {
    return (
        <>
            <EnvHeader />
            <EnvelopeControl />
            <PotLabels labels={['Envelope', 'Time', 'Level', 'Curve', 'Offset', 'Loops']} />
        </>
    )
}

export default Env
