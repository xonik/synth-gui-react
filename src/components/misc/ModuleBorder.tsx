import classNames from 'classnames'
import { BORDER_MARGIN } from '@/constants'
import './ModuleBorder.scss'

type Props = {
    x: number
    y: number
    height: number
    width: number
    className?: string
}

export const ModuleBorder = ({ x, y, height, width, className }: Props) => {
    return (
        <rect
            x={x + BORDER_MARGIN}
            y={y + BORDER_MARGIN / 2}
            width={width - 2 * BORDER_MARGIN}
            height={height - 2 * BORDER_MARGIN}
            rx="1"
            ry="1"
            className={classNames('module-border', className)}
        />
    )
}
