import React from 'react'
import RotaryPot17 from '../pots/RotaryPot17'
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import Header from '../misc/Header'
import { ControllerGroupIds } from '../../synthcore/types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectUiLfo } from '../../synthcore/modules/lfo/lfoReducer'
import { StageId } from '../../synthcore/modules/lfo/types'
import lfoControllers from '../../synthcore/modules/lfo/lfoControllers'

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

    const lfo = useAppSelector(selectUiLfo)

    return <svg x={x} y={y}>
        <Header align="left" label="LFOs" x={0} y={0} width={145}/>
        <RoundLedPushButton8 label="1" x={buttonCol} y={button1Row} labelPosition="right" radioButtonIndex={0}
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoControllers(0).LFO}
                             ctrlIndex={lfo.id}
                             value={lfo.id}
        />

        <RoundLedPushButton8 label="2" x={buttonCol} y={button2Row} labelPosition="right" radioButtonIndex={1}
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoControllers(0).LFO}
                             ctrlIndex={lfo.id}
                             value={lfo.id}
        />

        <RoundLedPushButton8 label="3" x={buttonCol} y={button3Row} labelPosition="right" radioButtonIndex={2}
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoControllers(0).LFO}
                             ctrlIndex={lfo.id}
                             value={lfo.id}
        />

        <RoundLedPushButton8 label="4" x={buttonCol} y={button4Row} labelPosition="right" radioButtonIndex={3}
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoControllers(0).LFO}
                             ctrlIndex={lfo.id}
                             value={lfo.id}
        />

        <RotaryPot17 ledMode="single" label="Rate" x={firstPotCol} y={potRow1}
                     ctrlGroup={ctrlGroup}
                     ctrl={lfoControllers(0).RATE}
                     ctrlIndex={lfo.id}
        />

        <RotaryPot17 ledMode="single" label="Depth" x={firstPotCol + potDistance} y={potRow1}
                     ctrlGroup={ctrlGroup}
                     ctrl={lfoControllers(0).DEPTH}
                     ctrlIndex={lfo.id}
        />

        <RoundPushButton8 x={firstPotCol + potDistance + 30} y={potRow1}
                          label="Shape" labelPosition="bottom"
                          ledPosition="right" ledCount={5}
                          ledLabels={['Saw', 'Tri', 'Sqr', 'Sin', 'S & H',]}
                          ctrlGroup={ctrlGroup}
                          ctrl={lfoControllers(0).SHAPE}
                          ctrlIndex={lfo.id}
        />

        <RotaryPot17 ledMode="single" label="Delay" x={firstPotCol} y={potRow2}
                     ctrlGroup={ctrlGroup}
                     ctrl={lfoControllers(0).DELAY}
                     ctrlIndex={lfo.id}
                     value={lfo.stages[StageId.DELAY].time}
        />

        <RoundLedPushButton8 label="Sync" x={buttonCol2} y={potRow2} labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoControllers(0).SYNC}
                             ctrlIndex={lfo.id}
        />

        <RoundLedPushButton8 label="Reset" x={buttonCol3} y={potRow2} labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoControllers(0).RESET}
                             ctrlIndex={lfo.id}
        />

        <RoundLedPushButton8 label="Once" x={buttonCol4} y={potRow2} labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={lfoControllers(0).ONCE}
                             ctrlIndex={lfo.id}
        />

    </svg>
}

export default LFO