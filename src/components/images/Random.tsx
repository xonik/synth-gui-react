import type { IconProps } from './types'
import { WaveformIcon } from './WaveformIcon'
import './Waveform.scss'

export const Random = (props: IconProps) => {
    const { height, width } = props

    const height4 = 0
    const height3 = height / 4
    const height2 = height / 2
    const height0 = height

    const path = `M 0 ${height2} L ${0} ${height3} L ${width / 4} ${height3} L ${width / 4} ${height0} L ${width / 2} ${height0} L ${width / 2} ${height2} L ${(3 * width) / 4} ${height2} L ${(3 * width) / 4} ${height4} L ${width} ${height4}`

    return <WaveformIcon {...props} path={path} />
}
