Things to implement in GUI
- Velocity on/off per envelope
- Velocity curve selection, midi/keyboard
- Env time and level curve selection, midi/keyboard, per env, ink min/max time

High res filter cutoff, currently only 7 bit CC?!

Possible race condition in midi vs panel setting of currentEnvId? We need to separate
currently selected envelope through midi and what is selected on screen. no need to
store current env in envMidiApi.

MPK25: env level is always full range so half the pot doesn't work when changing 
level on a unipolar envelope, 