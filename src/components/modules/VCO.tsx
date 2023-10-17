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

const VCO = ({ x, y }: Props) => {
    const topRow = y - 35
    const bottomRow1 = y + 40
    const bottomRow2 = bottomRow1 + 25

    const col1 = x - 39
    const col2 = x - 13
    const col3 = x + 13
    const col4 = x + 39

    return <>
        <Header label="Oscillator 3" x={x} y={topRow - 20} width={100} align="center"/>
        <RotaryPot24 x={x} y={y} ledMode="single" label="Waveform"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.VCO.WAVEFORM}
        />


        <RotaryPot10 x={col1} y={topRow} ledMode="single" label="Note"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.VCO.NOTE}
        />

        <RotaryPot10 x={col4} y={topRow} ledMode="single" label="Detune"
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

        <RoundPushButton8 x={col1} y={bottomRow1}
                          ledPosition="top" ledCount={2} ledLabels={['Osc 1', 'Ext']}
                          label="X-mod src" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.VCO.CROSS_MOD_SRC}
        />

        <RotaryPot10 x={col2} y={bottomRow1} ledMode="multi" label="X-mod amt"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.VCO.CROSS_MOD}
        />

        <RotaryPot10 x={col4} y={bottomRow1} ledMode="single" label="PW"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.VCO.PW}
        />

        <RoundLedPushButton8 x={col1} y={bottomRow2} label="Ext CV" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.VCO.EXT_CV}
        />

        <RoundLedPushButton8 x={col2} y={bottomRow2} label="Wheel" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.VCO.WHEEL}
        />

        <RoundLedPushButton8 x={col3} y={bottomRow2} label="LFO" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.VCO.LFO}
        />

        <RoundLedPushButton8 x={col4} y={bottomRow2} label="Kbd" labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.VCO.KBD}
        />

    </>
}

export default VCO