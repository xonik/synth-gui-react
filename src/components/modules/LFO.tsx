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
    const firstPotCol = buttonCol + 35
    const buttonCol2 = firstPotCol + potDistance
    const buttonCol3 = buttonCol2 + 20
    const buttonCol4 = buttonCol3 + 20
    const potRow1 = 27
    const potRow2 = potRow1 + 40

    const buttonRowSpacing = 17
    const button1Row = 21
    const button2Row = button1Row + buttonRowSpacing
    const button3Row = button2Row + buttonRowSpacing
    const button4Row = button3Row + buttonRowSpacing

    const lfoId = useAppSelector(selectCurrUiLfoId)

    return <svg x={x} y={y}>
        <Header align="left" label="LFOs" x={0} y={0} width={145}/>
        <RoundLedPushButton8 label="1" x={buttonCol} y={button1Row} labelPosition="right" radioButtonIndex={0}
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.LFO}
                             ctrlIndex={lfoId}
                             value={lfoId}
        />

        <RoundLedPushButton8 label="2" x={buttonCol} y={button2Row} labelPosition="right" radioButtonIndex={1}
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.LFO}
                             ctrlIndex={lfoId}
                             value={lfoId}
        />

        <RoundLedPushButton8 label="3" x={buttonCol} y={button3Row} labelPosition="right" radioButtonIndex={2}
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.LFO}
                             ctrlIndex={lfoId}
                             value={lfoId}
        />

        <RoundLedPushButton8 label="4" x={buttonCol} y={button4Row} labelPosition="right" radioButtonIndex={3}
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.LFO}
                             ctrlIndex={lfoId}
                             value={lfoId}
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

        <RoundPushButton8 x={firstPotCol + potDistance + 30} y={potRow1}
                          label="Shape" labelPosition="bottom"
                          ledPosition="right" ledCount={5}
                          ledLabels={['Saw', 'Tri', 'Sqr', 'Sin', 'S & H',]}
                          ctrlGroup={ctrlGroup}
                          ctrl={lfoCtrls.SHAPE}
                          ctrlIndex={lfoId}
        />

        <RotaryPot15 ledMode="single" label="Delay" x={firstPotCol} y={potRow2}
                     ctrlGroup={ctrlGroup}
                     ctrl={lfoCtrls.DELAY}
                     ctrlIndex={lfoId}
        />

        <RoundLedPushButton8 label="Sync" x={buttonCol2} y={potRow2} labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.SYNC}
                             ctrlIndex={lfoId}
        />

        <RoundLedPushButton8 label="Reset" x={buttonCol3} y={potRow2} labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.RESET}
                             ctrlIndex={lfoId}
        />

        <RoundLedPushButton8 label="Loop" x={buttonCol4} y={potRow2} labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoCtrls.LOOP}
                             ctrlIndex={lfoId}
        />

    </svg>
}

export default LFO