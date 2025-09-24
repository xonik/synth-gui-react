import React from 'react';
import RotaryPot12 from '../pots/RotaryPot12';
import { ControllerGroupIds } from '../../synthcore/types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectModsUi } from '../../synthcore/modules/mods/modsReducer'
import modsControllers from '../../synthcore/modules/mods/modsControllers'
import SubHeader from "../misc/SubHeader";
import RoundLedPushButton8 from "../buttons/RoundLedPushButton8";

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.MODS

const Route = ({ x, y }: Props) => {

    const route = useAppSelector(selectModsUi)

    return <svg x={x} y={y}>
        <SubHeader label="Route" x={0} y={0} width={45} labelPosition="left"/>

        <RoundLedPushButton8 labelPosition="bottom-pot" x={10} y={17.5} hasOff
                             ctrlGroup={ctrlGroup}
                             ctrl={modsControllers.ROUTE_BUTTON}
                             value={route.routeButton}
        />

        <RotaryPot12 ledMode="single" potMode="pan" label="Amount" x={30} y={17.5}
                     ctrlGroup={ctrlGroup}
                     ctrl={modsControllers.UI_AMOUNT}
                     value={route.amount}
        />

    </svg>;
};

export default Route;