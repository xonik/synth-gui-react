import React from 'react';
import RotaryPot12 from '../../pots/RotaryPot12';
import RoundPushButton8 from '../../buttons/RoundPushButton8';
import RoundLedPushButton8 from '../../buttons/RoundLedPushButton8';
import SubHeader from "../../misc/SubHeader";
import {
    POT_DISTANCE_M,
    POT_DISTANCE_L,
    POT_OFFSET_Y,
    ROW_HEIGHT,
    POT_DISTANCE_S
} from "../../../constants";
import { ModuleBorder } from "../../misc/ModuleBorder";
import { ModuleProps } from "../types";
import { useGlobalPot, useGlobalButton } from '../../../store/hooks'

const Arpeggiator = ({ x, y, height, width }: ModuleProps) => {

    const row1 = y;
    const row2 = y + POT_OFFSET_Y
    const row3 = row2 + ROW_HEIGHT

    const col1 = x + POT_DISTANCE_M  / 2
    const col2 = col1 + POT_DISTANCE_S
    const col3 = col1 + POT_DISTANCE_L

    const { displayValue: rateValue, increment: rateIncrement } = useGlobalPot(
        s => s.arp.bpm,
        (s, v) => { s.arp.bpm = v },
    )
    const { value: syncValue, toggle: syncToggle } = useGlobalButton(
        s => s.arp.sync,
        (s, v) => { s.arp.sync = v },
        3
    )
    const { value: modeValue, toggle: modeToggle } = useGlobalButton(
        s => s.arp.mode,
        (s, v) => { s.arp.mode = v },
        4
    )
    const { value: rangeValue, toggle: rangeToggle } = useGlobalButton(
        s => s.arp.range,
        (s, v) => { s.arp.range = v },
        3
    )
    const { value: onOffValue, toggle: onOffToggle } = useGlobalButton(
        s => s.arp.onOff,
        (s, v) => { s.arp.onOff = v },
        2
    )
    const { value: sequenceValue, toggle: sequenceToggle } = useGlobalButton(
        s => s.arp.sequence,
        (s, v) => { s.arp.sequence = v },
        2
    )

    return <>
        <ModuleBorder x={x} y={y} height={height} width={width} />
        <SubHeader label="Arp" x={x} y={row1} width={width} labelPosition="center" labelWidth={15} />

        <RotaryPot12 ledMode="single" label="Rate" x={col2} y={row2}
                     value={rateValue}
                     onValueIncrement={rateIncrement}
        />

        {/* Let sync source be settable from main panel */  }
        <RoundLedPushButton8 labelPosition="bottom-pot" x={col1} y={row2} label="Sync"
                          value={syncValue}
                          onButtonClick={syncToggle}
        />

        <RoundPushButton8 x={col3} y={row2}
                          label="Mode" labelPosition="bottom-pot"
                          ledCount={3} ledPosition="right" ledLabels={['Up', 'Down', 'Random']}
                          ledCycleBinary
                          value={modeValue}
                          onButtonClick={modeToggle}
        />

        <RoundPushButton8 x={col3} y={row3}
                          label="Range" labelPosition="bottom-pot"
                          ledCount={3} ledPosition="right" ledLabels={['1 oct', '2 oct', '3 oct']}
                          value={rangeValue}
                          onButtonClick={rangeToggle}
        />

        <RoundLedPushButton8 labelPosition="bottom-pot" x={col1} y={row3} label="On"
                             value={onOffValue}
                             onButtonClick={onOffToggle}
        />

        <RoundLedPushButton8 labelPosition="bottom-pot" x={col2} y={row3} label="Sequence"
                             value={sequenceValue}
                             onButtonClick={sequenceToggle}
        />

    </>;
};

export default Arpeggiator;
