import { IconProps } from "./types";
import { WaveformIcon } from "./WaveformIcon";
import './Waveform.scss'

export const Triangle = (props: IconProps) => {

    const { height, width } = props
    const path = `M 0 ${height} L ${width / 2} ${0} L ${width} ${height}`

    return <WaveformIcon {...props} path={path}/>
}