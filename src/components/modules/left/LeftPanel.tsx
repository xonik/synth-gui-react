import React from "react";
import { SHOW_CUT } from "../../../config";
import DCO1 from "./DCO1";
import DCO2 from "./DCO2";
import VCO from "./VCO";
import Noise from "./Noise";
import Ringmod from "./Ringmod";
import Distortion from "./Distortion";
import BitCrusherPre from "./BitCrusherPre";
import SourceMixer from "./SourceMixer";
import LFO from "./LFO";
import Route from "./Route";
import Clock from "./Clock";
import Arpeggiator from "./Arpeggiator";
import { PanelScrew } from "../../misc/PanelScrew";
import { PADDING_LEFT, POT_DISTANCE_M, ROW_HEIGHT } from "../../../constants";

type Props = {
    panelHeight: number,
    oscRow: number
}

export const LeftPanel = ({panelHeight, oscRow }: Props) => {

    const row5 = oscRow + 130
    const row6 = row5 + ROW_HEIGHT
    const row7 = row6 + ROW_HEIGHT
    const row8 = row7 + ROW_HEIGHT

    const osc1Col = 71.125
    const osc2Col = osc1Col + 110
    const osc3Col = osc2Col + 110

    const lfoCol = 20
    const noiseCol = 20
    const ringModCol = noiseCol
    const sourceMixCol = noiseCol + 50
    const bcCol = sourceMixCol + 142.5
    const distCol = bcCol

    const routeCol = 20
    const clockCol = routeCol + 55
    const arpCol = routeCol + PADDING_LEFT + 4.25 * POT_DISTANCE_M

    return <>
        {SHOW_CUT && <rect x={0} y={0} width="365" height={panelHeight} className="panel-outline"/>}
        <DCO1 x={osc1Col} y={oscRow}/>
        <DCO2 x={osc2Col} y={oscRow}/>
        <VCO x={osc3Col} y={oscRow}/>

        <Noise x={noiseCol} y={row5}/>
        <Ringmod x={ringModCol} y={row6}/>
        <Distortion x={distCol} y={row5}/>
        <BitCrusherPre x={bcCol} y={row6}/>


        <SourceMixer x={sourceMixCol} y={row5}/>

        <LFO x={lfoCol} y={row7}/>

        <Route x={routeCol} y={row8}/>
        <Clock x={clockCol} y={row8}/>
        <Arpeggiator x={arpCol} y={row8}/>

        <PanelScrew x={10} y={10}/>
        <PanelScrew x={10} y={145}/>
        <PanelScrew x={20 + PADDING_LEFT + 5.5 * POT_DISTANCE_M} y={10}/>
        <PanelScrew x={355} y={10}/>
        <PanelScrew x={10} y={280}/>
        <PanelScrew x={20 + PADDING_LEFT + 5.5 * POT_DISTANCE_M} y={280}/>
        <PanelScrew x={355} y={145}/>
        <PanelScrew x={355} y={280}/>
    </>
}