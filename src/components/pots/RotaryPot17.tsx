import RotaryPotBase, { Props } from './RotaryPotBase';

class RotaryPot17 extends RotaryPotBase {
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