import React from 'react';
import RotaryPotWOLeds10 from '../../pots/RotaryPotWOLeds10';
import Display from '../../misc/Display';
import RoundLedPushButton8 from '../../buttons/RoundLedPushButton8';
import RoundPushButton8 from '../../buttons/RoundPushButton8';
import { ControllerGroupIds } from '../../../synthcore/types'
import commonFxControllers from '../../../synthcore/modules/commonFx/commonFxControllers'
import { ModuleBorder } from "../../misc/ModuleBorder";
import { ModuleProps } from "../types";
import SubHeader from "../../misc/SubHeader";

const ctrlGroup = ControllerGroupIds.COMMON_FX

const DigitalFX = ({ x, y, height, width }: ModuleProps) => {

    const displayHeight = 40;
    const displayWidth = 80;

    const row1 = y;

    const displayX = x + 20;
    const displayY = row1 + 10;


    const row4 = row1 + displayHeight + 20;

    const displayCenterY = displayY + displayHeight / 2;
    const row2left = displayCenterY - 15;
    const row3left = displayCenterY + 15;
    const row1right = displayCenterY - 20;
    const row4right = displayCenterY + 20;

    const knobSpacing = 25;
    const col1 = x + 5;
    const col2 = displayX + displayWidth / 2 - knobSpacing;
    const col3 = displayX + displayWidth / 2;
    const col4 = displayX + displayWidth / 2 + knobSpacing;
    const col5 = displayX + displayWidth + 15

    return <>
        <ModuleBorder x={x} y={y} height={height} width={width}/>
        <SubHeader label="Effects" x={x} y={y} width={width}/>
        <RoundPushButton8 x={col1} y={row3left} label="Source" ledCount={2} ledLabels={['FX1', 'FX2']}
                          labelPosition="bottom" ledPosition="top"
                          ctrlGroup={ctrlGroup}
                          ctrl={commonFxControllers.DSP2.SOURCE}
        />

        <Display x={displayX} y={displayY} width={displayWidth} height={displayHeight}/>

        <RotaryPotWOLeds10 x={col2} y={row4}
                           ctrlGroup={ctrlGroup}
                           ctrl={commonFxControllers.DSP2.PARAM1}
        />

        <RotaryPotWOLeds10 x={col3} y={row4}
                           ctrlGroup={ctrlGroup}
                           ctrl={commonFxControllers.DSP2.PARAM2}
        />

        <RotaryPotWOLeds10 x={col4} y={row4}
                           ctrlGroup={ctrlGroup}
                           ctrl={commonFxControllers.DSP2.PARAM3}
        />
        <RoundLedPushButton8 x={col5} y={displayCenterY} label="Chain" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={commonFxControllers.DSP2.CHAIN}
        />

        <RotaryPotWOLeds10 x={col5} y={row4right} label="Effect"
                           ctrlGroup={ctrlGroup}
                           ctrl={commonFxControllers.DSP2.EFFECT}
        />

    </>;
};

export default DigitalFX;