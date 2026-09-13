import { useWavetableStore } from '@/store'
import {
    bankNames,
    MAX_POSITION,
    PROPHET_VS_WAVETABLES,
    waveBanks,
    wavetableBankNames,
} from '@/synthcore/modules/wavetable/wavetableData'
import { buildPpgWavetables } from '@/synthcore/modules/wavetable/ppgWavetables'
import './WavetableScreen.scss'

const positionOptions = Array.from({ length: MAX_POSITION + 1 }, (_, i) => i)

const ppgWavetableNames = buildPpgWavetables(0, 0).map((table) => table.name)
const WavetableScreen = () => {
    const {
        selectedWavetableBank,
        selectedWavetable,
        selectedBank,
        selectedWave,
        selectedPosition,
        wavetableNames,
        wavetablesByBank,
        setSelectedWavetableBank,
        setSelectedWavetable,
        setSelectedBank,
        setSelectedWave,
        setSelectedPosition,
        setWavetableName,
        addWave,
        removeWave,
        moveWave,
        setWavePosition,
        updateWavetable,
    } = useWavetableStore()

    const isUserBank = selectedWavetableBank === wavetableBankNames.indexOf('User')
    const currentWavetables = isUserBank
        ? wavetableNames
        : selectedWavetableBank === 0
            ? ppgWavetableNames
            : PROPHET_VS_WAVETABLES
    const currentWaves = waveBanks[selectedBank]?.waves ?? []
    const currentBankTables = wavetablesByBank[selectedWavetableBank] ?? []
    const currentTableEntries = selectedWavetable >= 0 ? currentBankTables[selectedWavetable] ?? [] : []
    const currentWavetableName = selectedWavetable >= 0 ? (isUserBank ? wavetableNames[selectedWavetable] : currentWavetables[selectedWavetable]) ?? '' : ''
    const occupiedPositions = new Set(currentTableEntries.map((entry) => entry.position))
    const canAdd = positionOptions.some((pos) => pos >= selectedPosition && !occupiedPositions.has(pos))

    return (
        <div className="wavetable-screen">
            {/* Top header: wavetable selector */}
            <div className="wavetable-screen__header">
                <span className="wavetable-screen__header-label">Table</span>
                <select
                    className="wt-select wt-select--header wt-select--header-table-bank"
                    value={selectedWavetableBank}
                    onChange={(e) => setSelectedWavetableBank(Number(e.target.value))}
                >
                    {wavetableBankNames.map((name, bankIndex) => (
                        <option key={name} value={bankIndex}>
                            {name}
                        </option>
                    ))}
                </select>
                <select
                    className="wt-select wt-select--header wt-select--header-wavetable"
                    value={selectedWavetable}
                    onChange={(e) => setSelectedWavetable(Number(e.target.value))}
                    disabled={currentWavetables.length === 0}
                >
                    {currentWavetables.map((wavetableName, wavetableIndex) => (
                        <option key={`${selectedWavetableBank}-${wavetableIndex}`} value={wavetableIndex}>
                            {`${wavetableIndex + 1}: ${wavetableName}`}
                        </option>
                    ))}
                </select>
                {isUserBank ? (
                    <input
                        type="text"
                        className="wt-input wt-input--header wt-input--header-wavetable"
                        value={selectedWavetable >= 0 ? wavetableNames[selectedWavetable] : ''}
                        onFocus={(e) => {
                            requestAnimationFrame(() => e.target.select())
                        }}
                        onChange={(e) => setWavetableName(selectedWavetable, e.target.value)}
                        disabled={selectedWavetable < 0}
                        placeholder="Table name"
                    />
                ) : null}
                <button
                    type="button"
                    className="wt-btn wt-btn--load"
                    onClick={() => updateWavetable(selectedWavetable)}
                    disabled={selectedWavetable < 0}
                >
                    Load whole
                </button>
            </div>

            <div className="wavetable-screen__body">
                {/* Left panel: assign waves */}
                {isUserBank && (
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
                                {currentWaves.map((wave, waveIndex) => (
                                    <option key={waveIndex} value={waveIndex}>
                                        {wave.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="wavetable-screen__field">
                            <span className="wavetable-screen__field-label">At position</span>
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
                            Assign
                        </button>
                    </div>
                )}

                {/* Right panel: wave list */}
                <div className="wavetable-screen__wave-list">
                    <div className="wavetable-screen__wave-list-heading">{currentWavetableName}</div>
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
                                        {`${bankNames[entry.bankIndex]}, Wave ${entry.waveIndex + 1}`}
                                    </span>
                                    <span className="wavetable-screen__wave-entry-name">
                                        {waveBanks[entry.bankIndex]?.waves[entry.waveIndex]?.name ?? ''}
                                    </span>
                                    <div className="wavetable-screen__wave-entry-actions">
                                       {isUserBank ? (
                                           <>
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
                                           </>
                                       ) : (
                                           <span className="wt-position-select">{entry.position + 1}</span>
                                       )}
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
