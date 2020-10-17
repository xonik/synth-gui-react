import RotaryPotBase, { Props } from './RotaryPotBase';

class RotaryPot17 extends RotaryPotBase {
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