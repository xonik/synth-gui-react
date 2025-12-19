import React from 'react'
import Button from '../Button'
import { useAppDispatch, useAppSelector } from '../../synthcore/hooks'
import { click } from '../../synthcore/modules/ui/uiReducer'
import { ApiSource, ControllerGroupIds } from '../../synthcore/types'
import { selectController } from '../../synthcore/modules/controllers/controllersReducer'
import oscControllers from '../../synthcore/modules/osc/oscControllers'
import {
    calibrateDCO1,
    calibrateDCO2,
    manualTuneVcoStart,
    manualTuneVcoStop,
    measureVcoAll,
    measureVcoOctaves,
    tuneVco
} from "../../midi/rpc/api";
import './SettingsButtons.scss'

const oscAction = {
    ctrlGroup: ControllerGroupIds.OSC,
    source: ApiSource.GUI,
    loop: true,
}

export const SettingsButtons = ({ voice }: Props) => {

    const dispatch = useAppDispatch()

    const dco1RangeHigh = useAppSelector(selectController(oscControllers.DCO1.RANGE))
    const dco2RangeHigh = useAppSelector(selectController(oscControllers.DCO2.RANGE))

    const clickDco1Range = click({ ...oscAction, ctrl: oscControllers.DCO1.RANGE })
    const clickDco2Range = click({ ...oscAction, ctrl: oscControllers.DCO2.RANGE })

    return <div className="settings-buttons">
        <div className="settings-buttons">
            <div className="settings__heading">Settings</div>
            <div className="settings-buttons__columns">
                <div className="settings-buttons__column">
                    <Button active onClick={() => calibrateDCO1(voice)}>Calibrate() DCO 1</Button>
                    <Button active onClick={() => calibrateDCO2(voice)}>Calibrate DCO 2</Button>
                    <Button active onClick={() => tuneVco(voice)}>Tune VCO</Button>
                </div>
                <div className="settings-buttons__column">
                    <Button active onClick={() => measureVcoOctaves(voice)}>Measure VCO octaves</Button>
                    <Button active onClick={() => measureVcoAll(voice)}>Measure VCO all</Button>
                </div>
                <div className="settings-buttons__column">
                    <Button active onClick={() => manualTuneVcoStart(voice)}>Manual tune VCO start</Button>
                    <Button active onClick={() => manualTuneVcoStop(voice)}>Manual tune VCO stop</Button>
                    <Button active={dco1RangeHigh === 1} onClick={() => dispatch(clickDco1Range)}>DCO 1 Range
                        Hi</Button>
                    <Button active={dco2RangeHigh === 1} onClick={() => dispatch(clickDco2Range)}>DCO 2 Range
                        Hi</Button>
                </div>
            </div>
        </div>
    </div>
}

type Props = { voice: number };
