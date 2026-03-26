import React, { useCallback } from 'react'
import Display from '../misc/Display'
import useEventListener from '../../hooks/useEventListener'

import RotaryPotWOLeds10 from '../pots/RotaryPotWOLeds10'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import RotaryPotWOLeds24 from '../pots/RotaryPotWOLeds24'
import { getPotResolution } from '../../synthcore/modules/mainDisplay/mainDisplayApi'
import './MainDisplay.scss'
import mainDisplayControllers from '../../synthcore/modules/mainDisplay/mainDisplayControllers'
import { useUiStore, ScreenId } from '../../store/uiStore'
import { ModuleProps } from "./types";
import { BORDER_MARGIN, POT_OFFSET_Y, ROW_HEIGHT } from "../../constants";
import mainDisplayApi from '../../synthcore/modules/mainDisplay/mainDisplayApi'
import { ApiSource } from '../../synthcore/types'
import { MainDisplayScreenId } from '../../synthcore/modules/mainDisplay/types'

const SHIFT_KEYS = ['16', 'Shift'];

// Map GROUP_MENU radio button index to uiStore ScreenId
const menuIndexToScreen: ScreenId[] = [
    ScreenId.LFO,
    ScreenId.OSC,
    ScreenId.FILTER,
    ScreenId.ENV,
    ScreenId.MOD,
    ScreenId.FX,
]

// Map uiStore ScreenId to GROUP_MENU radio button index
const screenToMenuIndex: Partial<Record<ScreenId, number>> = {
    [ScreenId.LFO]: 0,
    [ScreenId.OSC]: 1,
    [ScreenId.FILTER]: 2,
    [ScreenId.ENV]: 3,
    [ScreenId.MOD]: 4,
    [ScreenId.FX]: 5,
}

// Map uiStore ScreenId to old MainDisplayScreenId for pot resolution lookup
const screenIdToMainDisplayScreenId: Partial<Record<ScreenId, MainDisplayScreenId>> = {
    [ScreenId.LFO]: MainDisplayScreenId.LFO,
    [ScreenId.OSC]: MainDisplayScreenId.OSC,
    [ScreenId.FILTER]: MainDisplayScreenId.FILTER,
    [ScreenId.ENV]: MainDisplayScreenId.ENV,
    [ScreenId.MOD]: MainDisplayScreenId.MOD,
    [ScreenId.FX]: MainDisplayScreenId.FX,
    [ScreenId.SETTINGS]: MainDisplayScreenId.SETTINGS,
}

type Props = ModuleProps & {
    panelHeight: number
}

