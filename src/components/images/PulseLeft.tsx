import type { IconProps } from './types'
import { WaveformIcon } from './WaveformIcon'
import './Waveform.scss'

export const PulseLeft = (props: IconProps) => {
    const { height, width } = props
    const path = `M 0 ${height} L ${0} ${0} L ${width / 4} 0 L ${width / 4} ${height} L ${width} ${height} L ${width} 0`

    return <WaveformIcon {...props} path={path} />
}
