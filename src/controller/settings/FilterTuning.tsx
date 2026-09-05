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
import { routeForVoice } from './voiceRouting'
import './SettingsButtons.scss'
import './FilterTuning.scss'

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

type TuneActionKey = 'tune' | 'findPeak' | 'measureVRefAll' | 'measureVRefAt'

const tuneActionLabels: Record<TuneActionKey, string> = {
    tune: 'Tune',
    findPeak: 'Find peak',
    measureVRefAll: 'Measure VRef all',
    measureVRefAt: 'Measure VRef at',
}

const tuneActionKeys = Object.keys(tuneActionLabels) as TuneActionKey[]

type Props = { voice: number }

export const FilterTuning = ({ voice }: Props) => {
    const [target, setTarget] = useState<FilterTarget>(FilterTarget.FT_SVF_LP12)
    const [tuneAction, setTuneAction] = useState<TuneActionKey>('tune')
    const [trimmerSettingRaw, setTrimmerSettingRaw] = useState(0)
    const [windowUs, setWindowUs] = useState(0)
    const [searchMidiNote, setSearchMidiNote] = useState(64)
    const [precisionBits, setPrecisionBits] = useState(16)
    const [vRefNote, setVRefNote] = useState(64)
    const [searchPrecisionBits, setSearchPrecisionBits] = useState(12)
    const [vRefMilliVolts, setVRefMilliVolts] = useState(0)

    const renderFilterTargetSelect = () => (
        <label className="filter-tuning__field">
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
    )

    const executeTuneAction = () => {
        switch (tuneAction) {
            case 'tune': tuneSvf(target, precisionBits, routeForVoice(voice)); break
            case 'findPeak': svfFindPeak(target, precisionBits, routeForVoice(voice)); break
            case 'measureVRefAll': svfMeasureVRefAll(target, precisionBits, routeForVoice(voice)); break
            case 'measureVRefAt': svfMeasureVRefAt(target, vRefNote, precisionBits, routeForVoice(voice)); break
        }
    }

    return (
        <div className="settings-buttons filter-tuning">
            <div className="settings-buttons__columns">
                <div className="settings-buttons__column">
                    <div className="settings-buttons__column-heading">Tuning</div>
                    {renderFilterTargetSelect()}
                    <div className="filter-tuning__row">
                        <label className="filter-tuning__field">
                            Bits
                            <input
                                type="number"
                                min={1}
                                max={16}
                                value={precisionBits}
                                onChange={(e) => setPrecisionBits(Number(e.target.value))}
                            />
                        </label>
                        <label className="filter-tuning__field">
                            VRef note
                            <input
                                type="number"
                                min={0}
                                max={127}
                                value={vRefNote}
                                onChange={(e) => setVRefNote(Number(e.target.value))}
                            />
                        </label>
                    </div>
                    <label className="filter-tuning__field">
                        Action
                        <select
                            value={tuneAction}
                            onChange={(e) => setTuneAction(e.target.value as TuneActionKey)}
                        >
                            {tuneActionKeys.map((key) => (
                                <option key={key} value={key}>{tuneActionLabels[key]}</option>
                            ))}
                        </select>
                    </label>
                    <Button active onClick={executeTuneAction}>
                        Execute
                    </Button>
                </div>
                <div className="settings-buttons__column">
                    <div className="settings-buttons__column-heading">Amplitude</div>
                    <label className="filter-tuning__field">
                        Trimmer raw
                        <input
                            type="number"
                            min={0}
                            max={65535}
                            value={trimmerSettingRaw}
                            onChange={(e) => setTrimmerSettingRaw(Number(e.target.value))}
                        />
                    </label>
                    <label className="filter-tuning__field">
                        Window (us)
                        <input
                            type="number"
                            min={0}
                            value={windowUs}
                            onChange={(e) => setWindowUs(Number(e.target.value))}
                        />
                    </label>
                    <Button active onClick={() => svfMeasureAmplitudeOnce(trimmerSettingRaw, windowUs, routeForVoice(voice))}>
                        Measure
                    </Button>
                </div>
                <div className="settings-buttons__column">
                    <div className="settings-buttons__column-heading">Search cutoff</div>
                    {renderFilterTargetSelect()}
                    <div className="filter-tuning__row">
                        <label className="filter-tuning__field">
                            Bits
                            <input
                                type="number"
                                min={0}
                                value={searchPrecisionBits}
                                onChange={(e) => setSearchPrecisionBits(Number(e.target.value))}
                            />
                        </label>
                        <label className="filter-tuning__field">
                            VRef (mV)
                            <input
                                type="number"
                                min={0}
                                value={vRefMilliVolts}
                                onChange={(e) => setVRefMilliVolts(Number(e.target.value))}
                            />
                        </label>
                    </div>
                    <label className="filter-tuning__field">
                        Midi note
                        <input
                            type="number"
                            min={0}
                            max={127}
                            value={searchMidiNote}
                            onChange={(e) => setSearchMidiNote(Number(e.target.value))}
                        />
                    </label>
                    <Button active onClick={() => svfSearchCutoffOne(target, searchMidiNote, vRefMilliVolts, searchPrecisionBits, routeForVoice(voice))}>
                        Search
                    </Button>
                </div>
            </div>
        </div>
    )
}
