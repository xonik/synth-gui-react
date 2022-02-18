import React from 'react';
import RotaryPot40 from '../pots/RotaryPot40';
import RotaryPot10 from '../pots/RotaryPot10';
import RotaryPot17 from '../pots/RotaryPot17';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import Header from '../misc/Header';
import { ControllerGroupIds } from '../../synthcore/types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectLpf } from '../../synthcore/modules/filters/filtersReducer'
import { FiltersControllerIds } from '../../synthcore/modules/filters/types'

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.FILTERS

const LowPassFilter = ({ x, y }: Props) => {
    const topRow = y - 50;
    const bottomRow2 = y + 45;

    const col1 = x - 39;
    const col2 = x - 13;
    const col3 = x + 13;
    const col4 = x + 39;

    const lpf = useAppSelector(selectLpf)

    return <>
        <Header label="Low pass filter" x={x} y={topRow - 27} width={110} align="center"/>
        <RotaryPot40 x={x} y={y} ledMode="single" label="Cutoff"
                     ctrlGroup={ctrlGroup}
                     ctrlId={FiltersControllerIds.LPF_CUTOFF}
                     value={lpf.cutoff}
        />

        <RotaryPot17 x={col1} y={topRow} ledMode="multi" label="Input"
                     ctrlGroup={ctrlGroup}
                     ctrlId={FiltersControllerIds.LPF_INPUT}
                     value={lpf.input}
        />

        <RotaryPot17 x={x} y={topRow} ledMode="multi" label="Drive"
                     ctrlGroup={ctrlGroup}
                     ctrlId={FiltersControllerIds.LPF_DRIVE}
                     value={lpf.drive}
        />

        <RotaryPot17 x={col4} y={topRow} ledMode="multi" label="Resonance"
                     ctrlGroup={ctrlGroup}
                     ctrlId={FiltersControllerIds.LPF_RESONANCE}
                     value={lpf.resonance}
        />

        <RoundPushButton8 x={col4} y={y + 10} ledPosition="top" ledCount={2} ledLabels={['12dB', '24dB']}
                          label="Slope" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={FiltersControllerIds.LPF_SLOPE}
                          value={lpf.slope}
        />

        <RoundLedPushButton8 x={col1} y={y -10} label="Ext CV" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrlId={FiltersControllerIds.LPF_EXT_CV}
                             value={lpf.extCv}
        />

        <RoundLedPushButton8 x={col1} y={y + 10} label="Wheel" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrlId={FiltersControllerIds.LPF_WHEEL}
                             value={lpf.wheel}
        />

        <RotaryPot10 x={col1} y={bottomRow2} ledMode="multi" label="FM amt"
                     ctrlGroup={ctrlGroup}
                     ctrlId={FiltersControllerIds.LPF_FM_AMT}
                     value={lpf.fmAmt}
        />

        <RotaryPot10 x={col2} y={bottomRow2} ledMode="multi" label="Env amt"
                     ctrlGroup={ctrlGroup}
                     ctrlId={FiltersControllerIds.LPF_ENV_AMT}
                     value={lpf.envAmt}
        />

        <RotaryPot10 x={col3} y={bottomRow2} ledMode="multi" label="LFO amt"
                     ctrlGroup={ctrlGroup}
                     ctrlId={FiltersControllerIds.LPF_LFO_AMT}
                     value={lpf.lfoAmt}
        />

        <RotaryPot10 x={col4} y={bottomRow2} ledMode="multi" label="Kbd amt"
                     ctrlGroup={ctrlGroup}
                     ctrlId={FiltersControllerIds.LPF_KBD_AMT}
                     value={lpf.kbdAmt}
        />

    </>;
};

export default LowPassFilter;