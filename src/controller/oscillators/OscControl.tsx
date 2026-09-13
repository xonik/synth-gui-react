import { useCallback, useMemo, useState } from 'react'
import { useUiStore, useVoiceGroupStore, useWavetableStore, voiceGroupStores } from '@/store'
import { PROPHET_VS_WAVETABLES, wavetableBankNames } from '@/synthcore/modules/wavetable/wavetableData'
import oscControllers from '@/synthcore/modules/osc/oscControllers'
import { buildPpgWavetables } from '@/synthcore/modules/wavetable/ppgWavetables'
import { button } from '@/midi/midibus'
import { setOscWavetable as sendOscWavetable } from '@/store/midi/oscMidi'

const ppgWavetableNames = buildPpgWavetables(0, 0).map((table) => table.name)
const USER_BANK_INDEX = wavetableBankNames.indexOf('User')
const EMPTY_WAVETABLE_SELECTION = -1

const OscControl = () => {
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)
    const osc1Wavetable = useVoiceGroupStore(voiceGroupIndex, (s) => s.oscillators[0].wavetable)
    const osc2Wavetable = useVoiceGroupStore(voiceGroupIndex, (s) => s.oscillators[1].wavetable)
    const wavetableNames = useWavetableStore((s) => s.wavetableNames)
    const [osc1SelectedBank, setOsc1SelectedBank] = useState(USER_BANK_INDEX)
    const [osc2SelectedBank, setOsc2SelectedBank] = useState(USER_BANK_INDEX)
    const [osc1LoadedBank, setOsc1LoadedBank] = useState(USER_BANK_INDEX)
    const [osc2LoadedBank, setOsc2LoadedBank] = useState(USER_BANK_INDEX)

    const wavetableNamesByBank = useMemo(
        () => [ppgWavetableNames, PROPHET_VS_WAVETABLES, wavetableNames],
        [wavetableNames]
    )

    const setOscWavetable = useCallback(
        (oscIndex: 0 | 1, bankIndex: number, wavetableIndex: number) => {
            if (wavetableIndex < 0) return
            voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                state.oscillators[oscIndex].wavetable = wavetableIndex
            })
            sendOscWavetable(voiceGroupIndex, oscIndex, wavetableIndex, bankIndex)
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

    const osc1CurrentNames = wavetableNamesByBank[osc1SelectedBank] ?? []
    const osc2CurrentNames = wavetableNamesByBank[osc2SelectedBank] ?? []
    const osc1SelectedTable = osc1SelectedBank === osc1LoadedBank ? osc1Wavetable : EMPTY_WAVETABLE_SELECTION
    const osc2SelectedTable = osc2SelectedBank === osc2LoadedBank ? osc2Wavetable : EMPTY_WAVETABLE_SELECTION

    return (
        <div className="oscillators-control">
            <div className="oscillators-control__column">
                <div className="oscillators-control__title">Osc 1</div>
                <div className="oscillators-control__field">
                    <div className="oscillators-control__label">Wavetable</div>
                    <div className="oscillators-control__row">
                        <select
                            className="oscillators-control__select oscillators-control__select--bank"
                            value={osc1SelectedBank}
                            onChange={(e) => setOsc1SelectedBank(Number(e.target.value))}
                        >
                            {wavetableBankNames.map((name, bankIndex) => (
                                <option key={name} value={bankIndex}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <select
                            className="oscillators-control__select oscillators-control__select--table"
                            value={osc1SelectedTable}
                            onChange={(e) => {
                                const wavetableIndex = Number(e.target.value)
                                setOsc1LoadedBank(osc1SelectedBank)
                                setOscWavetable(0, osc1SelectedBank, wavetableIndex)
                            }}
                        >
                            <option value={EMPTY_WAVETABLE_SELECTION}>---</option>
                            {osc1CurrentNames.map((wavetableName, wavetableIndex) => (
                                <option key={wavetableIndex} value={wavetableIndex}>
                                    {`${wavetableIndex + 1}: ${wavetableName}`}
                                </option>
                            ))}
                        </select>
                    </div>
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
                    <div className="oscillators-control__row">
                        <select
                            className="oscillators-control__select oscillators-control__select--bank"
                            value={osc2SelectedBank}
                            onChange={(e) => setOsc2SelectedBank(Number(e.target.value))}
                        >
                            {wavetableBankNames.map((name, bankIndex) => (
                                <option key={name} value={bankIndex}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <select
                            className="oscillators-control__select oscillators-control__select--table"
                            value={osc2SelectedTable}
                            onChange={(e) => {
                                const wavetableIndex = Number(e.target.value)
                                setOsc2LoadedBank(osc2SelectedBank)
                                setOscWavetable(1, osc2SelectedBank, wavetableIndex)
                            }}
                        >
                            <option value={EMPTY_WAVETABLE_SELECTION}>---</option>
                            {osc2CurrentNames.map((wavetableName, wavetableIndex) => (
                                <option key={wavetableIndex} value={wavetableIndex}>
                                    {`${wavetableIndex + 1}: ${wavetableName}`}
                                </option>
                            ))}
                        </select>
                    </div>
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
