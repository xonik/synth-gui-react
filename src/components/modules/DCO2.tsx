import React from 'react'
import RotaryPot24 from '../pots/RotaryPot24'
import RotaryPot10 from '../pots/RotaryPot10'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import Header from '../misc/Header'
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8'
import { ControllerGroupIds } from '../../synthcore/types'
import oscControllers from '../../synthcore/modules/osc/oscControllers'

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.OSC

const DCO2 = ({ x, y }: Props) => {
    const topRow = y - 35
    const bottomRow1 = y + 40
    const bottomRow2 = bottomRow1 + 25

    const col1 = x - 39
    const col2 = x - 13
    const col3 = x + 13
    const col4 = x + 39

    return <>
        <Header label="Oscillator 2" x={x} y={topRow - 20} width={100} align="center"/>
        <RotaryPot24 x={x} y={y} ledMode="single" label="Waveform"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO2.WAVEFORM}
        />

        <RotaryPot10 x={col1} y={topRow} ledMode="single" label="Note"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO2.NOTE}
        />

        <RoundPushButton8 x={col2} y={topRow}
                          ledPosition="right" ledCount={2} ledLabels={['Hard', 'Metal']}
                          label="Sync" labelPosition="bottom"
                          hasOff
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.DCO2.SYNC}
        />

        <RotaryPot10 x={col4} y={topRow} ledMode="single" label="Detune"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO2.DETUNE}
        />

        {/*<RotaryPot10 x={col4} y={topRow} ledMode="multi" label="Super saw"/>*/}
        <RoundLedPushButton8 x={col1} y={y-10} label="Saw inv" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.DCO2.SAW_INV}
        />

        <RoundLedPushButton8 x={col1} y={y+7.5} label="Sine" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.DCO2.PRE_FILTER_SINE}
        />

        <RoundPushButton8 x={col4} y={y + 11}
                          ledPosition="top" ledCount={3} ledLabels={['DCO', 'WT', 'PCM']}
                          label="Mode" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.DCO2.MODE}
        />


        <RoundPushButton8 x={col1} y={bottomRow1}
                          ledPosition="top" ledCount={2} ledLabels={['Sqr', 'Saw']}
                          label="Sub wave" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.DCO2.SUB_WAVE}
        />

        <RotaryPot10 x={col2} y={bottomRow1} ledMode="multi" label="Sub -1"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO2.SUB1}
        />

        <RotaryPot10 x={col3} y={bottomRow1} ledMode="multi" label="Sub -2"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO2.SUB2}
        />

        <RotaryPot10 x={col4} y={bottomRow1} ledMode="single" label="PW"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO2.PW}
        />

        <RoundLedPushButton8 x={col2} y={bottomRow2} label="Wheel" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.DCO2.WHEEL}
        />

        <RoundLedPushButton8 x={col3} y={bottomRow2} label="LFO" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.DCO2.LFO}
        />

        <RoundLedPushButton8 x={col4} y={bottomRow2} label="Kbd" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.DCO2.KBD}
        />

    </>
}

export default DCO2