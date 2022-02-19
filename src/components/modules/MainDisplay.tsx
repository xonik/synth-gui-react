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
import mainDisplayControllers from '../../synthcore/modules/mainDisplay/mainDisplayControllers'

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
                          radioButtonIndex={0}
                          ctrlId={mainDisplayControllers.GROUP_MENU.id}
        />
        <RoundPushButton8 x={displayCenter - 1.5 * buttonSpacing} y={buttonRow}
                          label="Osc"
                          labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          radioButtonIndex={1}
                          ctrlId={mainDisplayControllers.GROUP_MENU.id}
        />
        <RoundPushButton8 x={displayCenter - 0.5 * buttonSpacing} y={buttonRow}
                          label="Filters"
                          labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          radioButtonIndex={2}
                          ctrlId={mainDisplayControllers.GROUP_MENU.id}
        />
        <RoundPushButton8 x={displayCenter + 0.5 * buttonSpacing} y={buttonRow}
                          label="Envelopes"
                          labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          radioButtonIndex={3}
                          ctrlId={mainDisplayControllers.GROUP_MENU.id}
        />
        <RoundPushButton8 x={displayCenter + 1.5 * buttonSpacing} y={buttonRow}
                          label="Mods"
                          labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          radioButtonIndex={4}
                          ctrlId={mainDisplayControllers.GROUP_MENU.id}
        />
        <RoundPushButton8 x={displayCenter + 2.5 * buttonSpacing} y={buttonRow}
                          label="FX"
                          labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          radioButtonIndex={5}
                          ctrlId={mainDisplayControllers.GROUP_MENU.id}
        />
        <Display x={x} y={y} width={displayWidth} height={displayHeight} ref={displayRef}/>

        <RotaryPotWOLeds17 x={displayCenter - 2 * potSpacing} y={potRow}
                           ctrlGroup={ControllerGroupIds.MAIN_DISP}
                           ctrlId={mainDisplayControllers.POT1.id}
                           resolution={getPotResolution(mainDisplayControllers.POT1.id, currScreen)}
        />
        <RotaryPotWOLeds17 x={displayCenter - 1 * potSpacing} y={potRow}
                           ctrlGroup={ControllerGroupIds.MAIN_DISP}
                           ctrlId={mainDisplayControllers.POT2.id}
                           resolution={getPotResolution(mainDisplayControllers.POT2.id, currScreen)}
        />
        <RotaryPotWOLeds17 x={displayCenter} y={potRow}
                           ctrlGroup={ControllerGroupIds.MAIN_DISP}
                           ctrlId={mainDisplayControllers.POT3.id}
                           resolution={getPotResolution(mainDisplayControllers.POT3.id, currScreen)}
        />
        <RotaryPotWOLeds17 x={displayCenter + 1 * potSpacing} y={potRow}
                           ctrlGroup={ControllerGroupIds.MAIN_DISP}
                           ctrlId={mainDisplayControllers.POT4.id}
                           resolution={getPotResolution(mainDisplayControllers.POT4.id, currScreen)}
        />
        <RotaryPotWOLeds17 x={displayCenter + 2 * potSpacing} y={potRow}
                           ctrlGroup={ControllerGroupIds.MAIN_DISP}
                           ctrlId={mainDisplayControllers.POT5.id}
                           resolution={getPotResolution(mainDisplayControllers.POT5.id, currScreen)}
        />
        <RotaryPotWOLeds32 x={displayCenter} y={masterPotRow}
                           ctrlGroup={ControllerGroupIds.MAIN_DISP}
                           ctrlId={mainDisplayControllers.POT6.id}
                           resolution={getPotResolution(mainDisplayControllers.POT6.id, currScreen)}
        />

        <RoundPushButton8 x={displayCenter - 2.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Home" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={mainDisplayControllers.FUNC_HOME.id}
        />

        <RoundPushButton8 x={displayCenter - 1.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Settings" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={mainDisplayControllers.FUNC_SETTINGS.id}
        />

        <RoundPushButton8 x={displayCenter + 1.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Load" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={mainDisplayControllers.FUNC_LOAD.id}
        />

        <RoundPushButton8 x={displayCenter + 2.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Save" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={mainDisplayControllers.FUNC_SAVE.id}
        />


        <RoundPushButton8 x={displayCenter - 2.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Shift" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={mainDisplayControllers.FUNC_SHIFT.id}
        />

        <RoundPushButton8 x={displayCenter - 1.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Perform" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={mainDisplayControllers.FUNC_PERFORM.id}
        />

        <RoundPushButton8 x={displayCenter + 1.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Compare" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={mainDisplayControllers.FUNC_COMPARE.id}
        />

        <RoundPushButton8 x={displayCenter + 2.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Route" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={mainDisplayControllers.FUNC_ROUTE.id}
        />

    </>
})

export default MainDisplay