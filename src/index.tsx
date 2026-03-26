import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import './midi/cppControllerConfigGenerator';
import midiApi from './midi/midiApi'
// Import synthcore store to initialize middleware and MIDI receive handlers
import './synthcore/store'
import { startEnvelopeMidiSend } from './store/midi/envMidiSend'
import { startEnvelopeMidiReceive } from './store/midi/envMidiReceive'
import { startNoiseRingModMidiSend, startNoiseRingModMidiReceive } from './store/midi/noiseRingModMidi'
import { startFxKbdMidiSend, startFxKbdMidiReceive } from './store/midi/fxKbdMidi'
import { startSrcMixMidiSend, startSrcMixMidiReceive } from './store/midi/srcMixMidi'
import { startOutPostMixMidiSend, startOutPostMixMidiReceive } from './store/midi/outPostMixMidi'
import { startOscMidiSend, startOscMidiReceive } from './store/midi/oscMidi'
import { startFilterMidiSend, startFilterMidiReceive } from './store/midi/filterMidi'
import { startLfoMidiSend, startLfoMidiReceive } from './store/midi/lfoMidi'
import { startClockMidiSend, startClockMidiReceive } from './store/midi/clockMidi'
import { startArpMidiSend, startArpMidiReceive } from './store/midi/arpMidi'
import { startCommonFxMidiSend, startCommonFxMidiReceive } from './store/midi/commonFxMidi'

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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
