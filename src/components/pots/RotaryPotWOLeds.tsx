import RotaryPotBase from './RotaryPotBase';
import React from 'react';
import './RotaryPot.scss';

export interface Props {
    x: number,
    y: number,
    label?: string,
}

interface Config {
    knobRadius: number;
}

class RotaryPotWOLeds extends React.Component<any, any> {

    knobRadius: number;
    labelY: number;

    constructor(props: Props, config: Config) {
        super(props);
        this.knobRadius = config.knobRadius;
        this.labelY = config.knobRadius + 5;
    }

    render() {
        console.log(this.props)
        const { x, y, label } = this.props;
        console.log('label', label)
        return <svg x={x} y={y} className="pot">
            <RotaryPotBase knobRadius={this.knobRadius}/>
            {label && <text x="0" y={this.labelY} className="pot-label" textAnchor="middle">{label}</text>}
        </svg>;
    }
}

export default RotaryPotWOLeds;