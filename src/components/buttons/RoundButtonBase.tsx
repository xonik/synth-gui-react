import React from 'react';
import './RoundButton.scss';

type LedPosition = 'left' | 'right' | 'top' | 'bottom' | undefined;
type LabelPosition = 'left' | 'right' | 'top' | 'bottom' | undefined;

export interface Props {
  x: number;
  y: number;
  label?: string;
  labelPosition?: LabelPosition;
  ledCount?: number;
  ledLabels?: string[];
  ledPosition?: LedPosition;
  on?: boolean[];
}

interface Config {
  buttonRadius: number;
  ledMargin?: number; // margin button-led
  ledToLedMargin?: number; // vertical spacing
  labelMargin?: number; // margin button-label
}

class RotaryPotBase extends React.Component<any, any> {
  buttonRadius: number;
  ledRadius: number;
  labelPos: { x: number, y: number, textAnchor: string };
  ledPos: { x: number, y: number, textAnchor: string }[];

  constructor(props: Props, config: Config) {
    super(props);
    const buttonRadius = config.buttonRadius;

    const labelMargin = config.labelMargin || 2;
    const labelPosition = props.labelPosition || 'left';

    const ledCount = props.ledCount || 0;
    const ledToLedMargin = config.ledToLedMargin || 2;
    const ledMargin = config.ledMargin || 2;
    const ledPosition = props.ledPosition || 'left';

    this.ledRadius = 1.5;
    this.buttonRadius = buttonRadius;
    this.labelPos = this.positionLabel(labelPosition, labelMargin);
    this.ledPos = this.positionLeds(ledCount, ledPosition, ledMargin, ledToLedMargin);

  }

  private positionLabel(labelPosition: LabelPosition, labelMargin: number) {
    switch (labelPosition) {
      case 'left':
        return {
          x: -(this.buttonRadius + labelMargin + 2),
          y: 0,
          textAnchor: 'end'
        };
      case 'right':
        return {
          x: this.buttonRadius + labelMargin + 2,
          y: 0,
          textAnchor: 'start'
        };
      case 'top':
        return {
          x: 0,
          y: -(this.buttonRadius + labelMargin + 3),
          textAnchor: 'middle'
        };
      case 'bottom':
        return {
          x: 0,
          y: this.buttonRadius + labelMargin + 3,
          textAnchor: 'middle'
        };
      default:
        return { x: 0, y: 0, textAnchor: 'right' };
    }
  }

  private positionLeds(ledCount: number, ledPosition: LedPosition, ledMargin: number, ledToLedMargin: number) {
    if (ledCount === 0) {
      return [];
    }

    const yDist = 2 * this.ledRadius + ledToLedMargin;
    const ledPositions = [];

    for (let i = 0; i < ledPosition; i++) {

      switch (ledPosition) {
        case 'left':
          ledPositions.push({
            x: -(this.buttonRadius + ledMargin + 2),
            y: (i - (ledCount - 1) / 2) * yDist,
            textAnchor: 'end'
          });
          break;
        case 'right':
          ledPositions.push({
            x: this.buttonRadius + ledMargin + 2,
            y: (i - (ledCount - 1) / 2) * yDist,
            textAnchor: 'start'
          });
          break;
        case 'top':
          ledPositions.push({
            x: 0,
            y: -(ledCount + i) * yDist - (this.buttonRadius + ledMargin + 3),
            textAnchor: 'middle'
          });
          break;
        case 'bottom':
          ledPositions.push({
            x: 0,
            y: i * yDist + this.buttonRadius + ledMargin + 3,
            textAnchor: 'middle'
          });
          break;
        default:
          ledPositions.push({ x: 0, y: 0, textAnchor: 'right' });
      }
    }
    return ledPositions;
  }

  render() {
    const { x, y, label } = this.props;

    // For objects centered around 0, use overflow: visible
    // For scaling, use viewBox on the outer svg and unitless the rest of the way

    /*
    return <circle
        cx="0" cy={-this.ledRingRadius} r={this.ledRadius} stroke="black" fill="red"
        transform={`rotate(${angle})`}
        className={classNames('pot-ring-led', { 'pot-ring-led__on': ledOn })}/>;
     */
    return (
      <svg x={x} y={y} className="button">
        <circle cx="0" cy="0" r={this.buttonRadius} className="button-cap"/>
        {label && <text
          x={this.labelPos.x}
          y={this.labelPos.y}
          className="button-label"
          textAnchor={this.labelPos.textAnchor}
          alignmentBaseline="middle"
        >{label}</text>}
      </svg>
    );
  }
}

export default RotaryPotBase;