import { useMemo, useState } from 'react'
import StaticCurve from '@/components/curves/StaticCurve'
import { bankNames, waveBanks } from '@/synthcore/modules/wavetable/wavetableData'
import type { Point } from '@/utils/types'
import Button from '../components/Button'
import './WaveformsScreen.scss'

const INT16_MAX_ABS = 32768

const mapSamplesToPoints = (samples: number[]): Point[] => {
    if (samples.length === 0) return []

    return samples.map((sample, index) => ({
        x: samples.length === 1 ? 0 : index / (samples.length - 1),
        y: 0.5 - sample / (INT16_MAX_ABS * 2),
    }))
}

const WaveformsScreen = () => {
    const [selectedBank, setSelectedBank] = useState(0)
    const [zoomedWaveIndex, setZoomedWaveIndex] = useState<number | null>(null)
    const currentBank = waveBanks[selectedBank] ?? waveBanks[0]

    const waveformPoints = useMemo(
        () => currentBank.waves.map((wave) => mapSamplesToPoints(wave.samples)),
        [currentBank]
    )
    const hasZoomedWave = zoomedWaveIndex !== null
    const canGoPrevious = hasZoomedWave && zoomedWaveIndex > 0
    const canGoNext = hasZoomedWave && zoomedWaveIndex < currentBank.waves.length - 1

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
                        <button
                            key={wave.name}
                            type="button"
                            className="waveforms-screen__card"
                            onClick={() => setZoomedWaveIndex(waveIndex)}
                        >
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
                        </button>
                    ))}
                </div>
            </div>
            {hasZoomedWave && (
                <div
                    className="waveforms-screen__modal"
                    onMouseDown={() => setZoomedWaveIndex(null)}
                >
                    <div
                        className="waveforms-screen__modal-card"
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <div className="waveforms-screen__modal-close">
                            <Button
                                active
                                onClick={(e) => {
                                    e?.stopPropagation()
                                    setZoomedWaveIndex(null)
                                }}
                            >
                                ×
                            </Button>
                        </div>
                        <div className="waveforms-screen__modal-title">{`Wave ${zoomedWaveIndex + 1}`}</div>
                        <div className="waveforms-screen__modal-body">
                            <div className="waveforms-screen__modal-nav waveforms-screen__modal-nav--previous">
                                <Button
                                    active
                                    disabled={!canGoPrevious}
                                    onClick={(e) => {
                                        e?.stopPropagation()
                                        if (canGoPrevious) setZoomedWaveIndex(zoomedWaveIndex - 1)
                                    }}
                                >
                                    ‹
                                </Button>
                            </div>
                            <div className="waveforms-screen__modal-graph">
                                <StaticCurve
                                    x={0}
                                    y={0}
                                    width={1}
                                    height={1}
                                    points={waveformPoints[zoomedWaveIndex]}
                                    className="waveforms-screen__graph-svg"
                                />
                            </div>
                            <div className="waveforms-screen__modal-nav waveforms-screen__modal-nav--next">
                                <Button
                                    active
                                    disabled={!canGoNext}
                                    onClick={(e) => {
                                        e?.stopPropagation()
                                        if (canGoNext) setZoomedWaveIndex(zoomedWaveIndex + 1)
                                    }}
                                >
                                    ›
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WaveformsScreen
