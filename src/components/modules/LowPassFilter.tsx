import React from 'react'
import RotaryPot21 from '../pots/RotaryPot21'
import RotaryPot12 from '../pots/RotaryPot12'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8'
import Header from '../misc/Header'
import { ControllerGroupIds } from '../../synthcore/types'
import filtersControllers from '../../synthcore/modules/filters/filtersControllers'
import HorizontalLine from "../misc/HorizontalLine";

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.FILTERS

const LowPassFilter = ({ x, y }: Props) => {
    const topRow = y - 50
    const bottomRow2 = y + 50

    const col1 = x - 39
    const col2 = x - 13
    const col3 = x + 13
    const col4 = x + 39

    return <>
        <RotaryPot21 x={x} y={y} ledMode="single" label="Cutoff"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.LPF.CUTOFF}
        />

        <RotaryPot12 x={col1} y={topRow} ledMode="multi" label="Input"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.LPF.INPUT}
        />

        <RotaryPot12 x={x} y={topRow} ledMode="multi" label="Resonance"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.LPF.RESONANCE}
        />

        <RotaryPot12 x={col4} y={topRow} ledMode="multi" label="FM"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.LPF.FM_AMT}
        />

        <RoundPushButton8 x={col1} y={y - 12.5} ledPosition="top" ledCount={2} ledLabels={['Lin', 'Log']}
                          label="FM mode" labelPosition="bottom"
                          hasOff
                          ctrlGroup={ctrlGroup}
                          ctrl={filtersControllers.LPF.FM_MODE}
        />

        <RoundPushButton8 x={col1} y={y + 20} ledPosition="top" ledCount={2} ledLabels={['OTA', 'Ladder']}
                          label="Filter" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={filtersControllers.LPF.FILTER_TYPE}
        />

        <RoundPushButton8 x={col4} y={y + 20} ledPosition="top" ledCount={2} ledLabels={['12dB', '24dB']}
                          label="Slope" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={filtersControllers.LPF.SLOPE}
        />
        {/*
        <RoundLedPushButton8 x={col4} y={y + 10} label="Ext CV" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={filtersControllers.LPF.EXT_CV}
        />*/}

        <RoundPushButton8 x={col4} y={y - 12.5} ledPosition="top" ledCount={2} ledLabels={['Osc B', 'Ext']}
                          label="FM src" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={filtersControllers.LPF.FM_SRC}
        />

        <RotaryPot12 x={col1} y={bottomRow2} ledMode="multi" label="Wheel amt"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.LPF.WHEEL_AMT}
        />

        <RotaryPot12 x={col2} y={bottomRow2} ledMode="multi" label="Env amt"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.LPF.ENV_AMT}
        />

        <RotaryPot12 x={col3} y={bottomRow2} ledMode="multi" label="LFO amt"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.LPF.LFO_AMT}
        />

        <RotaryPot12 x={col4} y={bottomRow2} ledMode="multi" label="Kbd amt"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.LPF.KBD_AMT}
        />

    </>
}

export default LowPassFilter