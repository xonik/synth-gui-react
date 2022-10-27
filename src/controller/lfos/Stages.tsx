import React, { useCallback, useMemo } from 'react'
import { Stage, StageId } from '../../synthcore/modules/lfo/types'
import StagesCurve from './StagesCurve'
import { selectCurrGuiStageId, toggleStageSelected, } from '../../synthcore/modules/lfo/lfoReducer'
import { useAppDispatch, useAppSelector } from '../../synthcore/hooks'
import classNames from 'classnames'
import { lfoCtrls } from '../../synthcore/modules/lfo/lfoControllers'
import { selectController, selectLfoStages } from '../../synthcore/modules/controllers/controllersReducer'
import { getPoints, keypoints } from './utils'
import { curveFuncs } from '../../components/curves/curveCalculator'
import { Point } from '../../utils/types'
import './Stages.scss'

interface Props {
    lfoId: number
}

/*

Info:
-----
Level:  50%   Delay: 0    Bal:  A: 20 D: 80   Offset: -20%
Freq: 500Hz   D lev: 23   Tim   A: 3s D: 7s   Phase:   100


Pots:
-----
1) LFO
2) Freq / delay time
3) Level / Offset,
4) Balance / Phase
5) Curve / Loops

Eller ha seks params og ha separat curve/loops

For ENV: ekstra pot for offset etter
 */

const getUnscaledLevels = (bipolar: boolean, invert: boolean, decayEnabled: boolean) => {
    let attackLevel;
    let decayLevel;

    if (bipolar) {
        if (invert) {
            attackLevel = 1;
            decayLevel = -1;
        } else {
            attackLevel = -1
            decayLevel = 1;
        }
    } else {
        if (invert) {
            attackLevel = 1;
            decayLevel = 0;
        } else {
            attackLevel = 0;
            decayLevel = 1;
        }
    }

    // Levels for Delay, Attack, Decay and Stop
    return [attackLevel, attackLevel, decayLevel, decayEnabled ? attackLevel : decayLevel]
}

