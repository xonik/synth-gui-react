import React, { useState, useEffect } from 'react'
import SettingsButtons from './SettingsButtons'
import './Settings.scss'
import CvRange from './CvRange'
import Trimmers from "./Trimmers";
import CvOverrides from "./CvOverrides";

const MENU_KEY = 'settings_selected_menu';

const Settings = () => {
    const [selected, setSelected] = useState('Trimmers');

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
            content = <Trimmers/>;
            break;
        case 'Overrides':
            content = <CvOverrides/>;
            break;
        case 'Ranges':
            content = <CvRange/>;
            break;
        case 'Settings':
            content = <SettingsButtons/>
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
            </div>
            {content}
        </div>
    );
}

export default Settings