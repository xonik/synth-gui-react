import React from 'react'
import './Button.scss'
import classNames from 'classnames'

interface Props {
    x: number
    y: number
    width: number
    height: number
    label: string
    active: boolean,
    onClick: () => void,
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const Button = ({ x, y, width, height, label, active, onClick}: Props) => {
    return <svg x={x} y={y} onClick={onClick}>
        <rect
            width={width}
            height={height}
            className={classNames('ctrl-button', {'ctrl-button--active': active})}
        />
        <text
            x={width / 2}
            y={height /2}
            className={classNames('ctrl-button-label', {'ctrl-button-label--active': active})}
            textAnchor="middle"
            alignmentBaseline="middle"
        >{label}</text>
    </svg>
}

export default Button