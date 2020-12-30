import React from 'react';
import Display from '../misc/Display';
import RotaryPotWOLeds17 from '../pots/RotaryPotWOLeds17';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import './MainDisplay.scss';

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
  const bezelBottomMargin = 60;

  const buttonSpacing = 30;
  const buttonRow = y - 25;

  const potSpacing = 35;
  const potRow = y + displayHeight + 30;

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
  </>;
};

export default MainDisplay;