59 store pots m/leds
5 store pots u/leds
40 små pots m/leds
6 små pots u/leds
Tot (FØR keyboard): 110 pots 

6 encoders (hvis stor dial skal være encoder)
96 knapper!

## SPØRSMÅL
- Hvordan er det å ha sync-knapper rett over wave-selector- Velocity, hvordan bestemme at envelope(s) skal påvirkes av velocity?
- hvorvidt man bør ha noen input-volum-kontroll på ringmod, skal den isåfall være uavhengig av 
  output fra oscillatorene. 
- Er det noe poeng med både saw og square wave sub-oscillatorer, og bør man ha både en og to oktaver 
  ned tilgjengelig samtidig. 
- Hvilke kilder bør man ha til ring mod. 
- Hvilke ting bør kunne modulere VCF 
- Skal noise modulere noe.  
- Envelopes - bør man ha både lin og log-varianter når disse skal kontrollere log-VCA’er? Attack ser
  jo isåfall ut til å være “snudd på hodet”, så hva er da effekten hvis VCAen ikke er lineær?
- Hvor mange ting bør være tilgjengelige på frontpanelet og hvilke er det ok at man må gjøre fra et GUI.
- Post-filter sine inject, hvordan bør dette funke (både Andromeda A6 og CS-80 har jo dette). 
- Hvordan funker trigger og delay på A6 envelopes

## TODO

### MÅ VURDERES:
- VCO sync source?
- Cross mod source, hvilke?
- How to select patch to play on keyboard - splits, layering
- Saw polarity button
- Env amount for D/VCOs - dette er en felles pot med knapp på A6
- Lin/log FM? necessary?

### IKKE AVGJORT:
- Velocity! Av/på?
  - også på filter!
  - I settings?
- Global LFO
 - Gjøre fra display?
- Env amount på oscillators? A6 har på osc 2 men ikke 1
 - VURDERE DENNE, men kan kanske løses med routing-knappen.
- Eller env amount på envelopes? Skal alle targets ha samme amount?
- Saw polarity
 - SKJERM?
- Velocity amount på VCF frequency? (eller på envelope da kanskje.)
- Hva gjør trigger på Andromeda A6 envelope?
- Chorus: More functions, stereo pan, chaining
  - er plass til en knapp eller pot.
- No need for output bit crusher, can do that in DSP? 
  - Gir plass til mer chorus og ryddigere Gui eller Distortion isteden

### DONE:
- Single LFO with button for what LFO to edit? But LED for each of them to show speed
 - Done (minus flashing)
- Multi trigger, latch og sync på envelopes
 - SKJERM?
- Polarity på envelopes?
 - OK
- DCO mode
 - DONE
- Mini-display over hver DCO for waveform/sample etc?
 - NEI
- Larger pots for FX
 -- DONE
- Do we need FX output buttons or should they be routed to the filter they get audio from?
  - If buttons: May inject a distored version of the input of one filter to the input of the other, that may be cool
  - KEEP AS IS
- Ext input
  - OK
- VCA - one per filter or only one?
  - forslag: en på hver i hw, så kan man route env til mikser-channel.
- LFO Depth vs LFO amt pr funksjon.
  - Løse med and på route?
- Route-button nederst til venstre.
  - DONE
* X Amt-knapp på route?
* X Voice-selector-knapper over display
* X Waveform/mode-knapp på DCOer - Vurdere å sette detune rett over, sync til høyre og type-selector til venstre
* X Distortion/Bit crusher står for tett
* X Noise - plassering av leds
* X LFO-selector
* X Load/save, dial w. click.
* X Sync source på DCOer
* X Tettere Oscillatorer
* Vurdere å droppe digital fx-output og ha output-mixer under envelopes
* X Prøve horisontale osc igjen
* X Voice volume i tillegg til pan. Kan også funke som wet/dry.
  * DRY/WET MIX! Nå går det ikke an å skru av originallyd'en!
* X Clock ctrl
* X Route-button
* X Flytte key ctrl opp på hovedpanel fordi de ikke kan overlappe tangenter.
 
## Funksjonalitet
DCO 1,2
- Pot 10mm oct
- 32mm pot - Waveform selector

- Button, 2 led (or 'reverse') Saw polarity
- 10mm pot - PWM

- (Button, 1 led) - Super saw
  - 10mm pot - Amount
  - 10mm pot OR display config - Speed LFO2 (and 1?)

- (Display) Wave reset (?), start at 0 when key is pressed to prevent pop
- Button - DCO / Wavetable / Sample?
  - Display - Which wavetable or sample
  - Display - Looping/multiple for bruk som attack?
  - Envelope amount?
