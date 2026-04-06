import { useMemo } from 'react'
import { getCurveFunc } from '@/components/curves/curveCalculator'
import { useUiStore, useVoiceGroupStore } from '@/store'
import { lfoCtrls } from '@/synthcore/modules/lfo/lfoControllers'
import { type Stage, StageId } from '@/synthcore/modules/lfo/types'
import type { Point } from '@/utils/types'
import { getPoints, keypoints } from './utils'

export type StageBackground = {
    from: number
    to: number
    id: StageId
    stageIndex: number
}

const getUnscaledLevels = (bipolar: boolean, invert: boolean, releaseEnabled: boolean) => {
    let attackLevel: number
    let releaseLevel: number

    if (bipolar) {
        if (invert) {
            attackLevel = 1
            releaseLevel = -1
        } else {
            attackLevel = -1
            releaseLevel = 1
        }
    } else {
        if (invert) {
            attackLevel = 1
            releaseLevel = 0
        } else {
            attackLevel = 0
            releaseLevel = 1
        }
    }

    // Levels for Delay, Attack, Release and Stop
    return [attackLevel, attackLevel, releaseLevel, releaseEnabled ? attackLevel : releaseLevel]
}

export const useCurve = (lfoId: number): [Point[], StageBackground[]] => {
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)
    const lfo = useVoiceGroupStore(voiceGroupIndex, (s) => s.lfos[lfoId])

    const bipolar = lfo.bipolar === 1
    const invert = lfo.invert === 1
    const yOffset = lfo.levelOffset
    const xOffset = lfo.phaseOffset
    const depth = lfo.depth

    let balance = lfo.balance
    if (balance < 0.005) balance = 0.005
    if (balance > 0.995) balance = 0.995

    // Build Stage objects from Zustand state
    const delayStage: Stage = { id: StageId.DELAY, enabled: lfo.stages.delay.enabled, curve: lfo.stages.delay.curve }
    const attackStage: Stage = {
        id: StageId.ATTACK,
        enabled: lfo.stages.attack.enabled,
        curve: lfo.stages.attack.curve,
    }
    const releaseStage: Stage = {
        id: StageId.RELEASE,
        enabled: lfo.stages.release.enabled,
        curve: lfo.stages.release.curve,
    }
    const stoppedStage: Stage = { id: StageId.STOPPED, enabled: 0, curve: 0 }

    const delayEnabled = delayStage.enabled === 1
    const releaseEnabled = releaseStage.enabled === 1

    let offsetStage = StageId.ATTACK
    let offsetInStage = 0

    if (xOffset !== 0) {
        if (!releaseEnabled) {
            offsetInStage = xOffset
        } else if (xOffset < 0.5) {
            offsetInStage = xOffset * 2
        } else {
            offsetInStage = (xOffset - 0.5) * 2
            offsetStage = StageId.RELEASE
        }
    }

    const stageCount = 2 + (delayEnabled ? 1 : 0)
    const baseStageWidth = 1 / stageCount

    const unscaledLevels = useMemo(
        () => getUnscaledLevels(bipolar, invert, releaseEnabled),
        [bipolar, invert, releaseEnabled]
    )

    // Stages used for calculating points on the line
    // TODO: Claude fix
    const contourStages: Stage[] = useMemo(
        () => [attackStage, releaseStage, stoppedStage],
        // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
        [attackStage, releaseStage, stoppedStage]
    )

    const pointsPerStage = useMemo(
        () =>
            contourStages.map((stage) => {
                if (stage.id === StageId.STOPPED) {
                    return []
                }

                const curveFunc = getCurveFunc(lfoCtrls.CURVE, stage.curve)
                const yValues = getPoints(curveFunc)

                const level = unscaledLevels[stage.id] * depth
                const nextLevel = unscaledLevels[stage.id + 1] * depth

                const offset = level + yOffset
                const scale = nextLevel - level

                return yValues.map((yValue) => yValue * scale + offset)
            }),
        [depth, contourStages, unscaledLevels, yOffset]
    )

    // TODO: Calculate correct delay level from phase offset.
    // See issue #27 for details.
    let stageIndex = 0

    const [points, stageBackgrounds] = useMemo(() => {
        const delayDelta = delayEnabled ? baseStageWidth : 0

        const attackDelta = ((2 * baseStageWidth) / keypoints) * (releaseEnabled ? balance : 1)
        const releaseDelta = releaseEnabled ? (baseStageWidth / keypoints) * 2 * (1 - balance) : 0

        const attackValues = pointsPerStage[0]
        const releaseValues = pointsPerStage[1]

        const sections: { from: number; to: number; id: StageId; stageIndex: number }[] = []

        // Starting point in stage when not starting at beginning
        let phasePointStart = xOffset !== 0 ? Math.floor(keypoints * offsetInStage) : 0
        if (offsetStage === StageId.RELEASE) {
            phasePointStart += keypoints + 1
        }
        const phasePointEnd = 2 * keypoints + 2 + phasePointStart

        // Delta will be 0 if delay is disabled
        let currentX = delayDelta

        // Delay stage rectangle
        if (delayEnabled) {
            sections.push({ from: 0, to: currentX, id: StageId.DELAY, stageIndex: stageIndex++ })
        }

        const cycle: { y: number; inc: number; stageId: StageId }[] = []

        cycle.push(
            ...attackValues.map((yValue, index, values) => ({
                y: yValue,
                inc: index < values.length - 1 ? attackDelta : 0,
                stageId: StageId.ATTACK,
            }))
        )
        cycle.push(
            ...releaseValues.map((yValue, index, values) => ({
                y: yValue,
                inc: index < values.length - 1 ? releaseDelta : 0,
                stageId: StageId.RELEASE,
            }))
        )

        // Add two full cycles of the wave to be able to move the phase offset from 0 to 1
        const cycles = [...cycle, ...cycle]

        // Adding first point to get line when delay is enabled
        let prevY = cycles[phasePointStart].y
        let prevX = currentX
        let prevStageId = StageId.ATTACK
        const points: Point[] = [{ x: 0, y: prevY }]

        points.push(
            ...cycles.map((value, index, subArray) => {
                // Hide points outside before and after phase points, so we can only see the
                // ones we want
                const hidePoint = index < phasePointStart || index > phasePointEnd
                const hideNextPoint = index === phasePointEnd // For the last point
                if (!hidePoint) prevY = value.y

                const point = { x: currentX, y: hidePoint ? prevY : value.y }

                // Create background sections
                if (prevStageId !== value.stageId || index === subArray.length - 1) {
                    sections.push({
                        from: prevX,
                        to: currentX,
                        id: prevStageId,
                        stageIndex: stageIndex++,
                    })
                    prevX = currentX
                    prevStageId = value.stageId
                }

                if (index < subArray.length - 1) {
                    // The last point in the list is at the same x value as the first in the next, so don't increment
                    // index x for the last point. (it may still have a different y value so the point has to be
                    // included)
                    currentX += hideNextPoint || hidePoint ? 0 : value.inc
                }

                return point
            })
        )

        return [points, sections]
    }, [balance, baseStageWidth, releaseEnabled, delayEnabled, offsetInStage, offsetStage, pointsPerStage, xOffset])

    return [points, stageBackgrounds]
}
