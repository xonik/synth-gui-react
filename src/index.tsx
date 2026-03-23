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
import { startSimpleButtonMidiSend } from './store/midi/simpleButtonMidiSend'
import { startSimpleButtonMidiReceive } from './store/midi/simpleButtonMidiReceive'
import { startSrcMixMidiSend, startSrcMixMidiReceive } from './store/midi/srcMixMidi'

midiApi.initReceive()
startEnvelopeMidiSend()
startEnvelopeMidiReceive()
startSimpleButtonMidiSend()
startSimpleButtonMidiReceive()
startSrcMixMidiSend()
startSrcMixMidiReceive()

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
