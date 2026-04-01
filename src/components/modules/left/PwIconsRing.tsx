import { rotateAround } from '@/utils/svg/rotateAround'
import { PulseLeft } from '../../images/PulseLeft'
import { PulseRight } from '../../images/PulseRight'

type Props = {
    x: number
    y: number
}

export const PwIconsRing = ({ x, y }: Props) => {
    const iconDistance = 14
    const upPos: [number, number] = [x, y - iconDistance]
    const leftPos = rotateAround(upPos, [x, y], -125)
    const rightPos = rotateAround(upPos, [x, y], 125)

    return (
        <>
            <PulseLeft x={leftPos[0]} y={leftPos[1]} width={3} height={2} centered />
            <PulseRight x={rightPos[0]} y={rightPos[1]} width={3} height={2} centered />
        </>
    )
}
