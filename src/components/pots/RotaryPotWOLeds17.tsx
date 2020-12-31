import RotaryPotWOLeds, { Props }  from './RotaryPotWOLeds';

class RotaryPotWOLeds17 extends RotaryPotWOLeds {
    constructor(props: Props) {
        super(
            props,
            {
                knobRadius: 8.5,
            }
        );
    }
}

export default RotaryPotWOLeds17