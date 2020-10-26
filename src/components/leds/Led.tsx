import React from 'react';
import classNames from 'classnames';
import './Led.scss';

type LabelPosition = 'left' | 'right' | 'top' | 'bottom' | undefined;

export interface Props {
  x: number;
  y: number;
  on?: boolean;
  label?: string;
  labelPosition?: LabelPosition;
}

interface Config {
  radius?: number;
  labelMargin?: number; // margin button-label
}

class RoundButtonBase extends React.Component<any, any> {
  radius: number;
  labelMargin: number;
  labelPos: { x: number, y: number, textAnchor: string };

  constructor(props: Props, config: Config) {
    super(props);
    this.radius = config.radius || 1.5;
    this.labelMargin = config.labelMargin || 2;
    this.labelPos = this.positionLabel(props.labelPosition || 'bottom', this.labelMargin);
  }

  private positionLabel(labelPosition: LabelPosition, labelMargin: number) {
    switch (labelPosition) {
      case 'left':
        return {
          x: -(this.radius + labelMargin + 2),
          y: 0,
          textAnchor: 'end'
        };
      case 'right':
        return {
          x: this.radius + labelMargin + 2,
          y: 0,
          textAnchor: 'start'
        };
      case 'top':
        return {
          x: 0,
          y: -(this.radius + labelMargin + 3),
          textAnchor: 'middle'
        };
      case 'bottom':
        return {
          x: 0,
          y: this.radius + labelMargin + 3,
          textAnchor: 'middle'
        };
      default:
        return { x: 0, y: 0, textAnchor: 'right' };
    }
  }


  render() {
    const { x, y, label, on } = this.props;

    return (
      <svg x={x} y={y} className="button">
        <circle
            cx={0} cy={0} r={this.radius} stroke="black" fill="red"
            className={classNames('led', { 'led__on': on })}/>

        {label && <text
          x={this.labelPos.x}
          y={this.labelPos.y}
          className="led-label"
          textAnchor={this.labelPos.textAnchor}
          alignmentBaseline="middle"
        >{label}</text>}
      </svg>
    );
  }
}

export default RoundButtonBase;