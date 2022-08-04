import React from 'react'
import RotaryPotWithLedRingBase, { Props } from './RotaryPotWithLedRingBase';

const RotaryPot10 = (props: Props) => <RotaryPotWithLedRingBase
    knobRadius={5}
    ledCount={19}
    windowToKnobMargin={1.5}
    windowWidth={3}
    {...props} />

export default RotaryPot10