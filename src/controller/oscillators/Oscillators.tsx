import { useEffect, useState } from 'react'
import OscControl from './OscControl'
import WavetableScreen from './WavetableScreen'
import './Oscillators.scss'

const MENU_KEY = 'osc_selected_menu'

const Oscillators = () => {
    const [selected, setSelected] = useState('Control')

    useEffect(() => {
        const saved = localStorage.getItem(MENU_KEY)
        if (saved === 'Control' || saved === 'Wavetables') {
            setSelected(saved)
        }
    }, [])

    const handleSelect = (menu: 'Control' | 'Wavetables') => {
        setSelected(menu)
        localStorage.setItem(MENU_KEY, menu)
    }

    return (
        <div className="oscillators">
            <div className="oscillators-menu-row">
                <div
                    className={`oscillators-menu-item${selected === 'Control' ? ' active' : ''}`}
                    onClick={() => handleSelect('Control')}
                >
                    Control
                </div>
                <div
                    className={`oscillators-menu-item${selected === 'Wavetables' ? ' active' : ''}`}
                    onClick={() => handleSelect('Wavetables')}
                >
                    Wavetables
                </div>
            </div>
            <div className="oscillators-content">{selected === 'Control' ? <OscControl /> : <WavetableScreen />}</div>
        </div>
    )
}

export default Oscillators
