import { useEnvStages, useEnvParam, DisplayStage } from '../../store/modules/useEnvelope'
import { envCtrls } from '../../synthcore/modules/env/envControllers'
import { StageId } from '../../synthcore/modules/env/types'
import { getPoints } from './utils'
import { getCurveFunc } from '../../components/curves/curveCalculator'
import { Point } from '../../utils/types'
import { useMemo } from 'react'

export type StageBackground = {
    from: number
    to: number
    id: StageId
}

const mapToSvg = (point: Point, isBipolar: boolean) => ({
    x: point.x,
    y: isBipolar ? (1 - point.y) / 2 : 1 - point.y
})

const getNextEnabled = (stages: DisplayStage[], currentId: StageId): DisplayStage => {
    for (let i = currentId + 1; i < stages.length; i++) {
        const stage = stages[i]
        if (stage.enabled) {
            return stage
        }
    }
    return stages[StageId.STOPPED]
}

export const useEnvCurve = (envId: number): [Point[], StageBackground[]] => {

    const stages = useEnvStages(envId)
    const bipolar = useEnvParam(envId, 'bipolar') === 1
    const offset = useEnvParam(envId, 'offset')

    return useMemo(() => {
        const enabledCount = stages.filter((stage) => stage.enabled && stage.id !== StageId.STOPPED).length
        const stageWidth = enabledCount > 0 ? 1 / enabledCount : 0

        const allPoints: Point[] = []
        const stageBackgrounds: StageBackground[] = []
        let currentX = 0

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

        return [allPoints, stageBackgrounds] as [Point[], StageBackground[]]
    }, [stages, bipolar, offset])
}
