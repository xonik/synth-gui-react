import AnimatedCurve from '../../components/curves/AnimatedCurve'
import type { Point } from '../../utils/types'
import '../components/StageBlock.scss'

interface Props {
    points: Point[]
}

const EnvCurve = ({ points }: Props) => {
    return (
        <svg x={0} y={0} className="stages-curve">
            <AnimatedCurve x={0} y={0} width={1} height={1} points={points} className={'stage-block-line'} />
        </svg>
    )
}

export default EnvCurve
