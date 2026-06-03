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

type SvfActionKey = 'tune' | 'findPeak' | 'measureVRefAll' | 'measureVRefAt'

const svfActionLabels: Record<SvfActionKey, string> = {
    tune: 'Tune SVF',
    findPeak: 'Find peak',
    measureVRefAll: 'Measure VRef all',
    measureVRefAt: 'Measure VRef at',
}

const svfActionKeys = Object.keys(svfActionLabels) as SvfActionKey[]

type Props = { voice: number }

export const SvfTuning = ({ voice }: Props) => {
    const [target, setTarget] = useState<FilterTarget>(FilterTarget.FT_SVF_LP12)
    const [svfAction, setSvfAction] = useState<SvfActionKey>('tune')
    const [trimmerSettingRaw, setTrimmerSettingRaw] = useState(0)
    const [windowUs, setWindowUs] = useState(0)
    const [searchMidiNote, setSearchMidiNote] = useState(64)
    const [precisionBits, setPrecisionBits] = useState(16)
    const [vRefNote, setVRefNote] = useState(64)
    const [searchPrecisionBits, setSearchPrecisionBits] = useState(12)
    const [vRefMilliVolts, setVRefMilliVolts] = useState(0)

    const renderFilterTargetSelect = () => (
        <label className="svf-tuning__field">
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

    const executeSvfAction = () => {
        switch (svfAction) {
            case 'tune': tuneSvf(target, precisionBits, voice); break
            case 'findPeak': svfFindPeak(target, precisionBits, voice); break
            case 'measureVRefAll': svfMeasureVRefAll(target, precisionBits, voice); break
            case 'measureVRefAt': svfMeasureVRefAt(target, vRefNote, precisionBits, voice); break
        }
    }

    return (
        <div className="settings-buttons svf-tuning">
            <div className="settings-buttons__columns">
                <div className="settings-buttons__column">
                    <div className="settings-buttons__column-heading">SVF tuning</div>
                    {renderFilterTargetSelect()}
                    <div className="svf-tuning__row">
                        <label className="svf-tuning__field">
                            Bits
                            <input
                                type="number"
                                min={1}
                                max={16}
                                value={precisionBits}
                                onChange={(e) => setPrecisionBits(Number(e.target.value))}
                            />
                        </label>
                        <label className="svf-tuning__field">
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
                    <label className="svf-tuning__field">
                        Action
                        <select
                            value={svfAction}
                            onChange={(e) => setSvfAction(e.target.value as SvfActionKey)}
                        >
                            {svfActionKeys.map((key) => (
                                <option key={key} value={key}>{svfActionLabels[key]}</option>
                            ))}
                        </select>
                    </label>
                    <Button active onClick={executeSvfAction}>
                        Execute
                    </Button>
                </div>
                <div className="settings-buttons__column">
                    <div className="settings-buttons__column-heading">Amplitude</div>
                    <label className="svf-tuning__field">
                        Trimmer raw
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
                        Measure
                    </Button>
                </div>
                <div className="settings-buttons__column">
                    <div className="settings-buttons__column-heading">Search cutoff</div>
                    {renderFilterTargetSelect()}
                    <div className="svf-tuning__row">
                        <label className="svf-tuning__field">
                            Bits
                            <input
                                type="number"
                                min={0}
                                value={searchPrecisionBits}
                                onChange={(e) => setSearchPrecisionBits(Number(e.target.value))}
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
                    </div>
                    <label className="svf-tuning__field">
                        Midi note
                        <input
                            type="number"
                            min={0}
                            max={127}
                            value={searchMidiNote}
                            onChange={(e) => setSearchMidiNote(Number(e.target.value))}
                        />
                    </label>
                    <Button active onClick={() => svfSearchCutoffOne(target, searchMidiNote, vRefMilliVolts, searchPrecisionBits, voice)}>
                        Search
                    </Button>
                </div>
            </div>
        </div>
    )
}
