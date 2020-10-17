import React from 'react';
import classNames from 'classnames';
import arc from '../../utils/svg/arc';
import './RotaryPot.scss';

type LedMode = 'single' | 'multi';
type PotMode = 'normal' | 'pan' | 'spread';

export interface Props {
    x: number;
    y: number;
    ledMode?: LedMode
    potMode?: PotMode
    label: string
    position: number;
}

interface Config {
    knobRadius: number;
    ledCount?: number;
    ledArc?: number;
    windowToKnobMargin?: number;
    windowWidth?: number;
}

class RotaryPotBase extends React.Component<any, any> {
    knobRadius: number;
    ledRadius: number;
    ledCount: number;
    ledArc: number;
    centerLed: number;
    ledRingRadius: number;
    ledAngles: number[];
    windowArc: string;
    windowWidth: number;
    labelY: number;

    constructor(props: Props, config: Config) {
        super(props);
        const knobRadius = config.knobRadius;
        const ledCount = config.ledCount || 31;
        const ledArc = config.ledArc || 270;
        const windowToKnobMargin = config.windowToKnobMargin || 2;
        const windowWidth = config.windowWidth || 4;

        this.ledRadius = 0.4;
        this.knobRadius = knobRadius;
        this.ledCount = ledCount;
        this.ledArc = ledArc;
        this.centerLed = (ledCount - 1) / 2;
        this.windowWidth = windowWidth;
        this.ledRingRadius = knobRadius + windowToKnobMargin + this.windowWidth / 2;

        // TODO: Dynamically calculate this based on window
        // TODO: Set font size in relative units...
        this.labelY = this.ledRingRadius + 5;

        const degreesBetweenLeds = ledArc / (ledCount - 1);
        const ledAngles = [];
        for (let i = 0; i < ledCount; i++) {
            ledAngles.push(-(ledArc / 2) + degreesBetweenLeds * i);
        }
        this.ledAngles = ledAngles;

        // Ideally the window should be a shape, not a path with a stroke, to be able to convert the
        // SVG into paths for cutting.

        // Distance from last led to the end should really be equal to the distance between two leds,
        // but for now it's just 2/3 the distance from the center of one led to the next.
        const windowStartAngle = -ledArc / 2 - 2 * (degreesBetweenLeds / 3);
        const windowEndAngle = windowStartAngle * -1;
        this.windowArc = arc(0, 0, this.ledRingRadius, windowStartAngle, windowEndAngle);
    }

    getLedPos(mode: PotMode, position: number): number {
        const centerLed = this.centerLed;
        switch (mode) {
            case 'normal':
                return Math.abs(Math.ceil(position * (this.ledCount - 1) - 0.5));
            case 'pan': {
                // Done this way so that edge case for rounding is the same on both sides of center
                // Pan is sentered when position is 0.5.
                const panAmount = Math.round(Math.abs(2 * (position - 0.5) * centerLed));
                const sign = position >= 0.5 ? 1 : -1;
                return centerLed + (panAmount * sign);
            }
            case 'spread': {
                // Done this way so that edge case for rounding is the same on both sides of center
                // Spread goes from 0 to 1 where 0 is senter and 1 is max spread.
                const panAmount = Math.round(Math.abs((position) * centerLed));
                return centerLed + panAmount;
            }
        }
        return 0;
    }

    render() {
        // Position should be in the range 0-1 in all modes but pan. In pan the range is -0.5 - 0.5
        const { x, y, ledMode = 'single', potMode = 'normal', label, position } = this.props;
        const centerLed = this.centerLed;

        // For objects centered around 0, use overflow: visible
        // For scaling, use viewBox on the outer svg and unitless the rest of the way

        // positive pointer
        const ledPosition = this.getLedPos(potMode, position);

        // negative pointer used for spread
        const negLedPosition = this.centerLed - (ledPosition - this.centerLed);

        return (
            <svg x={x} y={y} className="pot">
                <circle cx="0" cy="0" r={this.knobRadius} className="pot-knob"/>
                <path d={this.windowArc} className="pot-ring-window"
                      strokeWidth={this.windowWidth}/>
                {this.ledAngles.map((angle, led) => {
                    const ledOn =
                        // pointer should always be on
                        (ledMode === 'single' && led === ledPosition) ||

                        // 'negative' pointer should be on for spread
                        (ledMode === 'single' && potMode === 'spread' && led === negLedPosition) ||

                        // highlight all from start to position
                        (ledMode === 'multi' && potMode === 'normal' && led <= ledPosition) ||

                        // highlight all from center to position when panning
                        (ledMode === 'multi' && potMode === 'pan' && (
                            (ledPosition >= centerLed && led >= centerLed && led <= ledPosition) ||
                            (ledPosition <= centerLed && led <= centerLed && led >= ledPosition)
                        )) ||

                        // highlight all from center to pointer on both sides when spreading
                        (ledMode === 'multi' && potMode === 'spread' && (
                            (led >= negLedPosition) && (led <= ledPosition)
                        ));

                    return <circle
                        cx="0" cy={-this.ledRingRadius} r={this.ledRadius} stroke="black" fill="red"
                        transform={`rotate(${angle})`}
                        className={classNames('pot-ring-led', { 'pot-ring-led__on': ledOn })}/>;
                })}
                <text x="0" y={this.labelY} className="pot-label" textAnchor="middle">{label}</text>
            </svg>
        );
    }
}

export default RotaryPotBase;