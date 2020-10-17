import RotaryPotBase, { Props } from './RotaryPotBase';

class RotaryPot17 extends RotaryPotBase {
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