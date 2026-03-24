import React from 'react';
import RotaryPot12 from '../pots/RotaryPot12';
import Header from '../misc/Header';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import { usePot, useButton } from '../../store/hooks'

interface Props {
    x: number,
    y: number
}

const BitCrusher = ({ x, y }: Props) => {

    const row1 = 10;
    const row2 = 30;
    const row3 = 40;
    const col1 = 10;
    const col2 = col1 + 25;
    const col3 = col2 + 27.5;

    const { value: sourceValue, toggle: sourceToggle } = useButton(
        s => s.fx.bitCrusher.in,
        (s, v) => { s.fx.bitCrusher.in = v },
        2
    )
    const { displayValue: bitsValue, increment: bitsIncrement } = usePot(
        s => s.fx.bitCrusher.bits,
        (s, v) => { s.fx.bitCrusher.bits = v },
    )
    const { displayValue: rateValue, increment: rateIncrement } = usePot(
        s => s.fx.bitCrusher.rate,
        (s, v) => { s.fx.bitCrusher.rate = v },
    )

    return <svg x={x} y={y}>
        <Header label="Bit crusher" x={25} y={row1} width={50}/>
        <RoundPushButton8 x={col1} y={row3} ledCount={2} ledPosition="top" ledLabels={['FX1', 'FX2']}
                          value={sourceValue}
                          onButtonClick={sourceToggle}
        />

        <RotaryPot12 ledMode="single" label="Bits" x={col2} y={row2}
                     value={bitsValue}
                     onValueIncrement={bitsIncrement}
        />

        <RotaryPot12 ledMode="single" label="Rate" x={col3} y={row2}
                     value={rateValue}
                     onValueIncrement={rateIncrement}
        />

    </svg>;
};

export default BitCrusher;
