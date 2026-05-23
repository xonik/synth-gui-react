// GENERATED FILE, DO NOT EDIT
// Cv definitions
export type CvDefinition = {
  name: string,
  channel: number,
  description: string,
}

export const CV_CHANNELS = 56 // get from c++

export const CVs: CvDefinition[] = [
  {
    "name": "CV_SRC_MIX_BIT_CRUSHER",
    "channel": 22,
    "description": "Bit crush level"
  },
  {
    "name": "CV_JUNO_CUTOFF",
    "channel": 42,
    "description": "Juno Cutoff"
  },
  {
    "name": "CV_JUNO_RESONANCE",
    "channel": 38,
    "description": "Juno Resonance"
  },
  {
    "name": "CV_MOOG_CUTOFF",
    "channel": 41,
    "description": "Moog Cutoff"
  },
  {
    "name": "CV_MOOG_RESONANCE",
    "channel": 39,
    "description": "Moog Resonance"
  },
  {
    "name": "CV_OSC2_WAVEFORM",
    "channel": 13,
    "description": "Osc B Waveform"
  },
  {
    "name": "CV_OSC2_SUB_OCT1",
    "channel": 11,
    "description": "Osc B sub oct 1"
  },
  {
    "name": "CV_OSC2_SUB_OCT2",
    "channel": 12,
    "description": "Osc B sub oct 2"
  },
  {
    "name": "CV_POST_MIX_SINE_1",
    "channel": 55,
    "description": "Sine 1 Post mix"
  },
  {
    "name": "CV_POST_MIX_SINE_2",
    "channel": 54,
    "description": "Sine 2 Post mix"
  }
]
