import React from 'react'
import RotaryPot21 from '../../pots/RotaryPot21'
import RotaryPot12 from '../../pots/RotaryPot12'
import RoundPushButton8 from '../../buttons/RoundPushButton8'
import { ControllerGroupIds } from '../../../synthcore/types'
import filtersControllers from '../../../synthcore/modules/filters/filtersControllers'
import { POT_DISTANCE_L, POT_DISTANCE_M, POT_OFFSET_Y, ROW_HEIGHT } from "../../../constants";
import RoundLedPushButton8 from "../../buttons/RoundLedPushButton8";
import { ModuleBorder } from "../../misc/ModuleBorder";
import SubHeader from "../../misc/SubHeader";
import { ModuleProps } from "../types";
import './LowPassFilter.scss'
import "../Modules.scss"
import { HorizontalDividerLine } from "../../misc/HorizontalDividerLine";

const ctrlGroup = ControllerGroupIds.FILTERS

const LowPassFilter = ({ x, y, height, width }: ModuleProps) => {
    const topRow = y + POT_OFFSET_Y
    const fmRow = topRow + 40
    const centerRow = topRow + ROW_HEIGHT
    const bottomRow1 = centerRow + ROW_HEIGHT + 7.5
    const bottomRow2 = bottomRow1 + ROW_HEIGHT - 7.5

    const col1 = x + POT_DISTANCE_L / 2;
    const col2 = col1 + POT_DISTANCE_M
    const col3 = col2 + POT_DISTANCE_M / 2
    const col4 = col2 + POT_DISTANCE_M
    const col5 = col4 + POT_DISTANCE_M

    return <>
        <ModuleBorder x={x} y={y} height={height} width={width} className="audio-elements-border"/>
        <SubHeader label="LFP" x={x} y={y} width={width} labelPosition="center" className="lpf-header-border" labelWidth={15}/>

        <RotaryPot21 x={col3} y={centerRow} ledMode="single" label="Cutoff"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.LPF.CUTOFF}
        />

        <RotaryPot12 x={col1} y={topRow} ledMode="multi" label="In dry/wet"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.LPF.INPUT}
        />

        <RotaryPot12 x={col3} y={topRow} ledMode="multi" label="Resonance"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.LPF.RESONANCE}
        />

        <RotaryPot12 x={col5} y={topRow} ledMode="multi" label="FM"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.LPF.FM_AMT}
        />

        <RoundPushButton8 x={col1} y={fmRow} ledPosition="top" ledCount={2} ledLabels={['Lin', 'Log']}
                          label="FM mode" labelPosition="bottom"
                          hasOff
                          ctrlGroup={ctrlGroup}
                          ctrl={filtersControllers.LPF.FM_MODE}
        />

        <RoundPushButton8 x={col1} y={bottomRow1} ledPosition="top" ledCount={2} ledLabels={['OTA', 'Ladder']}
                          label="Filter" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={filtersControllers.LPF.FILTER_TYPE}
        />

        <RoundPushButton8 x={col2} y={bottomRow1} ledPosition="top" ledCount={2} ledLabels={['12dB', '24dB']}
                          label="Slope" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={filtersControllers.LPF.SLOPE}
        />

        <RoundPushButton8 x={col4} y={bottomRow1}
                          ledPosition="top"
                          ledCount={2}
                          ledLabels={['Series', 'Parallel']} label="Routing" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={filtersControllers.FILTERS.ROUTING}
        />

        <RoundLedPushButton8 x={col5} y={bottomRow1}
                             label="Link cutoff" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={filtersControllers.FILTERS.LINK_CUTOFF}
        />

        {/*
        <RoundLedPushButton8 x={col4} y={y + 10} label="Ext CV" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={filtersControllers.LPF.EXT_CV}
        />*/}

        <RoundPushButton8 x={col5} y={fmRow} ledPosition="top" ledCount={2} ledLabels={['2', 'Ext']}
                          label="FM src" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={filtersControllers.LPF.FM_SRC}
        />

        <HorizontalDividerLine x={x} y={bottomRow2 - 12.5} width={width}/>

        <RotaryPot12 x={col1} y={bottomRow2} ledMode="multi" label="Keyboard"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.LPF.KBD_AMT}
        />

        <RotaryPot12 x={col2} y={bottomRow2} ledMode="multi" label="LFO"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.LPF.LFO_AMT}
        />

        <RotaryPot12 x={col4} y={bottomRow2} ledMode="multi" label="Wheel amt"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.LPF.WHEEL_AMT}
        />

        <RotaryPot12 x={col5} y={bottomRow2} ledMode="multi" label="Envelope"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.LPF.ENV_AMT}
        />

    </>
}

export default LowPassFilter