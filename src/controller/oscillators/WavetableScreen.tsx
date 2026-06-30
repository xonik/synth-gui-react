import { useWavetableStore } from '@/store'
import { bankNames, MAX_POSITION, WAVETABLE_COUNT, waveNames } from '@/synthcore/modules/wavetable/wavetableData'
import './WavetableScreen.scss'

const positionOptions = Array.from({ length: MAX_POSITION + 1 }, (_, i) => i)

const WavetableScreen = () => {
    const {
        selectedWavetable,
        selectedBank,
        selectedWave,
        selectedPosition,
        wavetableNames,
        wavetables,
        setSelectedWavetable,
        setSelectedBank,
        setSelectedWave,
        setSelectedPosition,
        setWavetableName,
        addWave,
        removeWave,
        moveWave,
        setWavePosition,
        loadWavetable,
    } = useWavetableStore()

    const currentWaves = waveNames[selectedBank]
    const currentTableEntries = wavetables[selectedWavetable]
    const occupiedPositions = new Set(currentTableEntries.map((entry) => entry.position))
    const canAdd = positionOptions.some((pos) => pos >= selectedPosition && !occupiedPositions.has(pos))

    return (
        <div className="wavetable-screen">
            {/* Top header: wavetable selector */}
            <div className="wavetable-screen__header">
                <span className="wavetable-screen__header-label">Wavetable</span>
                <select
                    className="wt-select wt-select--header"
                    value={selectedWavetable}
                    onChange={(e) => setSelectedWavetable(Number(e.target.value))}
                >
                    {Array.from({ length: WAVETABLE_COUNT }, (_, wavetableIndex) => wavetableIndex).map(
                        (wavetableIndex) => (
                            <option key={wavetableIndex} value={wavetableIndex}>
                                {`${wavetableIndex + 1}: ${wavetableNames[wavetableIndex]}`}
                            </option>
                        )
                    )}
                </select>
                <input
                    type="text"
                    className="wt-input wt-input--header"
                    value={wavetableNames[selectedWavetable]}
                    onChange={(e) => setWavetableName(selectedWavetable, e.target.value)}
                />
                <button type="button" className="wt-btn wt-btn--load" onClick={() => loadWavetable(selectedWavetable)}>
                    Load whole
                </button>
            </div>

            <div className="wavetable-screen__body">
                {/* Left panel: assign waves */}
                <div className="wavetable-screen__assign">
                    <div className="wavetable-screen__assign-heading">Assign Wave</div>

                    <div className="wavetable-screen__field">
                        <span className="wavetable-screen__field-label">Bank</span>
                        <select
                            className="wt-select"
                            value={selectedBank}
                            onChange={(e) => setSelectedBank(Number(e.target.value))}
                        >
                            {Array.from(bankNames.entries()).map(([bankIndex, name]) => (
                                <option key={bankIndex} value={bankIndex}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="wavetable-screen__field">
                        <span className="wavetable-screen__field-label">Waveform</span>
                        <select
                            className="wt-select"
                            value={selectedWave}
                            onChange={(e) => setSelectedWave(Number(e.target.value))}
                        >
                            {Array.from(currentWaves.entries()).map(([waveIndex, name]) => (
                                <option key={waveIndex} value={waveIndex}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="wavetable-screen__field">
                        <span className="wavetable-screen__field-label">Position</span>
                        <select
                            className="wt-select"
                            value={selectedPosition}
                            onChange={(e) => setSelectedPosition(Number(e.target.value))}
                        >
                            {positionOptions.map((pos) => (
                                <option key={pos} value={pos}>
                                    {pos + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="button" className="wt-btn wt-btn--add" onClick={addWave} disabled={!canAdd}>
                        Add
                    </button>
                </div>

                {/* Right panel: wave list */}
                <div className="wavetable-screen__wave-list">
                    <div className="wavetable-screen__wave-list-heading">
                        Waves in Wavetable {selectedWavetable + 1}
                    </div>
                    <div className="wavetable-screen__wave-list-scroll">
                        {currentTableEntries.length === 0 ? (
                            <div className="wavetable-screen__wave-list-empty">No waves assigned</div>
                        ) : (
                            currentTableEntries.map((entry, i) => (
                                <div
                                    key={`${entry.bankIndex}-${entry.waveIndex}-${entry.position}`}
                                    className="wavetable-screen__wave-entry"
                                >
                                    <span className="wavetable-screen__wave-entry-bank">
                                        {bankNames[entry.bankIndex]}
                                    </span>
                                    <span className="wavetable-screen__wave-entry-name">
                                        {waveNames[entry.bankIndex][entry.waveIndex]}
                                    </span>
                                    <div className="wavetable-screen__wave-entry-actions">
                                        <select
                                            className="wt-position-select"
                                            value={entry.position}
                                            onChange={(e) => setWavePosition(i, Number(e.target.value))}
                                        >
                                            {positionOptions.map((pos) => (
                                                <option key={pos} value={pos}>
                                                    {pos + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            type="button"
                                            className="wt-btn"
                                            onClick={() => moveWave(i, 'up')}
                                            disabled={i === 0}
                                        >
                                            ↑
                                        </button>
                                        <button
                                            type="button"
                                            className="wt-btn"
                                            onClick={() => moveWave(i, 'down')}
                                            disabled={i === currentTableEntries.length - 1}
                                        >
                                            ↓
                                        </button>
                                        <button
                                            type="button"
                                            className="wt-btn wt-btn--danger"
                                            onClick={() => removeWave(i)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WavetableScreen
