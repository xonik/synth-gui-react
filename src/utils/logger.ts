const LOG_MIDI = false;

const midi = (...logItems: any[]) => {
    if(LOG_MIDI){
        console.log(...logItems)
    }
}
const midiMsg = (data: number[]) => {
    if(LOG_MIDI){
        console.log(data.join(','))
    }
}

const logger = {
    midi,
    midiMsg,
}

export default logger;