import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import './midi/cppControllerConfigGenerator';
import { Provider } from 'react-redux'
import { store } from './synthcore/store'
import midiApi from './midi/midiApi'
import { startEnvelopeMidiSend } from './store/midi/envMidiSend'
import { startEnvelopeMidiReceive } from './store/midi/envMidiReceive'
import { startNoiseRingModMidiSend, startNoiseRingModMidiReceive } from './store/midi/noiseRingModMidi'
import { startFxKbdMidiSend, startFxKbdMidiReceive } from './store/midi/fxKbdMidi'
import { startSrcMixMidiSend, startSrcMixMidiReceive } from './store/midi/srcMixMidi'
import { startOutPostMixMidiSend, startOutPostMixMidiReceive } from './store/midi/outPostMixMidi'
import { startOscMidiSend, startOscMidiReceive } from './store/midi/oscMidi'
import { startFilterMidiSend, startFilterMidiReceive } from './store/midi/filterMidi'
import { startLfoMidiSend, startLfoMidiReceive } from './store/midi/lfoMidi'

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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
