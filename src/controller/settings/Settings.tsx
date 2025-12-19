import React, { useState, useEffect } from 'react'
import { SettingsButtons } from './SettingsButtons'
import { CvRange } from './CvRange'
import { Trimmers } from "./Trimmers";
import { CvOverrides } from "./CvOverrides";
import './Settings.scss'
import { sharedConfig } from "../../sharedConfig";

const MENU_KEY = 'settings_selected_menu';

const Settings = () => {
    const [selected, setSelected] = useState('Trimmers');
    const [voice, setVoice] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem(MENU_KEY);
        if (saved) setSelected(saved);
    }, []);

    const handleSelect = (menu: string) => {
        setSelected(menu);
        localStorage.setItem(MENU_KEY, menu);
    };

    let content;
    switch (selected) {
        case 'Trimmers':
            content = <Trimmers voice={voice} />;
            break;
        case 'Overrides':
            content = <CvOverrides voice={voice} />;
            break;
        case 'Ranges':
            content = <CvRange voice={voice} />;
            break;
        case 'Settings':
            content = <SettingsButtons voice={voice} />;
            break;
        default:
            content = null;
    }

    return (
        <div className="settings">
            <div className="settings-menu-row">
                <div className="settings-menu-item" onClick={() => handleSelect('Trimmers')}>Trimmers</div>
                <div className="settings-menu-item" onClick={() => handleSelect('Overrides')}>Overrides</div>
                <div className="settings-menu-item" onClick={() => handleSelect('Ranges')}>Ranges</div>
                <div className="settings-menu-item" onClick={() => handleSelect('Settings')}>Settings</div>
                <select
                    className="settings-menu-voices"
                    value={voice}
                    onChange={e => setVoice(Number(e.target.value))}
                >
                    {Array.from({ length: sharedConfig.VOICE_COUNT.value }, (_, i) => (
                        <option key={i} value={i}>Voice {i + 1}</option>
                    ))}
                    <option value={-1}>All voices</option>
                </select>
            </div>
            {content}
        </div>
    );
}

export default Settings