const Stages = ({ lfoId }: Props) => {

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

    const dispatch = useAppDispatch();

    const delayStage = stages[StageId.DELAY]
    const attackStage = stages[StageId.ATTACK]
    const decayStage = stages[StageId.DECAY]
    const stoppedStage = stages[StageId.STOPPED]

    const delayEnabled = delayStage?.enabled === 1
    const decayEnabled = decayStage?.enabled === 1

    let offsetStage = StageId.ATTACK
    let offsetInStage = 0

    if (xOffset !== 0) {
        if (!decayEnabled) {
            offsetInStage = xOffset
        } else if (xOffset < 0.5) {
            offsetInStage = xOffset * 2
        } else {
            offsetInStage = (xOffset - 0.5) * 2
            offsetStage = StageId.DECAY
        }
    }

    const stageCount = 1 + (delayEnabled ? 1 : 0) + (decayEnabled ? 1 : 0)
    const baseStageWidth = 1 / stageCount

    const currStageId = select(selectCurrGuiStageId);

    const onSvgClicked = useCallback((stageId: number) => {
        dispatch(toggleStageSelected({ lfo: lfoId, stage: stageId }))
    }, [lfoId, dispatch])

    const unscaledLevels = useMemo(
        () => getUnscaledLevels(bipolar, invert, decayEnabled),
        [bipolar, invert, decayEnabled]
    )

    // Stages used for calculating points on the line
    const contourStages: Stage[] = useMemo(
        () => [attackStage, decayStage, stoppedStage],
        [attackStage, decayStage, stoppedStage]
    )

    const pointsPerStage = useMemo(() => contourStages.map((stage, index) => {
        if (stage.id === StageId.STOPPED) {
            return []
        }

        const yValues = getPoints(curveFuncs[stage.curve])

        const level = unscaledLevels[stage.id] * depth
        const nextLevel = unscaledLevels[stage.id + 1] * depth

        const offset = level + yOffset;
        const scale = nextLevel - level

        return yValues.map((yValue) => yValue * scale + offset)
    }), [depth, contourStages, unscaledLevels, yOffset])


    // calculate all points with correct x value. x has a range of 0 to 1.
    const [points, stageBackgrounds] = useMemo(() => {

        const delayDelta = delayEnabled ? baseStageWidth : 0
        const attackDelta = (baseStageWidth / keypoints) * (decayEnabled ? 2 * balance : 1)
        const decayDelta = decayEnabled ? (baseStageWidth / keypoints) * 2 * (1 - balance) : 0

        let firstYValues: number[]
        let firstXDelta: number
        let secondYValues: number[]
        let secondXDelta: number

        const sections: { from: number, to: number, id: StageId }[] = []

        // Starting point in stage when not starting at beginning
        const phasePoint = xOffset !== 0 ? Math.floor(keypoints * offsetInStage) : 0
        //TODO: Test if this feels right or not - if(phasePoint === keypoints) phasePoint = 0

        if (offsetStage === StageId.ATTACK) {
            firstYValues = pointsPerStage[0]
            firstXDelta = attackDelta
            secondYValues = pointsPerStage[1]
            secondXDelta = decayDelta

        } else {
            firstYValues = pointsPerStage[1]
            firstXDelta = decayDelta
            secondYValues = pointsPerStage[0]
            secondXDelta = attackDelta
        }

        // Calculate points for all stages. Stages that are disabled will have all points in the same position.
        // This is necessary to be able to morph between LFOs with different number of stages activated.

        // Delay stage points
        const points: Point[] = [{ x: 0, y: firstYValues[phasePoint] }]

        // Delta will be 0 if delay is disabled
        let currentX = delayDelta

        // Delay stage rectangle
        if (delayEnabled) {
            sections.push({ from: 0, to: currentX, id: StageId.DELAY })
        }
        let prevX = currentX;

        // Attack and Decay may take up to three blocks
        // - If the phasePoint is part way into the attack stage we will get a partial Attack + full Decay (if enabled)
        //   and a partial Attack again.
        // - If the phasePoint is part way into the decay stage we will get a partial Decay + full Attack
        //   and a partial Attack again.
        // - If phasePoint is 0 we will get a full Attack + a full Decay (if enabled)

        // First partial stage
        points.push(...firstYValues.slice(phasePoint, firstYValues.length).map(
            (yValue, index, subArray) => {
                const point = { x: currentX, y: yValue }
                if(index < subArray.length - 1){
                    // The last point in the list is at the same x value as the first in the next, so don't increment
                    // index x for the last point. (it may still have a different y value so the point has to be
                    // included)
                    currentX += firstXDelta
                }
                return point
            }
        ))
        sections.push({ from: prevX, to: currentX, id: offsetStage })
        prevX = currentX
        const lastYInFirstStage = points[points.length-1].y

        // Full second stage. If this is decay and decay is disabled, secondXDelta will be 0, the y value will be fixed
        // at the y value of the last point in the attack stage, and all points will  be on top of each other
        // effectively hiding them. We cannot remove the points because this will break the animation between
        // waveforms as the number of points won't be the same.
        points.push(...secondYValues.slice(0, secondYValues.length).map(
            (yValue, index, subArray) => {
                const point = { x: currentX, y: decayEnabled ? yValue : lastYInFirstStage }
                if(index < subArray.length - 1) {
                    // The last point in the list is at the same x value as the first in the next, so don't increment
                    // index x for the last point. (it may still have a different y value so the point has to be
                    // included)
                    currentX += secondXDelta
                }
                return point
            }
        ))
        if (decayEnabled) sections.push({
            from: prevX,
            to: currentX,
            id: offsetStage === StageId.ATTACK ? StageId.DECAY : StageId.ATTACK
        })
        prevX = currentX

        // Second partial stage
        points.push(...firstYValues.slice(0, phasePoint + 1).map(
            (yValue) => {
                const point = { x: currentX, y: yValue }
                currentX += firstXDelta
                return point
            }))
        sections.push({ from: prevX, to: currentX - firstXDelta, id: offsetStage })

        return [points, sections]

    }, [balance, baseStageWidth, decayEnabled, delayEnabled, offsetInStage, offsetStage, pointsPerStage, xOffset])

    return <svg x={0} y={0}>
        {
            <line
                x1={0} y1={0.5}
                x2={1} y2={0.5}
                className={'stages-center-line'}
            />
        }
        {
            stageBackgrounds.map(({ from, to, id }, index) => {
                const isLast = index === stageBackgrounds.length - 1
                return <React.Fragment key={`stage${index}`}>
                    <>
                        <rect x={from} y={0} width={to - from} height={1} onClick={() => onSvgClicked(id)}
                              className={classNames('stages-background', { 'stages-background--selected': currStageId === id })}

                        />
                        <line
                            x1={from} y1={0}
                            x2={from} y2={1}
                            className={'stages-divider'}
                        />
                    </>
                    {isLast && <line
                        x1={to} y1={0}
                        x2={to} y2={1}
                        className={'stages-divider'}
                    />}
                </React.Fragment>
            })
        }

        <StagesCurve
            points={points}
            yOffset={yOffset}
        />
    </svg>
}

export default Stages