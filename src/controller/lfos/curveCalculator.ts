import { useAppSelector } from '../../synthcore/hooks'
import {
    selectController,
    selectLfoStages
} from '../../synthcore/modules/controllers/controllersReducer'
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

    // Levels for Delay, Attack, Release and Stop
    return [attackLevel, attackLevel, releaseLevel, releaseEnabled ? attackLevel : releaseLevel]
}

export const useCurve = (lfoId: number): [Point[], StageBackground[]] => {

    const select = useAppSelector;
    const stages = select(selectLfoStages(lfoId))
    const bipolar = select(selectController(lfoCtrls.BIPOLAR, lfoId)) === 1

    const invert = select(selectController(lfoCtrls.INVERT, lfoId)) === 1
    const yOffset = select(selectController(lfoCtrls.LEVEL_OFFSET, lfoId))
    const xOffset = select(selectController(lfoCtrls.PHASE_OFFSET, lfoId))

    const depth = select(selectController(lfoCtrls.DEPTH, lfoId))

    let balance = select(selectController(lfoCtrls.BALANCE, lfoId))
    if (balance < 0.005) balance = 0.005;
    if (balance > 0.995) balance = 0.995;

    const delayStage = stages[StageId.DELAY]
    const attackStage = stages[StageId.ATTACK]
    const releaseStage = stages[StageId.RELEASE]
    const stoppedStage = stages[StageId.STOPPED]

    const delayEnabled = delayStage?.enabled === 1
    const releaseEnabled = releaseStage?.enabled === 1

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

    // TODO:
    // phaseOffset - finn mellom 0 og 65535, finn stage, bruk curveFuncs til å finne riktig y-verdi.
    // bruk så levelOffset og cutoff til å beregne korrekt delay level.
    // og ta hensyn til scale og levels


    // calculate all points with correct x value. x has a range of 0 to 1.
    const [points, stageBackgrounds] = useMemo(() => {

        const delayDelta = delayEnabled ? baseStageWidth : 0

        // Attack + Release always takes up 2  * baseStageWidth even if release is disabled, to keep
        // the delay-end-point at the same pos (also, the cycle time stays the same independent of release enable/disable)
        const attackDelta = (2 * baseStageWidth / keypoints) * (releaseEnabled ? balance : 1)
        const releaseDelta = releaseEnabled ? (baseStageWidth / keypoints) * 2 * (1 - balance) : 0

        let attackValues = pointsPerStage[0]
        let releaseValues = pointsPerStage[1]

        const sections: { from: number, to: number, id: StageId }[] = []

        // Starting point in stage when not starting at beginning
        let phasePointStart = xOffset !== 0 ? Math.floor(keypoints * offsetInStage) : 0
        if (offsetStage === StageId.RELEASE) {
            phasePointStart += (keypoints + 1)
        }
        const phasePointEnd = (2 * keypoints + 2) + phasePointStart

        // Delta will be 0 if delay is disabled
        let currentX = delayDelta

        // Delay stage rectangle
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

        // Add two full cycles of the wave to be able to move the phase offset from 0 to 1
        const cycles = [...cycle, ...cycle]

        // Adding first point to get line when delay is enabled
        let prevY = cycles[phasePointStart].y;
        let prevX = currentX;
        let prevStageId = StageId.ATTACK;
        const points: Point[] = [{ x: 0, y: prevY }]

        points.push(...cycles.map(
            (value, index, subArray) => {

                // Hide points outside before and after phase points, so we can only see the
                // ones we want
                const hidePoint = index < phasePointStart || index > phasePointEnd
                const hideNextPoint = index === phasePointEnd // For the last point
                if (!hidePoint) prevY = value.y;

                const point = { x: currentX, y: hidePoint ? prevY : value.y }

                // Create background sections
                if (prevStageId !== value.stageId || index === subArray.length - 1) {
                    sections.push({ from: prevX, to: currentX, id: prevStageId })
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
            }
        ))

        // Push first point (= delay level) to store to be able to render. Should be done via context instead?
        //dispatch(setCurrDelayLevel({value: points[0].y}))

        return [points, sections]

    }, [balance, baseStageWidth, releaseEnabled, delayEnabled, offsetInStage, offsetStage, pointsPerStage, xOffset])

    return [points, stageBackgrounds]
}