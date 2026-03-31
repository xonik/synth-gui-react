import classNames from 'classnames'
import type { IconBaseProps } from './types'

export const WaveformIcon = ({ x, y, width, height, centered, className, path }: IconBaseProps) => {
    const offsetX = centered ? -width / 2 : 0
    const offsetY = centered ? -height / 2 : -height

    return (
        <svg x={x + offsetX} y={y + offsetY} className={classNames(className, 'waveform')}>
            <path d={path} className="waveform-path" strokeWidth={1} fill="none" stroke="black" />
        </svg>
    )
}
