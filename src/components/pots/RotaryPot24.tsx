import React from 'react'
import RotaryPotWithLedRingBase, { Props } from './RotaryPotWithLedRingBase';

const RotaryPot24 = (props: Props) => <RotaryPotWithLedRingBase
    knobRadius={12}
    ledCount={47}
    windowToKnobMargin={1.5}
    silver
    {...props}
/>

export default RotaryPot24