- Button w 2 leds - Suboscillator waveform
- 2 x 10mm pot - Suboscillator volume (2x ?)
- 10mm pot OR button Octave selector
- 10mm pot - Fine tune (DCO2 only?)
- (Display - Button, 1 led - const beating on/off)

- Pitch modulation
  - Button, 1 led OR 10mm pot - LFO (amount)
  - Button, 1 led - Track keyboard ? Or should this be a pot?
  - Button, 1 led - Mod wheel

- MOVE TO OUTPUT MIXER! Post-filter sine wave vol (NB: how should this be affected by envelope VCA?)

- Button - Sync w DCO 2
- Volume (? eller del av mikser)

VCO
- 32mm pot - Waveform selector
- 10mm pot - PWM
- Button, three leds - Sync - off / soft / cem soft / cem hard
- Pitch modulation
  - Button, 1 led OR 10mm pot - LFO (amount)
  - Button, 1 led - Track keyboard ? Or should this be a pot?
  - Button, 1 led - Mod wheel
  - Button, 1 led - Ext CV
- FM/Cross modulation
  - 10 mm bot - amount
  - Button, 2 leds - exp / lin
  - **** source???? ****
- Volume (?)

Distortion
- 17mm pot - Amount or pan dry/wet
- 17mm pot - Volume (mixer)
- Button, 2 leds - Soft/hard clipping


Bitcrusher
- 17mm pot - Amount or pan dry/wet
- 10mm or 17mm pot - Bit crush
- 10mm or 17mm pot - Samplerate crush

Ext input
--- Alt spesifikt må inn i skjerm
- 17mm pot Volume
- Button - Envelope generator?
- Button - Filter pre env. gen
  - Env gen
  - Knapp med «filter», skru på den for fixed bandpass filter pr voice.
  - Egen knapp for å injecte voice 1 til bus som går til svf. Kan dermed vocode.
    - evt switch for ext1/voice1 på external input, men alltid ext1 på env gen
- Button - Voice 1 to bus.

Vocoding
- Trenger evt måte å gjøre noise-injection
- Trenger også muligens å flippe output.

Noise
- 17mm pot - Volume
- Button, 3 leds - Color - white/pink/red
- Hvordan gjøres pitched noise????

Ring mod
- 17mm pot - Volume
- Input A selector - DCO1 or Ext Input

Wave player?
- 17mm pot Volume
- 10mm pot - Select sample?
- 10mm pot - Tune?

Voice output mixer
- 17mm pot - Sine 1
- 17mm pot - Sine 2
- 17mm pot - Filter 1
- 17mm pot - Filter 2
  - Eller MIX-pot for mix mellom filter1 og 2
- 17mm pot - Pan L/R
- 17mm pot - FX send 1
- 17mm pot - FX send 2


