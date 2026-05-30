import { useState } from 'react'
import {
    svfFindPeak,
    svfMeasureAmplitudeOnce,
    svfMeasureVRefAll,
    svfMeasureVRefAt,
    svfSearchCutoffOne,
    tuneSvf,
} from '@/midi/rpc/api'
import Button from '../components/Button'
import './SettingsButtons.scss'
import './SvfTuning.scss'

enum FilterTarget {
    FT_SVF_LP12 = 0,
    FT_SVF_LP24 = 1,
    FT_LPF_JUNO_12 = 2,
    FT_LPF_JUNO_24 = 3,
    FT_LPF_MOOG_12 = 4,
    FT_LPF_MOOG_24 = 5,
}

const filterTargetLabels: Record<FilterTarget, string> = {
    [FilterTarget.FT_SVF_LP12]: 'SVF LP 12',
    [FilterTarget.FT_SVF_LP24]: 'SVF LP 24',
    [FilterTarget.FT_LPF_JUNO_12]: 'LPF Juno 12',
    [FilterTarget.FT_LPF_JUNO_24]: 'LPF Juno 24',
    [FilterTarget.FT_LPF_MOOG_12]: 'LPF Moog 12',
    [FilterTarget.FT_LPF_MOOG_24]: 'LPF Moog 24',
}

type Props = { voice: number }

export const SvfTuning = ({ voice }: Props) => {
    const [target, setTarget] = useState<FilterTarget>(FilterTarget.FT_SVF_LP12)
    const [trimmerSettingRaw, setTrimmerSettingRaw] = useState(0)
    const [windowUs, setWindowUs] = useState(0)
    const [searchMidiNote, setSearchMidiNote] = useState(64)
    const [precisionBits, setPrecisionBits] = useState(16)
    const [vRefNote, setVRefNote] = useState(64)
    const [searchPrecisionBits, setSearchPrecisionBits] = useState(12)
    const [vRefMilliVolts, setVRefMilliVolts] = useState(0)

    return (
        <div className="settings-buttons">
            <label className="svf-tuning__field svf-tuning__target">
                Filter target
                <select
                    value={target}
                    onChange={(e) => setTarget(Number(e.target.value) as FilterTarget)}
                >
                    {Object.values(FilterTarget)
                        .filter((v): v is FilterTarget => typeof v === 'number')
                        .map((v) => (
                            <option key={v} value={v}>{filterTargetLabels[v]}</option>
                        ))}
                </select>
            </label>
            <div className="settings-buttons__columns">
                <div className="settings-buttons__column">
                    <div className="settings-buttons__column-heading">SVF</div>
                    <label className="svf-tuning__field">
                        Precision bits (1-16)
                        <input
                            type="number"
                            min={1}
                            max={16}
                            value={precisionBits}
                            onChange={(e) => setPrecisionBits(Number(e.target.value))}
                        />
                    </label>
                    <Button active onClick={() => tuneSvf(target, precisionBits, voice)}>
                        Tune
                    </Button>
                    <label className="svf-tuning__field">
                        VRef note (0-127)
                        <input
                            type="number"
                            min={0}
                            max={127}
                            value={vRefNote}
                            onChange={(e) => setVRefNote(Number(e.target.value))}
                        />
                    </label>
                    <Button active onClick={() => svfMeasureVRefAt(target, vRefNote, precisionBits, voice)}>
                        Measure VRef at
                    </Button>
                    <Button active onClick={() => svfFindPeak(target, precisionBits, voice)}>
                        Find peak
                    </Button>
                    <Button active onClick={() => svfMeasureVRefAll(target, precisionBits, voice)}>
                        Measure VRef all
                    </Button>
                </div>
                <div className="settings-buttons__column">
                    <div className="settings-buttons__column-heading">Measure amplitude</div>
                    <label className="svf-tuning__field">
                        Trimmer raw (0-65535)
                        <input
                            type="number"
                            min={0}
                            max={65535}
                            value={trimmerSettingRaw}
                            onChange={(e) => setTrimmerSettingRaw(Number(e.target.value))}
                        />
                    </label>
                    <label className="svf-tuning__field">
                        Window (us)
                        <input
                            type="number"
                            min={0}
                            value={windowUs}
                            onChange={(e) => setWindowUs(Number(e.target.value))}
                        />
                    </label>
                    <Button active onClick={() => svfMeasureAmplitudeOnce(trimmerSettingRaw, windowUs, voice)}>
                        Measure once
                    </Button>
                </div>
                <div className="settings-buttons__column">
                    <div className="settings-buttons__column-heading">Search cutoff</div>
                    <label className="svf-tuning__field">
                        Midi note (0-127)
                        <input
                            type="number"
                            min={0}
                            max={127}
                            value={searchMidiNote}
                            onChange={(e) => setSearchMidiNote(Number(e.target.value))}
                        />
                    </label>
                    <label className="svf-tuning__field">
                        VRef (mV)
                        <input
                            type="number"
                            min={0}
                            value={vRefMilliVolts}
                            onChange={(e) => setVRefMilliVolts(Number(e.target.value))}
                        />
                    </label>
                    <label className="svf-tuning__field">
                        Precision bits
                        <input
                            type="number"
                            min={0}
                            value={searchPrecisionBits}
                            onChange={(e) => setSearchPrecisionBits(Number(e.target.value))}
                        />
                    </label>
                    <Button active onClick={() => svfSearchCutoffOne(target, searchMidiNote, vRefMilliVolts, searchPrecisionBits, voice)}>
                        Search cutoff one
                    </Button>
                </div>
            </div>
        </div>
    )
}
