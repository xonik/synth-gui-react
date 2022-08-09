import React from 'react'
import Button from '../Button'
import { useAppDispatch } from '../../synthcore/hooks'
import { click } from '../../synthcore/modules/ui/uiReducer'
import { ApiSource, ControllerGroupIds } from '../../synthcore/types'
import settingsControllers from '../../synthcore/modules/settings/settingsControllers'
import './SettingsButtons.scss'

const ctrlGroup = ControllerGroupIds.SETTINGS

const SettingsButtons = () => {

    const action = {
        ctrlGroup: ctrlGroup,
        source: ApiSource.GUI,
    }

    const dispatch = useAppDispatch()

    const clickCalibrateDco1 = click({ ...action, ctrl: settingsControllers.CALIBRATE_DCO1 })
    const clickCalibrateDco2 = click({ ...action, ctrl: settingsControllers.CALIBRATE_DCO2 })

    return <div className="settings-buttons">
        <div className="settings__heading">Settings</div>
        <Button active onClick={() => dispatch(clickCalibrateDco1)}>Calibrate DCO 1</Button>
        <Button active onClick={() => dispatch(clickCalibrateDco2)}>Calibrate DCO 2</Button>
    </div>
}

export default SettingsButtons