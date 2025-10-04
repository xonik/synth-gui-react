import React from "react";
import { SHOW_CUT } from "../../../config";
import DCO1 from "./DCO1";
import DCO2 from "./DCO2";
import VCO from "./VCO";
import NoiseAndRing from "./NoiseAndRing";
import Effects from "./Effects";
import SourceMixer from "./SourceMixer";
import LFO from "./LFO";
import Route from "./Route";
import Clock from "./Clock";
import Arpeggiator from "./Arpeggiator";
import { PanelScrew } from "../../misc/PanelScrew";
import {
    PADDING_LEFT,
    POT_DISTANCE_L,
    POT_DISTANCE_M,
    ROW_HEIGHT
} from "../../../constants";

type Props = {
    panelHeight: number,
    rows: number[]
}

export const LeftPanel2 = ({ panelHeight, rows }: Props) => {

    const oscCol = 20
    const oscWidth = POT_DISTANCE_L + POT_DISTANCE_M * 7

    const mixWidth = 2 * POT_DISTANCE_L + 5

    const lfoCol = oscCol + POT_DISTANCE_L + POT_DISTANCE_M
    const noiseCol = oscCol + oscWidth

    return <>
        {SHOW_CUT && <rect x={0} y={0} width="365" height={panelHeight} className="panel-outline"/>}
        <DCO1 x={oscCol} y={rows[0]} height={2 * ROW_HEIGHT} width={oscWidth}/>
        <DCO2 x={oscCol} y={rows[2]} height={2 * ROW_HEIGHT} width={oscWidth}/>
        <VCO x={oscCol} y={rows[4]} height={2 * ROW_HEIGHT} width={oscWidth}/>

        <Clock x={oscCol} y={rows[6]} height={ROW_HEIGHT} width={POT_DISTANCE_L + POT_DISTANCE_M}/>
        <Route x={oscCol} y={rows[7]} height={ROW_HEIGHT} width={POT_DISTANCE_L + POT_DISTANCE_M}/>

        <LFO x={lfoCol} y={rows[6]} height={2 * ROW_HEIGHT} width={6 * POT_DISTANCE_M}/>
        <NoiseAndRing x={noiseCol} y={rows[0]} height={ROW_HEIGHT} width={mixWidth}/>

        <SourceMixer x={noiseCol} y={rows[1]} height={3 * ROW_HEIGHT} width={mixWidth}/>
        <Effects x={noiseCol} y={rows[4]} height={2 * ROW_HEIGHT} width={mixWidth}/>

        <Arpeggiator x={noiseCol} y={rows[6]} height={2 * ROW_HEIGHT} width={mixWidth}/>

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