import RotaryPotWithLedRingBase, { Props } from './RotaryPotWithLedRingBase';

class RotaryPot17 extends RotaryPotWithLedRingBase {
    constructor(props: Props) {
        super(
            props,
            {
                knobRadius: 20,
                ledCount: 55,
            }
        );
    }
}

export default RotaryPot17