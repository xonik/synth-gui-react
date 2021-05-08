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

Use two 16bit arrays:
```
unsigned int value[256]
unsigned int slope[256]
``` 

At position index (16 bit), approximated value will be 

```value[Hi(index)] + Lo(index) * slope[Hi(index)]```

Now we need to scale that value to fill our hole.

First, we need the index.:

We know the stage duration and our refresh rate:
1) each sample is 1 / refresh rate, for example 1 / 24000 = 0.041666667ms
2) we know the desired duration, for example 2mS
3) we then know that 2mS equals 48 samples.
4) We have 65536 indexes to pick from
5) index should be incremented by 65536 / 48 = 1365,333
6) To increase precision, multiply by 256 and round, getting 349525
7) Check: Max index = 349525 * 48 = 16777200 => / 256 = 65535
8) => Index is also the linear value.
9) Use index to lookup value.
10) Now, figure out the difference between the current level and the target level,
for example, target level is 2/3 of the maximum level, our desired range is
  
2 * 65536 / 3 = 43690

11) Multiply the value at index i with this and divide by 65536.  

Summed up:
NB: For this to work properly, duration and sustain must be static throughout the env cycle, e.g.
fixed once env is triggered

each sample is 1 / r s

desired duration is d s

number of samples n is d / (1 / r) = d  * r 

Whenever the duration changes, recalculate delta index as 16777216 / n = 16777216 / (d * r)  
  
Problem: The delta quickly approaches something very small. Perhaps using a float instead would help?   
  
When you have i = sample count * delta:

v = delta_level * (value[Hi(index)] + Lo(index) * slope[Hi(index)]) / 65536 

Thought: Could we use an integer counter and multiply/divide instead?

index = x * 65536 / d * r => 24000 * 65536 / 24000 * 2

=> will quickly become more than 16bit if multiple seconds, but 
even 24000 * 131 secs = 3144000 which is < 32 bit.

The divisor will be precalculated, so the final form is x * 65536 / divisor. x * 65536 is
simply a 16bit shift left, leaving us with a single division.

TEST:
- Adding tiny floating point numbers
3144000 = 5.33626 => three fract digits: 5.336 * 3144000 = 16776384, /256 = 65532,75, an error of 3.25

- Try speed of divide.
-> 100M divide + sum tar 1314ms

- Try increasing delta multiplier to 16bit instead of 8  (point 6)

- Try speed of final multiplications - two mults and one shift.
--> Probably extremely fast. 

NB: Consider signed ints...

x

