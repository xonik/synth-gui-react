import { useEffect, useState } from 'react'
import { applyMidiSelection, getActiveMidiIds, getAvailableMidiInterfaces, MIDI_SELECTED_KEY } from '../../midi/midibus'
import { getMidiLogging, setMidiLogging } from '../../utils/logger'
import './MidiSettings.scss'

type MidiSelectedIds = {
    inputId: string | null
    outputId: string | null
}

const loadFromLocalStorage = (): MidiSelectedIds => {
    try {
        const saved = localStorage.getItem(MIDI_SELECTED_KEY)
        if (saved) return JSON.parse(saved)
    } catch {}
    return { inputId: null, outputId: null }
}

export const MidiSettings = () => {
    const [inputs, setInputs] = useState<MIDIInput[]>([])
    const [outputs, setOutputs] = useState<MIDIOutput[]>([])
    const [selectedInput, setSelectedInput] = useState<string>('')
    const [selectedOutput, setSelectedOutput] = useState<string>('')
    const [initialInput, setInitialInput] = useState<string>('')
    const [initialOutput, setInitialOutput] = useState<string>('')
    const [saveConfirmed, setSaveConfirmed] = useState(false)
    const [midiLogging, setMidiLoggingState] = useState(getMidiLogging)

    useEffect(() => {
        const active = getActiveMidiIds()
        const inputId = active.inputId ?? ''
        const outputId = active.outputId ?? ''
        setSelectedInput(inputId)
        setSelectedOutput(outputId)
        setInitialInput(inputId)
        setInitialOutput(outputId)

        const { inputs: availableInputs, outputs: availableOutputs } = getAvailableMidiInterfaces()
        if (availableInputs.length > 0 || availableOutputs.length > 0) {
            setInputs(availableInputs)
            setOutputs(availableOutputs)
        } else if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess({ sysex: true }).then((midiAccess) => {
                setInputs(Array.from(midiAccess.inputs.values()))
                setOutputs(Array.from(midiAccess.outputs.values()))
            })
        }
    }, [])

    const handleInputChange = (id: string) => {
        setSelectedInput(id)
        const name = inputs.find((i) => i.id === id)?.name ?? 'none'
        console.log('MIDI In selected:', name, id || '(none)')
    }

    const handleOutputChange = (id: string) => {
        setSelectedOutput(id)
        const name = outputs.find((o) => o.id === id)?.name ?? 'none'
        console.log('MIDI Out selected:', name, id || '(none)')
    }

    const handleMidiLoggingChange = (enabled: boolean) => {
        setMidiLogging(enabled)
        setMidiLoggingState(enabled)
    }

    const hasChanged = selectedInput !== initialInput || selectedOutput !== initialOutput
    const hasSelection = selectedInput !== '' || selectedOutput !== ''
    const canSave = hasChanged && hasSelection

    const handleSave = () => {
        if (!canSave) return
        const existing = loadFromLocalStorage()
        const updated: MidiSelectedIds = {
            ...existing,
            inputId: selectedInput || null,
            outputId: selectedOutput || null,
        }
        localStorage.setItem(MIDI_SELECTED_KEY, JSON.stringify(updated))
        applyMidiSelection(updated.inputId, updated.outputId)
        setInitialInput(selectedInput)
        setInitialOutput(selectedOutput)
        setSaveConfirmed(true)
        setTimeout(() => setSaveConfirmed(false), 2000)
    }

    return (
        <div className="midi-settings">
            <div className="midi-settings__section">
                <div className="midi-settings__label">MIDI In</div>
                <select
                    className="midi-settings__select"
                    value={selectedInput}
                    onChange={(e) => handleInputChange(e.target.value)}
                >
                    <option value="">— None —</option>
                    {inputs.map((input) => (
                        <option key={input.id} value={input.id}>
                            {input.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="midi-settings__section">
                <div className="midi-settings__label">MIDI Out</div>
                <select
                    className="midi-settings__select"
                    value={selectedOutput}
                    onChange={(e) => handleOutputChange(e.target.value)}
                >
                    <option value="">— None —</option>
                    {outputs.map((output) => (
                        <option key={output.id} value={output.id}>
                            {output.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="button" className="midi-settings__save" onClick={handleSave} disabled={!canSave}>
                {saveConfirmed ? 'Saved!' : 'Save'}
            </button>
            <label className="midi-settings__toggle">
                <input
                    type="checkbox"
                    checked={midiLogging}
                    onChange={(e) => handleMidiLoggingChange(e.target.checked)}
                />
                {' '}Log MIDI traffic
            </label>
        </div>
    )
}
