## Things to implement in GUI
### Env
- Velocity on/off per envelope
- Velocity curve selection, midi/keyboard
- Env time and level curve selection, midi/keyboard, per env, ink min/max time

### Routing
- When from/to pressed, intercept increment/click and use to select source/dest instead.
- Flash sources/destinations when from/to pressed. Black out rest.

### Filter
High res filter cutoff, currently only 7 bit CC?!
- Limit max env modulation?
- Display env amt as semitones/octaves

### Hi-precision pots
- increment 1/10 when shift is pressed for fine tuning.

## Things to fix
### Routing
- No need to send UI amount or even have a UI amount. Instead implement logic for setting matix entry
  - Or we could keep amount but set it to selected source. Makes it easier to keep virtual and real panels in sync
  - 
### Envs
- Possible race condition in midi vs panel setting of currentEnvId? We need to separate
currently selected envelope through midi and what is selected on screen. no need to
store current env in lfoMidiApi.
- Swap env 1 and 2 in UI, let env 1 be amp
- Selectable polarity?
- Block invert on amp envelope 
- Loop counter should be actual number of times env plays.
- Currently, midi output env levels are curve-mapped for VCA envelope only. 
  - Mapping should be per env-configurable
  - Mapping should work for bipolar envelopes
  - NB - env level modulation is linear, perhaps mapping should happen only on controller side?
- Midi output for env times are curve mapped for all but should be configurable. 
  - SHOULD BE ON CONTROLLER SIDE, we show the wrong time now!