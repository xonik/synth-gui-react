import { useEffect, useState } from 'react'
import { sharedConfig } from '@/sharedConfig'
import { CvOverrides } from './CvOverrides'
import { CvRange } from './CvRange'
import { MidiSettings } from './MidiSettings'
import { SettingsButtons } from './SettingsButtons'
import { SvfTuning } from './SvfTuning'
import { Trimmers } from './Trimmers'
import './Settings.scss'

const MENU_KEY = 'settings_selected_menu'

const Settings = () => {
    const [selected, setSelected] = useState('Trimmers')
    const [voice, setVoice] = useState(0)

    useEffect(() => {
        const saved = localStorage.getItem(MENU_KEY)
        if (saved) setSelected(saved)
    }, [])

    const handleSelect = (menu: string) => {
        setSelected(menu)
        localStorage.setItem(MENU_KEY, menu)
    }

    let content: JSX.Element | null
    switch (selected) {
        case 'Trimmers':
            content = <Trimmers voice={voice} />
            break
        case 'Overrides':
            content = <CvOverrides voice={voice} />
            break
        case 'Ranges':
            content = <CvRange voice={voice} />
            break
        case 'Settings':
            content = <SettingsButtons voice={voice} />
            break
        case 'Midi':
            content = <MidiSettings />
            break
        case 'Svf':
            content = <SvfTuning voice={voice} />
            break
        default:
            content = null
    }

    return (
        <div className="settings">
            <div className="settings-menu-row">
                <div className={`settings-menu-item${selected === 'Trimmers' ? ' active' : ''}`} onClick={() => handleSelect('Trimmers')}>
                    Trimmers
                </div>
                <div className={`settings-menu-item${selected === 'Overrides' ? ' active' : ''}`} onClick={() => handleSelect('Overrides')}>
                    Overrides
                </div>
                <div className={`settings-menu-item${selected === 'Ranges' ? ' active' : ''}`} onClick={() => handleSelect('Ranges')}>
                    Ranges
                </div>
                <div className={`settings-menu-item${selected === 'Settings' ? ' active' : ''}`} onClick={() => handleSelect('Settings')}>
                    Settings
                </div>
                <div className={`settings-menu-item${selected === 'Midi' ? ' active' : ''}`} onClick={() => handleSelect('Midi')}>
                    Midi
                </div>
                <div className={`settings-menu-item${selected === 'Svf' ? ' active' : ''}`} onClick={() => handleSelect('Svf')}>
                    Svf
                </div>
                <select
                    className="settings-menu-voices"
                    value={voice}
                    onChange={(e) => setVoice(Number(e.target.value))}
                >
                    {Array.from({ length: sharedConfig.VOICE_COUNT.value }, (_, i) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: Index will always be the same as it is generated right here
                        <option key={i} value={i}>
                            Voice {i + 1}
                        </option>
                    ))}
                    <option value={-1}>All voices</option>
                </select>
            </div>
            {content}
        </div>
    )
}

export default Settings
