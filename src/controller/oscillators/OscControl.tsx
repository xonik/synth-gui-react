import { useCallback } from 'react'
import { useUiStore, useVoiceGroupStore, useWavetableStore, voiceGroupStores } from '@/store'
import { WAVETABLE_COUNT } from '@/synthcore/modules/wavetable/wavetableData'

const OscControl = () => {
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)
    const osc1Wavetable = useVoiceGroupStore(voiceGroupIndex, (s) => s.oscillators[0].wavetable)
    const osc2Wavetable = useVoiceGroupStore(voiceGroupIndex, (s) => s.oscillators[1].wavetable)
    const wavetableNames = useWavetableStore((s) => s.wavetableNames)

    const setOscWavetable = useCallback(
        (oscIndex: 0 | 1, wavetableIndex: number) => {
            voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                state.oscillators[oscIndex].wavetable = wavetableIndex
            })
        },
        [voiceGroupIndex]
    )

    return (
        <div className="oscillators-control">
            <div className="oscillators-control__column">
                <div className="oscillators-control__title">Osc 1</div>
                <div className="oscillators-control__field">
                    <div className="oscillators-control__label">Wavetable</div>
                    <select
                        className="oscillators-control__select"
                        value={osc1Wavetable}
                        onChange={(e) => setOscWavetable(0, Number(e.target.value))}
                    >
                        {Array.from({ length: WAVETABLE_COUNT }, (_, wavetableIndex) => wavetableIndex).map(
                            (wavetableIndex) => (
                                <option key={wavetableIndex} value={wavetableIndex}>
                                    {`${wavetableIndex + 1}: ${wavetableNames[wavetableIndex]}`}
                                </option>
                            )
                        )}
                    </select>
                </div>
            </div>

            <div className="oscillators-control__column">
                <div className="oscillators-control__title">Osc 2</div>
                <div className="oscillators-control__field">
                    <div className="oscillators-control__label">Wavetable</div>
                    <select
                        className="oscillators-control__select"
                        value={osc2Wavetable}
                        onChange={(e) => setOscWavetable(1, Number(e.target.value))}
                    >
                        {Array.from({ length: WAVETABLE_COUNT }, (_, wavetableIndex) => wavetableIndex).map(
                            (wavetableIndex) => (
                                <option key={wavetableIndex} value={wavetableIndex}>
                                    {`${wavetableIndex + 1}: ${wavetableNames[wavetableIndex]}`}
                                </option>
                            )
                        )}
                    </select>
                </div>
            </div>

            <div className="oscillators-control__column">
                <div className="oscillators-control__title">Osc 3</div>
            </div>
        </div>
    )
}

export default OscControl
