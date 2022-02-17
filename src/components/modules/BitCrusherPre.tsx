import React from 'react';
import RotaryPot10 from '../pots/RotaryPot10';
import RotaryPot17 from '../pots/RotaryPot17';
import Header from '../misc/Header';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import { ControllerGroupIds } from '../../synthcore/types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectBitCrusher } from '../../synthcore/modules/fx/fxReducer'
import { FxControllerIds } from '../../synthcore/modules/fx/types'

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.FX

const BitCrusherPre = ({ x, y }: Props) => {

    const row1 = y;
    const row2 = row1+30;

    const col1 = x + 7;
    const col2 = col1 + 20;
    const col3 = col2 + 20;
    const col4 = col3 + 30;
    const col5 = col4 + 25;

    const bitCrusher = useAppSelector(selectBitCrusher)

    return <>
        <Header label="Bit crusher" x={x} y={row1} width={110}/>
        <RoundPushButton8 x={col1} y={row2 + 8} ledPosition="top" ledCount={2} label="In" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={FxControllerIds.BIT_CRUSHER_IN}
                          storeValue={bitCrusher.in}
        />

        <RotaryPot10 ledMode="single" ledCount={12} label="Bits" x={col2} y={row2-10} position={0.7}
                     ctrlGroup={ctrlGroup}
                     ctrlId={FxControllerIds.BIT_CRUSHER_BITS}
                     storePosition={bitCrusher.bits}
        />

        <RotaryPot10 ledMode="single" label="Rate" x={col3} y={row2 + 5} position={0.4}
                     ctrlGroup={ctrlGroup}
                     ctrlId={FxControllerIds.BIT_CRUSHER_RATE}
                     storePosition={bitCrusher.rate}
        />

        <RotaryPot17 ledMode="multi" label="Level" x={col4} y={row2} position={0.4}
                     ctrlGroup={ctrlGroup}
                     ctrlId={FxControllerIds.BIT_CRUSHER_LEVEL}
                     storePosition={bitCrusher.level}
        />

        <RoundPushButton8 x={col5} y={row2 + 8} ledPosition="top" ledCount={2} label="Out" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={FxControllerIds.BIT_CRUSHER_OUT}
                          storeValue={bitCrusher.out}
        />

    </>;
};

export default BitCrusherPre;