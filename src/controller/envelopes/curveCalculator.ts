import { useAppSelector } from '../../synthcore/hooks'
import { selectController, selectEnvStages } from '../../synthcore/modules/controllers/controllersReducer'
import { envCtrls } from '../../synthcore/modules/env/envControllers'
import { Stage, StageId } from '../../synthcore/modules/env/types'
import { getPoints } from './utils'
import { getCurveFunc } from '../../components/curves/curveCalculator'
import { Point } from '../../utils/types'

export type StageBackground = {
    from: number
    to: number
    id: StageId
}

const mapToSvg = (point: Point, isBipolar: boolean) => ({
    x: point.x,
    y: isBipolar ? (1 - point.y) / 2 : 1 - point.y
})

const getNextEnabled = (stages: Stage[], currentId: StageId): Stage => {
    for (let i = currentId + 1; i < stages.length; i++) {
        const stage = stages[i]
        if (stage.enabled) {
            return stage
        }
    }
    return stages[StageId.STOPPED]
}

export const useEnvCurve = (envId: number): [Point[], StageBackground[]] => {

    const stages = useAppSelector(selectEnvStages(envId))
    const bipolar = useAppSelector(selectController(envCtrls.BIPOLAR, envId)) === 1
    const offset = useAppSelector(selectController(envCtrls.OFFSET, envId))

    const enabledCount = stages.filter((stage) => stage.enabled && stage.id !== StageId.STOPPED).length
    const stageWidth = enabledCount > 0 ? 1 / enabledCount : 0

    const allPoints: Point[] = []
    const stageBackgrounds: StageBackground[] = []
    let currentX = 0

    // Iterate ALL stages except STOPPED so the total point count is always constant.
    // Disabled stages get zero width (all points collapsed to a single x).
    stages.forEach((stage) => {
        if (stage.id === StageId.STOPPED) return

        const nextStage = getNextEnabled(stages, stage.id)
        const curveFunc = getCurveFunc(envCtrls.CURVE, stage.curve)
        const curvePoints = getPoints(curveFunc, false, false)

        const isEnabled = !!stage.enabled
        const width = isEnabled ? stageWidth : 0

        const startLev = isEnabled ? stage.level : nextStage.level
        const endLev = nextStage.level
        const summedOffset = startLev + offset
        const scale = endLev - startLev

        if (isEnabled) {
            stageBackgrounds.push({
                from: currentX,
                to: currentX + width,
                id: stage.id
            })
        }

        curvePoints.forEach((point) => {
            const minY = bipolar ? -1 : 0
            let y = isEnabled ? point.y * scale + summedOffset : summedOffset
            if (y < minY) { y = minY } else if (y > 1) { y = 1 }

            allPoints.push(mapToSvg({ x: currentX + point.x * width, y }, bipolar))
        })

        currentX += width
    })

    return [allPoints, stageBackgrounds]
}

