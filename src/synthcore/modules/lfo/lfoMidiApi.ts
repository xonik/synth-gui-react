// If imported directly we get a cyclic dependency. Not sure why it works now.
import { lfoApi } from '../../synthcoreApi'

const initReceive = () => {

}

const lfoMidiApi = {
    initReceive,
}

export default lfoMidiApi