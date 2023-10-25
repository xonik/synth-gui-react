// GENERATED FILE, DO NOT EDIT
// Cv definitions
export type CvDefinition = {
  name: string,
  channel: number,
  description: string,
}
export const CV_CHANNELS = 32 // get from c++

export const CVs: CvDefinition[] = [
  {
    "name": "CV_SRC_MIX_BIT_CRUSHER",
    "channel": 17,
    "description": "Bit crush level"
  },
  {
    "name": "CV_DIST_AMT",
    "channel": 21,
    "description": "Distortion amt"
  },
  {
    "name": "CV_SRC_MIX_DISTORTION",
    "channel": 16,
    "description": "Distortion level"
  },
  {
    "name": "CV_LPF_CUTOFF",
    "channel": 1,
    "description": "LPF Cutoff"
  },
  {
    "name": "CV_LPF_DRIVE",
    "channel": 19,
    "description": "LPF Drive"
  },
  {
    "name": "CV_LPF_DRY_LEVEL",
    "channel": 3,
    "description": "LPF Dry level"
  },
  {
    "name": "CV_LPF_FM",
    "channel": 18,
    "description": "LPF FM"
  },
  {
    "name": "CV_POST_MIX_LPF",
    "channel": 25,
    "description": "LPF Post mix"
  },
  {
    "name": "CV_LPF_RESONANCE",
    "channel": 0,
    "description": "LPF Resonance"
  },
  {
    "name": "CV_LPF_VCA",
    "channel": 2,
    "description": "LPF VCA"
  },
  {
    "name": "CV_LPF_WET_LEVEL",
    "channel": 20,
    "description": "LPF Wet level"
  },
  {
    "name": "CV_SRC_MIX_NOISE",
    "channel": 6,
    "description": "Noise level"
  },
  {
    "name": "CV_PW_CV_A",
    "channel": 15,
    "description": "Osc A PW"
  },
  {
    "name": "CV_WAVEFORM_CV_A",
    "channel": 13,
    "description": "Osc A Waveform"
  },
  {
    "name": "CV_PW_CV_B",
    "channel": 14,
    "description": "Osc B PW"
  },
  {
    "name": "CV_WAVEFORM_CV_B",
    "channel": 12,
    "description": "Osc B Waveform"
  },
  {
    "name": "CV_SRC_MIX_RING_MOD",
    "channel": 7,
    "description": "Ring mod level"
  },
  {
    "name": "CV_SVF_CUTOFF",
    "channel": 27,
    "description": "SVF Cutoff"
  },
  {
    "name": "CV_SVF_DRIVE",
    "channel": 29,
    "description": "SVF Drive"
  },
  {
    "name": "CV_SVF_LIN_FM",
    "channel": 26,
    "description": "SVF Lin FM"
  },
  {
    "name": "CV_POST_MIX_SVF",
    "channel": 30,
    "description": "SVF Post mix"
  },
  {
    "name": "CV_SVF_RESONANCE",
    "channel": 28,
    "description": "SVF Resonance"
  }
]
