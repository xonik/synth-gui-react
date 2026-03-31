import { useCallback, useState } from 'react'
import {
    calibrateDCO1,
    calibrateDCO2,
    manualTuneVcoStart,
    manualTuneVcoStop,
    measureVcoAll,
    measureVcoOctaves,
    toggleVoicePower,
    tuneVco,
} from '../../midi/rpc/api'
import { useVoiceGroupStore, voiceGroupStores } from '../../store/patchStore'
import { useUiStore } from '../../store/uiStore'
import Button from '../components/Button'
import './SettingsButtons.scss'
import { sharedConfig } from '../../sharedConfig'

type Props = { voice: number }

export const SettingsButtons = ({ voice }: Props) => {
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)
    const dco1Range = useVoiceGroupStore(voiceGroupIndex, (s) => s.oscillators[0].range)
    const dco2Range = useVoiceGroupStore(voiceGroupIndex, (s) => s.oscillators[1].range)

    const [manualTuneActive, setManualTuneActive] = useState<boolean[]>(
        Array(sharedConfig.VOICE_COUNT.value).fill(false)
    )

    const [voicePower, setVoicePower] = useState<boolean[]>([false, false, false])

    const handleManualTuneToggle = () => {
        setManualTuneActive((prev) => {
            const updated = [...prev]
            if (updated[voice]) {
                manualTuneVcoStop(voice)
            } else {
                manualTuneVcoStart(voice)
            }
            updated[voice] = !updated[voice]
            return updated
        })
    }

    const handlePowerToggle = (voiceId: number) => {
        setVoicePower((prev) => {
            const updated = [...prev]
            updated[voiceId] = !updated[voiceId]
            toggleVoicePower(voiceId, updated[voiceId])
            return updated
        })
    }

    const toggleDco1Range = useCallback(() => {
        const store = voiceGroupStores[voiceGroupIndex].getState()
        const current = store.oscillators[0].range
        store.set((state) => {
            state.oscillators[0].range = current ? 0 : 1
        })
    }, [voiceGroupIndex])

    const toggleDco2Range = useCallback(() => {
        const store = voiceGroupStores[voiceGroupIndex].getState()
        const current = store.oscillators[1].range
        store.set((state) => {
            state.oscillators[1].range = current ? 0 : 1
        })
    }, [voiceGroupIndex])

    return (
        <div className="settings-buttons">
            <div className="settings-buttons__columns">
                <div className="settings-buttons__column">
                    <div className="settings-buttons__column-heading">DCO</div>
                    <Button active onClick={() => calibrateDCO1(voice)}>
                        Calibrate DCO 1
                    </Button>
                    <Button active onClick={() => calibrateDCO2(voice)}>
                        Calibrate DCO 2
                    </Button>
                    <Button active={dco1Range === 1} onClick={toggleDco1Range}>
                        DCO 1 Range Hi
                    </Button>
                    <Button active={dco2Range === 1} onClick={toggleDco2Range}>
                        DCO 2 Range Hi
                    </Button>
                </div>
                <div className="settings-buttons__column">
                    <div className="settings-buttons__column-heading">VCO</div>
                    <Button active onClick={() => tuneVco(voice)}>
                        Tune
                    </Button>
                    <Button active onClick={() => measureVcoOctaves(voice)}>
                        Measure octaves
                    </Button>
                    <Button active onClick={() => measureVcoAll(voice)}>
                        Measure all
                    </Button>
                    <Button active={manualTuneActive[voice]} onClick={handleManualTuneToggle}>
                        {manualTuneActive[voice] ? 'Manual tune stop' : 'Manual tune start'}
                    </Button>
                </div>
                <div className="settings-buttons__column">
                    <div className="settings-buttons__column-heading">Voice power</div>
                    {[0, 1, 2].map((voiceId) => (
                        <Button key={voiceId} active={voicePower[voiceId]} onClick={() => handlePowerToggle(voiceId)}>
                            {`${voiceId + 1} ${voicePower[voiceId] ? 'on' : 'off'}`}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}
