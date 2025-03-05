import React from 'react'
import RotaryPotWithLedRingBase, { Props } from './RotaryPotWithLedRingBase';

const RotaryPot12 = (props: Props) => <RotaryPotWithLedRingBase
    knobRadius={6}
    ledCount={19}
    windowToKnobMargin={1.5}
    windowWidth={2.5    }
    {...props} />

export default RotaryPot12