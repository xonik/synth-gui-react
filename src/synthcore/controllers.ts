export const controllerDefs = {
    SOUND_SOURCES: {
        label: 'Sound src',
        funcs: {
            DCO1: {
                label: 'Osc 1',
                controllers: {
                    PITCH: {
                    },
                    NOTE: {
                    },
                    SYNC: {

                    },
                    SUPER_SAW: {
                    },
                    SS_LFO1: {
                        label: 'SS LFO 1',
                        isTargetDigi: true,
                    },
                    SS_LFO2: {
                        label: 'SS LFO 2',
                        isTargetDigi: true,
                    },
                    WAVEFORM: {
                    },
                    MODE: {

                    },
                    SUB_WAVE: {

                    },
                    SUB1: {
                    },
                    SUB2: {
                    },
                    PW: {
                    },
                    WHEEL: {},
                    LFO: {},
                    KBD: {},
                }
            },
            DCO2: {
                label: 'Osc 2',
                controllers: {
                    PITCH: {
                    },
                    NOTE: {
                    },
                    SUPER_SAW: {
                    },
                    SS_LFO1: {
                        label: 'SS LFO 1',
                        isTargetDigi: true,
                    },
                    SS_LFO2: {
                        label: 'SS LFO 2',
                        isTargetDigi: true,
                    },
                    DETUNE: {
                    },
                    WAVEFORM: {
                    },
                    MODE: {

                    },
                    SUB_WAVE: {

                    },
                    SUB1: {
                    },
                    SUB2: {
                    },
                    PW: {
                    },
                    WHEEL: {},
                    LFO: {},
                    KBD: {},
                }
            },
            VCO: {
                label: 'Osc 3',
                controllers: {
                    PITCH: {
                    },
                    NOTE: {
                    },
                    SYNC: {

                    },
                    DETUNE: {
                    },
                    WAVEFORM: {
                    },
                    CROSS_MOD: {
                    },
                    XMOD_SOURCE: {

                    },
                    PW: {
                    },
                    EXT_CV: {},
                    WHEEL: {},
                    LFO: {},
                    KBD: {},
                }
            },
            NOISE: {
                label: 'Noise',
                controllers: {
                    COLOUR: {
                        label: 'Colour',
                    },
                }
            }
        }
    },
    PRE_FX: {
        label: 'Pre FX',
        funcs: {
            DISTORTION: {

                controllers: {
                    IN: {

                    },
                    DRIVE: {
                    },
                    CLIP: {

                    },
                    LEVEL: {
                    },
                    OUT: {

                    },
                }
            },
            BIT_CRUSHER: {
                IN: {

                },
                BITS: {
                },
                RATE: {
                },
                LEVEL: {
                },
                OUT: {

                }
            }
        }
    },
    LFOS: {
        label: 'LFOs',
        funcs: {
            LFO1: {
                sourceDigit: true,
                SELECT: {

                },
                RATE: {
                },
                DEPTH: {
                },
                SHAPE: {

                },
                DELAY: {
                },
                SYNC: {

                },
                RESET: {

                },
                ONCE: {

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
                    isTargetDigi: true,
                },
                DEPTH: {
                    label: 'Depth',
                    isTargetDigi: true,
                },
                SHAPE: {
                    label: 'Shape',
                },
                DELAY: {
                    label: 'Delay',
                    isTargetDigi: true,
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
                    isTargetDigi: true,
                },
                DEPTH: {
                    label: 'Depth',
                    isTargetDigi: true,
                },
                SHAPE: {
                    label: 'Shape',
                },
                DELAY: {
                    label: 'Delay',
                    isTargetDigi: true,
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
                    isTargetDigi: true,
                },
                DEPTH: {
                    label: 'Depth',
                    isTargetDigi: true,
                },
                SHAPE: {
                    label: 'Shape',
                },
                DELAY: {
                    label: 'Delay',
                    isTargetDigi: true,
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
        }
    },
    SOURCE_MIX: {
        label: 'Source mix',
        funcs: {
            OSC1: {
                LEVEL: {
                },
                TARGET: {

                },
            },
            OSC2: {
                LEVEL: {
                },
                TARGET: {

                },
            },
            OSC3: {
                LEVEL: {
                },
                TARGET: {

                },
            },
            NOISE: {
                LEVEL: {
                },
                TARGET: {

                },
            },
            RING_MOD: {
                LEVEL: {
                },
                TARGET: {

                },
            },
            EXT_AUD: {
                LEVEL: {
                },
                TARGET: {

                },
            }
        },
    },
    /*
    ROUTE: {
        label: 'Route',
        funcs: {
            FROM: {
                label: 'From',
            },
            TO: {
                label: 'To',
            },
            AMOUNT: {
                label: 'Amount',
            },
        }
    },
     */
    CLK_ARP_KBD: {
        label: 'Controls',
        funcs: {
            MASTER_CLOCK: {
                SOURCE: {

                },
                RATE: {
                }
            },
            ARP: {
                label: 'Arp',
                ON_OFF: {

                },
                TRIGGER: {

                },
                TEMPO: {
                },
                SYNC: {

                },
                RANGE: {

                },
                MODE: {

                },
            },
            TRANSPOSE: {
                DOWN: {
                },
                UP: {
                },
            },
            KEYBOARD: {
                PORTAMENTO: {
                },
                HOLD: {

                },
                CHORD: {

                },
                MODE: {

                },
                DETUNE: {
                },
            }
        }
    },
    /*
    MAIN_DISPLAY: {
        funcs: {
            VOICES: {
                V1: {},
                V2: {label: 'Voice 2',},
                V3: {label: 'Voice 3',},
                V4: {label: 'Voice 4',},
                V5: {label: 'Voice 5',},
                V6: {label: 'Voice 6',},
                V7: {label: 'Voice 7',},
                V8: {label: 'Voice 8',},
            },
            SCREENS: {

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
                POT1: {},
                POT2: {label: 'Pot 2',},
                POT3: {label: 'Pot 3',},
                POT4: {label: 'Pot 4',},
                POT5: {label: 'Pot 5',},
            },
            MENU: {
                label: 'Menu',
                HOME: {

                },
                SETTINGS: {

                },
                SHIFT: {

                },
                PERFORM: {

                },
                POT: {
                    label: 'Pot',
                },
                LOAD: {

                },
                SAVE: {

                },
                COMPARE: {

                },
                ROUTE: {

                },
            }
        }
    },
     */
    FILTER: {
        label: 'Filter',
        funcs: {
            LPF: {
                label: 'LPF',
                INPUT: {
                },
                DRIVE: {
                },
                RESONANCE: {
                },
                EXT_CV: {

                },
                WHEEL: {

                },
                CUTOFF: {
                },
                SLOPE: {

                },
                FM_AMT: {},
                ENV_AMT: {},
                LFO_AMT: {},
                KBD_AMT: {},
            },
            CTRL: {
                LINK: {

                },
                ROUTING: {

                },
            },
            SVF: {
                label: 'SVF',
                INPUT: {
                },
                DRIVE: {
                },
                RESONANCE: {
                },
                EXT_CV: {

                },
                WHEEL: {

                },
                CUTOFF: {
                },
                SLOPE: {

                },
                FM_AMT: {},
                ENV_AMT: {},
                LFO_AMT: {},
                KBD_AMT: {},
            },
        }
    },
    VOICE: {
        funcs: {
            MIX: {
                LFP: {
                },
                SVF: {
                },
                SINE1: {
                },
                SINE2: {
                }
            },
            OUT: {
                PAN: {
                },
                AMT: {
                },
                FX1: {
                },
                FX2: {
                },
            }
        }
    },
    ENV: {
        label: 'Envelopes',
        funcs: {
            ENV1: {
                label: 'Env 1',
                sourceDigit: true,
                DELAY: {
                },
                ATTACK: {
                    label: 'Attack',
                    isTargetDigi: true,
                },
                DECAY1: {
                    label: 'Decay 1',
                    isTargetDigi: true,
                },
                DECAY2: {
                    label: 'Decay 2',
                    isTargetDigi: true,
                },
                SUSTAIN: {
                    label: 'Sustain',
                    isTargetDigi: true,
                },
                RELEASE1: {
                    label: 'Release 1',
                    isTargetDigi: true,
                },
                RELEASE2: {
                    label: 'Release 2',
                    isTargetDigi: true,
                },
                D2_LEVEL: {
                    label: 'D2 level',
                    isTargetDigi: true,
                },
                R2_LEVEL: {
                    label: 'R2 level',
                    isTargetDigi: true,
                },
                INVERT: {

                },
                LOOP: {

                },
                TRIGGER: {

                },
            },
            ENV2: {
                label: 'Env 2',
                sourceDigit: true,
                DELAY: {
                    label: 'Delay',
                    isTargetDigi: true,
                },
                ATTACK: {
                    label: 'Attack',
                    isTargetDigi: true,
                },
                DECAY1: {
                    label: 'Decay 1',
                    isTargetDigi: true,
                },
                DECAY2: {
                    label: 'Decay 2',
                    isTargetDigi: true,
                },
                SUSTAIN: {
                    label: 'Sustain',
                    isTargetDigi: true,
                },
                RELEASE1: {
                    label: 'Release 1',
                    isTargetDigi: true,
                },
                RELEASE2: {
                    label: 'Release 2',
                    isTargetDigi: true,
                },
                D2_LEVEL: {
                    label: 'D2 level',
                    isTargetDigi: true,
                },
                R2_LEVEL: {
                    label: 'R2 level',
                    isTargetDigi: true,
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
                    isTargetDigi: true,
                },
                ATTACK: {
                    label: 'Attack',
                    isTargetDigi: true,
                },
                DECAY1: {
                    label: 'Decay 1',
                    isTargetDigi: true,
                },
                DECAY2: {
                    label: 'Decay 2',
                    isTargetDigi: true,
                },
                SUSTAIN: {
                    label: 'Sustain',
                    isTargetDigi: true,
                },
                RELEASE1: {
                    label: 'Release 1',
                    isTargetDigi: true,
                },
                RELEASE2: {
                    label: 'Release 2',
                    isTargetDigi: true,
                },
                D2_LEVEL: {
                    label: 'D2 level',
                    isTargetDigi: true,
                },
                R2_LEVEL: {
                    label: 'R2 level',
                    isTargetDigi: true,
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
                    isTargetDigi: true,
                },
                ATTACK: {
                    label: 'Attack',
                    isTargetDigi: true,
                },
                DECAY1: {
                    label: 'Decay 1',
                    isTargetDigi: true,
                },
                DECAY2: {
                    label: 'Decay 2',
                    isTargetDigi: true,
                },
                SUSTAIN: {
                    label: 'Sustain',
                    isTargetDigi: true,
                },
                RELEASE1: {
                    label: 'Release 1',
                    isTargetDigi: true,
                },
                RELEASE2: {
                    label: 'Release 2',
                    isTargetDigi: true,
                },
                D2_LEVEL: {
                    label: 'D2 level',
                    isTargetDigi: true,
                },
                R2_LEVEL: {
                    label: 'R2 level',
                    isTargetDigi: true,
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
                    isTargetDigi: true,
                },
                ATTACK: {
                    label: 'Attack',
                    isTargetDigi: true,
                },
                DECAY1: {
                    label: 'Decay 1',
                    isTargetDigi: true,
                },
                DECAY2: {
                    label: 'Decay 2',
                    isTargetDigi: true,
                },
                SUSTAIN: {
                    label: 'Sustain',
                    isTargetDigi: true,
                },
                RELEASE1: {
                    label: 'Release 1',
                    isTargetDigi: true,
                },
                RELEASE2: {
                    label: 'Release 2',
                    isTargetDigi: true,
                },
                D2_LEVEL: {
                    label: 'D2 level',
                    isTargetDigi: true,
                },
                R2_LEVEL: {
                    label: 'R2 level',
                    isTargetDigi: true,
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
        }
    },

    // TODO: These are global, so how do we let a voice local
    // controller modulate them?
    FX: {
        label: 'Effects',
        funcs: {
            FX1: {
                label: 'DSP 1',
                SOURCE: {

                },
                PARAM1: {
                },
                PARAM2: {
                },
                PARAM3: {
                },
                EFFECT: {

                },
            },
            FX2: {
                label: 'DSP 2',
                SOURCE: {

                },
                PARAM1: {
                },
                PARAM2: {
                },
                PARAM3: {
                },
                EFFECT: {

                },
            },
            CHORUS: {
                SOURCE: {

                },
                RATE: {
                },
                DEPTH: {
                },
                MODE: {

                },
            },
            BIT_CRUSHER: {
                label: 'Bit crusher',
                SOURCE: {

                },
                BITS: {
                },
                RATE: {
                }
            },
            FX_MIX: {
                label: 'FX mix',
                DSP1: {
                },
                DSP2: {
                },
                CHORUS: {
                },
                BIT_CRUSHER: {
                },
            },
        }
    },
    OUT: {
        label: 'Out',
        funcs: {
            HEADPHONES: {

            },
            SPREAD: {

            },
            VOLUME: {

            },
        }
    },
    LOWER: {
        label: 'Play controls',
        funcs: {

        }
    }
}