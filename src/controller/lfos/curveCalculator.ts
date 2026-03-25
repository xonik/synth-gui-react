import { useUiStore } from '../../store/uiStore'
import { useVoiceGroupStore } from '../../store/patchStore'
import { lfoCtrls } from '../../synthcore/modules/lfo/lfoControllers'
import { Stage, StageId } from '../../synthcore/modules/lfo/types'

import { useMemo } from 'react'
import { getPoints, keypoints } from './utils'
import { getCurveFunc } from '../../components/curves/curveCalculator'
import { Point } from '../../utils/types'

export type StageBackground = {
    from: number
    to: number
    id: StageId
}

const getUnscaledLevels = (bipolar: boolean, invert: boolean, releaseEnabled: boolean) => {
    let attackLevel;
    let releaseLevel;

    if (bipolar) {
        if (invert) {
            attackLevel = 1;
            releaseLevel = -1;
        } else {
            attackLevel = -1
            releaseLevel = 1;
        }
    } else {
        if (invert) {
            attackLevel = 1;
            releaseLevel = 0;
        } else {
            attackLevel = 0;
            releaseLevel = 1;
        }
    }

    return [attackLevel, attackLevel, releaseLevel, releaseEnabled ? attackLevel : releaseLevel]
}

export const useCurve = (lfoId: number): [Point[], StageBackground[]] => {

    const voiceGroupIndex = useUiStore(s => s.currentVoiceGroupIndex)
    const lfo = useVoiceGroupStore(voiceGroupIndex, s => s.lfos[lfoId])

    const bipolar = lfo.bipolar === 1
    const invert = lfo.invert === 1
    const yOffset = lfo.levelOffset
    const xOffset = lfo.phaseOffset
    const depth = lfo.depth

    let balance = lfo.balance
    if (balance < 0.005) balance = 0.005;
    if (balance > 0.995) balance = 0.995;

    // Build Stage objects from Zustand state
    const stagesMap = lfo.stages
    const delayStage: Stage = { id: StageId.DELAY, enabled: stagesMap[StageId.DELAY]?.enabled ?? 0, curve: stagesMap[StageId.DELAY]?.curve ?? 0 }
    const attackStage: Stage = { id: StageId.ATTACK, enabled: stagesMap[StageId.ATTACK]?.enabled ?? 1, curve: stagesMap[StageId.ATTACK]?.curve ?? 0 }
    const releaseStage: Stage = { id: StageId.RELEASE, enabled: stagesMap[StageId.RELEASE]?.enabled ?? 0, curve: stagesMap[StageId.RELEASE]?.curve ?? 0 }
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

    const contourStages: Stage[] = useMemo(
        () => [attackStage, releaseStage, stoppedStage],
        [attackStage, releaseStage, stoppedStage]
    )

    const pointsPerStage = useMemo(() => contourStages.map((stage) => {
        if (stage.id === StageId.STOPPED) {
            return []
        }

        const curveFunc = getCurveFunc(lfoCtrls.CURVE, stage.curve)
        const yValues = getPoints(curveFunc)

        const level = unscaledLevels[stage.id] * depth
        const nextLevel = unscaledLevels[stage.id + 1] * depth

        const offset = level + yOffset;
        const scale = nextLevel - level

        return yValues.map((yValue) => yValue * scale + offset)
    }), [depth, contourStages, unscaledLevels, yOffset])

    const [points, stageBackgrounds] = useMemo(() => {

        const delayDelta = delayEnabled ? baseStageWidth : 0

        const attackDelta = (2 * baseStageWidth / keypoints) * (releaseEnabled ? balance : 1)
        const releaseDelta = releaseEnabled ? (baseStageWidth / keypoints) * 2 * (1 - balance) : 0

        let attackValues = pointsPerStage[0]
        let releaseValues = pointsPerStage[1]

        const sections: { from: number, to: number, id: StageId }[] = []

        let phasePointStart = xOffset !== 0 ? Math.floor(keypoints * offsetInStage) : 0
        if (offsetStage === StageId.RELEASE) {
            phasePointStart += (keypoints + 1)
        }
        const phasePointEnd = (2 * keypoints + 2) + phasePointStart

        let currentX = delayDelta

        if (delayEnabled) {
            sections.push({ from: 0, to: currentX, id: StageId.DELAY })
        }

        const cycle: { y: number, inc: number, stageId: StageId }[] = []

        cycle.push(...attackValues.map(
            (yValue, index, values) => ({
                y: yValue,
                inc: index < values.length - 1 ? attackDelta : 0,
                stageId: StageId.ATTACK
            })
        ))
        cycle.push(...releaseValues.map(
            (yValue, index, values) => ({
                y: yValue,
                inc: index < values.length - 1 ? releaseDelta : 0,
                stageId: StageId.RELEASE
            })
        ))

        const cycles = [...cycle, ...cycle]

        let prevY = cycles[phasePointStart].y;
        let prevX = currentX;
        let prevStageId = StageId.ATTACK;
        const points: Point[] = [{ x: 0, y: prevY }]

        points.push(...cycles.map(
            (value, index, subArray) => {
                const hidePoint = index < phasePointStart || index > phasePointEnd
                const hideNextPoint = index === phasePointEnd
                if (!hidePoint) prevY = value.y;

                const point = { x: currentX, y: hidePoint ? prevY : value.y }

                if (prevStageId !== value.stageId || index === subArray.length - 1) {
                    sections.push({ from: prevX, to: currentX, id: prevStageId })
                    prevX = currentX
                    prevStageId = value.stageId
                }

                if (index < subArray.length - 1) {
                    currentX += hideNextPoint || hidePoint ? 0 : value.inc
                }

                return point
            }
        ))

        return [points, sections]

    }, [balance, baseStageWidth, releaseEnabled, delayEnabled, offsetInStage, offsetStage, pointsPerStage, xOffset])

    return [points, stageBackgrounds]
}
