import RotaryPotWithLedRingBase, { Props } from './RotaryPotWithLedRingBase';

class RotaryPot17 extends RotaryPotWithLedRingBase {
    constructor(props: Props) {
        super(
            props,
            {
                knobRadius: 16,
                ledCount: 47,
            }
        );
    }
}

export default RotaryPot17