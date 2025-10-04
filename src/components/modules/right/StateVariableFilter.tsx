import React from 'react'
import RotaryPot21 from '../../pots/RotaryPot21'
import RotaryPot12 from '../../pots/RotaryPot12'
import RoundPushButton8 from '../../buttons/RoundPushButton8'
import RoundLedPushButton8 from '../../buttons/RoundLedPushButton8'
import Header from '../../misc/Header'
import HorizontalLine from '../../misc/HorizontalLine'
import RoundRotaryButton17 from '../../buttons/RoundRotaryButton17'
import { ControllerGroupIds } from '../../../synthcore/types'
import filtersControllers from '../../../synthcore/modules/filters/filtersControllers'
import SubHeader from "../../misc/SubHeader";
import { POT_DISTANCE_L, POT_DISTANCE_M, POT_OFFSET_Y, ROW_HEIGHT } from "../../../constants";
import { ModuleBorder } from "../../misc/ModuleBorder";
import { ModuleProps } from "../types";

const ctrlGroup = ControllerGroupIds.FILTERS

const StateVariableFilter = ({ x, y, height, width }: ModuleProps) => {
    const topRow = y + POT_OFFSET_Y
    const fmRow = topRow + 40
    const centerRow = topRow + ROW_HEIGHT
    const bottomRow1 = centerRow + ROW_HEIGHT
    const bottomRow2 = bottomRow1 + ROW_HEIGHT

    const col1 = x + POT_DISTANCE_L / 2;
    const col2 = col1 + POT_DISTANCE_M
    const col3 = col2 + POT_DISTANCE_M / 2
    const col4 = col2 + POT_DISTANCE_M
    const col5 = col4 + POT_DISTANCE_M
    // modes:
    /*
    2p LP
    2p HP
    4P LP
    4p HP
    2p BP
    4p BP
    2p LP + 2p BP
    2p HP + 2p BP
    Notch
    Notch + LP
     */

    return <>
        <ModuleBorder x={x} y={y} height={height} width={width}/>
        <SubHeader label="SVF" x={x} y={y} width={width} labelPosition="center" labelWidth={15}/>

        <RotaryPot21 x={col3} y={centerRow} ledMode="single" label="Cutoff"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.SVF.CUTOFF}
        />

        <RotaryPot12 x={col1} y={topRow} ledMode="multi" label="In dry/wet"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.SVF.INPUT}
        />

        <RotaryPot12 x={col3} y={topRow} ledMode="multi" label="Resonance"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.SVF.RESONANCE}
        />

        <RotaryPot12 x={col5} y={topRow} ledMode="multi" label="FM"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.SVF.FM_AMT}
        />


        <RoundPushButton8 x={col1} y={fmRow} ledPosition="top" ledCount={2} ledLabels={['Lin', 'Log']}
                          label="FM mode" labelPosition="bottom"
                          hasOff
                          ctrlGroup={ctrlGroup}
                          ctrl={filtersControllers.SVF.FM_MODE}
        />

        <RoundPushButton8 x={col5} y={fmRow} ledPosition="top" ledCount={2} ledLabels={['2', 'Ext']}
                          label="FM src" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={filtersControllers.SVF.FM_SRC}
        />

        {/*<RoundLedPushButton8 x={col4} y={y + 10} label="Ext CV" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={filtersControllers.SVF.EXT_CV}
        />*/}

        <RoundRotaryButton17 x={col3} y={bottomRow1}
                             label="Slope" labelPosition="bottom"
                             ledPosition="sides" ledCount={10}
                             ledLabels={[
                                 '12dB LP', '24dB LP', '12dB BP', '24dB BP', 'LP + BP',
                                 '12dB HP', '24dB HP', 'HP + BP', 'Notch', 'AP'
                             ]}
                             resolution={10}
                             ctrlGroup={ctrlGroup}
                             ctrl={filtersControllers.SVF.SLOPE}
        />

        <RotaryPot12 x={col1} y={bottomRow2} ledMode="multi" label="Wheel amt"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.SVF.WHEEL_AMT}
        />

        <RotaryPot12 x={col2} y={bottomRow2} ledMode="multi" label="Env amt"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.SVF.ENV_AMT}
        />

        <RotaryPot12 x={col4} y={bottomRow2} ledMode="multi" label="LFO amt"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.SVF.LFO_AMT}
        />

        <RotaryPot12 x={col5} y={bottomRow2} ledMode="multi" label="Kbd amt"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.SVF.KBD_AMT}
        />


        <RoundLedPushButton8 x={col5} y={bottomRow1 + 5} label="Invert" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={filtersControllers.SVF.INVERT}
        />

    </>
}

export default StateVariableFilter