import React from 'react'
import RotaryPot21 from '../pots/RotaryPot21'
import RotaryPot12 from '../pots/RotaryPot12'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8'
import Header from '../misc/Header'
import { ControllerGroupIds } from '../../synthcore/types'
import oscControllers from '../../synthcore/modules/osc/oscControllers'

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.OSC

const DCO1 = ({ x, y }: Props) => {

    const topRow = y - 35
    const bottomRow1 = y +35
    const bottomRow2 = bottomRow1 + 30

    const col1 = x - 39
    const col2 = x - 13
    const col3 = x + 13
    const col4 = x + 39

    return <>
        <Header label="Oscillator 1" x={x} y={topRow - 20} width={100} align="center"/>
        <RotaryPot21 x={x} y={y-2.5} ledMode="single" label="Waveform"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO1.WAVEFORM}
        />

        <RotaryPot12 x={col1} y={topRow} ledMode="single" label="Note"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO1.NOTE}
        />

        <RoundPushButton8 x={col2} y={topRow}
                          ledPosition="right" ledCount={2} ledLabels={['Hard', 'Metal']}
                          label="Sync" labelPosition="bottom"
                          hasOff
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.DCO1.SYNC}
        />

        {/*<RotaryPot12 x={col4} y={topRow} ledMode="multi" label="Super saw"/>*/}
        <RoundLedPushButton8 x={col1} y={y-12.5} label="Saw inv" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.DCO1.SAW_INV}
        />

        <RoundLedPushButton8 x={col1} y={y+4.5} label="Sine" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.DCO1.PRE_FILTER_SINE}
        />

        <RoundPushButton8 x={col4} y={y + 5}
                          ledPosition="top" ledCount={3} ledLabels={['DCO', 'WT', 'PCM']}
                          label="Mode" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.DCO1.MODE}
        />

        <RoundPushButton8 x={col1} y={bottomRow1}
                          ledPosition="top" ledCount={2} ledLabels={['Sqr', 'Saw']}
                          label="Sub wave" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.DCO1.SUB_WAVE}
        />

        <RotaryPot12 x={col2} y={bottomRow1} ledMode="multi" label="Sub -1"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO1.SUB1}
        />

        <RotaryPot12 x={col3} y={bottomRow1} ledMode="multi" label="Sub -2"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO1.SUB2}
        />

        <RotaryPot12 x={col4} y={bottomRow1} ledMode="single" label="PW"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.DCO1.PW}
        />

        <RotaryPot12 x={col2} y={bottomRow2} label="Wheel"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.DCO1.WHEEL}
        />
        <RotaryPot12 x={col3} y={bottomRow2} label="LFO"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.DCO1.LFO}
        />
        <RotaryPot12 x={col4} y={bottomRow2} label="Kbd"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.DCO1.KBD}
        />
    </>
}

export default DCO1