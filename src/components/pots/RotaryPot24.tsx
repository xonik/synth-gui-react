import React from 'react'
import RotaryPotWithLedRingBase, { Props } from './RotaryPotWithLedRingBase';

const RotaryPot24 = (props: Props) => <RotaryPotWithLedRingBase
    knobRadius={15}
    ledCount={47}
    windowToKnobMargin={1.5}
    {...props}
/>

export default RotaryPot24