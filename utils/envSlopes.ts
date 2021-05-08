const refreshRate = 24000;

const shortestAttackUS = 500;

const sampleLengthUS = 1000000 / refreshRate;

const samplesForShortestAttack = shortestAttackUS / sampleLengthUS; // 12

/*
Andromeda A6 envelopes:

2ms - 131.05s stage times
Reason: 16bit, 2ms * 65535 = 131.05 (0 is probably reserved for off for those stages that allow it)

Level: +/-100% (bipolar)

Juno:
Attack: 1ms - 3s
Decay/release: 2ms - 12s


OB6 according to Abstrakt Instruments: 0.5ms attack

With hi-res midi we would get 14bit. We could use 0.5 as the lowest value and 2ms steps, giving us a max time of 33s
OR we could go with the 2ms scheme from the A6 entirely and still only get 33s.
OR we could use a switch to indicate short-long envelopes, the first starting at 0.5ms and reaching 8.2s, the other starting at
2ms and reaching 131s or similar. OR even 1ms stepping on the short, going from 0.5 and reaching 16.4s

Slope shape

How do we deal with the slope shape when the stage time and sustain level changes?
- If slope shape is always the same, then stage time (for decay) will be a function of sustain level, meaning that when
  we rise the sustain level, we have to stop the decay at an earlier time. Also, attack would not be changeable.
- If slope is stretched in the x direction, attack is possible. The attack peak is always the same so that's no issue.
  Decay on the other hand, must be stretched in such a way that it stops at the sustain level when the decay time is up
- If slope is stretched in both directions the decay slope changes but ends in the same way every time. It would be much
  easier to adjust this based on a linear response from the attack peak at t0 to the sustain level at t1 (=decay time). I suspect
  this is the correct way for capacitor based envelope generators, as setting the sustain level changes the voltage across the capacitor.
  The decay time is adjusted by varying the resistor the cap is charged through. BUT - this must mean that rising the sustain level
  also affects the decay time? Weird stuff, needs to be tested.

==> Looks like a 'unit sized' slope is streched to match the time / level-drop.

So how can we do this?

Use unsigned int value[256] // 16 bit per.
Then unsigned int slope[256] //16 bit per.

At position index (16 bit), approximated value will be value[Hi(index)] + Lo(index) * slope[Hi(index)]

Now we need to scale that value to fill our hole.

First, we need the index. -We know the stage duration

*/