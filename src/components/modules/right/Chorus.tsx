import React from 'react';
import RotaryPot12 from '../../pots/RotaryPot12';
import Header from '../../misc/Header';
import RoundPushButton8 from '../../buttons/RoundPushButton8';
import { ControllerGroupIds } from '../../../synthcore/types'
import commonFxControllers from '../../../synthcore/modules/commonFx/commonFxControllers'
import { POT_DISTANCE_L, POT_DISTANCE_M, POT_OFFSET_Y, ROW_HEIGHT } from "../../../constants";
import SubHeader from "../../misc/SubHeader";
import { ModuleBorder } from "../../misc/ModuleBorder";
import { ModuleProps } from "../types";

const ctrlGroup = ControllerGroupIds.COMMON_FX

const Chorus = ({ x, y, height, width }: ModuleProps) => {

    const row1 = y + POT_OFFSET_Y;
    const row2 = row1 + ROW_HEIGHT;
    const col1 = x + POT_DISTANCE_M / 2;
    const col2 = col1 + POT_DISTANCE_L;

    return <>
        <ModuleBorder x={x} y={y} height={height} width={width}/>
        <SubHeader label="Chorus" x={x} y={y} width={width}/>
        <RoundPushButton8 label="Source" labelPosition="bottom" x={col1} y={row1} ledCount={2} ledPosition="right" ledLabels={['FX1', 'FX2']}
                          ctrlGroup={ctrlGroup}
                          ctrl={commonFxControllers.CHORUS.SOURCE}
        />

        <RoundPushButton8 label="Mode" labelPosition="bottom"
                          x={col1} y={row2} ledCount={2} ledPosition="right" ledLabels={['Chorus', 'Vibrato']}
                          ctrlGroup={ctrlGroup}
                          ctrl={commonFxControllers.CHORUS.MODE}
        />

        <RotaryPot12 ledMode="single" label="Rate" x={col2} y={row1}
                     ctrlGroup={ctrlGroup}
                     ctrl={commonFxControllers.CHORUS.RATE}
        />

        <RotaryPot12 ledMode="single" label="Depth" x={col2} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrl={commonFxControllers.CHORUS.DEPTH}
        />
    </>;
};

export default Chorus;