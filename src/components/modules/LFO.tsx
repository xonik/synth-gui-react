import React from 'react'
import RotaryPot15 from '../pots/RotaryPot15'
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import Header from '../misc/Header'
import { ControllerGroupIds } from '../../synthcore/types'
import { useAppSelector } from '../../synthcore/hooks'
import { lfoCtrls } from '../../synthcore/modules/lfo/lfoControllers'
import { selectCurrUiLfoId } from '../../synthcore/modules/lfo/lfoReducer'

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.LFO


const LFO = ({ x, y }: Props) => {
    const potDistance = 40
    const buttonCol = 10
    const firstPotCol = buttonCol + 105
    const buttonCol2 = firstPotCol + 2 * potDistance + 25
    const buttonCol3 = buttonCol2 + 20
    const buttonCol4 = buttonCol3 + 20
    const buttonCol5 = buttonCol4 + 20
    const buttonCol6 = buttonCol5 + 20
    const buttonCol7 = buttonCol6 + 20
    const potRow1 = 27

    const lfoId = useAppSelector(selectCurrUiLfoId)

    return <svg x={x} y={y}>
        <Header align="left" label="LFOs" x={0} y={0} width={330}/>

        <RoundPushButton8 x={buttonCol} y={potRow1}
                          label="LFO" labelPosition="bottom"
                          ledPosition="right" ledCount={4}
                          ledLabels={['1','2', '3', '4']}
                          ctrlGroup={ctrlGroup}
                          ctrl={lfoCtrls.LFO}
                          ctrlIndex={0}
                          value={lfoId}
        />

        <RoundPushButton8 x={buttonCol + 55} y={potRow1}
                          label="Shape" labelPosition="bottom"
                          ledPosition="sides" ledCount={6}
                          ledLabels={['Saw', 'Tri', 'Sqr', 'Sin', 'Rand', 'Custom']}
                          ctrlGroup={ctrlGroup}
                          ctrl={lfoCtrls.SHAPE}
                          ctrlIndex={lfoId}
        />


        <RotaryPot15 ledMode="single" label="Rate" x={firstPotCol} y={potRow1}
                     ctrlGroup={ctrlGroup}
                     ctrl={lfoCtrls.RATE}
                     ctrlIndex={lfoId}
        />

        <RotaryPot15 ledMode="single" label="Depth" x={firstPotCol + potDistance} y={potRow1}
                     ctrlGroup={ctrlGroup}
                     ctrl={lfoCtrls.DEPTH}
                     ctrlIndex={lfoId}
        />

        <RotaryPot15 ledMode="single" label="Delay" x={firstPotCol + 2 * potDistance} y={potRow1}
                     ctrlGroup={ctrlGroup}
                     ctrl={lfoCtrls.DELAY}
                     ctrlIndex={lfoId}
        />

        <RoundLedPushButton8 label="Sync" x={buttonCol2} y={potRow1} labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.SYNC}
                             ctrlIndex={lfoId}
        />

        <RoundLedPushButton8 label="Reset" x={buttonCol3} y={potRow1} labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.RESET}
                             ctrlIndex={lfoId}
        />

        <RoundLedPushButton8 label="Loop" x={buttonCol4} y={potRow1} labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.LOOP}
                             ctrlIndex={lfoId}
                             loop
        />

        <RoundLedPushButton8 label="Invert" x={buttonCol5} y={potRow1} labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.INVERT}
                             ctrlIndex={lfoId}
                             loop
        />

        <RoundLedPushButton8 label="Bipolar" x={buttonCol6} y={potRow1} labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.BIPOLAR}
                             ctrlIndex={lfoId}
                             loop
        />

        <RoundLedPushButton8 label="Trigger" x={buttonCol7} y={potRow1} labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.INVERT}
                             ctrlIndex={lfoId}
                             loop
        />

    </svg>
}

export default LFO