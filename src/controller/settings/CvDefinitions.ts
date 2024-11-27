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
    "name": "CV_CALIBRATE",
    "channel": 30,
    "description": "Calibration comparison voltage"
  },
  {
    "name": "CV_DIST_AMT",
    "channel": 0,
    "description": "Distortion amt"
  },
  {
    "name": "CV_SRC_MIX_DISTORTION",
    "channel": 29,
    "description": "Distortion level"
  },
  {
    "name": "CV_LPF_CUTOFF",
    "channel": 42,
    "description": "Juno Cutoff"
  },
  {
    "name": "CV_POST_MIX_LPF",
    "channel": 46,
    "description": "Juno Post mix"
  },
  {
    "name": "CV_LPF_RESONANCE",
    "channel": 38,
    "description": "Juno Resonance"
  },
  {
    "name": "CV_SRC_MIX_NOISE",
    "channel": 28,
    "description": "Noise level"
  },
  {
    "name": "CV_PW_CV_A",
    "channel": 2,
    "description": "Osc A PW"
  },
  {
    "name": "CV_WAVEFORM_CV_A",
    "channel": 7,
    "description": "Osc A Waveform"
  },
  {
    "name": "CV_PW_CV_B",
    "channel": 6,
    "description": "Osc B PW"
  },
  {
    "name": "CV_WAVEFORM_CV_B",
    "channel": 13,
    "description": "Osc B Waveform"
  },
  {
    "name": "CV_SRC_MIX_RING_MOD",
    "channel": 27,
    "description": "Ring mod level"
  },
  {
    "name": "CV_SVF_CUTOFF",
    "channel": 48,
    "description": "SVF Cutoff"
  },
  {
    "name": "CV_SVF_LIN_FM",
    "channel": 49,
    "description": "SVF Lin FM"
  },
  {
    "name": "CV_POST_MIX_SVF",
    "channel": 47,
    "description": "SVF Post mix"
  },
  {
    "name": "CV_SVF_RESONANCE",
    "channel": 45,
    "description": "SVF Resonance"
  },
  {
    "name": "CV_VCO_PITCH",
    "channel": 10,
    "description": "TODO"
  },
  {
    "name": "CV_VCO_PW",
    "channel": 16,
    "description": "TODO"
  },
  {
    "name": "CV_VCO_FM_AMT",
    "channel": 17,
    "description": "TODO"
  },
  {
    "name": "CV_VCO_WAVEFORM",
    "channel": 18,
    "description": "TODO"
  },
  {
    "name": "CV_SVF_FM_AMT",
    "channel": 19,
    "description": "TODO"
  },
  {
    "name": "CV_SRC_MIX_VCO",
    "channel": 24,
    "description": "TODO"
  },
  {
    "name": "CV_SRC_MIX_EXT_AUD",
    "channel": 25,
    "description": "TODO"
  },
  {
    "name": "CV_VCO_LPF_FM",
    "channel": 44,
    "description": "TODO Juno Lin FM"
  },
  {
    "name": "CV_VCO_LIN_FM",
    "channel": 14,
    "description": "TODO VCO Lin FM"
  }
]
