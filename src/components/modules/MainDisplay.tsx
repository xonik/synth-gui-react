import React from 'react'
import Display from '../misc/Display'
import RotaryPotWOLeds17 from '../pots/RotaryPotWOLeds17'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import RotaryPotWOLeds32 from '../pots/RotaryPotWOLeds32'
import { MainDisplayControllerIds } from '../../synthcore/modules/mainDisplay/types'
import { ControllerGroupIds } from '../../synthcore/types'
import { getPotResolution } from '../../synthcore/modules/mainDisplay/mainDisplayApi'
import { useAppSelector } from '../../synthcore/hooks'
import { selectCurrScreen } from '../../synthcore/modules/mainDisplay/mainDisplayReducer'
import './MainDisplay.scss'

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.MAIN_DISP

const MainDisplay = React.forwardRef<SVGRectElement, Props>(({ x, y }, displayRef) => {

    const currScreen = useAppSelector(selectCurrScreen)

    // approx. 9"
    const displayWidth = 180
    const displayHeight = 9 * displayWidth / 16
    const displayCenter = x + displayWidth / 2

    const bezelLRMargin = 20
    const bezelTopMargin = 40
    //const bezelBottomMargin = 60;
    const bezelBottomMargin = 120

    const buttonSpacing = 30
    const buttonRow = y - 25

    const potSpacing = 35
    const potRow = y + displayHeight + 30
    const masterPotRow = potRow + 55
    const ctrlSwitchesRow1 = masterPotRow - 10
    const ctrlSwitchesRow2 = masterPotRow + 10

    return <>
        <rect x={x - bezelLRMargin} y={y - bezelTopMargin} height={displayHeight + bezelTopMargin + bezelBottomMargin} width={displayWidth + 2 * bezelLRMargin} className="bezel"/>
        <RoundPushButton8 x={displayCenter - 2.5 * buttonSpacing} y={buttonRow}
                          label="LFOs"
                          labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={MainDisplayControllerIds.MENU_LFO}
        />
        <RoundPushButton8 x={displayCenter - 1.5 * buttonSpacing} y={buttonRow}
                          label="Osc"
                          labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={MainDisplayControllerIds.MENU_OSC}
        />
        <RoundPushButton8 x={displayCenter - 0.5 * buttonSpacing} y={buttonRow}
                          label="Filters"
                          labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={MainDisplayControllerIds.MENU_FILTER}
        />
        <RoundPushButton8 x={displayCenter + 0.5 * buttonSpacing} y={buttonRow}
                          label="Envelopes"
                          labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={MainDisplayControllerIds.MENU_ENVELOPE}
        />
        <RoundPushButton8 x={displayCenter + 1.5 * buttonSpacing} y={buttonRow}
                          label="Mods"
                          labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={MainDisplayControllerIds.MENU_MOD}
        />
        <RoundPushButton8 x={displayCenter + 2.5 * buttonSpacing} y={buttonRow}
                          label="FX"
                          labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={MainDisplayControllerIds.MENU_FX}
        />
        <Display x={x} y={y} width={displayWidth} height={displayHeight} ref={displayRef}/>

        <RotaryPotWOLeds17 x={displayCenter - 2 * potSpacing} y={potRow}
                           ctrlGroup={ControllerGroupIds.MAIN_DISP}
                           ctrlId={MainDisplayControllerIds.POT1}
                           resolution={getPotResolution(MainDisplayControllerIds.POT1, currScreen)}
        />
        <RotaryPotWOLeds17 x={displayCenter - 1 * potSpacing} y={potRow}
                           ctrlGroup={ControllerGroupIds.MAIN_DISP}
                           ctrlId={MainDisplayControllerIds.POT2}
                           resolution={getPotResolution(MainDisplayControllerIds.POT2, currScreen)}
        />
        <RotaryPotWOLeds17 x={displayCenter} y={potRow}
                           ctrlGroup={ControllerGroupIds.MAIN_DISP}
                           ctrlId={MainDisplayControllerIds.POT3}
                           resolution={getPotResolution(MainDisplayControllerIds.POT3, currScreen)}
        />
        <RotaryPotWOLeds17 x={displayCenter + 1 * potSpacing} y={potRow}
                           ctrlGroup={ControllerGroupIds.MAIN_DISP}
                           ctrlId={MainDisplayControllerIds.POT4}
                           resolution={getPotResolution(MainDisplayControllerIds.POT4, currScreen)}
        />
        <RotaryPotWOLeds17 x={displayCenter + 2 * potSpacing} y={potRow}
                           ctrlGroup={ControllerGroupIds.MAIN_DISP}
                           ctrlId={MainDisplayControllerIds.POT5}
                           resolution={getPotResolution(MainDisplayControllerIds.POT5, currScreen)}
        />
        <RotaryPotWOLeds32 x={displayCenter} y={masterPotRow}
                           ctrlGroup={ControllerGroupIds.MAIN_DISP}
                           ctrlId={MainDisplayControllerIds.POT6}
                           resolution={getPotResolution(MainDisplayControllerIds.POT6, currScreen)}
        />

        <RoundPushButton8 x={displayCenter - 2.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Home" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={MainDisplayControllerIds.FUNC_HOME}
        />

        <RoundPushButton8 x={displayCenter - 1.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Settings" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={MainDisplayControllerIds.FUNC_SETTINGS}
        />

        <RoundPushButton8 x={displayCenter + 1.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Load" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={MainDisplayControllerIds.FUNC_LOAD}
        />

        <RoundPushButton8 x={displayCenter + 2.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Save" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={MainDisplayControllerIds.FUNC_SAVE}
        />


        <RoundPushButton8 x={displayCenter - 2.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Shift" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={MainDisplayControllerIds.FUNC_SHIFT}
        />

        <RoundPushButton8 x={displayCenter - 1.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Perform" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={MainDisplayControllerIds.FUNC_PERFORM}
        />

        <RoundPushButton8 x={displayCenter + 1.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Compare" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={MainDisplayControllerIds.FUNC_COMPARE}
        />

        <RoundPushButton8 x={displayCenter + 2.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Route" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={MainDisplayControllerIds.FUNC_ROUTE}
        />

    </>
})

export default MainDisplay