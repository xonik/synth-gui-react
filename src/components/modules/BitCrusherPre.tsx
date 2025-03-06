import React from 'react';
import Header from '../misc/Header';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import { ControllerGroupIds } from '../../synthcore/types'
import fxControllers from '../../synthcore/modules/fx/fxControllers'
import RotaryPot12 from "../pots/RotaryPot12";

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.FX

const BitCrusherPre = ({ x, y }: Props) => {

    const row1 = y;
    const row2 = row1+22;

    const col1 = x + 10;
    const col2 = col1 + 25;
    const col3 = col2 + 30;
    const col4 = col3 + 25;
    const col5 = col3 + 30;
    const col6 = col5 + 25;

    return <>
        <Header label="Bit crusher" x={x} y={row1} width={130}/>
        <RoundPushButton8 x={col1} y={row2 + 8} ledPosition="top" ledCount={2} label="In" labelPosition="bottom"
                          ledLabels={['S','L']}
                          ctrlGroup={ctrlGroup}
                          ctrl={fxControllers.BIT_CRUSHER.IN}
        />

        <RotaryPot12 ledMode="single" ledCount={12} label="Bits" x={col2} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrl={fxControllers.BIT_CRUSHER.BITS}
        />

        <RotaryPot12 ledMode="single" label="Rate" x={col3} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrl={fxControllers.BIT_CRUSHER.RATE}
        />

        {/*        <RoundLedPushButton8 x={col4} y={row2 + 3}
                             label="Recon"
                             labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={fxControllers.BIT_CRUSHER.RECON}
        />*/}

        <RotaryPot12 ledMode="multi" label="Level" x={col5} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrl={fxControllers.BIT_CRUSHER.LEVEL}
        />

        <RoundPushButton8 x={col6} y={row2 + 8} ledPosition="top" ledCount={2} label="Out" labelPosition="bottom"
                          ledLabels={['S','L']}
                          ctrlGroup={ctrlGroup}
                          hasOff
                          ctrl={fxControllers.BIT_CRUSHER.OUT}
        />

    </>;
};

export default BitCrusherPre;