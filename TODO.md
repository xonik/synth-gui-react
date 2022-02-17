Things to implement in GUI
- Velocity on/off per envelope
- Velocity curve selection, midi/keyboard
- Env time and level curve selection, midi/keyboard, per env, ink min/max time

High res filter cutoff, currently only 7 bit CC?!

Possible race condition in midi vs panel setting of currentEnvId? We need to separate
currently selected envelope through midi and what is selected on screen. no need to
store current env in envMidiApi.

Envs:
- Selectable polarity?
- Block invert on envelope 1
- Loop counter should be actual number of times env plays.
- Currently, midi output env levels are curve-mapped for VCA envelope only. 
  - Mapping should be per env-configurable
  - Mapping should work for bipolar envelopes
  - NB - env level modulation is linear, perhaps mapping should happen only on controller side?
- Midi output for env times are curve mapped for all but should be configurable. 
  - SHOULD BE ON CONTROLLER SIDE, we show the wrong time now!

MPK25: env level is always full range so half the pot doesn't work when changing 
level on a unipolar envelope, 