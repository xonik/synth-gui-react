import React from 'react'
import RotaryPotWithLedRingBase, { Props } from './RotaryPotWithLedRingBase';

const RotaryPot21 = (props: Props) => <RotaryPotWithLedRingBase
    knobRadius={10.5}
    ledCount={32}
    windowToKnobMargin={1.5}
    windowWidth={2.5}
    {...props}
/>

export default RotaryPot21