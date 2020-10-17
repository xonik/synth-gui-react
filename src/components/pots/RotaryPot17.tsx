import RotaryPotWithLedRingBase, { Props } from './RotaryPotWithLedRingBase';

class RotaryPot17 extends RotaryPotWithLedRingBase {
    constructor(props: Props) {
        super(
            props,
            {
                knobRadius: 8.5
            }
        );
    }
}

export default RotaryPot17