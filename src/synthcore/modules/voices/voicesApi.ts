import voicesControllers from './voicesControllers'
import { ControllerHandler, groupHandlers } from '../common/utils'
import { NumericInputProperty } from "../common/types";
import { setVoiceGroupIndex } from "./currentVoiceGroupIndex";

// TODO: This is a bit hackish, the current voiceGroupIndex is kept outside of the reducer.
// I had problems initializing the reducers when the getVoiceGroupIndex function resided inside the controllersReducer,
// probably due to a circular dependency - I got nullpointers in the state.
class VoiceGroupSelectHandler extends ControllerHandler {
    constructor() {
        super(voicesControllers.VOICE)
    }

    defaultSet(input: NumericInputProperty, forceSet?: boolean, uiValue?: number) {
        setVoiceGroupIndex(input.value)
        super.defaultSet(input, forceSet, uiValue)
    }
}

const handlers = groupHandlers({
    [voicesControllers.VOICE.id]: new VoiceGroupSelectHandler(),
})

const voicesApi = {
    ...handlers
}

export default voicesApi