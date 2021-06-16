import React from 'react'
import AnimatedCurves from '../../components/curves/AnimatedCurves'
import { StageId, Envelope } from './types'
import './Curves.scss'

interface Props {
    env: Envelope
    x: number
    y: number
    width: number
    height: number
}

const curveJointRadius = 0.6;

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const Stage = ({ x, y, width, height, env}: Props) => {

    const enabledStages = env.stages.filter((stage) => stage.enabled);
    const stageCount = enabledStages.length - 1; // -1 because stopped is hidden.
    const vCenter = env.bipolar ? height / 2 : height;
    const vHeight = env.bipolar ? height / 2 : height;

    return <svg x={x} y={y}>
        {
            enabledStages.map((stage, index) => {
                if(stage.id === StageId.STOPPED) return null;
                const startLev = stage.level;
                const endLev = enabledStages[index + 1].level;
                const startX = 0;
                const endX = width;

                const startY = vCenter - vHeight * startLev;
                const endY = vCenter - vHeight * endLev;

                return <>
                    <AnimatedCurves
                        from={[startX, startY]}
                        to={[endX, endY]}
                        selectedCurve={stage.curve}
                        className={'curves-line'}
                    />
                    <circle
                        cx={startX} cy={startY} r={curveJointRadius}
                        className={'curves-joint'}/>
                    {index === stageCount-1 ? <circle
                        cx={endX} cy={endY} r={curveJointRadius}
                        className={'curves-joint'}/> : null}
                </>
            })
        }
    </svg>;
}

export default Stage;