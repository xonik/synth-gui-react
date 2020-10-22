import RotaryPotWOLeds, { Props }  from './RotaryPotWOLeds';

class RotaryPotWOLeds10 extends RotaryPotWOLeds {
    constructor(props: Props) {
        super(
            props,
            {
                knobRadius: 8.5,
            }
        );
    }
}

export default RotaryPotWOLeds10