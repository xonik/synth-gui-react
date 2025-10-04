import React from 'react'
import RotaryPot12 from '../../pots/RotaryPot12'
import RoundLedPushButton8 from '../../buttons/RoundLedPushButton8'
import RoundPushButton8 from '../../buttons/RoundPushButton8'
import { ControllerGroupIds } from '../../../synthcore/types'
import { useAppSelector } from '../../../synthcore/hooks'
import { lfoCtrls } from '../../../synthcore/modules/lfo/lfoControllers'
import { selectCurrUiLfoId } from '../../../synthcore/modules/lfo/lfoReducer'
import SubHeader from "../../misc/SubHeader";
import {
    BUTTON_DISTANCE_S,
    POT_DISTANCE_M,
    POT_OFFSET_Y,
    ROW_HEIGHT,
} from "../../../constants";
import { SHOW_CUT } from "../../../config";
import { ModuleBorder } from "../../misc/ModuleBorder";
import { ModuleProps } from "../types";

const ctrlGroup = ControllerGroupIds.LFO


const LFO = ({ x, y, height, width }: ModuleProps) => {
    const col1 = x + POT_DISTANCE_M / 2
    const col2 = col1 + POT_DISTANCE_M
    const col3 = col2 + POT_DISTANCE_M
    const col4 = col3 + POT_DISTANCE_M
    const col5 = col4 + POT_DISTANCE_M

    const row1 = y + POT_OFFSET_Y
    const row2 = row1 + ROW_HEIGHT

    const lfoId = useAppSelector(selectCurrUiLfoId)

    return <>
        {/*!SHOW_CUT && <rect x={x} y={y} width={323} height={ROW_HEIGHT * 2- ROW_SPACING} className="module-background"/>*/}
        <ModuleBorder x={x} y={y} height={height} width={width}/>
        <SubHeader align="left" label="LFO" labelPosition="left" x={x} y={y} width={width} labelWidth={15}/>

        <RoundLedPushButton8 label="Sync" x={col1} y={row1} labelPosition="bottom-pot"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.SYNC}
                             ctrlIndex={lfoId}
        />

        {/* TODO: Allow more than 3 LFOs from the main menu but not here */}
        <RoundPushButton8 x={col1} y={row2}
                          label="LFO"
                          labelPosition="bottom-pot"
                          ledPosition="right" ledCount={3}
                          ledLabels={['1', '2', '3']}
                          ctrlGroup={ctrlGroup}
                          ctrl={lfoCtrls.LFO}
                          ctrlIndex={0}
                          value={lfoId}
        />

        <RotaryPot12 ledMode="single" label="Rate" x={col2} y={row1}
                     ctrlGroup={ctrlGroup}
                     ctrl={lfoCtrls.RATE}
                     ctrlIndex={lfoId}
        />


        <RotaryPot12 ledMode="single" label="Depth" x={col3} y={row1}
                     ctrlGroup={ctrlGroup}
                     ctrl={lfoCtrls.DEPTH}
                     ctrlIndex={lfoId}
        />

        <RotaryPot12 ledMode="single" label="Balance" x={col4} y={row1}
                     ctrlGroup={ctrlGroup}
                     ctrl={lfoCtrls.BALANCE}
                     ctrlIndex={lfoId}
        />

        <RotaryPot12 ledMode="single" label="Delay" x={col5} y={row1}
                     ctrlGroup={ctrlGroup}
                     ctrl={lfoCtrls.DELAY}
                     ctrlIndex={lfoId}
        />

        <RoundLedPushButton8 label="Bipolar" x={col2} y={row2} labelPosition="bottom-pot"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.BIPOLAR}
                             ctrlIndex={lfoId}
                             loop
        />

        <RoundLedPushButton8 label="Invert" x={col2 + BUTTON_DISTANCE_S} y={row2} labelPosition="bottom-pot"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.INVERT}
                             ctrlIndex={lfoId}
                             loop
        />

        <RoundLedPushButton8 label="Loop" x={col2 + BUTTON_DISTANCE_S * 2} y={row2} labelPosition="bottom-pot"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.LOOP}
                             ctrlIndex={lfoId}
                             loop
        />

        <RoundLedPushButton8 label="Reset" x={col2 + BUTTON_DISTANCE_S * 3} y={row2} labelPosition="bottom-pot"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.RESET}
                             ctrlIndex={lfoId}
        />


        <RoundPushButton8 x={col2 + BUTTON_DISTANCE_S * 4} y={row2}
                          label="Shape" labelPosition="bottom-pot"
                          ledPosition="right-two-cols" ledCount={6}
                          ledLabels={['Saw', 'Tri', 'Sqr', 'Sin', 'Rand', 'Other']}
                          ctrlGroup={ctrlGroup}
                          ctrl={lfoCtrls.SHAPE}
                          ctrlIndex={lfoId}
        />


        <RoundPushButton8 label="Trigger" x={col2 + BUTTON_DISTANCE_S * 6} y={row1} labelPosition="bottom-pot"
                          ctrlGroup={ctrlGroup}
                          ctrl={lfoCtrls.GATE}
                          ctrlIndex={lfoId}
                          loop
        />

    </>
}

export default LFO