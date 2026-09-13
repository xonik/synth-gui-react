import { useMemo, useState } from 'react'
import StaticCurve from '@/components/curves/StaticCurve'
import { bankNames, waveBanks } from '@/synthcore/modules/wavetable/wavetableData'
import type { Point } from '@/utils/types'
import './WaveformsScreen.scss'

const mapSamplesToPoints = (samples: number[]): Point[] => {
    if (samples.length === 0) return []

    const maxAmplitude = samples.reduce((max, sample) => Math.max(max, Math.abs(sample)), 1)
    return samples.map((sample, index) => ({
        x: samples.length === 1 ? 0 : index / (samples.length - 1),
        y: 0.5 - sample / (maxAmplitude * 2),
    }))
}

const WaveformsScreen = () => {
    const [selectedBank, setSelectedBank] = useState(0)
    const currentBank = waveBanks[selectedBank] ?? waveBanks[0]

    const waveformPoints = useMemo(
        () => currentBank.waves.map((wave) => mapSamplesToPoints(wave.samples)),
        [currentBank]
    )

    return (
        <div className="waveforms-screen">
            <div className="waveforms-screen__header">
                <span className="waveforms-screen__header-label">Bank</span>
                <select
                    className="wt-select wt-select--header wt-select--header-table-bank"
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(Number(e.target.value))}
                >
                    {bankNames.map((name, bankIndex) => (
                        <option key={name} value={bankIndex}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="waveforms-screen__grid-scroll">
                <div className="waveforms-screen__grid">
                    {currentBank.waves.map((wave, waveIndex) => (
                        <div key={wave.name} className="waveforms-screen__card">
                            <div className="waveforms-screen__card-title">{`Wave ${waveIndex + 1}`}</div>
                            <div className="waveforms-screen__graph">
                                <StaticCurve
                                    x={0}
                                    y={0}
                                    width={1}
                                    height={1}
                                    points={waveformPoints[waveIndex]}
                                    className="waveforms-screen__graph-svg"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WaveformsScreen
