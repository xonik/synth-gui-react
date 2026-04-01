import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import midiApi from './midi/midiApi'
import * as serviceWorker from './serviceWorker'
import { startArpMidiReceive, startArpMidiSend } from './store/midi/arpMidi'
import { startClockMidiReceive, startClockMidiSend } from './store/midi/clockMidi'
import { startCommonFxMidiReceive, startCommonFxMidiSend } from './store/midi/commonFxMidi'
import { startEnvelopeMidiReceive } from './store/midi/envMidiReceive'
import { startEnvelopeMidiSend } from './store/midi/envMidiSend'
import { startFilterMidiReceive, startFilterMidiSend } from './store/midi/filterMidi'
import { startFxKbdMidiReceive, startFxKbdMidiSend } from './store/midi/fxKbdMidi'
import { startLfoMidiReceive, startLfoMidiSend } from './store/midi/lfoMidi'
import { startNoiseRingModMidiReceive, startNoiseRingModMidiSend } from './store/midi/noiseRingModMidi'
import { startOscMidiReceive, startOscMidiSend } from './store/midi/oscMidi'
import { startOutPostMixMidiReceive, startOutPostMixMidiSend } from './store/midi/outPostMixMidi'
import { startSrcMixMidiReceive, startSrcMixMidiSend } from './store/midi/srcMixMidi'

midiApi.initReceive()
startEnvelopeMidiSend()
startEnvelopeMidiReceive()
startNoiseRingModMidiSend()
startNoiseRingModMidiReceive()
startFxKbdMidiSend()
startFxKbdMidiReceive()
startSrcMixMidiSend()
startSrcMixMidiReceive()
startOutPostMixMidiSend()
startOutPostMixMidiReceive()
startOscMidiSend()
startOscMidiReceive()
startFilterMidiSend()
startFilterMidiReceive()
startLfoMidiSend()
startLfoMidiReceive()
startClockMidiSend()
startClockMidiReceive()
startArpMidiSend()
startArpMidiReceive()
startCommonFxMidiSend()
startCommonFxMidiReceive()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
