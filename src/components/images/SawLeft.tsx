import type { IconProps } from './types'
import { WaveformIcon } from './WaveformIcon'
import './Waveform.scss'

export const SawLeft = (props: IconProps) => {
    const { height, width } = props
    const path = `M 0 ${height} L 0 ${0} L ${width} ${height}`

    return <WaveformIcon {...props} path={path} />
}
