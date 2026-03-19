import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import './midi/cppControllerConfigGenerator';
import { Provider } from 'react-redux'
import { store } from './synthcore/store'
import midiApi from './midi/midiApi'
import { startEnvelopeSync } from './store/sync/zustandToReduxSync'
import { startEnvelopeMidiSend } from './store/midi/envMidiSend'

midiApi.initReceive()
startEnvelopeSync()
startEnvelopeMidiSend()

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
