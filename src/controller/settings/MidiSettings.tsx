import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import {
    applyMidiSelection,
    getActiveMidiIds,
    getAvailableMidiInterfaces,
    MIDI_SELECTED_KEY,
    subscribeMidiInputActivity,
} from '../../midi/midibus'
import { getSynthConnectionStatus, subscribeSynthConnectionStatus } from '../../midi/synthConnection'
import { getMidiLogging, setMidiLogging } from '../../utils/logger'
import './MidiSettings.scss'

type MidiSelectedIds = {
    inputId: string | null
    input2Id: string | null
    outputId: string | null
}

const loadFromLocalStorage = (): MidiSelectedIds => {
    try {
        const saved = localStorage.getItem(MIDI_SELECTED_KEY)
        if (saved) return JSON.parse(saved)
    } catch {}
    return { inputId: null, input2Id: null, outputId: null }
}

export const MidiSettings = () => {
    const [inputs, setInputs] = useState<MIDIInput[]>([])
    const [outputs, setOutputs] = useState<MIDIOutput[]>([])
    const [selectedInput, setSelectedInput] = useState<string>('')
    const [selectedInput2, setSelectedInput2] = useState<string>('')
    const [selectedOutput, setSelectedOutput] = useState<string>('')
    const [initialInput, setInitialInput] = useState<string>('')
    const [initialInput2, setInitialInput2] = useState<string>('')
    const [initialOutput, setInitialOutput] = useState<string>('')
    const [saveConfirmed, setSaveConfirmed] = useState(false)
    const [midiLogging, setMidiLoggingState] = useState(getMidiLogging)
    const synthStatus = useSyncExternalStore(subscribeSynthConnectionStatus, getSynthConnectionStatus)
    const [activeNoteInputs, setActiveNoteInputs] = useState<[boolean, boolean]>([false, false])
    const noteActivityTimers = useRef<[ReturnType<typeof setTimeout> | undefined, ReturnType<typeof setTimeout> | undefined]>([
        undefined,
        undefined,
    ])

    useEffect(() => {
        const active = getActiveMidiIds()
        const inputId = active.inputId ?? ''
        const input2Id = active.input2Id ?? ''
        const outputId = active.outputId ?? ''
        setSelectedInput(inputId)
        setSelectedInput2(input2Id)
        setSelectedOutput(outputId)
        setInitialInput(inputId)
        setInitialInput2(input2Id)
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

    useEffect(() => {
        const unsubscribe = subscribeMidiInputActivity((slot) => {
            const index = slot - 1
            if (noteActivityTimers.current[index]) clearTimeout(noteActivityTimers.current[index])
            setActiveNoteInputs((current) => {
                const next: [boolean, boolean] = [...current]
                next[index] = true
                return next
            })
            noteActivityTimers.current[index] = setTimeout(() => {
                setActiveNoteInputs((current) => {
                    const next: [boolean, boolean] = [...current]
                    next[index] = false
                    return next
                })
                noteActivityTimers.current[index] = undefined
            }, 150)
        })

        return () => {
            unsubscribe()
            noteActivityTimers.current.forEach((timer) => {
                if (timer) clearTimeout(timer)
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

    const handleInput2Change = (id: string) => {
        setSelectedInput2(id)
        const name = inputs.find((i) => i.id === id)?.name ?? 'none'
        console.log('MIDI In 2 selected:', name, id || '(none)')
    }

    const handleMidiLoggingChange = (enabled: boolean) => {
        setMidiLogging(enabled)
        setMidiLoggingState(enabled)
    }

    const hasChanged =
        selectedInput !== initialInput || selectedInput2 !== initialInput2 || selectedOutput !== initialOutput
    const hasSelection = selectedInput !== '' || selectedInput2 !== '' || selectedOutput !== ''
    const canSave = hasChanged && hasSelection

    const handleSave = () => {
        if (!canSave) return
        const existing = loadFromLocalStorage()
        const updated: MidiSelectedIds = {
            ...existing,
            inputId: selectedInput || null,
            input2Id: selectedInput2 || null,
            outputId: selectedOutput || null,
        }
        localStorage.setItem(MIDI_SELECTED_KEY, JSON.stringify(updated))
        applyMidiSelection(updated.inputId, updated.input2Id, updated.outputId)
        setInitialInput(selectedInput)
        setInitialInput2(selectedInput2)
        setInitialOutput(selectedOutput)
        setSaveConfirmed(true)
        setTimeout(() => setSaveConfirmed(false), 2000)
    }

    return (
        <div className="midi-settings">
            <div className="midi-settings__section">
                <div className="midi-settings__label">MIDI In 1</div>
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
                <span
                    className={`midi-settings__led${activeNoteInputs[0] ? ' is-active' : ''}`}
                    role="img"
                    aria-label={`MIDI In 1 note activity: ${activeNoteInputs[0] ? 'active' : 'inactive'}`}
                />
            </div>
            <div className="midi-settings__section">
                <div className="midi-settings__label">MIDI In 2</div>
                <select
                    className="midi-settings__select"
                    value={selectedInput2}
                    onChange={(e) => handleInput2Change(e.target.value)}
                >
                    <option value="">— None —</option>
                    {inputs.map((input) => (
                        <option key={input.id} value={input.id}>
                            {input.name}
                        </option>
                    ))}
                </select>
                <span
                    className={`midi-settings__led${activeNoteInputs[1] ? ' is-active' : ''}`}
                    role="img"
                    aria-label={`MIDI In 2 note activity: ${activeNoteInputs[1] ? 'active' : 'inactive'}`}
                />
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
            <div className="midi-settings__section" role="status" aria-live="polite">
                <div className="midi-settings__label">Synth</div>
                <span className={`midi-settings__connection${synthStatus.connected ? ' is-connected' : ''}`}>
                    {synthStatus.connected ? 'Connected' : 'Disconnected'}
                    {synthStatus.synthId !== null && ` — ID ${synthStatus.synthId}`}
                </span>
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
