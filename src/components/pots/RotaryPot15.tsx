import React from 'react'
import RotaryPotWithLedRingBase, { Props } from './RotaryPotWithLedRingBase';

const RotaryPot15 = (props: Props) => <RotaryPotWithLedRingBase
    knobRadius={7.5}
    windowToKnobMargin={1.5}
    {...props}
/>

export default RotaryPot15