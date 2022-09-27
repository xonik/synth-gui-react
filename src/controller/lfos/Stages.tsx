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

    const delayDelta = delayEnabled ? baseStageWidth : 0
    const attackDelta = baseStageWidth / keypoints
    const decayDelta = decayEnabled ? baseStageWidth / keypoints : 0

    let startX = 0

    const currStageId = select(selectCurrGuiStageId);

    const onSvgClicked = useCallback((stageId: number) => {
        dispatch(toggleStageSelected({ lfo: lfoId, stage: stageId }))
    }, [lfoId, dispatch])

    const unscaledLevels = useMemo(
        () => getUnscaledLevels(bipolar, invert, decayEnabled),
        [bipolar, invert, decayEnabled]
    )


    const renderStages: Stage[] = []
    const phasePoint = xOffset !== 0 ? Math.floor(keypoints * offsetInStage) : 0

    renderStages.push(attackStage)
    renderStages.push(decayStage)
    renderStages.push(stoppedStage) // TODO: This is probably very wrong when offset is set. Do it in getUnscaledLevels

    const points = useMemo(() => renderStages.map((stage, index) => {
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
    }), [depth, renderStages, stages, unscaledLevels, yOffset])


    let startPoint = delayDelta

    let firstPoints = offsetStage === StageId.ATTACK ? points[0] : points[1]
    let secondPoints = offsetStage === StageId.ATTACK ? points[1] : points[0]

    const delayY = firstPoints[phasePoint].y
    const delayPoints = [{x: 0, y: delayY}]

    delayEnabled ? delayPoints.push({x: delayDelta, y: delayY}) : delayPoints.push({x: 0, y: delayY})
    const allPoints: Point[] = delayPoints

    allPoints.push(...firstPoints.slice(phasePoint + 1).map(
        (point) => {
            startPoint += attackDelta
            return { x: startPoint, y: point.y }
        }
    ))

    allPoints.push(...secondPoints.slice(1).map(
        (point) => {
            startPoint += decayDelta
            return { x: startPoint, y: point.y }
        }
    ))

    if (xOffset > 0) {
        allPoints.push(...firstPoints.slice(1, phasePoint).map(
            (point) => {
                startPoint += attackDelta
                return { x: startPoint, y: point.y }
            }))
    }

    return <svg x={0} y={0}>
        {
            <line
                x1={0} y1={0.5}
                x2={1} y2={0.5}
                className={'stages-center-line'}
            />
        }
        {
            renderStages.map((stage, index) => {
                if (stage.id === StageId.STOPPED) {
                    return null
                }

                let stageWidth = baseStageWidth
                if (decayEnabled && balance !== 0.5) {
                    if (stage.id === StageId.ATTACK) {
                        stageWidth = 2 * baseStageWidth * balance
                    } else if (stage.id === StageId.DECAY) {
                        stageWidth = 2 * baseStageWidth * (1 - balance)
                    }
                }

                if (xOffset !== 0 && stage.id === offsetStage) {
                    if (index < stageCount) {
                        stageWidth = (1 - offsetInStage) * baseStageWidth
                    } else {
                        stageWidth = offsetInStage * baseStageWidth
                    }
                }

                const isLast = index === stages.length - 2
                const enabled = stage.enabled
                const content = <React.Fragment key={`stage${index}`}>
                    {enabled &&
                        <>
                            <rect x={startX} y={0} width={stageWidth} height={1} onClick={() => onSvgClicked(stage.id)}
                                  className={classNames('stages-background', { 'stages-background--selected': currStageId === stage.id })}

                            />
                            <line
                                x1={startX} y1={0}
                                x2={startX} y2={1}
                                className={'stages-divider'}
                            />
                        </>}
                    {isLast && <line
                        x1={startX + stageWidth} y1={0}
                        x2={startX + stageWidth} y2={1}
                        className={'stages-divider'}
                    />}
                </React.Fragment>
                if (enabled) {
                    startX += stageWidth
                }
                return content
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