import React from 'react'
import RotaryPotWithLedRingBase, { Props } from './RotaryPotWithLedRingBase';

export default (props: Props) => <RotaryPotWithLedRingBase
    knobRadius={5}
    ledCount={19}
    windowToKnobMargin={1}
    windowWidth={3}
    {...props} />