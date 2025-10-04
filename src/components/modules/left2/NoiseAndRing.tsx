import React from 'react'
import RoundPushButton8 from '../../buttons/RoundPushButton8'
import { ControllerGroupIds } from '../../../synthcore/types'
import noiseControllers from '../../../synthcore/modules/noise/noiseControllers'
import SubHeader from "../../misc/SubHeader";
import {
    POT_DISTANCE_L,
    POT_DISTANCE_M,
    POT_OFFSET_Y,
    ROW_HEIGHT,
} from "../../../constants";
import { SHOW_CUT } from "../../../config";
import { VerticalDividerLine } from "../../misc/VerticalDividerLine";
import ringModControllers from "../../../synthcore/modules/ringMod/ringModControllers";
import { ModuleProps } from "../types";
import { ModuleBorder } from "../../misc/ModuleBorder";

const ctrlGroup = ControllerGroupIds.NOISE

const NoiseAndRing = ({ x, y, width, height }: ModuleProps) => {

    const center = x + width / 2

    const col1 = x + POT_DISTANCE_M / 2
    const col2 = col1 + POT_DISTANCE_L

    return <>
        <ModuleBorder x={x} y={y} height={height} width={width}/>
        <SubHeader
            label="Noise" labelPosition="center" labelWidth={15}
            x={x} y={y}
            width={width / 2}
            padding="left"
        />

        <RoundPushButton8 x={col1} y={y + POT_OFFSET_Y}
                          ledPosition="right" ledCount={3} ledLabels={['White', 'Pink', 'Red']}
                          label="" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={noiseControllers.COLOUR}
        />
        <VerticalDividerLine x={center} y={y} length={ROW_HEIGHT}/>

        <SubHeader
            label="Ring" labelPosition="center" labelWidth={15}
            x={center} y={y}
            width={width / 2}
            padding="right"
        />
        <RoundPushButton8 x={col2} y={y + POT_OFFSET_Y}
                          ledPosition="right" ledCount={3} ledLabels={['1 -> 2', 'E -> 2', '3 -> 2']}
                          label="" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={ringModControllers.SOURCE}
        />

    </>
}

export default NoiseAndRing