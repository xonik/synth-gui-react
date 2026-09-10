import { useCallback } from 'react'
import { useUiStore, useVoiceGroupStore, useWavetableStore, voiceGroupStores } from '@/store'
import { WAVETABLE_COUNT } from '@/synthcore/modules/wavetable/wavetableData'
import oscControllers from '@/synthcore/modules/osc/oscControllers'
import { button } from '@/midi/midibus'

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

    const sendButtonValue = useCallback(
        (oscIndex: 0 | 1, key: 'DAC_BITS' | 'MORPH_MODE' | 'MORPH_POINT' | 'SAMPLE_SELECT', valueIndex: number) => {
            const ctrl = oscIndex === 0 ? oscControllers.DCO1[key] : oscControllers.DCO2[key]
            button.send(voiceGroupIndex, ctrl, ctrl.values[valueIndex])
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
                <div className="oscillators-control__field">
                    <div className="oscillators-control__label">DAC</div>
                    <select className="oscillators-control__select" defaultValue={0} onChange={(e) => sendButtonValue(0, 'DAC_BITS', Number(e.target.value))}>
                        <option value={0}>16bit</option>
                        <option value={1}>12bit</option>
                    </select>
                </div>
                <div className="oscillators-control__field">
                    <div className="oscillators-control__label">Morph</div>
                    <select className="oscillators-control__select" defaultValue={0} onChange={(e) => sendButtonValue(0, 'MORPH_MODE', Number(e.target.value))}>
                        <option value={0}>Continuous</option>
                        <option value={1}>Stepped</option>
                    </select>
                </div>
                <div className="oscillators-control__field">
                    <div className="oscillators-control__label">Sample select</div>
                    <select className="oscillators-control__select" defaultValue={0} onChange={(e) => sendButtonValue(0, 'SAMPLE_SELECT', Number(e.target.value))}>
                        <option value={0}>Interpolate</option>
                        <option value={1}>Nearest</option>
                    </select>
                </div>
                <div className="oscillators-control__field">
                    <div className="oscillators-control__label">Morph point</div>
                    <select className="oscillators-control__select" defaultValue={0} onChange={(e) => sendButtonValue(0, 'MORPH_POINT', Number(e.target.value))}>
                        <option value={0}>Continuous</option>
                        <option value={1}>Phase start</option>
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
                <div className="oscillators-control__field">
                    <div className="oscillators-control__label">DAC</div>
                    <select className="oscillators-control__select" defaultValue={0} onChange={(e) => sendButtonValue(1, 'DAC_BITS', Number(e.target.value))}>
                        <option value={0}>16bit</option>
                        <option value={1}>12bit</option>
                    </select>
                </div>
                <div className="oscillators-control__field">
                    <div className="oscillators-control__label">Morph</div>
                    <select className="oscillators-control__select" defaultValue={0} onChange={(e) => sendButtonValue(1, 'MORPH_MODE', Number(e.target.value))}>
                        <option value={0}>Continuous</option>
                        <option value={1}>Stepped</option>
                    </select>
                </div>
                <div className="oscillators-control__field">
                    <div className="oscillators-control__label">Sample select</div>
                    <select className="oscillators-control__select" defaultValue={0} onChange={(e) => sendButtonValue(1, 'SAMPLE_SELECT', Number(e.target.value))}>
                        <option value={0}>Interpolate</option>
                        <option value={1}>Nearest</option>
                    </select>
                </div>
                <div className="oscillators-control__field">
                    <div className="oscillators-control__label">Morph point</div>
                    <select className="oscillators-control__select" defaultValue={0} onChange={(e) => sendButtonValue(1, 'MORPH_POINT', Number(e.target.value))}>
                        <option value={0}>Continuous</option>
                        <option value={1}>Phase start</option>
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
