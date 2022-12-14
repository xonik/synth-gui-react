import React from 'react'
import Button from '../Button'
import { useAppDispatch, useAppSelector } from '../../synthcore/hooks'
import { click } from '../../synthcore/modules/ui/uiReducer'
import { ApiSource, ControllerGroupIds } from '../../synthcore/types'
import settingsControllers from '../../synthcore/modules/settings/settingsControllers'
import { selectController } from '../../synthcore/modules/controllers/controllersReducer'
import oscControllers from '../../synthcore/modules/osc/oscControllers'
import './SettingsButtons.scss'

const settingsAction = {
    ctrlGroup: ControllerGroupIds.SETTINGS,
    source: ApiSource.GUI,
}

const oscAction = {
    ctrlGroup: ControllerGroupIds.OSC,
    source: ApiSource.GUI,
    loop: true,
}

const SettingsButtons = () => {

    const dispatch = useAppDispatch()

    const clickCalibrateDco1 = click({ ...settingsAction, ctrl: settingsControllers.CALIBRATE_DCO1 })
    const clickCalibrateDco2 = click({ ...settingsAction, ctrl: settingsControllers.CALIBRATE_DCO2 })

    const dco1RangeHigh = useAppSelector(selectController(oscControllers.DCO1.RANGE))
    const dco2RangeHigh = useAppSelector(selectController(oscControllers.DCO2.RANGE))

    const clickDco1Range = click({ ...oscAction, ctrl: oscControllers.DCO1.RANGE })
    const clickDco2Range = click({ ...oscAction, ctrl: oscControllers.DCO2.RANGE })

    return <div className="settings-buttons">
        <div className="settings__heading">Settings</div>
        <Button active onClick={() => dispatch(clickCalibrateDco1)}>Calibrate DCO 1</Button>
        <Button active onClick={() => dispatch(clickCalibrateDco2)}>Calibrate DCO 2</Button>
        <Button active={dco1RangeHigh === 1} onClick={() => dispatch(clickDco1Range)}>DCO 1 Range Hi</Button>
        <Button active={dco2RangeHigh === 1} onClick={() => dispatch(clickDco2Range)}>DCO 2 Range Hi</Button>
    </div>
}

export default SettingsButtons