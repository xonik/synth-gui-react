import React, { useCallback, useState } from 'react'
import Display from '../misc/Display';
import RotaryPotWOLeds17 from '../pots/RotaryPotWOLeds17';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import RotaryPotWOLeds32 from '../pots/RotaryPotWOLeds32';
import midiConstants from '../../midi/midiControllers'
import { ControllerGroupIds, MainDisplayControllerIds } from '../../forces/synthcore/controllers'
import { getPotResolution } from '../../forces/synthcore/controllerApi'
import './MainDisplay.scss';

interface Props {
  x: number,
  y: number
}

const MainDisplay = React.forwardRef<SVGRectElement, Props>(({ x, y }, displayRef) => {

  const [curve, setCurve] = useState(0);

  const onClick = useCallback(() => {
    if(curve === 5){
      setCurve(0);
    } else {
      setCurve(curve + 1);
    }
  }, [curve]);

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
    <RoundPushButton8 x={displayCenter - 2.5 * buttonSpacing} y={buttonRow} label="LFOs" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.MENU_LFO}/>
    <RoundPushButton8 x={displayCenter - 1.5 * buttonSpacing} y={buttonRow} label="Osc" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.MENU_OSC}/>
    <RoundPushButton8 x={displayCenter - 0.5 * buttonSpacing} y={buttonRow} label="Filters" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.MENU_FILTER}/>
    <RoundPushButton8 x={displayCenter + 0.5 * buttonSpacing} y={buttonRow} label="Envelopes" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.MENU_ENVELOPE}/>
    <RoundPushButton8 x={displayCenter + 1.5 * buttonSpacing} y={buttonRow} label="Mods" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.MENU_MOD}/>
    <RoundPushButton8 x={displayCenter + 2.5 * buttonSpacing} y={buttonRow} label="FX" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.MENU_FX}/>
    <Display x={x} y={y} width={displayWidth} height={displayHeight} ref={displayRef}/>

    <RotaryPotWOLeds17 x={displayCenter - 2 * potSpacing} y={potRow}
                       midiConfig={midiConstants.MAIN_PANEL.POT1}
                       ctrlGroup={ControllerGroupIds.MAIN_DISP}
                       ctrlId={MainDisplayControllerIds.POT1}
                       resolution={getPotResolution(MainDisplayControllerIds.POT1)}
    />
    <RotaryPotWOLeds17 x={displayCenter - 1 * potSpacing} y={potRow}
                       midiConfig={midiConstants.MAIN_PANEL.POT2}
                       ctrlGroup={ControllerGroupIds.MAIN_DISP}
                       ctrlId={MainDisplayControllerIds.POT2}
                       resolution={getPotResolution(MainDisplayControllerIds.POT2)}
    />
    <RotaryPotWOLeds17 x={displayCenter} y={potRow}
                       midiConfig={midiConstants.MAIN_PANEL.POT3}
                       ctrlGroup={ControllerGroupIds.MAIN_DISP}
                       ctrlId={MainDisplayControllerIds.POT3}
                       resolution={getPotResolution(MainDisplayControllerIds.POT3)}
    />
    <RotaryPotWOLeds17 x={displayCenter + 1 * potSpacing} y={potRow}
                       midiConfig={midiConstants.MAIN_PANEL.POT4}
                       ctrlGroup={ControllerGroupIds.MAIN_DISP}
                       ctrlId={MainDisplayControllerIds.POT4}
                       resolution={getPotResolution(MainDisplayControllerIds.POT4)}
    />
    <RotaryPotWOLeds17 x={displayCenter + 2 * potSpacing} y={potRow}
                       midiConfig={midiConstants.MAIN_PANEL.POT5}
                       ctrlGroup={ControllerGroupIds.MAIN_DISP}
                       ctrlId={MainDisplayControllerIds.POT5}
                       resolution={getPotResolution(MainDisplayControllerIds.POT5)}
    />
    <RotaryPotWOLeds32 x={displayCenter} y={masterPotRow}
                       midiConfig={midiConstants.MAIN_PANEL.POT6}
                       ctrlGroup={ControllerGroupIds.MAIN_DISP}
                       ctrlId={MainDisplayControllerIds.POT6}
                       resolution={getPotResolution(MainDisplayControllerIds.POT6)}
    />

    <RoundPushButton8 onClick={onClick} x={displayCenter - 2.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Home" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.FUNC_HOME}/>
    <RoundPushButton8 x={displayCenter - 1.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Settings" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.FUNC_SETTINGS}/>
    <RoundPushButton8 x={displayCenter + 1.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Load" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.FUNC_LOAD}/>
    <RoundPushButton8 x={displayCenter + 2.5 * buttonSpacing} y={ctrlSwitchesRow1} label="Save" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.FUNC_SAVE}/>

    <RoundPushButton8 x={displayCenter - 2.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Shift" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.FUNC_SHIFT}/>
    <RoundPushButton8 x={displayCenter - 1.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Perform" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.FUNC_PERFORM}/>
    <RoundPushButton8 x={displayCenter + 1.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Compare" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.FUNC_COMPARE}/>
    <RoundPushButton8 x={displayCenter + 2.5 * buttonSpacing} y={ctrlSwitchesRow2} label="Route" labelPosition="bottom" midiConfig={midiConstants.MAIN_PANEL.FUNC_ROUTE}/>
  </>;
});

export default MainDisplay;