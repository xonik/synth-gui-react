import React, { useState } from 'react'
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
import { sharedConfig } from "../../sharedConfig";

const oscAction = {
    ctrlGroup: ControllerGroupIds.OSC,
    source: ApiSource.GUI,
    loop: true,
}

export const SettingsButtons = ({ voice }: Props) => {

    // Track manual tune state per voice
    const [manualTuneActive, setManualTuneActive] = useState<boolean[]>(
        Array(sharedConfig.VOICE_COUNT.value).fill(false)
    )

    const handleManualTuneToggle = () => {
        setManualTuneActive(prev => {
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

    const dispatch = useAppDispatch()

    const dco1RangeHigh = useAppSelector(selectController(oscControllers.DCO1.RANGE))
    const dco2RangeHigh = useAppSelector(selectController(oscControllers.DCO2.RANGE))

    const clickDco1Range = click({ ...oscAction, ctrl: oscControllers.DCO1.RANGE })
    const clickDco2Range = click({ ...oscAction, ctrl: oscControllers.DCO2.RANGE })

    return <div className="settings-buttons">
        <div className="settings-buttons__columns">
            <div className="settings-buttons__column">
                <div className="settings-buttons__column-heading">DCO</div>
                <Button active onClick={() => calibrateDCO1(voice)}>Calibrate DCO 1</Button>
                <Button active onClick={() => calibrateDCO2(voice)}>Calibrate DCO 2</Button>
                <Button active={dco1RangeHigh === 1} onClick={() => dispatch(clickDco1Range)}>DCO 1 Range Hi</Button>
                <Button active={dco2RangeHigh === 1} onClick={() => dispatch(clickDco2Range)}>DCO 2 Range Hi</Button>
            </div>
            <div className="settings-buttons__column">
                <div className="settings-buttons__column-heading">VCO</div>
                <Button active onClick={() => tuneVco(voice)}>Tune</Button>
                <Button active onClick={() => measureVcoOctaves(voice)}>Measure octaves</Button>
                <Button active onClick={() => measureVcoAll(voice)}>Measure all</Button>
                <Button
                    active={manualTuneActive[voice]}
                    onClick={handleManualTuneToggle}
                >
                    {manualTuneActive[voice] ? 'Manual tune stop' : 'Manual tune start'}
                </Button>
            </div>
        </div>
    </div>
}

type Props = { voice: number };
