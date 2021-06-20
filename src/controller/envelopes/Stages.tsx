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
const Stages = ({ x, y, width, height, env}: Props) => {

    const enabledStages = env.stages.filter((stage) => stage.enabled);
    const stageCount = enabledStages.length - 1; // -1 because stopped is hidden.
    const stageWidth = width / stageCount;

    const stageParamsHeight = 10;
    const stageGraphHeight = height - stageParamsHeight - 10;

    const vCenter = env.bipolar ? stageGraphHeight / 2 : stageGraphHeight;
    const vHeight = env.bipolar ? stageGraphHeight / 2 : stageGraphHeight;

    return <svg x={x} y={y}>
        {
            env.bipolar && <line
              x1={0} y1={vCenter}
              x2={width} y2={vCenter}
              className={'stages-center-line'}
            />
        }
        {
            enabledStages.map((stage, index) => {
               if(stage.id === StageId.STOPPED) return null;
               return <>
                    <StageBlock
                       x={index * stageWidth}
                       y={0}
                       height={height}
                       width={stageWidth}
                       vCenter={vCenter}
                       vHeight={vHeight}
                       stage={stage}
                       nextStage={enabledStages[index+1]}
                   />
                   <StageParams
                       x={index * stageWidth}
                       y={stageGraphHeight + 10}
                       width={stageWidth}
                       height={10}
                       stage={stage}
                       />
               </>
           })
        }
    </svg>;
}

export default Stages;