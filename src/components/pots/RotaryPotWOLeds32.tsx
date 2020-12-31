import RotaryPotWOLeds, { Props }  from './RotaryPotWOLeds';

class RotaryPotWOLeds32 extends RotaryPotWOLeds {
    constructor(props: Props) {
        super(
            props,
            {
                knobRadius: 16,
            }
        );
    }
}

export default RotaryPotWOLeds32