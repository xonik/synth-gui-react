import React from 'react'
import RotaryPot12 from '../pots/RotaryPot12'
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import { ControllerGroupIds } from '../../synthcore/types'
import { useAppSelector } from '../../synthcore/hooks'
import { lfoCtrls } from '../../synthcore/modules/lfo/lfoControllers'
import { selectCurrUiLfoId } from '../../synthcore/modules/lfo/lfoReducer'
import SubHeader from "../misc/SubHeader";
import {
    BUTTON_DISTANCE_S,
    PADDING_LEFT,
    POT_DISTANCE_M,
    POT_DISTANCE_S,
    POT_OFFSET_Y,
    ROW_HEIGHT,
    ROW_SPACING,
} from "../../constants";
import { SHOW_CUT } from "../../config";

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.LFO


const LFO = ({ x, y }: Props) => {
    const potDistance = POT_DISTANCE_M
    const buttonCol = PADDING_LEFT
    const firstPotCol = buttonCol + POT_DISTANCE_M * 3.5
    const buttonCol2 = firstPotCol + POT_DISTANCE_M * 7.5 - BUTTON_DISTANCE_S * 5
    const buttonCol3 = buttonCol2 + BUTTON_DISTANCE_S
    const buttonCol4 = buttonCol3 + BUTTON_DISTANCE_S
    const buttonCol5 = buttonCol4 + BUTTON_DISTANCE_S
    const buttonCol6 = buttonCol5 + BUTTON_DISTANCE_S
    const buttonCol7 = buttonCol6 + BUTTON_DISTANCE_S

    const buttonRow1 = POT_OFFSET_Y

    const potRow1 = POT_OFFSET_Y

    const lfoId = useAppSelector(selectCurrUiLfoId)

    return <svg x={x} y={y}>
        {!SHOW_CUT && <rect x={0} y={0} width={323} height={ROW_HEIGHT - ROW_SPACING} className="module-background"/>}
        <SubHeader align="left" label="LFO" labelPosition="left" x={0} y={0} width={323}/>

        <RoundPushButton8 x={buttonCol} y={potRow1}
                          ledPosition="right" ledCount={4}
                          ledLabels={['1','2', '3', '4']}
                          ctrlGroup={ctrlGroup}
                          ctrl={lfoCtrls.LFO}
                          ctrlIndex={0}
                          value={lfoId}
        />

        <RoundPushButton8 x={buttonCol + 2 * POT_DISTANCE_M} y={potRow1}
                          label="Shape" labelPosition="bottom-pot"
                          ledPosition="sides" ledCount={6}
                          ledLabels={['Saw', 'Tri', 'Sqr', 'Sin', 'Rand', 'Other']}
                          ctrlGroup={ctrlGroup}
                          ctrl={lfoCtrls.SHAPE}
                          ctrlIndex={lfoId}
        />


        <RotaryPot12 ledMode="single" label="Rate" x={firstPotCol} y={potRow1}
                     ctrlGroup={ctrlGroup}
                     ctrl={lfoCtrls.RATE}
                     ctrlIndex={lfoId}
        />

        <RoundLedPushButton8 label="Sync" x={firstPotCol+POT_DISTANCE_S} y={buttonRow1} labelPosition="bottom-pot"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.SYNC}
                             ctrlIndex={lfoId}
        />

        <RotaryPot12 ledMode="single" label="Depth" x={firstPotCol + potDistance * 1.5} y={potRow1}
                     ctrlGroup={ctrlGroup}
                     ctrl={lfoCtrls.DEPTH}
                     ctrlIndex={lfoId}
        />

        <RotaryPot12 ledMode="single" label="Balance" x={firstPotCol + 2.5 * potDistance} y={potRow1}
                     ctrlGroup={ctrlGroup}
                     ctrl={lfoCtrls.BALANCE}
                     ctrlIndex={lfoId}
        />

        <RotaryPot12 ledMode="single" label="Delay" x={firstPotCol + 3.5 * potDistance} y={potRow1}
                     ctrlGroup={ctrlGroup}
                     ctrl={lfoCtrls.DELAY}
                     ctrlIndex={lfoId}
        />

        <RoundLedPushButton8 label="Reset" x={buttonCol3} y={buttonRow1} labelPosition="bottom-pot"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.RESET}
                             ctrlIndex={lfoId}
        />

        <RoundLedPushButton8 label="Loop" x={buttonCol4} y={buttonRow1} labelPosition="bottom-pot"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.LOOP}
                             ctrlIndex={lfoId}
                             loop
        />

        <RoundLedPushButton8 label="Invert" x={buttonCol5} y={buttonRow1} labelPosition="bottom-pot"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.INVERT}
                             ctrlIndex={lfoId}
                             loop
        />

        <RoundLedPushButton8 label="Bipolar" x={buttonCol6} y={buttonRow1} labelPosition="bottom-pot"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.BIPOLAR}
                             ctrlIndex={lfoId}
                             loop
        />

        <RoundPushButton8 label="Trigger" x={buttonCol7} y={buttonRow1} labelPosition="bottom-pot"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.GATE}
                             ctrlIndex={lfoId}
                             loop
        />

    </svg>
}

export default LFO