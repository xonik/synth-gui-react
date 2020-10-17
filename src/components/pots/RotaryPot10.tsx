import RotaryPotBase, { Props } from './RotaryPotBase';

class RotaryPot17 extends RotaryPotBase {
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