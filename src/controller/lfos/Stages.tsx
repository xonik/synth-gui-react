import React, { useCallback, useMemo } from 'react'
import { Stage, StageId } from '../../synthcore/modules/lfo/types'
import StageBlock from './StageBlock'
import { selectCurrGuiStageId, toggleStageSelected, } from '../../synthcore/modules/lfo/lfoReducer'
import { useAppDispatch, useAppSelector } from '../../synthcore/hooks'
import classNames from 'classnames'
import { lfoCtrls } from '../../synthcore/modules/lfo/lfoControllers'
import { selectController, selectLfoStages } from '../../synthcore/modules/controllers/controllersReducer'
import './Stages.scss'
import { uniBipolarLevelResponseMapper } from '../../synthcore/modules/common/responseMappers'

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

    if(bipolar) {
        if(invert) {
            attackLevel = 1;
            decayLevel = -1;
        } else {
            attackLevel = -1
            decayLevel = 1;
        }
    } else {
        if(invert) {
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
    const depth = uniBipolarLevelResponseMapper.input(select(selectController(lfoCtrls.DEPTH, lfoId)), bipolar)

    const dispatch = useAppDispatch();
    const enabledStages = stages.filter((stage) => stage.enabled)
    const decayEnabled = enabledStages.find((stage) => stage.id === StageId.DECAY) !== undefined

    const stageCount = enabledStages.length - 1 // -1 because stopped is hidden.
    const stageWidth = 1 / stageCount

    let startX = 0

    const currStageId = select(selectCurrGuiStageId);

    const onSvgClicked = useCallback((stageId: number) => {
        dispatch(toggleStageSelected({lfo: lfoId, stage: stageId}))
    }, [lfoId, dispatch])

    const unscaledLevels = useMemo(
        () => getUnscaledLevels(bipolar, invert, decayEnabled),
        [bipolar, invert, decayEnabled]
    )

    return <svg x={0} y={0}>
        {
            <line
              x1={0} y1={0.5}
              x2={1} y2={0.5}
              className={'stages-center-line'}
            />
        }
        {
            stages.map((stage, index) => {
                if (stage.id === StageId.STOPPED) {
                    return null
                }
                const level = unscaledLevels[stage.id] * depth
                const nextLevel = unscaledLevels[getNextEnabled(stages, stage.id).id] * depth

                const isLast = index === stages.length - 2
                const enabled = stage.enabled
                const content = <React.Fragment key={stage.id}>
                    {enabled &&
                    <>
                      <rect x={startX} y={0} width={stageWidth} height={1} onClick={() => onSvgClicked(stage.id)}
                            className={classNames('stages-background', {'stages-background--selected': currStageId === stage.id})}

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
                    <StageBlock
                        x={startX}
                        y={0}
                        width={stageWidth}
                        height={1}
                        stage={stage}
                        startLev={level}
                        endLev={nextLevel}
                        isBipolar={bipolar}
                        xOffset={0.5}
                    />
                </React.Fragment>
                if (enabled) {
                    startX += stageWidth
                }
                return content
            })
        }
    </svg>
}

export default Stages