import React, { useCallback } from 'react'
import Display from '../misc/Display'
import useEventListener from '@use-it/event-listener'

import RotaryPotWOLeds10 from '../pots/RotaryPotWOLeds10'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import RotaryPotWOLeds24 from '../pots/RotaryPotWOLeds24'
import { ApiSource, ControllerGroupIds } from '../../synthcore/types'
import { getPotResolution } from '../../synthcore/modules/mainDisplay/mainDisplayApi'
import { useAppSelector } from '../../synthcore/hooks'
import { selectCurrScreen } from '../../synthcore/modules/mainDisplay/mainDisplayReducer'
import './MainDisplay.scss'
import mainDisplayControllers from '../../synthcore/modules/mainDisplay/mainDisplayControllers'
import { dispatch } from '../../synthcore/utils'
import { click, release } from '../../synthcore/modules/ui/uiReducer'
import { ModuleProps } from "./types";
import { BORDER_MARGIN, POT_OFFSET_Y, ROW_HEIGHT } from "../../constants";
import { displayBG } from "../../config";

const ctrlGroup = ControllerGroupIds.MAIN_DISP

const SHIFT_KEYS = ['16', 'Shift'];

type Props = ModuleProps & {
    panelHeight: number
}

const MainDisplay = React.forwardRef<SVGRectElement, Props>(
    ({ x, y, height, width, panelHeight }, displayRef
    ) => {

        const currScreen = useAppSelector(selectCurrScreen)

        // approx. 9"
        const displayWidth = 180
        const displayHeight = 9 * displayWidth / 16

        const buttonRow = y + ROW_HEIGHT
        const displayCenterX = x + width / 2
        const displayCenterY = buttonRow + 2 * ROW_HEIGHT


        const displayX = x + (width - displayWidth) / 2
        const displayY = displayCenterY - displayHeight / 2

        const buttonSpacing = 30

        const potSpacing = 30
        const potRow = y + ROW_HEIGHT * 5 + 2
        const masterPotRow = y + ROW_HEIGHT * 6
        const ctrlSwitchesRow1 = masterPotRow - 10
        const ctrlSwitchesRow2 = masterPotRow + 10

        // PC Keyboard handlers
        const handleOnClick = useCallback(({ key }: { key: any }) => {
            if (SHIFT_KEYS.includes(String(key))) {
                dispatch(click({
                    ctrlGroup,
                    ctrl: mainDisplayControllers.FUNC_SHIFT,
                    source: ApiSource.UI
                }))
            }
        }, [])

        const handleOnRelease = useCallback(({ key }: { key: any }) => {
            if (SHIFT_KEYS.includes(String(key))) {
                dispatch(release({ ctrlGroup, ctrl: mainDisplayControllers.FUNC_SHIFT, source: ApiSource.UI }))
            }
        }, [])

        useEventListener('keydown', handleOnClick);
        useEventListener('keyup', handleOnRelease);

        return <>
            {false && <rect x={x + BORDER_MARGIN} y={y - 15}
                           height={panelHeight} width={width - 2 * BORDER_MARGIN}
                           className="bezel"/>}
            {true && <rect x={x + BORDER_MARGIN} y={y}
                            height={height - BORDER_MARGIN} width={width - 2 * BORDER_MARGIN}
                            className="bezel"/>}
            {false && <rect x={x + BORDER_MARGIN} y={y + 22}
                            height={height - BORDER_MARGIN - 75} width={width - 2 * BORDER_MARGIN}
                            className="bezel"/>}
            <RoundPushButton8 x={displayCenterX - 2.5 * buttonSpacing} y={buttonRow}
                              label="LFOs"
                              labelPosition="bottom"
                              ctrlGroup={ctrlGroup}
                              radioButtonIndex={0}
                              ctrl={mainDisplayControllers.GROUP_MENU}
            />
            <RoundPushButton8 x={displayCenterX - 1.5 * buttonSpacing} y={buttonRow}
                              label="Osc"
                              labelPosition="bottom"
                              ctrlGroup={ctrlGroup}
                              radioButtonIndex={1}
                              ctrl={mainDisplayControllers.GROUP_MENU}
            />
            <RoundPushButton8 x={displayCenterX - 0.5 * buttonSpacing} y={buttonRow}
                              label="Filters"
                              labelPosition="bottom"
                              ctrlGroup={ctrlGroup}
                              radioButtonIndex={2}
                              ctrl={mainDisplayControllers.GROUP_MENU}
            />
            <RoundPushButton8 x={displayCenterX + 0.5 * buttonSpacing} y={buttonRow}
                              label="Envelopes"
                              labelPosition="bottom"
                              ctrlGroup={ctrlGroup}
                              radioButtonIndex={3}
                              ctrl={mainDisplayControllers.GROUP_MENU}
            />
            <RoundPushButton8 x={displayCenterX + 1.5 * buttonSpacing} y={buttonRow}
                              label="Mods"
                              labelPosition="bottom"
                              ctrlGroup={ctrlGroup}
                              radioButtonIndex={4}
                              ctrl={mainDisplayControllers.GROUP_MENU}
            />
            <RoundPushButton8 x={displayCenterX + 2.5 * buttonSpacing} y={buttonRow}
                              label="FX"
                              labelPosition="bottom"
                              ctrlGroup={ctrlGroup}
                              radioButtonIndex={5}
                              ctrl={mainDisplayControllers.GROUP_MENU}
            />
            <Display x={displayX} y={displayY} width={displayWidth} height={displayHeight} ref={displayRef}/>

            <RotaryPotWOLeds10 x={displayCenterX - 2.5 * potSpacing} y={potRow}
                               silver
                               ctrlGroup={ControllerGroupIds.MAIN_DISP}
                               ctrl={mainDisplayControllers.POT1}
                               resolution={getPotResolution(mainDisplayControllers.POT1.id, currScreen)}
            />
            <RotaryPotWOLeds10 x={displayCenterX - 1.5 * potSpacing} y={potRow}
                               silver
                               ctrlGroup={ControllerGroupIds.MAIN_DISP}
                               ctrl={mainDisplayControllers.POT2}
                               resolution={getPotResolution(mainDisplayControllers.POT2.id, currScreen)}
            />
            <RotaryPotWOLeds10 x={displayCenterX - 0.5 * potSpacing} y={potRow}
                               silver
                               ctrlGroup={ControllerGroupIds.MAIN_DISP}
                               ctrl={mainDisplayControllers.POT3}
                               resolution={getPotResolution(mainDisplayControllers.POT3.id, currScreen)}
            />
            <RotaryPotWOLeds10 x={displayCenterX + 0.5 * potSpacing} y={potRow}
                               silver
                               ctrlGroup={ControllerGroupIds.MAIN_DISP}
                               ctrl={mainDisplayControllers.POT4}
                               resolution={getPotResolution(mainDisplayControllers.POT4.id, currScreen)}
            />
            <RotaryPotWOLeds10 x={displayCenterX + 1.5 * potSpacing} y={potRow}
                               silver
                               ctrlGroup={ControllerGroupIds.MAIN_DISP}
                               ctrl={mainDisplayControllers.POT5}
                               resolution={getPotResolution(mainDisplayControllers.POT5.id, currScreen)}
            />
            <RotaryPotWOLeds10 x={displayCenterX + 2.5 * potSpacing} y={potRow}
                               silver
                               ctrlGroup={ControllerGroupIds.MAIN_DISP}
                               ctrl={mainDisplayControllers.POT6}
                               resolution={getPotResolution(mainDisplayControllers.POT6.id, currScreen)}
            />
            <RotaryPotWOLeds24 x={displayCenterX} y={masterPotRow}
                               ctrlGroup={ControllerGroupIds.MAIN_DISP}
                               ctrl={mainDisplayControllers.POT7}
                               resolution={getPotResolution(mainDisplayControllers.POT7.id, currScreen)}
            />

            <RoundPushButton8 x={displayCenterX - 2.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Home"
                              labelPosition="bottom"
                              ctrlGroup={ctrlGroup}
                              ctrl={mainDisplayControllers.FUNC_HOME}
            />

            <RoundPushButton8 x={displayCenterX - 1.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Setup"
                              labelPosition="bottom"
                              ctrlGroup={ctrlGroup}
                              ctrl={mainDisplayControllers.FUNC_SETTINGS}
            />

            <RoundPushButton8 x={displayCenterX + 1.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Load"
                              labelPosition="bottom"
                              ctrlGroup={ctrlGroup}
                              ctrl={mainDisplayControllers.FUNC_LOAD}
            />

            <RoundPushButton8 x={displayCenterX + 2.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Save"
                              labelPosition="bottom"
                              ctrlGroup={ctrlGroup}
                              ctrl={mainDisplayControllers.FUNC_SAVE}
            />


            <RoundPushButton8 x={displayCenterX - 2.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Shift"
                              labelPosition="bottom"
                              ctrlGroup={ctrlGroup}
                              ctrl={mainDisplayControllers.FUNC_SHIFT}
            />

            <RoundPushButton8 x={displayCenterX - 1.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Perform"
                              labelPosition="bottom"
                              ctrlGroup={ctrlGroup}
                              ctrl={mainDisplayControllers.FUNC_PERFORM}
            />

            <RoundPushButton8 x={displayCenterX + 1.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Compare"
                              labelPosition="bottom"
                              ctrlGroup={ctrlGroup}
                              ctrl={mainDisplayControllers.FUNC_COMPARE}
            />

            <RoundPushButton8 x={displayCenterX + 2.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Route"
                              labelPosition="bottom"
                              ctrlGroup={ctrlGroup}
                              ctrl={mainDisplayControllers.FUNC_ROUTE}
            />

        </>
    })

export default MainDisplay