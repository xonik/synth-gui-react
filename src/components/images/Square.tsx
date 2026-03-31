import type { IconProps } from './types'
import { WaveformIcon } from './WaveformIcon'
import './Waveform.scss'

export const Square = (props: IconProps) => {
    const { height, width } = props
    const path = `M 0 ${height / 2} L ${0} ${0} L ${width / 2} 0 L ${width / 2} ${height} L ${width} ${height} L ${width} ${height / 2}`

    return <WaveformIcon {...props} path={path} />
}
