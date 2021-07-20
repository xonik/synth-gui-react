
const targets = {
    SOURCES: {
        label: 'Sound src',
        DCO1: {
            label: 'Osc 1',
            PITCH: {
                label: 'Pitch',
                targetDigi: true,
            },
            NOTE: {
                label: 'Note',
                targetDigi: true,
            },
            SYNC: {
                label: 'Sync',
            },
            SUPER_SAW: {
                label: 'Super saw',
                targetDigi: true,
            },
            SS_LFO1: {
                label: 'SS LFO 1',
                targetDigi: true,
            },
            SS_LFO2: {
                label: 'SS LFO 2',
                targetDigi: true,
            },
            WAVEFORM: {
                label: 'Waveform',
                targetDigi: true,
            },
            MODE: {
                label: 'Mode',
            },
            SUB_WAVE: {
                label: 'Sub wave',
            },
            SUB1: {
                label: 'Sub 1',
                targetDigi: true,
            },
            SUB2: {
                label: 'Sub 2',
                targetDigi: true,
            },
            PW: {
                label: 'PW',
                targetDigi: true,
            },
            WHEEL: {},
            LFO: {},
            KBD: {},
        },
        DCO2: {
            label: 'Osc 2',
            PITCH: {
                label: 'Pitch',
                targetDigi: true,
            },
            NOTE: {
                label: 'Note',
                targetDigi: true,
            },
            SUPER_SAW: {
                label: 'Super saw',
                targetDigi: true,
            },
            SS_LFO1: {
                label: 'SS LFO 1',
                targetDigi: true,
            },
            SS_LFO2: {
                label: 'SS LFO 2',
                targetDigi: true,
            },
            DETUNE: {
                label: 'Detune',
                targetDigi: true,
            },
            WAVEFORM: {
                label: 'Waveform',
                targetDigi: true,
            },
            MODE: {
                label: 'Mode',
            },
            SUB_WAVE: {
                label: 'Sub wave',
            },
            SUB1: {
                label: 'Sub 1',
                targetDigi: true,
            },
            SUB2: {
                label: 'Sub 2',
                targetDigi: true,
            },
            PW: {
                label: 'PW',
                targetDigi: true,
            },
            WHEEL: {},
            LFO: {},
            KBD: {},
        },
        VCO: {
            label: 'Osc 3',
            PITCH: {
                label: 'Pitch',
                targetDigi: true,
            },
            NOTE: {
                label: 'Note',
                targetDigi: true,
            },
            SYNC: {
                label: 'Sync',
            },
            DETUNE: {
                label: 'Detune',
                targetDigi: true,
            },
            WAVEFORM: {
                label: 'Waveform',
                targetDigi: true,
            },
            CROSS_MOD: {
                label: 'Cross mod',
                targetDigi: true,
            },
            XMOD_SOURCE: {
                label: 'Source',
            },
            PW: {
                label: 'PW',
                targetDigi: true,
            },
            EXT_CV: {},
            WHEEL: {},
            LFO: {},
            KBD: {},
        },
        NOISE: {
            label: 'Noise',
            COLOUR: {
                label: 'Colour',
            },
        }
    },
    PRE_FX: {
        label: 'Pre FX',
        DISTORTION: {
            label: 'Distortion',
            IN: {
                label: 'In',
            },
            DRIVE: {
                label: 'Drive',
                targetDigi: true,
            },
            CLIP: {
                label: 'Clip',
            },
            LEVEL: {
                label: 'Level',
                targetDigi: true,
            },
            OUT: {
                label: 'Out',
            },
        },
        BIT_CRUSHER: {
            IN: {
                label: 'In',
            },
            BITS: {
                label: 'Bits',
                targetDigi: true,
            },
            RATE: {
                label: 'Rate',
                targetDigi: true,
            },
            LEVEL: {
                label: 'Level',
                targetDigi: true,
            },
            OUT: {
                label: 'Out',
            }
        }
    },
    LFOS: {
        label: 'LFOs',
        LFO1: {
            label: 'LFO 1',
            sourceDigit: true,
            SELECT: {
                label: 'Select',
            },
            RATE: {
                label: 'Rate',
                targetDigi: true,
            },
            DEPTH: {
                label: 'Depth',
                targetDigi: true,
            },
            SHAPE: {
                label: 'Shape',
            },
            DELAY: {
                label: 'Delay',
                targetDigi: true,
            },
            SYNC: {
                label: 'Sync',
            },
            RESET: {
                label: 'Reset',
            },
            ONCE: {
                label: 'Once',
            },
        },
        LFO2: {
            label: 'LFO 2',
            sourceDigit: true,
            SELECT: {
                label: 'Select',
            },
            RATE: {
                label: 'Rate',
                targetDigi: true,
            },
            DEPTH: {
                label: 'Depth',
                targetDigi: true,
            },
            SHAPE: {
                label: 'Shape',
            },
            DELAY: {
                label: 'Delay',
                targetDigi: true,
            },
            SYNC: {
                label: 'Sync',
            },
            RESET: {
                label: 'Reset',
            },
            ONCE: {
                label: 'Once',
            },
        },
        LFO3: {
            label: 'LFO 3',
            sourceDigit: true,
            SELECT: {
                label: 'Select',
            },
            RATE: {
                label: 'Rate',
                targetDigi: true,
            },
            DEPTH: {
                label: 'Depth',
                targetDigi: true,
            },
            SHAPE: {
                label: 'Shape',
            },
            DELAY: {
                label: 'Delay',
                targetDigi: true,
            },
            SYNC: {
                label: 'Sync',
            },
            RESET: {
                label: 'Reset',
            },
            ONCE: {
                label: 'Once',
            },
        },
        LFO4: {
            label: 'LFO 4',
            sourceDigit: true,
            SELECT: {
                label: 'Select',
            },
            RATE: {
                label: 'Rate',
                targetDigi: true,
            },
            DEPTH: {
                label: 'Depth',
                targetDigi: true,
            },
            SHAPE: {
                label: 'Shape',
            },
            DELAY: {
                label: 'Delay',
                targetDigi: true,
            },
            SYNC: {
                label: 'Sync',
            },
            RESET: {
                label: 'Reset',
            },
            ONCE: {
                label: 'Once',
            },
        }
    },
    SOURCE_MIX: {
        label: 'Source mix',
        OSC1: {
            label: 'Osc 1',
            targetDigi: true,
        },
        OSC1_OUT: {
            label: 'Osc 1 out',
        },
        OSC2: {
            label: 'Osc 2',
            targetDigi: true,
        },
        OSC2_OUT: {
            label: 'Osc 2 out',
        },
        OSC3: {
            label: 'Osc 3',
            targetDigi: true,
        },
        OSC3_OUT: {
            label: 'Osc 3 out',
        },
        NOISE: {
            label: 'Noise',
            targetDigi: true,
        },
        NOISE_OUT: {
            label: 'Noise out',
        },
        RING_MOD: {
            label: 'Ring mod',
            targetDigi: true,
        },
        RING_MOD_OUT: {
            label: 'Ring mod out',
        },
        EXT_AUD: {
            label: 'Ext. audio',
            targetDigi: true,
        },
        EXT_MOD_OUT: {
            label: 'Ext. audio out',
        },
    },
    ROUTE: {
        label: 'Route',
        FROM: {
            label: 'From',
        },
        TO: {
            label: 'To',
        },
        AMOUNT: {
            label: 'Amount',
        },
    },
    CLK_ARP_KBD: {
        label: 'Controls',
        MASTER_CLOCK: {
            label: 'Master clock',
            SOURCE: {
                label: 'Source',
            },
            RATE: {
                label: 'Rate',
                targetDigi: true,
            }
        },
        ARP: {
            label: 'Arp',
            ON_OFF: {
                label: 'On/off',
            },
            TRIGGER: {
                label: 'Trigger',
            },
            TEMPO: {
                label: 'Tempo',
                targetDigi: true,
            },
            SYNC: {
                label: 'Sync',
            },
            RANGE: {
                label: 'Range',
            },
            MODE: {
                label: 'Mode',
            },
        },
        TRANSPOSE: {
            label: 'Transpose',
            DOWN: {
                label: 'Up',
            },
            UP: {
                label: 'Down',
            },
        },
        KEYBOARD: {
            label: 'Keyboard',
            PORTAMENTO: {
                label: 'Portamento',
                targetDigi: true,
            },
            HOLD: {
                label: 'Hold',
            },
            CHORD: {
                label: 'Chord',
            },
            MODE: {
                label: 'Mode',
            },
            DETUNE: {
                label: 'Detune',
                targetDigi: true,
            },
        }
    },
    MAIN_DISPLAY: {
        label: 'Main controls',
        VOICES: {
            V1: {label: 'Voice 1',},
            V2: {label: 'Voice 2',},
            V3: {label: 'Voice 3',},
            V4: {label: 'Voice 4',},
            V5: {label: 'Voice 5',},
            V6: {label: 'Voice 6',},
            V7: {label: 'Voice 7',},
            V8: {label: 'Voice 8',},
        },
        SCREENS: {
            label: 'Screen select',
            LFO: {
                label: 'LFO',
            },
            OSC: {
                label: 'Osc',
            },
            FILTER: {
                label: 'Filter',
            },
            ENV: {
                label: 'Envelope',
            },
            MOD: {
                label: 'Modulation',
            },
            FX: {
                label: 'FX',
            },
        },
        POTS: {
            label: 'Pots',
            POT1: {label: 'Pot 1',},
            POT2: {label: 'Pot 2',},
            POT3: {label: 'Pot 3',},
            POT4: {label: 'Pot 4',},
            POT5: {label: 'Pot 5',},
        },
        MENU: {
            label: 'Menu',
            HOME: {
                label: 'Home',
            },
            SETTINGS: {
                label: 'Settings',
            },
            SHIFT: {
                label: 'Shift',
            },
            PERFORM: {
                label: 'Perform',
            },
            POT: {
                label: 'Pot',
            },
            LOAD: {
                label: 'Load',
            },
            SAVE: {
                label: 'Save',
            },
            COMPARE: {
                label: 'Compare',
            },
            ROUTE: {
                label: 'Route',
            },
        }
    },
    FILTER: {
        label: 'Filter',
        LPF: {
            label: 'LPF',
            INPUT: {
                label: 'Input',
                targetDigi: true,
            },
            DRIVE: {
                label: 'Drive',
                targetDigi: true,
            },
            RESONANCE: {
                label: 'Resonance',
                targetDigi: true,
            },
            EXT_CV: {
                label: 'Ext. CV',
            },
            WHEEL: {
                label: 'Wheel',
            },
            CUTOFF: {
                label: 'Cutoff',
                targetDigi: true,
            },
            SLOPE: {
                label: 'Slope',
            },
            FM_AMT: {},
            ENV_AMT: {},
            LFO_AMT: {},
            KBD_AMT: {},
        },
        CTRL: {
            label: 'Link/route',
            LINK: {
                label: 'Link',
            },
            ROUTING: {
                label: 'Routing',
            },
        },
        SVF: {
            label: 'SVF',
            INPUT: {
                label: 'Input',
                targetDigi: true,
            },
            DRIVE: {
                label: 'Drive',
                targetDigi: true,
            },
            RESONANCE: {
                label: 'Resonance',
                targetDigi: true,
            },
            EXT_CV: {
                label: 'Ext. CV',
            },
            WHEEL: {
                label: 'Wheel',
            },
            CUTOFF: {
                label: 'Cutoff',
                targetDigi: true,
            },
            SLOPE: {
                label: 'Slope',
            },
            FM_AMT: {},
            ENV_AMT: {},
            LFO_AMT: {},
            KBD_AMT: {},
        },
    },
    VOICE: {
        label: 'Voice out',
        MIX: {
            label: 'Mix',
            LFP: {
                label: 'LPF',
                targetDigi: true,
            },
            SVF: {
                label: 'SVF',
                targetDigi: true,
            },
            SINE1: {
                label: 'Sine 1',
                targetDigi: true,
            },
            SINE2: {
                label: 'Sine 2',
                targetDigi: true,
            }
        },
        OUT: {
            label: 'Send',
            PAN: {
                label: 'Pan',
                targetDigi: true,
            },
            AMT: {
                label: 'Level',
                targetDigi: true,
            },
            FX1: {
                label: 'FX1',
                targetDigi: true,
            },
            FX2: {
                label: 'FX2',
                targetDigi: true,
            },
        }
    },
    ENV: {
        label: 'Envelopes',
        ENV1: {
            label: 'Env 1',
            sourceDigit: true,
            DELAY: {
                label: 'Delay',
                targetDigi: true,
            },
            ATTACK: {
                label: 'Attack',
                targetDigi: true,
            },
            DECAY1: {
                label: 'Decay 1',
                targetDigi: true,
            },
            DECAY2: {
                label: 'Decay 2',
                targetDigi: true,
            },
            SUSTAIN: {
                label: 'Sustain',
                targetDigi: true,
            },
            RELEASE1: {
                label: 'Release 1',
                targetDigi: true,
            },
            RELEASE2: {
                label: 'Release 2',
                targetDigi: true,
            },
            D2_LEVEL: {
                label: 'D2 level',
                targetDigi: true,
            },
            R2_LEVEL: {
                label: 'R2 level',
                targetDigi: true,
            },
            INVERT: {
                label: 'Invert',
            },
            LOOP: {
                label: 'Loop',
            },
            TRIGGER: {
                label: 'Trigger',
            },
        },
        ENV2: {
            label: 'Env 2',
            sourceDigit: true,
            DELAY: {
                label: 'Delay',
                targetDigi: true,
            },
            ATTACK: {
                label: 'Attack',
                targetDigi: true,
            },
            DECAY1: {
                label: 'Decay 1',
                targetDigi: true,
            },
            DECAY2: {
                label: 'Decay 2',
                targetDigi: true,
            },
            SUSTAIN: {
                label: 'Sustain',
                targetDigi: true,
            },
            RELEASE1: {
                label: 'Release 1',
                targetDigi: true,
            },
            RELEASE2: {
                label: 'Release 2',
                targetDigi: true,
            },
            D2_LEVEL: {
                label: 'D2 level',
                targetDigi: true,
            },
            R2_LEVEL: {
                label: 'R2 level',
                targetDigi: true,
            },
            INVERT: {
                label: 'Invert',
            },
            LOOP: {
                label: 'Loop',
            },
            TRIGGER: {
                label: 'Trigger',
            },
        },
        ENV3: {
            label: 'Env 3',
            sourceDigit: true,
            DELAY: {
                label: 'Delay',
                targetDigi: true,
            },
            ATTACK: {
                label: 'Attack',
                targetDigi: true,
            },
            DECAY1: {
                label: 'Decay 1',
                targetDigi: true,
            },
            DECAY2: {
                label: 'Decay 2',
                targetDigi: true,
            },
            SUSTAIN: {
                label: 'Sustain',
                targetDigi: true,
            },
            RELEASE1: {
                label: 'Release 1',
                targetDigi: true,
            },
            RELEASE2: {
                label: 'Release 2',
                targetDigi: true,
            },
            D2_LEVEL: {
                label: 'D2 level',
                targetDigi: true,
            },
            R2_LEVEL: {
                label: 'R2 level',
                targetDigi: true,
            },
            INVERT: {
                label: 'Invert',
            },
            LOOP: {
                label: 'Loop',
            },
            TRIGGER: {
                label: 'Trigger',
            },
        },
        ENV4: {
            label: 'Env 4',
            sourceDigit: true,
            DELAY: {
                label: 'Delay',
                targetDigi: true,
            },
            ATTACK: {
                label: 'Attack',
                targetDigi: true,
            },
            DECAY1: {
                label: 'Decay 1',
                targetDigi: true,
            },
            DECAY2: {
                label: 'Decay 2',
                targetDigi: true,
            },
            SUSTAIN: {
                label: 'Sustain',
                targetDigi: true,
            },
            RELEASE1: {
                label: 'Release 1',
                targetDigi: true,
            },
            RELEASE2: {
                label: 'Release 2',
                targetDigi: true,
            },
            D2_LEVEL: {
                label: 'D2 level',
                targetDigi: true,
            },
            R2_LEVEL: {
                label: 'R2 level',
                targetDigi: true,
            },
            INVERT: {
                label: 'Invert',
            },
            LOOP: {
                label: 'Loop',
            },
            TRIGGER: {
                label: 'Trigger',
            },
        },
        ENV5: {
            label: 'Env 5',
            sourceDigit: true,
            DELAY: {
                label: 'Delay',
                targetDigi: true,
            },
            ATTACK: {
                label: 'Attack',
                targetDigi: true,
            },
            DECAY1: {
                label: 'Decay 1',
                targetDigi: true,
            },
            DECAY2: {
                label: 'Decay 2',
                targetDigi: true,
            },
            SUSTAIN: {
                label: 'Sustain',
                targetDigi: true,
            },
            RELEASE1: {
                label: 'Release 1',
                targetDigi: true,
            },
            RELEASE2: {
                label: 'Release 2',
                targetDigi: true,
            },
            D2_LEVEL: {
                label: 'D2 level',
                targetDigi: true,
            },
            R2_LEVEL: {
                label: 'R2 level',
                targetDigi: true,
            },
            INVERT: {
                label: 'Invert',
            },
            LOOP: {
                label: 'Loop',
            },
            TRIGGER: {
                label: 'Trigger',
            },
        },
    },

    // TODO: These are global, so how do we let a voice local
    // controller modulate them?
    FX: {
        label: 'Effects',
        FX1:{
            label: 'DSP 1',
            SOURCE: {
                label: 'Source bus',
            },
            PARAM1: {
                label: 'Param 1',
                targetDigi: true,
            },
            PARAM2: {
                label: 'Param 2',
                targetDigi: true,
            },
            PARAM3: {
                label: 'Param 3',
                targetDigi: true,
            },
            EFFECT: {
                label: 'Effect',
            },
        },
        FX2:{
            label: 'DSP 2',
            SOURCE: {
                label: 'Source bus',
            },
            PARAM1: {
                label: 'Param 1',
                targetDigi: true,
            },
            PARAM2: {
                label: 'Param 2',
                targetDigi: true,
            },
            PARAM3: {
                label: 'Param 3',
                targetDigi: true,
            },
            EFFECT: {
                label: 'Effect',
            },
        },
        CHORUS: {
            label: 'Chorus',
            SOURCE: {
                label: 'Source bus',
            },
            RATE: {
                label: 'Rate',
                targetDigi: true,
            },
            DEPTH: {
                label: 'Depth',
                targetDigi: true,
            },
            MODE: {
                label: 'Mode',
            },
        },
        BIT_CRUSHER: {
            label: 'Bit crusher',
            SOURCE: {
                label: 'Source',
            },
            BITS: {
                label: 'Bits',
                targetDigi: true,
            },
            RATE: {
                label: 'Rate',
                targetDigi: true,
            }
        },
        FX_MIX: {
            label: 'FX mix',
            DSP1: {
                label: 'DSP 1',
                targetDigi: true,
            },
            DSP2: {
                label: 'DSP 2',
                targetDigi: true,
            },
            CHORUS: {
                label: 'Chorus',
                targetDigi: true,
            },
            BIT_CRUSHER: {
                label: 'Bit crusher',
                targetDigi: true,
            },
        },
    },
    OUT: {
        label: 'Out',
        HEADPHONES: {
            label: 'Headphones',
        },
        SPREAD: {
            label: 'Spread',
        },
        VOLUME: {
            label: 'Volume',
        },
    },
    LOWER: {
        label: 'Play controls',
        PITCH_BEND: {
            label: 'Pitch bend',
            sourceDigit: true,
        },
        MOD_WHEEL: {
            label: 'Mod wheel',
            sourceDigit: true,
        },
        RIBBON_POS: {
            label: 'Ribbon position',
            sourceDigit: true,
        },
        RIBBON_PRESSURE: {
            label: 'Ribbon pressure',
            sourceDigit: true,
        },
        KBD_PITCH: {
            label: 'Pitch',
            sourceDigit: true,
        },
        KBD_VELOCITY: {
            label: 'Velocity',
            sourceDigit: true,
        },
        KBD_AFTERTOUCH: {
            label: 'Aftertouch',
            sourceDigit: true,
        }

    }
}