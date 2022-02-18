import React from 'react';
import RotaryPot40 from '../pots/RotaryPot40';
import RotaryPot10 from '../pots/RotaryPot10';
import RotaryPot17 from '../pots/RotaryPot17';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import Header from '../misc/Header';
import HorizontalLine from '../misc/HorizontalLine';
import RoundRotaryButton17 from '../buttons/RoundRotaryButton17';
import { ControllerGroupIds } from '../../synthcore/types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectFilters, selectSvf } from '../../synthcore/modules/filters/filtersReducer'
import { FiltersControllerIds } from '../../synthcore/modules/filters/types'

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.FILTERS

const StateVariableFilter = ({ x, y }: Props) => {
    const topRow = y - 50;
    const bottomRow1 = y + 45;
    const bottomRow2 = y + 75;

    const col1 = x - 39;
    const col2 = x - 13;
    const col3 = x + 13;
    const col4 = x + 39;

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

    const svf = useAppSelector(selectSvf)
    const filters = useAppSelector(selectFilters)

    return <>
        <HorizontalLine x={x} y={topRow - 62} width={110} align="center"/>
        <RoundLedPushButton8 x={col2} y={topRow -42}
                          label="Link cutoff" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrlId={FiltersControllerIds.FILTERS_LINK_CUTOFF}
                             value={filters.linkCutoff}
        />

        <RoundPushButton8 x={col3} y={topRow - 42}
                          ledPosition="right"
                          ledCount={2}
                          ledLabels={['Series', 'Parallel']} label="Routing" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={FiltersControllerIds.FILTERS_ROUTING}
                          value={filters.routing}
        />

        <Header label="State variable filter" x={x} y={topRow - 27} width={110} align="center"/>
        <RotaryPot40 x={x} y={y} ledMode="single" label="Cutoff"
                     ctrlGroup={ctrlGroup}
                     ctrlId={FiltersControllerIds.SVF_CUTOFF}
                     value={svf.cutoff}
        />

        <RotaryPot17 x={col1} y={topRow} ledMode="multi" label="Input"
                     ctrlGroup={ctrlGroup}
                     ctrlId={FiltersControllerIds.SVF_INPUT}
                     value={svf.input}
        />

        <RotaryPot17 x={x} y={topRow} ledMode="multi" label="Drive"
                     ctrlGroup={ctrlGroup}
                     ctrlId={FiltersControllerIds.SVF_DRIVE}
                     value={svf.drive}
        />

        <RotaryPot17 x={col4} y={topRow} ledMode="multi" label="Resonance"
                     ctrlGroup={ctrlGroup}
                     ctrlId={FiltersControllerIds.SVF_RESONANCE}
                     value={svf.resonance}
        />

        <RoundLedPushButton8 x={col1} y={y -10} label="Ext CV" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrlId={FiltersControllerIds.SVF_EXT_CV}
                             value={svf.extCv}
        />

        <RoundLedPushButton8 x={col1} y={y + 10} label="Wheel" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrlId={FiltersControllerIds.SVF_WHEEL}
                             value={svf.wheel}
        />


        <RoundRotaryButton17 x={x} y={bottomRow1}
                             label="Slope" labelPosition="bottom"
                             ledPosition="sides" ledCount={10}
                             ledLabels={[
                                 '12dB LP', '24dB LP', '12dB BP', '24dB BP', 'LP + BP',
                                 '12dB HP', '24dB HP', 'HP + BP', 'Notch', 'Notch + LP'
                             ]}
                             resolution={10}
                             ctrlGroup={ctrlGroup}
                             ctrlId={FiltersControllerIds.SVF_SLOPE}
                             value={svf.slope}
        />

        <RotaryPot10 x={col1} y={bottomRow2} ledMode="multi" label="FM amt"
                     ctrlGroup={ctrlGroup}
                     ctrlId={FiltersControllerIds.SVF_FM_AMT}
                     value={svf.fmAmt}
        />

        <RotaryPot10 x={col2} y={bottomRow2} ledMode="multi" label="Env amt"
                     ctrlGroup={ctrlGroup}
                     ctrlId={FiltersControllerIds.SVF_ENV_AMT}
                     value={svf.envAmt}
        />

        <RotaryPot10 x={col3} y={bottomRow2} ledMode="multi" label="LFO amt"
                     ctrlGroup={ctrlGroup}
                     ctrlId={FiltersControllerIds.SVF_LFO_AMT}
                     value={svf.lfoAmt}
        />

        <RotaryPot10 x={col4} y={bottomRow2} ledMode="multi" label="Kbd amt"
                     ctrlGroup={ctrlGroup}
                     ctrlId={FiltersControllerIds.SVF_KBD_AMT}
                     value={svf.kbdAmt}
        />

    </>;
};

export default StateVariableFilter;