import { SHOW_CUT } from '../../../config'
import { POT_DISTANCE_L, POT_DISTANCE_M, ROW_HEIGHT } from '../../../constants'
import Arpeggiator from './Arpeggiator'
import Clock from './Clock'
import DCO1 from './DCO1'
import DCO2 from './DCO2'
import Effects from './Effects'
import LFO from './LFO'
import NoiseAndRing from './NoiseAndRing'
import Route from './Route'
import SourceMixer from './SourceMixer'
import VCO from './VCO'

type Props = {
    x: number
    panelHeight: number
    rows: number[]
}

export const LeftPanel = ({ x, panelHeight, rows }: Props) => {
    const oscWidth = POT_DISTANCE_L + POT_DISTANCE_M * 7
    const mixWidth = 2 * POT_DISTANCE_L + 5

    const lfoCol = x + POT_DISTANCE_L + POT_DISTANCE_M
    const noiseCol = x + oscWidth

    return (
        <>
            {SHOW_CUT && <rect x={0} y={0} width="351" height={panelHeight} className="panel-outline" />}
            <DCO1 x={x} y={rows[0]} height={2 * ROW_HEIGHT} width={oscWidth} />
            <DCO2 x={x} y={rows[2]} height={2 * ROW_HEIGHT} width={oscWidth} />
            <VCO x={x} y={rows[4]} height={2 * ROW_HEIGHT} width={oscWidth} />

            <Clock x={x} y={rows[6]} height={ROW_HEIGHT} width={POT_DISTANCE_L + POT_DISTANCE_M} />
            <Route x={x} y={rows[7]} height={ROW_HEIGHT} width={POT_DISTANCE_L + POT_DISTANCE_M} />

            <LFO x={lfoCol} y={rows[6]} height={2 * ROW_HEIGHT} width={6 * POT_DISTANCE_M} />
            <NoiseAndRing x={noiseCol} y={rows[0]} height={ROW_HEIGHT} width={mixWidth} />

            <SourceMixer x={noiseCol} y={rows[1]} height={3 * ROW_HEIGHT} width={mixWidth} />
            <Effects x={noiseCol} y={rows[4]} height={2 * ROW_HEIGHT} width={mixWidth} />

            <Arpeggiator x={noiseCol} y={rows[6]} height={2 * ROW_HEIGHT} width={mixWidth} />
        </>
    )
}
