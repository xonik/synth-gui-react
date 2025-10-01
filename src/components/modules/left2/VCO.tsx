import React from 'react'
import RotaryPot21 from '../../pots/RotaryPot21'
import RotaryPot12 from '../../pots/RotaryPot12'
import RoundPushButton8 from '../../buttons/RoundPushButton8'
import RoundLedPushButton8 from '../../buttons/RoundLedPushButton8'
import { ControllerGroupIds } from '../../../synthcore/types'
import oscControllers from '../../../synthcore/modules/osc/oscControllers'
import SubHeader from "../../misc/SubHeader";
import {
    DUAL_LED_BUTTON_W_LABEL_OFFSET_Y, PADDING_LEFT, POT_DISTANCE_L,
    POT_DISTANCE_M, POT_DISTANCE_S,
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
    const bottomRow = topRow + ROW_HEIGHT
    const buttonRow1 = topRow - 5
    const centerRow = topRow + ROW_HEIGHT * 0.5

    const col1 = x + PADDING_LEFT
    const col2 = col1 + POT_DISTANCE_L
    const col3 = col2 +  POT_DISTANCE_M
    const col4 = col3 +  POT_DISTANCE_M
    const col5 = col4 + POT_DISTANCE_S
    const col6 = col5 + POT_DISTANCE_S
    const col7 = col6 + POT_DISTANCE_S
    const col8 = col7 + POT_DISTANCE_S
    const col9 = col8 + POT_DISTANCE_M

    const moduleWidth = col9 + PADDING_LEFT - x


    return <>
        {/*!SHOW_CUT && <rect x={x-52.5} y={y} width="105" height={130 - ROW_SPACING} className="module-background"/>*/}

        <rect x={col2 - POT_DISTANCE_M / 2} y={topRow - 0.5 * ROW_HEIGHT} width={2 * POT_DISTANCE_M} height={2 * ROW_HEIGHT} className="highlight-background"/>

        <SubHeader label="Oscillator 3" x={x} y={y} width={moduleWidth} labelPosition="left"/>

        <RoundPushButton8 x={col1} y={topRow}
                          ledPosition="right" ledCount={2} ledLabels={['1', '2']}
                          label="Sync src" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.VCO.SYNC_SRC}
        />

        <RotaryPot12 x={col2} y={topRow} label="Kbd"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.VCO.KBD}
        />

        <RotaryPot12 x={col3} y={topRow} label="LFO"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.VCO.LFO}
        />

        <RotaryPot12 x={col4} y={topRow} ledMode="single" label="Note"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.VCO.NOTE}
        />

        <RotaryPot12 x={col4} y={bottomRow} ledMode="single" label="Detune"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.VCO.DETUNE}
        />

        <RoundPushButton8 x={col1} y={bottomRow}
                          ledPosition="right" ledCount={2} ledLabels={['Hard', 'CEM']}
                          label="Sync" labelPosition="bottom"
                          hasOff
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.VCO.SYNC}
        />

        <RoundLedPushButton8 x={col2} y={bottomRow} label="Ext CV" labelPosition="bottom-pot"
                             ctrlGroup={ctrlGroup}
                             ctrl={oscControllers.VCO.EXT_CV}
        />

        <RotaryPot12 x={col3} y={bottomRow} label="Wheel"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.VCO.WHEEL}
        />

        <RotaryPot21 x={col6} y={centerRow} ledMode="single" label="Waveform"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.VCO.WAVEFORM}
        />

        <RotaryPot12 x={col8} y={topRow} ledMode="multi" label="FM"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.VCO.FM_AMT}
        />

        <RoundPushButton8 x={col9} y={topRow + DUAL_LED_BUTTON_W_LABEL_OFFSET_Y}
                          ledPosition="top-horizontal" ledCount={2} ledLabels={['2', 'Ext']}
                          label="FM src" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.VCO.FM_SRC}
        />

        <RotaryPot12 x={col8} y={bottomRow} ledMode="single" label="PW"
                     ctrlGroup={ctrlGroup}
                     ctrl={oscControllers.VCO.PW}
        />

        <RoundPushButton8 x={col9} y={bottomRow +  + DUAL_LED_BUTTON_W_LABEL_OFFSET_Y}
                          ledPosition="top-horizontal" ledCount={2} ledLabels={['Lin', 'Log']}
                          label="FM mode" labelPosition="bottom"
                          hasOff
                          ctrlGroup={ctrlGroup}
                          ctrl={oscControllers.VCO.FM_MODE}
        />
    </>
}

export default VCO