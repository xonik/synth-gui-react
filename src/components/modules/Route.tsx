import React from 'react';
import RotaryPot12 from '../pots/RotaryPot12';
import { ControllerGroupIds } from '../../synthcore/types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectModsUi } from '../../synthcore/modules/mods/modsReducer'
import modsControllers from '../../synthcore/modules/mods/modsControllers'
import SubHeader from "../misc/SubHeader";
import RoundLedPushButton8 from "../buttons/RoundLedPushButton8";
import { PADDING_LEFT, POT_DISTANCE_M, POT_OFFSET_Y, ROW_HEIGHT, ROW_SPACING } from "../../constants";

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.MODS

const Route = ({ x, y }: Props) => {

    const route = useAppSelector(selectModsUi)

    return <svg x={x} y={y}>
        <rect x={0} y={0} width={50} height={ROW_HEIGHT - ROW_SPACING} className="module-background"/>
        <SubHeader label="Route" x={0} y={0} width={50} labelPosition="left"/>

        <RoundLedPushButton8 labelPosition="bottom-pot" x={PADDING_LEFT} y={POT_OFFSET_Y} hasOff
                             ctrlGroup={ctrlGroup}
                             ctrl={modsControllers.ROUTE_BUTTON}
                             value={route.routeButton}
        />

        <RotaryPot12 ledMode="single" potMode="pan" label="Amount" x={PADDING_LEFT + POT_DISTANCE_M} y={POT_OFFSET_Y}
                     ctrlGroup={ctrlGroup}
                     ctrl={modsControllers.UI_AMOUNT}
                     value={route.amount}
        />

    </svg>;
};

export default Route;