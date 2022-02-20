import React from 'react';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import Header from '../misc/Header';
import RotaryPot17 from '../pots/RotaryPot17';
import { ControllerGroupIds } from '../../synthcore/types'
import modsControllers from '../../synthcore/modules/mods/modsControllers'

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.MODS

const Route = ({ x, y }: Props) => {

    return <svg x={x} y={y}>
        <Header label="Route" x={0} y={0} width={50}/>
        <RoundLedPushButton8 labelPosition="bottom" x={10} y={17.5} label="From" hasOff radioButtonIndex={0}
                             ctrlGroup={ctrlGroup}
                             ctrl={modsControllers.ROUTE_BUTTON}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={10} y={37.5} label="To" hasOff radioButtonIndex={1}
                             ctrlGroup={ctrlGroup}
                             ctrl={modsControllers.ROUTE_BUTTON}
        />

        <RotaryPot17 ledMode="single" label="Amount" x={35} y={30}
                     ctrlGroup={ctrlGroup}
                     ctrl={modsControllers.UI_AMOUNT}
        />

    </svg>;
};

export default Route;