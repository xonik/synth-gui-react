import React from 'react'
import RotaryPot21 from '../../pots/RotaryPot21'
import RotaryPot12 from '../../pots/RotaryPot12'
import RoundPushButton8 from '../../buttons/RoundPushButton8'
import RoundLedPushButton8 from '../../buttons/RoundLedPushButton8'
import { ControllerGroupIds } from '../../../synthcore/types'
import oscControllers from '../../../synthcore/modules/osc/oscControllers'
import SubHeader from "../../misc/SubHeader";
import {
    DUAL_LED_BUTTON_W_LABEL_OFFSET_Y,
    POT_DISTANCE_M,
    POT_OFFSET_Y,
    ROW_HEIGHT,
    ROW_SPACING
} from "../../../constants";
import { SHOW_CUT } from "../../../config";

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.OSC

const VCO = ({ x, y }: Props) => {
    const topRow = y + POT_OFFSET_Y
    const buttonRow = topRow + 40
    const centerRow = topRow + ROW_HEIGHT
    const bottomRow1 = centerRow + ROW_HEIGHT
    const bottomRow2 = bottomRow1 + ROW_HEIGHT

    const col1 = x - 1.5 * POT_DISTANCE_M
    const col2 = x - 0.5 * POT_DISTANCE_M
    const col3 = x + 0.5 * POT_DISTANCE_M
    const col4 = x + 1.5 * POT_DISTANCE_M

    return <>
        {!SHOW_CUT && <rect x={x-52.5} y={y} width="105" height={130 - ROW_SPACING} className="module-background"/> }
        <SubHeader label="Oscillator 3" x={x} y={y} width={105} align="center"/>
        <RotaryPot21 x={x} y={centerRow} ledMode="single" label="Waveform"
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

        <RoundPushButton8 x={col4} y={buttonRow}
                          ledPosition="top" ledCount={2} ledLabels={['1', '2']}
                          label="Sync src" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.VCO.SYNC_SRC}
        />

        <RoundPushButton8 x={col1} y={buttonRow}
                          ledPosition="top" ledCount={2} ledLabels={['Lin', 'Log']}
                          label="FM mode" labelPosition="bottom"
                          hasOff
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.VCO.FM_MODE}
        />

        <RoundPushButton8 x={col1} y={bottomRow1 + DUAL_LED_BUTTON_W_LABEL_OFFSET_Y}
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

        <RoundLedPushButton8 x={col1} y={bottomRow2} label="Ext CV" labelPosition="bottom-pot"
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