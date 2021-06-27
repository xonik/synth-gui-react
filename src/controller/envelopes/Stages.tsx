import React, { useCallback } from 'react'
import { StageId, Envelope, Stage } from '../../forces/envelope/types'
import StageBlock from './StageBlock'
import { selectCurrStageId, toggleStageSelected } from '../../forces/envelope/envelopesReducer'
import { useAppDispatch, useAppSelector } from '../../forces/hooks'
import classNames from 'classnames'
import './Stages.scss'

interface Props {
    env: Envelope
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

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const Stages = ({ env }: Props) => {

    const dispatch = useAppDispatch();
    const select = useAppSelector;
    const stages = env.stages
    const enabledStages = stages.filter((stage) => stage.enabled)
    const stageCount = enabledStages.length - 1 // -1 because stopped is hidden.
    const stageWidth = 1 / stageCount
    const graphCenter = env.bipolar ? 1 / 2 : 1

    let startX = 0

    const currStageId = select(selectCurrStageId);

    const onSvgClicked = useCallback((stageId: number) => {
        dispatch(toggleStageSelected({env: env.id, stage: stageId}))
    }, [env, dispatch])


    return <svg x={0} y={0}>
        {
            env.bipolar && <line
              x1={0} y1={graphCenter}
              x2={1} y2={graphCenter}
              className={'stages-center-line'}
            />
        }
        {
            stages.map((stage, index) => {
                if (stage.id === StageId.STOPPED) {
                    return null
                }
                const nextStage = getNextEnabled(stages, stage.id)
                const isLast = index === stages.length - 2
                const enabled = stage.enabled
                const content = <>
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
                        nextStage={nextStage}
                        isBipolar={env.bipolar}
                    />
                </>
                if (enabled) {
                    startX += stageWidth
                }
                return content
            })
        }
    </svg>
}

export default Stages