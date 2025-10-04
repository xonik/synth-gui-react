import React from 'react';
import RotaryPot12 from '../../pots/RotaryPot12';
import { ControllerGroupIds } from '../../../synthcore/types'
import { useAppSelector } from '../../../synthcore/hooks'
import { selectModsUi } from '../../../synthcore/modules/mods/modsReducer'
import modsControllers from '../../../synthcore/modules/mods/modsControllers'
import SubHeader from "../../misc/SubHeader";
import RoundLedPushButton8 from "../../buttons/RoundLedPushButton8";
import {
    BUTTON_DISTANCE_S,
    PADDING_LEFT, POT_DISTANCE_L,
    POT_DISTANCE_M,
    POT_OFFSET_Y,
    ROW_HEIGHT,
    ROW_SPACING
} from "../../../constants";
import { SHOW_CUT } from "../../../config";
import { ModuleProps } from "../types";
import { ModuleBorder } from "../../misc/ModuleBorder";

const ctrlGroup = ControllerGroupIds.MODS

const Route = ({ x, y, height, width }: ModuleProps) => {

    const route = useAppSelector(selectModsUi)

    const col1 = x + POT_DISTANCE_M / 2
    const col2 = col1 + BUTTON_DISTANCE_S
    const col3 = col1 + POT_DISTANCE_L

    return <>
        {/*!SHOW_CUT && <rect x={x} y={y} width={64} height={ROW_HEIGHT - ROW_SPACING} className="module-background"/>*/}
        <ModuleBorder x={x} y={y} height={height} width={width}/>
        <SubHeader label="Route" x={x} y={y} width={width} labelPosition="left" labelWidth={15}/>

        <RoundLedPushButton8 labelPosition="bottom-pot" x={col1} y={y + POT_OFFSET_Y} hasOff
                             label="Source"
                             ctrlGroup={ctrlGroup}
                             ctrl={modsControllers.ROUTE_BUTTON}
                             value={route.routeButton}
        />

        <RoundLedPushButton8 labelPosition="bottom-pot" x={col2} y={y + POT_OFFSET_Y} hasOff
                             label="Dest"
                             ctrlGroup={ctrlGroup}
                             ctrl={modsControllers.ROUTE_BUTTON}
                             value={route.routeButton}
        />

        <RotaryPot12 ledMode="single" potMode="pan" label="Amount" x={col3}
                     y={y + POT_OFFSET_Y}
                     ctrlGroup={ctrlGroup}
                     ctrl={modsControllers.UI_AMOUNT}
                     value={route.amount}
        />
    </>;
};

export default Route;