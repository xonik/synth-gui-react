import React from 'react'
import classNames from 'classnames'
import './Button.scss'

interface Props {
    active: boolean,
    disabled?: boolean
    onClick: (event?: React.MouseEvent<HTMLElement>) => void,
    children?:
        | React.ReactChild
        | React.ReactChild[];
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const Button = ({ active, disabled, onClick, children}: Props) => {
    return <div onClick={onClick} className={classNames(
        'ctrl-button', {
            'ctrl-button--active': active,
            'ctrl-button--disabled': disabled,
        })}>{children}</div>
}

export default Button