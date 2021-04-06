import React from 'react'
import classNames from 'classnames'
import './Led.scss'

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


const positionLabel = (radius: number, labelPosition: LabelPosition, labelMargin: number) => {
    switch (labelPosition) {
        case 'left':
            return {
                x: -(radius + labelMargin + 2),
                y: 0,
                textAnchor: 'end'
            }
        case 'right':
            return {
                x: radius + labelMargin + 2,
                y: 0,
                textAnchor: 'start'
            }
        case 'top':
            return {
                x: 0,
                y: -(radius + labelMargin + 3),
                textAnchor: 'middle'
            }
        case 'bottom':
            return {
                x: 0,
                y: radius + labelMargin + 3,
                textAnchor: 'middle'
            }
        default:
            return { x: 0, y: 0, textAnchor: 'right' }
    }
}

export default (props: Props & Config) => {
    const radius = props.radius || 1.5
    const labelMargin = props.labelMargin || 2
    const labelPos = positionLabel(radius,props.labelPosition || 'bottom', labelMargin)

    const { x, y, label, on } = props

    return (
        <svg x={x} y={y} className="button">
            <circle
                cx={0} cy={0} r={radius} stroke="black" fill="red"
                className={classNames('led', { 'led__on': on })}/>

            {label && <text
              x={labelPos.x}
              y={labelPos.y}
              className="led-label"
              textAnchor={labelPos.textAnchor}
              alignmentBaseline="middle"
            >{label}</text>}
        </svg>
    )
}
