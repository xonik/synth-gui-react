# synth-gui-react

## Sending the current patch to the synth

On Settings > Midi, select and save a MIDI output, then choose a voice group
beside **Send voice group patch**. This sends that group's current patch without
changing the UI state. Sending is manual; heartbeats do not trigger it.

The sender uses existing CC/button mappings for ordinary controls and bulk
SysEx RPCs for envelopes, LFOs and modulation (including zero routes to clear old
connections), followed by both oscillator wavetable selections. Messages are
paced for the serial links to the voice cards. "Sent" confirms transmission, not
an acknowledgement from the synth.

Global controllers, including clock, arpeggiator, common effects and master
outputs, are excluded; their manual send action is not implemented yet.

## Generating C files for Teensy

npm run generateCppFiles

## Exporting SVG for laser cutting

create a new, empty svg file.

in config.ts, change SHOW_CUT to true and toggle the parts of the UI you want to cut.

run npm run start

inspect the svg element in the browser dev tools, 'view as SVG' and copy contents into the file

run npm run build

copy the contents of build/static/main.....css into a <style> tag in the svg file

# Konsepter

## uiResponse

`uiResponse` brukes for å f.eks gi en eksponensiell respons på et potmeter.

`uiResponse` settes på controller og har to metoder:

`output`: Funksjon som mapper fra lineær til annen respons. Brukes for å gjøre om posisjon på pot til en skalert midiVerdi.

`input`: Funksjon som mapper fra annen respons til lineær. Tar skalert verdi og gjør til posisjon på pot.

`uiResponse` brukes i common/utils.ts, createSetterFuncs, så alt som bruker default setters har innebygget støtte for `uiResponse`.

### Fra UI-potmeter til store/midi
Skjer i increment()

Hvis `uiResponse` finnes tas verdi fra action (lineær) som inkrementeres og sendes gjennom output for å finne tilsvarende midiVerdi.
Så kjøres en `set` som setter midiverdi og uiVerdi i store.

Uten `uiResponse` settes verdi fra action som midiverdi.

### Fra midi til store
Skjer i setWithUiUpdate()

Motsatt vei, i midimottak, så kjøres midiverdien gjennom input() for å finne pot-verdi.
midiVerdi og uiVerdi settes så i store.

### Fra store til UI-potmeter
Potmeterne henter verdien sin gjennom selectUiController.
Denne sjekker om ctrl har uiResponse, hvis den har det så returneres uiVerdi,
hvis ikke returneres midiVerdi.

### Backend:
https://medium.com/@dceddia/create-react-app-with-an-express-backend-9fbf7a2e0b59