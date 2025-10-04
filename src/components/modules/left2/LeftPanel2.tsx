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
import { ModuleBorder } from "../../misc/ModuleBorder";

type Props = {
    panelHeight: number,
    oscRow: number
}

export const LeftPanel2 = ({ panelHeight, oscRow }: Props) => {

    const row1 = oscRow
    const row2 = row1 + ROW_HEIGHT
    const row3 = row2 + ROW_HEIGHT
    const row4 = row3 + ROW_HEIGHT
    const row5 = row4 + ROW_HEIGHT
    const row6 = row5 + ROW_HEIGHT
    const row7 = row6 + ROW_HEIGHT
    const row8 = row7 + ROW_HEIGHT

    const oscCol = 20
    const oscWidth = POT_DISTANCE_L + POT_DISTANCE_M * 7

    const mixWidth = 2 * POT_DISTANCE_L + 5

    const lfoCol = oscCol + POT_DISTANCE_L + POT_DISTANCE_M
    const noiseCol = oscCol + oscWidth

    return <>
        {SHOW_CUT && <rect x={0} y={0} width="365" height={panelHeight} className="panel-outline"/>}
        <ModuleBorder x={oscCol} y={row1} height={6 * ROW_HEIGHT} width={oscWidth}/>
        <DCO1 x={oscCol} y={row1} width={oscWidth}/>
        <DCO2 x={oscCol} y={row3} width={oscWidth}/>
        <VCO x={oscCol} y={row5} width={oscWidth}/>

        <Clock x={oscCol} y={row7} height={ROW_HEIGHT} width={POT_DISTANCE_L + POT_DISTANCE_M}/>
        <Route x={oscCol} y={row8} height={ROW_HEIGHT} width={POT_DISTANCE_L + POT_DISTANCE_M}/>

        <LFO x={lfoCol} y={row7} height={2 * ROW_HEIGHT} width={6 * POT_DISTANCE_M}/>
        <NoiseAndRing x={noiseCol} y={row1} height={ROW_HEIGHT} width={mixWidth}/>

        <SourceMixer x={noiseCol} y={row2} height={3 * ROW_HEIGHT} width={mixWidth}/>
        <Effects x={noiseCol} y={row5} height={2 * ROW_HEIGHT} width={mixWidth}/>

        <Arpeggiator x={noiseCol} y={row7} height={2 * ROW_HEIGHT} width={mixWidth}/>

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