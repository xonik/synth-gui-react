import React, { useCallback, useMemo } from 'react'
import { Stage, StageId } from '../../synthcore/modules/lfo/types'
import StageBlock from './StageBlock'
import { selectCurrGuiStageId, toggleStageSelected, } from '../../synthcore/modules/lfo/lfoReducer'
import { useAppDispatch, useAppSelector } from '../../synthcore/hooks'
import classNames from 'classnames'
import { lfoCtrls } from '../../synthcore/modules/lfo/lfoControllers'
import { selectController, selectLfoStages } from '../../synthcore/modules/controllers/controllersReducer'
import './Stages.scss'
import { getPoints, keypoints } from './utils'
import { curveFuncs } from '../../components/curves/curveCalculator'
import { Point } from '../../utils/types'

interface Props {
    lfoId: number
}

const getNextEnabled = (stages: Stage[], currentId: StageId) => {
    for (let i = currentId + 1; i < stages.length; i++) {
        const stage = stages[i]
        if (stage.enabled) {
            return stage
        }
    }
    return stages[StageId.STOPPED]
}

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

    return {
        [StageId.DELAY]: attackLevel,
        [StageId.ATTACK]: attackLevel,
        [StageId.DECAY]: decayLevel,
        [StageId.STOPPED]: decayEnabled ? attackLevel : decayLevel,
    }
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
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

        const points = getPoints(curveFuncs[stage.curve])

        const level = unscaledLevels[stage.id] * depth
        const nextLevel = unscaledLevels[getNextEnabled(stages, stage.id).id] * depth

        const offset = level + yOffset;
        const scale = nextLevel - level

        return points
            .map((point) => {
                let y = point.y * scale + offset;
                return { x: point.x, y }
            })
    }), [depth, contourStages, stages, unscaledLevels, yOffset])


    // calculate all points with correct x value. x has a range of 0 to 1.
    const [allPoints, sections] = useMemo(() => {

        const delayDelta = delayEnabled ? baseStageWidth : 0
        const attackDelta = (baseStageWidth / keypoints) * (decayEnabled ? 2 * balance : 1)
        const decayDelta = decayEnabled ? (baseStageWidth / keypoints) * 2 * (1-balance) : 0

        let firstPoints
        let firstDelta: number
        let secondPoints
        let secondDelta: number

        const sections: {from: number, to: number, id: StageId }[] = []

        // Starting point in stage when not starting at beginning
        const phasePoint = xOffset !== 0 ? Math.floor(keypoints * offsetInStage) : 0
        if(offsetStage === StageId.ATTACK) {
            firstPoints = pointsPerStage[0]
            firstDelta = attackDelta
            secondPoints = pointsPerStage[1]
            secondDelta = decayDelta

        } else {
            firstPoints = pointsPerStage[1]
            firstDelta = decayDelta
            secondPoints = pointsPerStage[0]
            secondDelta = attackDelta
        }

        const delayY = firstPoints[phasePoint].y
        let currentX = delayDelta

        const allPoints: Point[] = [{x: 0, y: delayY}, {x: delayEnabled ? delayDelta : 0, y: delayY}]
        if(delayEnabled) sections.push({from: 0, to: currentX, id: StageId.DELAY})
        let prevX = currentX;
        allPoints.push(...firstPoints.slice(phasePoint + 1).map(
            (point) => {
                currentX += firstDelta
                return { x: currentX, y: point.y }
            }
        ))

        // TODO: There is something wrong with the deltas here isn't it? We should start at point 0 for the
        // second section and end at the last point minus 1 instead.
        sections.push({from: prevX, to: currentX, id: offsetStage})
        prevX = currentX;

        allPoints.push(...secondPoints.slice(1).map(
            (point) => {
                currentX += secondDelta
                return { x: currentX, y: point.y }
            }
        ))
        if (decayEnabled) sections.push({from: prevX, to: currentX, id: offsetStage === StageId.ATTACK ? StageId.DECAY : StageId.ATTACK})
        prevX = currentX;

        if (xOffset > 0) {
            // If decay is not enabled, we need to add a point to get a fully vertical line
            // TODO: sjekk hvorfor det blir rett å bruke y fra firstPoints[0]???
            allPoints.push({x: currentX - (decayEnabled ? 0 : secondDelta), y: firstPoints[0].y})
            allPoints.push(...firstPoints.slice(1, phasePoint).map(
                (point) => {
                    currentX += firstDelta
                    return { x: currentX, y: point.y }
                }))
            sections.push({from: prevX, to: currentX, id: offsetStage})
        }
        return [allPoints, sections]
    }, [balance, baseStageWidth, decayEnabled, delayEnabled, offsetInStage, offsetStage, pointsPerStage, xOffset])


    //TODO Test with balance 0.75
    return <svg x={0} y={0}>
        {
            <line
                x1={0} y1={0.5}
                x2={1} y2={0.5}
                className={'stages-center-line'}
            />
        }
        {
            sections.map(({from, to, id}, index) => {
                const isLast = index === stages.length - 2
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

        <StageBlock
            x={0}
            y={0}
            width={1}
            height={1}
            stage={stages[StageId.ATTACK]}
            points={allPoints}
            yOffset={yOffset}
        />
    </svg>
}

export default Stages