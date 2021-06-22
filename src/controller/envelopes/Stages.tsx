import React from 'react'
import { StageId, Envelope, Stage } from '../../forces/envelope/types'
import StageBlock from './StageBlock'
import StageParams from './StageParams'
import './Stages.scss'

interface Props {
    env: Envelope
    x: number
    y: number
    width: number
    height: number
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
const Stages = ({ x, y, width, height, env }: Props) => {

    const stages = env.stages
    const enabledStages = stages.filter((stage) => stage.enabled)
    const stageCount = enabledStages.length - 1 // -1 because stopped is hidden.
    const stageWidth = width / stageCount

    const stageParamsHeight = 10

    const graphHeight = height - stageParamsHeight - 10
    const graphCenter = env.bipolar ? graphHeight / 2 : graphHeight

    let startX = 0

    return <svg x={x} y={y}>
        {
            env.bipolar && <line
              x1={0} y1={graphCenter}
              x2={width} y2={graphCenter}
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
                      <StageParams
                        x={startX}
                        y={graphHeight + 10}
                        width={stageWidth}
                        height={10}
                        stage={stage}
                      />
                      <line
                        x1={startX} y1={0}
                        x2={startX} y2={height}
                        className={'stages-divider'}
                      />
                    </>}
                    {isLast && <line
                      x1={startX + stageWidth} y1={0}
                      x2={startX + stageWidth} y2={height}
                      className={'stages-divider'}
                    />}
                    <StageBlock
                        x={startX}
                        y={0}
                        width={stageWidth}
                        graphCenter={graphCenter}
                        height={graphHeight}
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