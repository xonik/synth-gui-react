import React from 'react';
import Display from '../misc/Display';
import RotaryPotWOLeds17 from '../pots/RotaryPotWOLeds17';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import './MainDisplay.scss';
import RotaryPotWOLeds32 from '../pots/RotaryPotWOLeds32';
import midiConstants from '../../midi/midiControllers'
import Slope from '../slopes/Slope'
import { exponentialFunc, logarithmicFunc, squared } from '../slopes/slopeCalculator'

interface Props {
  x: number,
  y: number
}


const MainDisplay = ({ x, y }: Props) => {

  // approx. 9"
  const displayWidth = 180;
  const displayHeight = 9 * displayWidth / 16;
  const displayCenter = x + displayWidth / 2;

  const bezelLRMargin = 20;
  const bezelTopMargin = 40;
  //const bezelBottomMargin = 60;
  const bezelBottomMargin = 120;

  const buttonSpacing = 30;
  const buttonRow = y - 25;

  const potSpacing = 35;
  const potRow = y + displayHeight + 30;
  const masterPotRow = potRow + 55;
  const ctrlSwitchesRow1 = masterPotRow - 10;
  const ctrlSwitchesRow2 = masterPotRow + 10;


  const expo1 = exponentialFunc(2.2);
  const expo2 = exponentialFunc(4.4);
  const expo3 = exponentialFunc(5.5);
  const log1 = logarithmicFunc(1.3);
  const log2 = logarithmicFunc(1.7);
  const log3 = logarithmicFunc(2.2);

  return <>
    <rect x={x - bezelLRMargin} y={y-bezelTopMargin} height={displayHeight + bezelTopMargin + bezelBottomMargin} width={displayWidth + 2 * bezelLRMargin} className="bezel"/>;
    <RoundPushButton8 x={displayCenter - 2.5 * buttonSpacing} y={buttonRow} label="LFOs" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.MENU_LFO}/>
    <RoundPushButton8 x={displayCenter - 1.5 * buttonSpacing} y={buttonRow} label="Osc" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.MENU_OSC}/>
    <RoundPushButton8 x={displayCenter - 0.5 * buttonSpacing} y={buttonRow} label="Filters" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.MENU_FILTER}/>
    <RoundPushButton8 x={displayCenter + 0.5 * buttonSpacing} y={buttonRow} label="Envelopes" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.MENU_ENVELOPE}/>
    <RoundPushButton8 x={displayCenter + 1.5 * buttonSpacing} y={buttonRow} label="Mods" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.MENU_MOD}/>
    <RoundPushButton8 x={displayCenter + 2.5 * buttonSpacing} y={buttonRow} label="FX" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.MENU_FX}/>
    <Display x={x} y={y} width={displayWidth} height={displayHeight}/>

    <Slope from={[x, y]} to={[x + displayWidth, y + displayHeight]} slopeFunc={expo1}/>

    <RotaryPotWOLeds17 x={displayCenter - 2 * potSpacing} y={potRow} midiConfig={midiConstants.MAIN_PANEL.POT1}/>
    <RotaryPotWOLeds17 x={displayCenter - 1 * potSpacing} y={potRow} midiConfig={midiConstants.MAIN_PANEL.POT2}/>
    <RotaryPotWOLeds17 x={displayCenter} y={potRow} midiConfig={midiConstants.MAIN_PANEL.POT3}/>
    <RotaryPotWOLeds17 x={displayCenter + 1 * potSpacing} y={potRow} midiConfig={midiConstants.MAIN_PANEL.POT4}/>
    <RotaryPotWOLeds17 x={displayCenter + 2 * potSpacing} y={potRow} midiConfig={midiConstants.MAIN_PANEL.POT5}/>
    <RotaryPotWOLeds32 x={displayCenter} y={masterPotRow} midiConfig={midiConstants.MAIN_PANEL.POT6}/>

    <RoundPushButton8 x={displayCenter - 2.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Home" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.FUNC_HOME}/>
    <RoundPushButton8 x={displayCenter - 1.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Settings" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.FUNC_SETTINGS}/>
    <RoundPushButton8 x={displayCenter + 1.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Load" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.FUNC_LOAD}/>
    <RoundPushButton8 x={displayCenter + 2.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Save" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.FUNC_SAVE}/>

    <RoundPushButton8 x={displayCenter - 2.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Shift" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.FUNC_SHIFT}/>
    <RoundPushButton8 x={displayCenter - 1.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Perform" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.FUNC_PERFORM}/>
    <RoundPushButton8 x={displayCenter + 1.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Compare" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.FUNC_COMPARE}/>
    <RoundPushButton8 x={displayCenter + 2.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Route" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.FUNC_ROUTE}/>
  </>;
};

export default MainDisplay;