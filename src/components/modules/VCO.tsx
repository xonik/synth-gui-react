import React from 'react'
import RotaryPot21 from '../pots/RotaryPot21'
import RotaryPot12 from '../pots/RotaryPot12'
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

const VCO = ({ x, y }: Props) => {
    const topRow = y - 35
    const bottomRow1 = y + 35
    const bottomRow2 = bottomRow1 + 30

    const col1 = x - 39
    const col2 = x - 13
    const col3 = x + 13
    const col4 = x + 39

    return <>
        <Header label="Oscillator 3" x={x} y={topRow - 20} width={100} align="center"/>
        <RotaryPot21 x={x} y={y-2.5} ledMode="single" label="Waveform"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.VCO.WAVEFORM}
        />


        <RotaryPot12 x={col1} y={topRow} ledMode="single" label="Note"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.VCO.NOTE}
        />

        <RotaryPot12 x={col4} y={topRow} ledMode="single" label="Detune"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.VCO.DETUNE}
        />

        <RoundPushButton8 x={col2} y={topRow}
                          ledPosition="right" ledCount={2} ledLabels={['Hard', 'CEM Hard']}
                          label="Sync" labelPosition="bottom"
                          hasOff
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.VCO.SYNC}
        />

        <RoundPushButton8 x={col4} y={y + 5}
                          ledPosition="top" ledCount={2} ledLabels={['1', '2']}
                          label="Sync src" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.VCO.SYNC_SRC}
        />

        <RoundPushButton8 x={col1} y={y + 5}
                          ledPosition="top" ledCount={2} ledLabels={['Lin', 'Log']}
                          label="FM mode" labelPosition="bottom"
                          hasOff
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.VCO.FM_MODE}
        />

        <RoundPushButton8 x={col1} y={bottomRow1}
                          ledPosition="top" ledCount={2} ledLabels={['Osc 2', 'Ext']}
                          label="FM src" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.VCO.FM_SRC}
        />

        <RotaryPot12 x={col2} y={bottomRow1} ledMode="multi" label="FM"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.VCO.FM_AMT}
        />

        <RotaryPot12 x={col4} y={bottomRow1} ledMode="single" label="PW"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.VCO.PW}
        />

        <RoundLedPushButton8 x={col1} y={bottomRow2} label="Ext CV" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.VCO.EXT_CV}
        />

        <RotaryPot12 x={col2} y={bottomRow2} label="Wheel"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.VCO.WHEEL}
        />

        <RotaryPot12 x={col3} y={bottomRow2} label="LFO"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.VCO.LFO}
        />

        <RotaryPot12 x={col4} y={bottomRow2} label="Kbd"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.VCO.KBD}
        />

    </>
}

export default VCO