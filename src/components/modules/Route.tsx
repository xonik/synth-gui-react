import React from 'react';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import Header from '../misc/Header';
import RotaryPot12 from '../pots/RotaryPot12';
import { ControllerGroupIds } from '../../synthcore/types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectModsUi } from '../../synthcore/modules/mods/modsReducer'
import modsControllers from '../../synthcore/modules/mods/modsControllers'

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.MODS

const Route = ({ x, y }: Props) => {

    const route = useAppSelector(selectModsUi)

    return <svg x={x} y={y}>
        <Header label="Route" x={0} y={0} width={45}/>
        <RoundLedPushButton8 labelPosition="bottom" x={10} y={17.5} label="From" hasOff radioButtonIndex={0}
                             ctrlGroup={ctrlGroup}
                             ctrl={modsControllers.ROUTE_BUTTON}
                             value={route.routeButton}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={10} y={35} label="To" hasOff radioButtonIndex={1}
                             ctrlGroup={ctrlGroup}
                             ctrl={modsControllers.ROUTE_BUTTON}
                             value={route.routeButton}
        />

        <RotaryPot12 ledMode="single" potMode="pan" label="Amount" x={30} y={25}
                     ctrlGroup={ctrlGroup}
                     ctrl={modsControllers.UI_AMOUNT}
                     value={route.amount}
        />

    </svg>;
};

export default Route;