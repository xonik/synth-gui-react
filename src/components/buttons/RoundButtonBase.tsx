import React from 'react';
import classNames from 'classnames';
import RoundPushButtonBase from './RoundPushButtonBase';
import RotaryPotBase from '../pots/RotaryPotBase';
import './RoundButton.scss';

type LedPosition = 'left' | 'right' | 'sides' | 'top' | 'bottom' | undefined;
type LabelPosition = 'left' | 'right' | 'top' | 'bottom' | undefined;
type ButtonMode = 'push' | 'rotate';

export interface Props {
  x: number;
  y: number;
  label?: string;
  labelPosition?: LabelPosition;
  ledCount?: number;
  ledLabels?: string[];
  ledPosition?: LedPosition;
  ledOn?: boolean[];
}

interface Config {
  buttonRadius: number;
  buttonMode: ButtonMode;
  ledMargin?: number; // margin button-led
  ledToLedMargin?: number; // vertical spacing
  labelMargin?: number; // margin button-label
  ledTolabelMargin?: number; // margin button-label
  ledButton?: boolean;
}

class RoundButtonBase extends React.Component<any, any> {
  buttonRadius: number;
  buttonMode: ButtonMode;
  ledRadius: number;
  labelPos: { x: number, y: number, textAnchor: string };
  ledPos: { x: number, y: number, labelX: number, textAnchor: string }[];
  ledOn: boolean[];
  ledLabels: string[];
  ledButton: boolean;

  constructor(props: Props, config: Config) {
    super(props);
    const buttonRadius = config.buttonRadius;

    const labelMargin = config.labelMargin || 2;
    const labelPosition = props.labelPosition || 'left';

    const ledCount = props.ledCount || 0;
    const ledToLedMargin = config.ledToLedMargin || 3;
    const ledMargin = config.ledMargin || 4;
    const ledTolabelMargin = config.ledTolabelMargin || 3;
    const ledPosition = props.ledPosition || 'left';

    this.ledRadius = 1.5;
    this.buttonRadius = buttonRadius;
    this.labelPos = this.positionLabel(labelPosition, labelMargin);
    this.ledPos = this.positionLeds(ledCount, ledPosition, ledMargin, ledToLedMargin, ledTolabelMargin);
    this.ledOn = props.ledOn || [];
    this.ledLabels = props.ledLabels || [];
    this.buttonMode = config.buttonMode;
    this.ledButton = config.ledButton || false;
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

  private positionLeds(
      ledCount: number,
      ledPosition: LedPosition,
      ledMargin: number,
      ledToLedMargin: number,
      ledTolabelMargin: number
  ) {
    if (ledCount === 0) {
      return [];
    }

    const yDist = 2 * this.ledRadius + ledToLedMargin;
    const ledPositions = [];

    for (let i = 0; i < ledCount; i++) {
      const leftLeds = Math.ceil(ledCount / 2);
      let adjustedPosition = ledPosition;
      let adjustedLedCount = ledCount;
      let adjustedI = i;
      if( ledPosition === 'sides' ) {
        if(i < leftLeds) {
          adjustedPosition = 'left';
          adjustedLedCount = leftLeds;
        } else {
          adjustedPosition = 'right';
          adjustedLedCount = ledCount - leftLeds;
          adjustedI = i - leftLeds;
        }
      }

      switch (adjustedPosition) {
        case 'left':
          ledPositions.push({
            x: -(this.buttonRadius + ledMargin + 2 + this.ledRadius),
            y: (adjustedI - (adjustedLedCount - 1) / 2) * yDist,
            labelX:  -(this.buttonRadius + ledMargin + 2 + ledTolabelMargin + 2 * this.ledRadius),
            textAnchor: 'end'
          });
          break;
        case 'right':
          ledPositions.push({
            x: this.buttonRadius + ledMargin + 2 + this.ledRadius,
            y: (adjustedI - (adjustedLedCount - 1) / 2) * yDist,
            labelX: this.buttonRadius + ledMargin + 2 + ledTolabelMargin + 2 * this.ledRadius,
            textAnchor: 'start'
          });
          break;
        case 'top':
          ledPositions.push({
            x: 0,
            y: -((ledCount - 1 - i) * yDist + this.buttonRadius + ledMargin + this.ledRadius),
            labelX: this.ledRadius + ledTolabelMargin,
            textAnchor: 'start'
          });
          break;
        case 'bottom':
          ledPositions.push({
            x: 0,
            y: i * yDist + this.buttonRadius + ledMargin + this.ledRadius,
            labelX: this.ledRadius + ledTolabelMargin,
            textAnchor: 'start'
          });
          break;
        default:
          ledPositions.push({ x: 0, y: 0, labelX: 0, textAnchor: 'right' });
      }
    }
    return ledPositions;
  }

  render() {
    const { x, y, label } = this.props;

    return (
      <svg x={x} y={y} className="button">
        {this.buttonMode === 'push'
          ? <RoundPushButtonBase buttonRadius={this.buttonRadius} className={classNames('button-cap', { 'button-cap-led': this.ledButton, 'button-cap-led__on': this.ledButton && this.ledOn.length > 0 && this.ledOn[0] })}/>
          : <RotaryPotBase knobRadius={this.buttonRadius} />
        }
        {label && <text
          x={this.labelPos.x}
          y={this.labelPos.y}
          className="button-label"
          textAnchor={this.labelPos.textAnchor}
          alignmentBaseline="middle"
        >{label}</text>}
        {this.ledPos.map((position, index) => <React.Fragment key={index}>
          <circle
            cx={position.x} cy={position.y} r={this.ledRadius} stroke="black" fill="red"
            className={classNames('button-led', { 'button-led__on': this.ledOn.length > index && this.ledOn[index] })}/>
          {this.ledLabels[index] && <text
            x={position.labelX}
            y={position.y}
            className="button-led-label"
            textAnchor={position.textAnchor}
            alignmentBaseline="middle"
          >{this.ledLabels[index]}</text>}
        </React.Fragment>)}
      </svg>
    );
  }
}

export default RoundButtonBase;