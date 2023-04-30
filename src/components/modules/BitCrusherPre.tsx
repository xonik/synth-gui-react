import React from 'react';
import RotaryPot15 from '../pots/RotaryPot15';
import Header from '../misc/Header';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import { ControllerGroupIds } from '../../synthcore/types'
import fxControllers from '../../synthcore/modules/fx/fxControllers'
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8'

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.FX

const BitCrusherPre = ({ x, y }: Props) => {

    const row1 = y;
    const row2 = row1+30;

    const col1 = x + 7;
    const col2 = col1 + 26;
    const col3 = col2 + 40;
    const col4 = col3 + 22.5;
    const col5 = col4 + 22.5;
    const col6 = col5 + 25;

    return <>
        <Header label="Bit crusher" x={x} y={row1} width={150}/>
        <RoundPushButton8 x={col1} y={row2 + 8} ledPosition="top" ledCount={2} label="In" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={fxControllers.BIT_CRUSHER.IN}
        />

        <RotaryPot15 ledMode="single" ledCount={12} label="Bits" x={col2} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrl={fxControllers.BIT_CRUSHER.BITS}
        />

        <RotaryPot15 ledMode="single" label="Rate" x={col3} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrl={fxControllers.BIT_CRUSHER.RATE}
        />

        <RoundLedPushButton8 x={col4} y={row2 +8}
                             label="Recon"
                             labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={fxControllers.BIT_CRUSHER.RECON}
        />

        <RotaryPot15 ledMode="multi" label="Level" x={col5} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrl={fxControllers.BIT_CRUSHER.LEVEL}
        />

        <RoundPushButton8 x={col6} y={row2 + 8} ledPosition="top" ledCount={2} label="Out" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          hasOff
                          ctrl={fxControllers.BIT_CRUSHER.OUT}
        />

    </>;
};

export default BitCrusherPre;