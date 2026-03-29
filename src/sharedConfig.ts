// Stuff shared with the voice/main controller

export const sharedConfig = {
    MASTER_CLOCK_MIN_BPM: { value: 30, type: 'define' },
    MASTER_CLOCK_MAX_BPM: { value: 300, type: 'define' },
    ARP_MIN_BPM: { value: 30, type: 'define' },
    ARP_MAX_BPM: { value: 300, type: 'define' },
    ARP_MAX_ASSIGNED_NOTES: { value: 128, type: 'define' },
    ARP_VELOCITY: { value: 127, type: 'define' },

    VOICE_COUNT: { value: 3, type: 'define' },
    VOICE_GROUPS: { value: 8, type: 'define' },

    ENVS: { value: 5, type: 'define' },
    ENV_STAGES: { value: 8, type: 'define' },

    LFOS: { value: 4, type: 'define' },
    LFO_STAGES: { value: 4, type: 'define' },

    // This can be more than the number of voices. Only the lower notes will be
    // played polyphonically, but the rest may be played when using the
    // arpeggiator.
    MAX_NOTES_IN_CHORD: { value: 16, type: 'define' },

    CLOCK_PPQN: { value: 96, type: 'define' },

    SYSEX_ADDR: { value: [1, 2, 3], type: 'uint8_t[]'}
}