import React from 'react';
import RotaryPot10 from '../pots/RotaryPot10';
import Header from '../misc/Header';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import { ControllerGroupIds } from '../../synthcore/types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectBitCrusher } from '../../synthcore/modules/commonFx/commonFxReducer'
import { CommonFxControllerIds } from '../../synthcore/modules/commonFx/types'

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.COMMON_FX

const BitCrusher = ({ x, y }: Props) => {

    const row1 = 10;
    const row2 = 30;
    const row3 = 40;
    const col1 = 10;
    const col2 = col1 + 25;
    const col3 = col2 + 30;

    const bitCrusher = useAppSelector(selectBitCrusher)

    return <svg x={x} y={y}>
        <Header label="Bit crusher" x={25} y={row1} width={50}/>
        <RoundPushButton8 x={col1} y={row3} ledCount={2} ledPosition="top" ledLabels={['FX1', 'FX2']}
                          ctrlGroup={ctrlGroup}
                          ctrlId={CommonFxControllerIds.BIT_CRUSHER_SOURCE}
                          value={bitCrusher.source}
        />

        <RotaryPot10 ledMode="single" label="Bits" x={col2} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrlId={CommonFxControllerIds.BIT_CRUSHER_BITS}
                     value={bitCrusher.bits}
        />

        <RotaryPot10 ledMode="single" label="Rate" x={col3} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrlId={CommonFxControllerIds.BIT_CRUSHER_RATE}
                     value={bitCrusher.rate}
        />

    </svg>;
};

export default BitCrusher;