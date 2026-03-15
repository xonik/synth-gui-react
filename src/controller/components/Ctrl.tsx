import { useAppSelector } from "@/synthcore/hooks";
import { selectCurrGuiLfoId } from "@/synthcore/modules/lfo/lfoReducer";
import { useCurve } from "@/controller/lfos/curveCalculator";
import LfoOptionsLeft from "@/controller/lfos/LfoOptionsLeft";
import Stages from "@/controller/lfos/Stages";
import LfoParams from "@/controller/lfos/LfoParams";
import StageActivator from "@/controller/lfos/StageActivator";
import LfoOptionsRight from "@/controller/lfos/LfoOptionsRight";
import React from "react";
import EnvOptionsLeft from "@/controller/envelopes/EnvOptionsLeft";
import StageParams from "@/controller/envelopes/StageParams";

const LfoControl = () => {

    return <div className="ctrl-layout">
        <div className="ctrl-options">
        <LfoOptionsLeft lfoId={lfoId}/>
        </div>
        <div className="ctrl-stages">
            <div className="ctrl-graph">
                <svg viewBox={`0 0 1 1`} preserveAspectRatio="none" className="ctrl-graph-svg">
                    <Stages lfoId={lfoId} points={points} stageBackgrounds={stageBackgrounds}/>
                </svg>
            </div>
            <LfoParams lfoId={lfoId} delayLevel={points[0].y}/>
        </div>
        <div className="ctrl-right-panel">
            <StageActivator lfoId={lfoId}/>
            <LfoOptionsRight lfoId={lfoId}/>
        </div>
    </div>

    return <div className="ctrl-layout">
        <EnvOptionsLeft envId={envId}/>
        <div className="ctrl-stages">
            <div className="ctrl-graph">
                <svg viewBox={`0 0 1 1`} preserveAspectRatio="none" className="ctrl-graph-svg">
                    <Stages envId={envId}/>
                </svg>
            </div>
            <StageParams envId={envId}/>
        </div>
        <StageActivator envId={envId}/>
    </div>
}