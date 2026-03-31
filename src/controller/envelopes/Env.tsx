import EnvelopeControl from './EnvelopeControl'
import EnvHeader from './EnvHeader'
import PotLabels from '../components/PotLabels'

const Env = () => {
    return <>
        <EnvHeader/>
        <EnvelopeControl/>
        <PotLabels labels={['Envelope', 'Time', 'Level', 'Curve', 'Offset', 'Loops']}/>
    </>
}

export default Env