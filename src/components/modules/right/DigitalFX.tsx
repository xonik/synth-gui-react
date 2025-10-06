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
import { BUTTON_DISTANCE_S, POT_DISTANCE_M, POT_OFFSET_Y, ROW_HEIGHT } from "../../../constants";
import "../Modules.scss"

const ctrlGroup = ControllerGroupIds.COMMON_FX

const DigitalFX = ({ x, y, height, width }: ModuleProps) => {

    const displayHeight = 30;
    const displayWidth = 70;

    const row1 = y + POT_OFFSET_Y;
    const row2 = row1 + ROW_HEIGHT;

    const displayX = x + width / 2 - displayWidth / 2;
    const displayY = y + 10;

    const col1 = x + 12.5;
    const col2 = x + 7.5 + POT_DISTANCE_M
    const col3 = col2 + POT_DISTANCE_M
    const col4 = col3 + POT_DISTANCE_M
    const col5 = col4 + BUTTON_DISTANCE_S

    return <>
        <ModuleBorder x={x} y={y} height={height} width={width} className="shared-elements-border"/>
        <SubHeader label="DSP" x={x} y={y} width={width}/>

        <RoundPushButton8 x={col1} y={row1} label="DSP" ledCount={2}
                          labelPosition="bottom-pot" ledPosition="top-horizontal-no-label"
                          ctrlGroup={ctrlGroup}
                          ctrl={commonFxControllers.DSP2.SOURCE}
        />

        <RoundPushButton8 x={col1} y={row2} label="Source" ledCount={2} ledLabels={['FX1', 'FX2']}
                          labelPosition="bottom-pot" ledPosition="top-horizontal"
                          ctrlGroup={ctrlGroup}
                          ctrl={commonFxControllers.DSP2.SOURCE}
        />

        {<Display x={displayX} y={displayY} width={displayWidth} height={displayHeight}/>}

        <RotaryPotWOLeds10 x={col2} y={row2}
                           ctrlGroup={ctrlGroup}
                           ctrl={commonFxControllers.DSP2.PARAM1}
        />

        <RotaryPotWOLeds10 x={col3} y={row2}
                           ctrlGroup={ctrlGroup}
                           ctrl={commonFxControllers.DSP2.PARAM2}
        />

        <RotaryPotWOLeds10 x={col4} y={row2}
                           ctrlGroup={ctrlGroup}
                           ctrl={commonFxControllers.DSP2.PARAM3}
        />
        {/*
        <RoundLedPushButton8 x={col5} y={displayCenterY} label="Chain" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={commonFxControllers.DSP2.CHAIN}
        />*/}

        <RotaryPotWOLeds10 x={col5} y={row1} label="Effect"
                           ctrlGroup={ctrlGroup}
                           ctrl={commonFxControllers.DSP2.EFFECT}
        />

    </>;
};

export default DigitalFX;