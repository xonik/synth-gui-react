# Digital oscillators

The screen should be split in two: oscillator 1 on the left and oscillator 2 on the right.

Then there is a toggle between VS mode and digital oscillator mode.

Depending on the selected mode, the screen should either be a single page (Prophet VS) or split in two.

## Prophet VS mode

This is a special case of two digital oscillators in wavetable mode, but with a convenience UI mimicking a Prophet VS joystick (rotated 45 degrees for now).

- Four double dropdowns in the four corners; the first selects the wavetable group (VS, Microwave, etc.), and the second selects the waveform.
- The two on the left map to the first and last positions in the wavetable for oscillator 1.
- The two on the right map to the same for oscillator 2.
- In the center, a square reaches out toward the dropdowns. Inside it, a moveable green dot indicates the joystick position.
- Moving along the Y axis should send waveform select messages (morphing inside the wavetable).
- Moving along the X axis should pan the volume on oscillator 1 and oscillator 2 in the pre-filter mixer so that when at the top oscillator 1 is at max and oscillator 2 at zero, and when at the bottom the opposite is true.
- Panning should be linear.
- At the bottom, a toggle switch should set either 16-bit (WT) or 12-bit (PCM) mode for both oscillators.

## Digital oscillator modes

For each oscillator, one can select either Wavetable, Waveform, or LA (D50). In the future, we should also add either a supersaw or JP80x0 mode.

### Wavetable

From the top:

- A dropdown for the wavetable, with a button that opens the wavetable editor as a modal (implement modal later).
- A toggle between smooth and discrete. When set to smooth, a full interpolation between each step in the wavetable should be done. When set to discrete, only the exact waveforms should be used, with missing entries precalculated on the MCU side if necessary.
- At the bottom, a toggle switch should set either 16-bit (WT) or 12-bit (PCM) mode.

### Waveform

- Dual dropdown: group and sample.
- Toggle between single play and loop.

### LA

The column (or TONE in LA terms) is split into two horizontally.

Each column is one partial.

#### Common partial controls

- Pitch envelope: for now this will be the same as for the analog synth. Same for both partials. Do not show in UI.
- Pitch LFO: also use global. Same for both partials. Do not show in UI.
- A mixer/panner between partials ("partial balance").
- A ring modulator between partial 1 and 2, inserted into the partials mixer in place of partial 2; toggle on/off.

#### Individual partial controls

- Partial volume with volume envelope and LFO (LFO is for synth mode only). Undecided on where this envelope should come from: dedicated or shared with analog.
- Toggle between Synth or PCM.
- Partial mute.
- Fine and coarse tune (TODO: how do they spread? Are they individual or can we use a single centered pot?).
- Adjustable key follow.

#### PCM mode

- A dual waveform selector dropdown (group + waveform).
- Each waveform is either one-shot or looped. (We may be able to reuse a single-entry wavetable, or it might be simpler to keep it as a separate thing. This does not affect the UI.)

#### Synth mode

- Waveform selector between square and saw.
- Pulse width.
- LPF with resonance and cutoff. Cutoff also has LFO and ENV input (add later).

## Joystick

When in VS mode:

- Up/down pans between the two oscillators.
- Left/right morphs the wavetable.

When in LA mode:

- Up/down is balance between tones (oscillators).
- Left/right is balance between partials.

## More on LA

### LA envelopes

- Envelopes can track the keyboard with an adjustable degree, giving faster/shorter stages.

### LA LFOs

- Resettable phase.
- Speed can track keyboard.
- Triangle, saw, square, or random.

### LA modulation

These are LFO-modulatable, in addition to pitch:

- Waveform pulse width.
- Cutoff frequency.
- Amp envelope.

### LA synth mode

- The only real waveform is a square wave; the saw wave is generated from filtering.
- PWM changes the pitch of the saw; 50% PWM gives a saw about 1 octave up.
- PWM is velocity sensitive, with an adjustable range.

### LA effects

- Chorus.
- Reverb.
- Equalizer.

## Other

- A list of waveforms sorted by group.
- A list of wavetables with waveforms sorted by group — predefined or by synth.
- A wavetable editor that enters waveforms into wavetables.