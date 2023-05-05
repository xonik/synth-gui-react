# synth-gui-react

## Generating C files for Teensy

npm run generateCppFiles

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