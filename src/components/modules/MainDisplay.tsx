import React from 'react';
import Display from '../misc/Display';
import RotaryPotWOLeds17 from '../pots/RotaryPotWOLeds17';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import './MainDisplay.scss';
import RotaryPotWOLeds32 from '../pots/RotaryPotWOLeds32';

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

  return <>
    <rect x={x - bezelLRMargin} y={y-bezelTopMargin} height={displayHeight + bezelTopMargin + bezelBottomMargin} width={displayWidth + 2 * bezelLRMargin} className="bezel"/>;
    <RoundPushButton8 x={displayCenter - 2.5 * buttonSpacing} y={buttonRow} label="LFOs" labelPosition="bottom"/>
    <RoundPushButton8 x={displayCenter - 1.5 * buttonSpacing} y={buttonRow} label="Osc" labelPosition="bottom"/>
    <RoundPushButton8 x={displayCenter - 0.5 * buttonSpacing} y={buttonRow} label="Filters" labelPosition="bottom"/>
    <RoundPushButton8 x={displayCenter + 0.5 * buttonSpacing} y={buttonRow} label="Envelopes" labelPosition="bottom"/>
    <RoundPushButton8 x={displayCenter + 1.5 * buttonSpacing} y={buttonRow} label="Mods" labelPosition="bottom"/>
    <RoundPushButton8 x={displayCenter + 2.5 * buttonSpacing} y={buttonRow} label="FX" labelPosition="bottom"/>
    <Display x={x} y={y} width={displayWidth} height={displayHeight}/>
    <RotaryPotWOLeds17 x={displayCenter - 2 * potSpacing} y={potRow}/>
    <RotaryPotWOLeds17 x={displayCenter - 1 * potSpacing} y={potRow}/>
    <RotaryPotWOLeds17 x={displayCenter} y={potRow}/>
    <RotaryPotWOLeds17 x={displayCenter + 1 * potSpacing} y={potRow}/>
    <RotaryPotWOLeds17 x={displayCenter + 2 * potSpacing} y={potRow}/>
    <RotaryPotWOLeds32 x={displayCenter} y={masterPotRow}/>

    <RoundPushButton8 x={displayCenter - 2.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Home" labelPosition="bottom"/>
    <RoundPushButton8 x={displayCenter - 1.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Settings" labelPosition="bottom"/>
    <RoundPushButton8 x={displayCenter + 1.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Load" labelPosition="bottom"/>
    <RoundPushButton8 x={displayCenter + 2.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Save" labelPosition="bottom"/>

    <RoundPushButton8 x={displayCenter - 2.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Shift" labelPosition="bottom"/>
    <RoundPushButton8 x={displayCenter - 1.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Clear" labelPosition="bottom"/>
    <RoundPushButton8 x={displayCenter + 1.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Compare" labelPosition="bottom"/>
    <RoundPushButton8 x={displayCenter + 2.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Route" labelPosition="bottom"/>
  </>;
};

export default MainDisplay;