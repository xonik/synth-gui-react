import { useState } from 'react'
import {
    svfMeasureAmplitudeOnce,
    svfMeasureVRefAll,
    svfSearchCutoffOne,
    tuneSvf,
} from '@/midi/rpc/api'
import Button from '../components/Button'
import './SettingsButtons.scss'
import './SvfTuning.scss'

type Props = { voice: number }

export const SvfTuning = ({ voice }: Props) => {
    const [trimmerSettingRaw, setTrimmerSettingRaw] = useState(0)
    const [windowUs, setWindowUs] = useState(0)
    const [octave, setOctave] = useState(0)

    return (
        <div className="settings-buttons">
            <div className="settings-buttons__columns">
                <div className="settings-buttons__column">
                    <div className="settings-buttons__column-heading">SVF</div>
                    <Button active onClick={() => tuneSvf(voice)}>
                        Tune
                    </Button>
                    <Button active onClick={() => svfMeasureVRefAll(voice)}>
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
                        Octave (0-255)
                        <input
                            type="number"
                            min={0}
                            max={255}
                            value={octave}
                            onChange={(e) => setOctave(Number(e.target.value))}
                        />
                    </label>
                    <Button active onClick={() => svfSearchCutoffOne(octave, voice)}>
                        Search cutoff one
                    </Button>
                </div>
            </div>
        </div>
    )
}
