import { SHOW_CUT } from '@/config'
import './PanelScrew.scss'

type Props = {
    x: number
    y: number
    headRadius?: number
    holeRadius?: number
}

export const PanelScrew = ({ x, y, headRadius = 3, holeRadius = 1.6 }: Props) => {
    return <circle cx={x} cy={y} r={SHOW_CUT ? holeRadius : headRadius} className="panel-screw" />
}
