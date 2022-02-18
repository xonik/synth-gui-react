import React from 'react'
import RotaryPot17 from '../pots/RotaryPot17'
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import Header from '../misc/Header'
import midiConstants from '../../midi/controllers'
import { ControllerGroupIds } from '../../synthcore/types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectUiLfo } from '../../synthcore/modules/lfo/lfoReducer'
import { OscControllerIds } from '../../synthcore/modules/osc/types'
import { LfoControllerId, StageId } from '../../synthcore/modules/lfo/types'

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
                             ctrlId={LfoControllerId.LFO_ID}
                             ctrlIndex={lfo.id}
                             storeValue={lfo.id}
        />

        <RoundLedPushButton8 label="2" x={buttonCol} y={button2Row} labelPosition="right" radioButtonIndex={1}
                             ctrlGroup={ctrlGroup}
                             ctrlId={LfoControllerId.LFO_ID}
                             ctrlIndex={lfo.id}
                             storeValue={lfo.id}
        />

        <RoundLedPushButton8 label="3" x={buttonCol} y={button3Row} labelPosition="right" radioButtonIndex={2}
                             ctrlGroup={ctrlGroup}
                             ctrlId={LfoControllerId.LFO_ID}
                             ctrlIndex={lfo.id}
                             storeValue={lfo.id}
        />

        <RoundLedPushButton8 label="4" x={buttonCol} y={button4Row} labelPosition="right" radioButtonIndex={3}
                             ctrlGroup={ctrlGroup}
                             ctrlId={LfoControllerId.LFO_ID}
                             ctrlIndex={lfo.id}
                             storeValue={lfo.id}
        />

        <RotaryPot17 ledMode="single" label="Rate" x={firstPotCol} y={potRow1} position={0.4}
                     ctrlGroup={ctrlGroup}
                     ctrlId={LfoControllerId.RATE}
                     ctrlIndex={lfo.id}
                     storePosition={lfo.rate}
        />

        <RotaryPot17 ledMode="single" label="Depth" x={firstPotCol + potDistance} y={potRow1} position={0.1}
                     ctrlGroup={ctrlGroup}
                     ctrlId={LfoControllerId.DEPTH}
                     ctrlIndex={lfo.id}
                     storePosition={lfo.depth}
        />

        <RoundPushButton8 x={firstPotCol + potDistance + 30} y={potRow1}
                          label="Shape" labelPosition="bottom"
                          ledPosition="right" ledCount={5}
                          ledLabels={['Saw', 'Tri', 'Sqr', 'Sin', 'S & H',]}
                          ctrlGroup={ctrlGroup}
                          ctrlId={LfoControllerId.SHAPE}
                          ctrlIndex={lfo.id}
                          storeValue={lfo.shape}
        />

        <RotaryPot17 ledMode="single" label="Delay" x={firstPotCol} y={potRow2} position={0.4}
                     ctrlGroup={ctrlGroup}
                     ctrlId={LfoControllerId.DELAY}
                     ctrlIndex={lfo.id}
                     storePosition={lfo.stages[StageId.DELAY].time}
        />

        <RoundLedPushButton8 label="Sync" x={buttonCol2} y={potRow2} labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrlId={LfoControllerId.SYNC}
                             ctrlIndex={lfo.id}
                             storeValue={lfo.sync}
        />

        <RoundLedPushButton8 label="Reset" x={buttonCol3} y={potRow2} labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrlId={LfoControllerId.RESET}
                             ctrlIndex={lfo.id}
                             storeValue={lfo.resetOnTrigger}
        />

        <RoundLedPushButton8 label="Once" x={buttonCol4} y={potRow2} labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrlId={LfoControllerId.ONCE}
                             ctrlIndex={lfo.id}
                             storeValue={lfo.once}
        />

    </svg>
}

export default LFO