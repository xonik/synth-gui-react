import React from 'react'
import { StageId, Envelope } from '../../forces/envelope/types'
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

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const Stages = ({ x, y, width, height, env }: Props) => {

    const enabledStages = env.stages.filter((stage) => stage.enabled)
    const stageCount = enabledStages.length - 1 // -1 because stopped is hidden.
    const stageWidth = width / stageCount

    const stageParamsHeight = 10

    const graphHeight = height - stageParamsHeight - 10
    const graphCenter = env.bipolar ? graphHeight / 2 : graphHeight

    return <svg x={x} y={y}>
        {
            env.bipolar && <line
              x1={0} y1={graphCenter}
              x2={width} y2={graphCenter}
              className={'stages-center-line'}
            />
        }
        {
            enabledStages.map((stage, index) => {
                if (stage.id === StageId.STOPPED) {
                    return null
                }
                const startX = index * stageWidth
                const nextStage = enabledStages[index + 1]
                const isLast = nextStage.id === StageId.STOPPED
                return <>
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
                    {isLast && <line
                      x1={startX + stageWidth} y1={0}
                      x2={startX + stageWidth} y2={height}
                      className={'stages-divider'}
                    />}
                    <StageBlock
                        x={index * stageWidth}
                        y={0}
                        width={stageWidth}
                        graphCenter={graphCenter}
                        height={graphHeight}
                        stage={stage}
                        nextStage={nextStage}
                        isBipolar={env.bipolar}
                    />
                </>
            })
        }
    </svg>;
}

export default Stages;