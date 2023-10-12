import React from 'react'
import RotaryPot24 from '../pots/RotaryPot24'
import RotaryPot10 from '../pots/RotaryPot10'
import RotaryPot15 from '../pots/RotaryPot15'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8'
import Header from '../misc/Header'
import HorizontalLine from '../misc/HorizontalLine'
import RoundRotaryButton17 from '../buttons/RoundRotaryButton17'
import { ControllerGroupIds } from '../../synthcore/types'
import filtersControllers from '../../synthcore/modules/filters/filtersControllers'

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.FILTERS

const StateVariableFilter = ({ x, y }: Props) => {
    const topRow = y - 50
    const bottomRow1 = y + 45
    const bottomRow2 = y + 75

    const col1 = x - 39
    const col2 = x - 13
    const col3 = x + 13
    const col4 = x + 39

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
        <HorizontalLine x={x} y={topRow - 62} width={110} align="center"/>
        <RoundLedPushButton8 x={col2} y={topRow - 42}
                             label="Link cutoff" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={filtersControllers.FILTERS.LINK_CUTOFF}
        />

        <RoundPushButton8 x={col3} y={topRow - 42}
                          ledPosition="right"
                          ledCount={2}
                          ledLabels={['Series', 'Parallel']} label="Routing" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={filtersControllers.FILTERS.ROUTING}
        />

        <Header label="State variable filter" x={x} y={topRow - 27} width={110} align="center"/>
        <RotaryPot24 x={x} y={y} ledMode="single" label="Cutoff"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.SVF.CUTOFF}
        />

        <RotaryPot15 x={col1} y={topRow} ledMode="multi" label="Input"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.SVF.INPUT}
        />

        <RotaryPot15 x={x} y={topRow} ledMode="multi" label="Drive"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.SVF.DRIVE}
        />

        <RotaryPot15 x={col4} y={topRow} ledMode="multi" label="Resonance"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.SVF.RESONANCE}
        />

        <RoundPushButton8 x={col1} y={y - 10} ledPosition="top" ledCount={2} ledLabels={['Lin', 'Log']}
                          label="FM mode" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={filtersControllers.SVF.FM_MODE}
        />

        <RoundLedPushButton8 x={col4} y={y - 10} label="Invert" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={filtersControllers.SVF.INVERT}
        />

        <RoundLedPushButton8 x={col1} y={y + 10} label="Wheel" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={filtersControllers.SVF.WHEEL}
        />

        <RoundLedPushButton8 x={col4} y={y + 10} label="Ext CV" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={filtersControllers.SVF.EXT_CV}
        />

        <RoundRotaryButton17 x={x} y={bottomRow1}
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

        <RotaryPot10 x={col1} y={bottomRow2} ledMode="multi" label="FM amt"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.SVF.FM_AMT}
        />

        <RotaryPot10 x={col2} y={bottomRow2} ledMode="multi" label="Env amt"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.SVF.ENV_AMT}
        />

        <RotaryPot10 x={col3} y={bottomRow2} ledMode="multi" label="LFO amt"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.SVF.LFO_AMT}
        />

        <RotaryPot10 x={col4} y={bottomRow2} ledMode="multi" label="Kbd amt"
                     ctrlGroup={ctrlGroup}
                     ctrl={filtersControllers.SVF.KBD_AMT}
        />

    </>
}

export default StateVariableFilter