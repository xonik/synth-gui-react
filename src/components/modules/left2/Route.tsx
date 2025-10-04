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

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.MODS

const Route = ({ x, y }: Props) => {

    const route = useAppSelector(selectModsUi)

    return <>
        {/*!SHOW_CUT && <rect x={x} y={y} width={64} height={ROW_HEIGHT - ROW_SPACING} className="module-background"/>*/}
        <SubHeader label="Route" x={x} y={y} width={64} labelPosition="left"/>

        <RoundLedPushButton8 labelPosition="bottom-pot" x={x + PADDING_LEFT} y={y + POT_OFFSET_Y} hasOff
                             label="Source"
                             ctrlGroup={ctrlGroup}
                             ctrl={modsControllers.ROUTE_BUTTON}
                             value={route.routeButton}
        />

        <RoundLedPushButton8 labelPosition="bottom-pot" x={x + PADDING_LEFT + BUTTON_DISTANCE_S} y={y + POT_OFFSET_Y} hasOff
                             label="Dest"
                             ctrlGroup={ctrlGroup}
                             ctrl={modsControllers.ROUTE_BUTTON}
                             value={route.routeButton}
        />

        <RotaryPot12 ledMode="single" potMode="pan" label="Amount" x={x + PADDING_LEFT + POT_DISTANCE_L}
                     y={y + POT_OFFSET_Y}
                     ctrlGroup={ctrlGroup}
                     ctrl={modsControllers.UI_AMOUNT}
                     value={route.amount}
        />
    </>;
};

export default Route;