const MainDisplay = React.forwardRef<SVGRectElement, Props>(
    ({ x, y, height, width, panelHeight }, displayRef
    ) => {

        const currentScreen = useUiStore(s => s.currentScreen)
        const setScreen = useUiStore(s => s.setScreen)
        const voiceGroupIndex = useUiStore(s => s.currentVoiceGroupIndex)

        const currScreenNumeric = screenIdToMainDisplayScreenId[currentScreen] ?? MainDisplayScreenId.ENV
        const menuIndex = screenToMenuIndex[currentScreen] ?? -1

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

        const makeMenuClick = useCallback((index: number) => () => {
            const screen = menuIndexToScreen[index]
            if (screen) {
                setScreen(screen)
                mainDisplayApi.setCurrentScreen(index, ApiSource.UI)
            }
        }, [setScreen])

        const makePotIncrement = useCallback((potIndex: number) => (delta: number) => {
            mainDisplayApi.handleMainDisplayController(
                voiceGroupIndex,
                mainDisplayControllers.POT1.id + potIndex,
                delta,
                ApiSource.UI
            )
        }, [voiceGroupIndex])

        const onHomeClick = useCallback(() => {
            setScreen(ScreenId.ENV)
            mainDisplayApi.handleHomeClick(ApiSource.UI)
        }, [setScreen])
        const onSettingsClick = useCallback(() => {
            setScreen(ScreenId.SETTINGS)
            mainDisplayApi.handleSettingsClick(ApiSource.UI)
        }, [setScreen])
        const onShiftClick = useCallback(() => {
            mainDisplayApi.handleShift(true, ApiSource.UI)
        }, [])
        const onPerformClick = useCallback(() => {
            mainDisplayApi.handlePerformClick(ApiSource.UI)
        }, [])
        const onLoadClick = useCallback(() => {
            setScreen(ScreenId.LOAD)
            mainDisplayApi.handleLoadClick(ApiSource.UI)
        }, [setScreen])
        const onSaveClick = useCallback(() => {
            setScreen(ScreenId.SAVE)
            mainDisplayApi.handleSaveClick(ApiSource.UI)
        }, [setScreen])
        const onCompareClick = useCallback(() => {
            mainDisplayApi.handleCompareClick(ApiSource.UI)
        }, [])
        const onRouteClick = useCallback(() => {
            mainDisplayApi.handleRouteClick(ApiSource.UI)
        }, [])

        // PC Keyboard handlers
        const handleOnClick = useCallback(({ key }: { key: any }) => {
            if (SHIFT_KEYS.includes(String(key))) {
                mainDisplayApi.handleShift(true, ApiSource.UI)
            }
        }, [])

        const handleOnRelease = useCallback(({ key }: { key: any }) => {
            if (SHIFT_KEYS.includes(String(key))) {
                mainDisplayApi.handleShift(false, ApiSource.UI)
            }
        }, [])

        useEventListener('keydown', handleOnClick);
        useEventListener('keyup', handleOnRelease);

        return <>
            {false && <rect x={x + BORDER_MARGIN} y={y - 15}
                           height={panelHeight} width={width - 2 * BORDER_MARGIN}
                           className="bezel"/>}
            {false && <rect x={x + BORDER_MARGIN} y={y}
                            height={height - BORDER_MARGIN} width={width - 2 * BORDER_MARGIN}
                            className="bezel"/>}
            {true && <rect x={x + BORDER_MARGIN} y={y + 22}
                            height={height - BORDER_MARGIN - 75} width={width - 2 * BORDER_MARGIN}
                            className="bezel"/>}
            <RoundPushButton8 x={displayCenterX - 2.5 * buttonSpacing} y={buttonRow}
                              radioButtonIndex={0}
                              value={menuIndex}
                              onButtonClick={makeMenuClick(0)}
            />
            <RoundPushButton8 x={displayCenterX - 1.5 * buttonSpacing} y={buttonRow}
                              radioButtonIndex={1}
                              value={menuIndex}
                              onButtonClick={makeMenuClick(1)}
            />
            <RoundPushButton8 x={displayCenterX - 0.5 * buttonSpacing} y={buttonRow}
                              radioButtonIndex={2}
                              value={menuIndex}
                              onButtonClick={makeMenuClick(2)}
            />
            <RoundPushButton8 x={displayCenterX + 0.5 * buttonSpacing} y={buttonRow}
                              radioButtonIndex={3}
                              value={menuIndex}
                              onButtonClick={makeMenuClick(3)}
            />
            <RoundPushButton8 x={displayCenterX + 1.5 * buttonSpacing} y={buttonRow}
                              radioButtonIndex={4}
                              value={menuIndex}
                              onButtonClick={makeMenuClick(4)}
            />
            <RoundPushButton8 x={displayCenterX + 2.5 * buttonSpacing} y={buttonRow}
                              radioButtonIndex={5}
                              value={menuIndex}
                              onButtonClick={makeMenuClick(5)}
            />
            <Display x={displayX} y={displayY} width={displayWidth} height={displayHeight} ref={displayRef}/>

            <RotaryPotWOLeds10 x={displayCenterX - 2.5 * potSpacing} y={potRow}
                               silver
                               onValueIncrement={makePotIncrement(0)}
                               resolution={getPotResolution(mainDisplayControllers.POT1.id, currScreenNumeric)}
            />
            <RotaryPotWOLeds10 x={displayCenterX - 1.5 * potSpacing} y={potRow}
                               silver
                               onValueIncrement={makePotIncrement(1)}
                               resolution={getPotResolution(mainDisplayControllers.POT2.id, currScreenNumeric)}
            />
            <RotaryPotWOLeds10 x={displayCenterX - 0.5 * potSpacing} y={potRow}
                               silver
                               onValueIncrement={makePotIncrement(2)}
                               resolution={getPotResolution(mainDisplayControllers.POT3.id, currScreenNumeric)}
            />
            <RotaryPotWOLeds10 x={displayCenterX + 0.5 * potSpacing} y={potRow}
                               silver
                               onValueIncrement={makePotIncrement(3)}
                               resolution={getPotResolution(mainDisplayControllers.POT4.id, currScreenNumeric)}
            />
            <RotaryPotWOLeds10 x={displayCenterX + 1.5 * potSpacing} y={potRow}
                               silver
                               onValueIncrement={makePotIncrement(4)}
                               resolution={getPotResolution(mainDisplayControllers.POT5.id, currScreenNumeric)}
            />
            <RotaryPotWOLeds10 x={displayCenterX + 2.5 * potSpacing} y={potRow}
                               silver
                               onValueIncrement={makePotIncrement(5)}
                               resolution={getPotResolution(mainDisplayControllers.POT6.id, currScreenNumeric)}
            />
            <RotaryPotWOLeds24 x={displayCenterX} y={masterPotRow}
                               onValueIncrement={makePotIncrement(6)}
                               resolution={getPotResolution(mainDisplayControllers.POT7.id, currScreenNumeric)}
            />

            <RoundPushButton8 x={displayCenterX - 2.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Home"
                              labelPosition="bottom"
                              onButtonClick={onHomeClick}
            />

            <RoundPushButton8 x={displayCenterX - 1.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Setup"
                              labelPosition="bottom"
                              onButtonClick={onSettingsClick}
            />

            <RoundPushButton8 x={displayCenterX + 1.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Load"
                              labelPosition="bottom"
                              onButtonClick={onLoadClick}
            />

            <RoundPushButton8 x={displayCenterX + 2.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Save"
                              labelPosition="bottom"
                              onButtonClick={onSaveClick}
            />


            <RoundPushButton8 x={displayCenterX - 2.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Shift"
                              labelPosition="bottom"
                              onButtonClick={onShiftClick}
            />

            <RoundPushButton8 x={displayCenterX - 1.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Perform"
                              labelPosition="bottom"
                              onButtonClick={onPerformClick}
            />

            <RoundPushButton8 x={displayCenterX + 1.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Compare"
                              labelPosition="bottom"
                              onButtonClick={onCompareClick}
            />

            <RoundPushButton8 x={displayCenterX + 2.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Route"
                              labelPosition="bottom"
                              onButtonClick={onRouteClick}
            />

        </>
    })

export default MainDisplay