Filter 1
- Button - 2 leds Poles 2/4
- Frequency
  - 32 eller 40mm pot - Main
  - Button - Env (amount på selve env?)
  - (Env/ramp selector?)
  - Button, possibly with three modes (1/1, 1/2, 1/4? Keyboard amount (?)
  - Button - Ext CV
  - Button or 10mm pot - LFO amount
- 17mm pot - Overdrive
- 17mm pot - Resonance
- Button - Slope
- Button or pot - FM input from DCO... 2?

- Output VCA - not linked to filter??
  - (env amount - done in output mixer)
  - (Env/ramp selector?)
  - (env select (ink. env generator?))
  - 10 or 17mm pot - velocity amount
  - Button - LFO, possibly toggle between multiple? (amount?)
  - (LFO selector?)

Filter 2
- 17mm pot with limited number of diodes (?) - Mode - 8-9 different values
- Frequency
  - 32 or 40mm pot - Main
  - Button - Follow filter 1 (but possible to set different starting point)
  - Button - Env (amount på selve env?)
  - (Env/ramp selector?)
  - Button, possibly with three modes (1/1, 1/2, 1/4? Keyboard amount (?)
  - Button Ext CV
  - Button or 10mm pot - LFO amount
  - (LFO selector?)
- 17mm pot - Overdrive
- 17mm pot - Resonance
- Button or pot - FM input from DCO... 2?
- Output VCA
  - (env amount - done in output mixer)
  - (Env/ramp selector?)
  - (env select (ink. env generator?)=
  - 10 or 17mm pot - velocity amount
  - Button - LFO, possibly toggle between multiple? (amount?)
  - (LFO selector?)

Filter routing
- Button - Mode: A->B, parallel
- Button - Link cutoff


Either selectable envs per env, or let env 1 and 2 be filter and vca, and then have a
button on env 3 to select others.
Envelope 1
- 17mm pot - 7 stages (?) DADDSRR, or simply a delay and trigger for first delay
- 10mm pot - two level pots for decay and release (or three, initial delay)
- Button - looping

Envelope 2
- 17mm pot - 7 stages (?) DADDSRR, or simply a delay and trigger for first delay
- 10mm pot - two level pots for decay and release (or three, initial delay)
- Button - looping

Envelope 3
- 17mm pot - 7 stages (?) DADDSRR, or simply a delay and trigger for first delay
- 10mm pot - two level pots for decay and release (or three, initial delay)
- Button - looping
- Button - env 3-4-5-6-7-8-9... select

Envelope generator as input
LFOs
- LFO selector
- Button - Shape
  - inc. Random / Sample & hold
  - Button - quantize S&H?
- (10mm or 17mm pot - PW)
- 17mm pot - speed
  - (Button - Keyboard track ?)
- 17mm pot - Depth or volume
- Button - sync (global?)
- Button - Reset on start or freerunning
- Button Repeat/Once/Half wave? (doubles as a ramp)
- 10mm or 17mm pot - Delay
- Button - Lin/log for ramp?
- Flashing led per LFO
Annet:
- To faste lfo’er som standard routes til osc og filter (toggles med knapp på osc/filter) men også kan assignes til andre. Problem: felles eller separat mod depth?
- En tredje LFO på panelet kan switches mellom resterende, hvilken vises i displayet.
- LFO speed kan angis med blinkende leds, trenger ikke led-ring (kan kanskje være konfigurerbar slik at den dimmes/skrus av etter litt)?
- LFO: saw, inv saw, triangle : «once/ramp» button, evt «loop» som default er på. «Trigger»-knapp? Evt reset on trigger. Hvis once er på så bør den uansett trigges av keypress.
- LFO: skal denne alltid være positiv? Eller er den bipolar? For ramp bør den være unipolar hvertfall.
- Skal speed kunne moduleres? Og delay, hvordan funker det, en viss delaytid og så fade inn, eller fade in allerede fra start?
  - Antakelig fade in fra start
- Keyboard track knapp for speed.

(Ramps ?
- Button - Ramp
- Button - Shape
- Button - Lin/log
- 17mm pot Speed
- 17mm pot Depth

Ramp idé 2:
Initial delay (0-30s)
Time rise
Slope rise
Time decay
Slope decay ink. always max, always off
Repeat?
==> Vurdere å bytte ut en av envelopes'ene med ramp controls.
==> Droppe delay og slikt på LFO og bruk ramp isteden.

Thought 1: let ring mod be an effect along distortion and bitcrush, make it possible to patch ext audio to it.
Thought 2: Let ext CVs and result of ext audio env generator be sampled and inserted as digital controls

Arpeggiator
- Button - Mode
- Button w/multiple leds Range (octaves)
- Button - On/off
- Button - trigger (triggers on first key press?)
- 17mm pot - Tempo (or separate clock and clock sunc)
- Button - Sync (button) - int clock, Lfo, ext clock

Voice selector
- Buttons Group select
- "Panel focus"

Pitch bend
(- Target?)
- Button - Width/range

Keyboard controls
- Two Buttons, 5 leds - Transpose - up/down
- 17mm pot - Portamento (amount/speed?) or glide
  - Button, two leds - Direction - up/down/both ?
  (- Modulate)
- Button - Unison
- 17mm pot - Unison detune pot
- Button - Split
- Button - Hold (whhat does it do?)
- Button - Chord

Output
- 17mm pot - Volume (Affects all)
- 17mm pot - Pan spread ?
- 17mm pot - FX 1 Vol
- 17mm pot - FX 2 Vol
- 17mm pot - Headphones volume
- 17mm pot - other  FX levels
- 17mm pot - Dry signal level

Global Digital FX
- Button - FX 1/2 select? Or expose pots for both
- Two buttons, up/down - Patch selector (selects between 16)
- 10 or 17mm pot w/o led - Three parameter pots x 2
- Own display?
- Button - Routing - serial/parallel
- (Env input?)

Analog Chorus
- 17mm pot - Rate
- 17mm pot - Depth
- 17mm pot - Stereo pan (?)
- Button - Stereo / Serial mono

Analog distortion
- 17mm pot - Amount
- 17mm pot - Volume (or in output mixer)
- Button - soft/hard clipping

Global Bit crusher ?
- 17mm pot - Bit depth
- 17mm pot - Sample rate
- 17mm pot - Volume



Patch selectors
- 17mm pot w/o leds- Bank - physical for quick change
- 17mm pot w/o leds - Patch - physical for quick change
- Button - Save
- Button - Compare
- Rest on touchscreen? Or save and name functions?

Assign/Route
- Button - Én assign-knapp (route, patch). Hold inne og alle kilder blinker. Rør på kilde og alle targets blinker (evt lyser konstant for de som allerede er assignet - krever ekstra diode for alle assignable). Rør på target for å assigne, slipp og rør igjen for å deassigne. Params endres ikke så lenge assign er trykket ned.
- Klikk på assign-knapp blinker de som er assignet.
- Mod wheel: select what to affect on each target?
- En del default routes og noen knapper for de mest vanlige.

TODO: Studere Matrix 12 manual
TODO: Play controls, patch selection, shared FX, Arpeggiator, output
TODO: Come up with modulation assign pattern
TODO: Come up with pre and post filter mix, how to inject FX pre filter.

P5:
-Wheel kan modulere freq A,B, PW A, PW B, Filter cutoff
-Poly-mod har sources Filt. env og Osc B out og kan modulere Freq A (FM), PW A og Filter cutoff (FM)
-Bare Osc B har fine tune, keyboard tracking off, Low frequency (LFO)
-Glide & unison som pot og knapp
- P5 v4: Vintage-knapp som gir mer ustabilitet

JP8
- Output vol har Balance mellom upper og lower del av keyboardet
- "Modulator": LFO og Env kombineres og kan påvirke VCO 1 og 2
- PWM kan moduleres fra LFO, ENV-1 og Manual
- Bend Wheel kan modulere VCO1,2 freq, VCF
- LFO modulation can modulate VCO (which one? probably selectable by VCO modulator) and VCF and has rise time.
- Envelopes har key follow! Env-1 har polarity
- VCO2 har sync-knapp, men vet ikke hvilken vei det synces
- VCO2 kan fungere som LFO
- Portamento som pot, kan virke upper, begge eller ingen.
- Arp: fire ranges. Fire modes - up, down, up/down, random
- Filter has source mix
- Eget HPF med fixed frequency pot
- Valgbar envelope for freq (1 eller 2)
- LFO mod amount, Key follow amount
- VCA level er alltid env 2. Egen LFO-knapp med fire valg for LFO til VCA (vibrato)

Schmidt Synthesizer
- Noise modulation for hver oscillator (hva betyr det)
- FM osc2->3
- Egen seksjon for vibrato
- Group In - funker som en slags bus-mikser
- Egen LFO pr VCO, VCF
- "Dual filter" - hva er det?
- Delay-ADSDR envelopes.
- Master env er ADSR

Moog one
- Beat frequency pr osc
- Sync på osc 2 & 3
- Chord
  - on
  - learn
- Sequencer
- Mixer: Each thing (osc, ring mod, noise) has two buttons, svf & ladder (=targets)
- Synth fx (per "synth" or patch) and master fx located in the same place
- Filters share controls for cutoff modulation, have to select which one to affect.
- Route selector for filters, par/ser
- Link cutoff button
- Mix pot to select amount of each for output
- Three envelopes. Same amp envelope for all.
- Performance set
- Master clock with tap tempo option
- Destination buttons on lfos, envs, and target buttons on the others (?)
- Color mix for noise, separate AR-envelope (with optional sustain) for noise.

Sequential OB-6
- Aftertouch amount and routing
- modulation targets selected at source (LFO, X-MOD etc), multiple selectable
- Clock with multiple "beats", tap tempo
- Sequencer with record and play, no step sequencer
- Two effects, two params editable.
- Output: Pan spread

Sequential Pro 3
- Modulation: source, destination and amount. Saves a lot of space.
- 16 step sequencer

Alesis Andromeda A6
- Filter: unnamed mod1/2/3 buttons
- Pre filter output, can inject osc1 sine, osc2 sine, ring mod and "mod"?
- Envelopes: ADDSRR, with delay, trigger, decay1 level, tree mod buttons, dynamics, release 1 level, loop button
- Sub osc is part of pre filter mix and not oscillator itself.
- Portamento is modulatable

DSI Prophet 12
- Character FX pre filter. All chained
- Feedback goes from filters all the way back to before character fx
- Oscillator AM! - amplitude modulation, e.g. affecting the volume.

Poly aftertouch:
Force Sensitive Resistors.
1.) Analogue weight cell -> wheatstone bridge -> ADC Scanner -> Microcontroller -> Midi port
2.) Digital weight cell -> Microcontroller -> Midi port
3.) Optical distance measurement agianst spring/rubber backforce -> Microcontroller -> Midiport
4.) Ultrasonic distance measurement agianst spring/rubber backforce -> Microcontroller -> Midiport
5.) Inductive distance measurement agianst spring/rubber backforce -> Microcontroller -> Midiport
6.) Capacitive distance measurement agianst spring/rubber backforce -> Microcontroller -> Midiport
7.) Hal sensor distance measurement agianst spring/rubber backforced magnet -> Microcontroller -> Midiport


https://www.shanpu.com.tw/en/product/tags/1/Tactile-Tact-switchees
