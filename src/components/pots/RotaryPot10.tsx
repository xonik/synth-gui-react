import RotaryPotWithLedRingBase, { Props } from './RotaryPotWithLedRingBase';

class RotaryPot17 extends RotaryPotWithLedRingBase {
    constructor(props: Props) {
        super(
            props,
            {
                knobRadius: 5,
                ledCount: 19,
                windowToKnobMargin: 1,
                windowWidth: 3,
            }
        );
    }
}

export default RotaryPot17